package com.project.youtube.dao.impl;

import com.project.youtube.Exception.APIException;
import com.project.youtube.dao.VideoDao;
import com.project.youtube.dto.VideoDto;
import com.project.youtube.form.UpdateVideoMetadataForm;
import com.project.youtube.model.Category;
import com.project.youtube.model.Video;
import com.project.youtube.model.VideoThumbnail;
import com.project.youtube.service.impl.FileUploadTestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.bramp.ffmpeg.FFprobe;
import net.bramp.ffmpeg.probe.FFmpegFormat;
import net.bramp.ffmpeg.probe.FFmpegProbeResult;
import net.bramp.ffmpeg.probe.FFmpegStream;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.transaction.Transactional;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Field;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import static com.project.youtube.constants.ApplicationConstants.API_VERSION;
import static com.project.youtube.constants.ApplicationConstants.DEFAULT_VIDEO_TITLE;
import static com.project.youtube.query.VideoQuery.*;
import static com.project.youtube.utils.SqlUtils.camelToSnake;
import static java.util.Objects.requireNonNull;

@Repository
@RequiredArgsConstructor
@Slf4j
public class VideoDaoImpl implements VideoDao<Video> {
    private final NamedParameterJdbcTemplate jdbcTemplate;
    private final FileUploadTestService fileUploadTestService;

    /**
     * create a video entry
     * @param video the video file
     * @param userId the logged-in user
     * @return the video
     */
    @Override
    @Transactional
    public Video create(MultipartFile video, Long userId) {
        try {
            // Generate a random UUID for the video ID
            String randomId = UUID.randomUUID().toString();

            String url = fileUploadTestService.saveVideo(video, randomId);//TODO: replace with amazonS3
            String extension = fileUploadTestService.getVideoFileExtension(video);
            String videoServerUrl = generateVideoUrl(randomId, extension);


            long totalBytes = video.getSize();
            long videoLength = getVideoLength(randomId);

            String gifFileName = fileUploadTestService.saveGif(randomId, extension, videoLength);//TODO: replace with amazonS3
            String gifServerUrl = generateGifUrl(gifFileName);

            List<String> thumbnailFileNames = fileUploadTestService.extractThumbnails(randomId, extension, videoLength);
            List<String> thumbnailServerUrls = generateThumbnailUrls(thumbnailFileNames);
            //get key
            KeyHolder keyHolder = new GeneratedKeyHolder();

            //new Time(TimeUnit.SECONDS.toMillis(videoLength));
            Map<String, ?> map = Map.of(
                    "userId", userId,
                    "title", DEFAULT_VIDEO_TITLE,
                    "duration", videoLength,
                    "totalBytes", totalBytes,
                    "thumbnailId", 1,
                    "gifUrl", gifServerUrl,
                    "videoUrl", videoServerUrl
            );

            MapSqlParameterSource params = new MapSqlParameterSource();
            params.addValues(map);
            jdbcTemplate.update(INSERT_VIDEO_QUERY, params, keyHolder);

            log.info("video file: {}, extension: {}, videoServerUrl: {}, totalBytes: {}, videoLength sec: {} sec", url+".mp4", extension, videoServerUrl, totalBytes, videoLength);
            Long videoId = requireNonNull(keyHolder.getKey().longValue());
            //TODO: Think about making the operation async
            /*CompletableFuture<String> future =  CompletableFuture.runAsync(() -> {
                //run the stuff in here so it's non-blocking
            });*/
            createThumbnails(videoId, thumbnailServerUrls);
            return getVideo(videoId);
        } catch (Exception exception) {
            try {
                //throw exception;
                throw new Exception("An error occurred ", exception.getCause());
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }

    /**
     * create thumbnails entries for uploaded video
     * @param videoId the video id
     * @param thumbnailUrls the thumbnail url
     */
    @Override
    @Transactional//rollback if errors
    public void createThumbnails(Long videoId, List<String> thumbnailUrls) {
        log.info("creating thumbnails for video");
        try {
            SqlParameterSource[] args = thumbnailUrls.stream()
                    .map(thumbnailUrl -> new MapSqlParameterSource()
                            .addValue("videoId", videoId)
                            .addValue("thumbnailUrl", thumbnailUrl)
                    )
                    .collect(Collectors.toList()).toArray(SqlParameterSource[]::new);
            jdbcTemplate.batchUpdate(INSERT_VIDEO_THUMBNAILS, args);
        } catch (Exception exception) {
            throw exception;
            //throw new APIException("An error occurred, could not create video thumbnails");
        }
    }

    /**
     * get thumbnails for video
     * @param videoId the video id
     * @return the list of thumbnails
     */
    @Override
    public List<VideoThumbnail> getThumbnails(Long videoId) {
        try {
            return jdbcTemplate.query(SELECT_THUMBNAILS_QUERY, Map.of("videoId", videoId), new BeanPropertyRowMapper<>(VideoThumbnail.class));
        } catch (Exception exception) {
            throw new APIException("An error occurred while getting video thumbnails");
        }
    }

    /**
     * update thumbnail main id
     * @param thumbnailId the id
     * @param videoId the video id
     */
    @Override
    public void updateMainThumbnailId(Long videoId, Long thumbnailId) {
        try {
            jdbcTemplate.update(UPDATE_VIDEO_MAIN_THUMBNAIL_QUERY, Map.of("thumbnailId", thumbnailId, "videoId", videoId));
        } catch (BadSqlGrammarException exception) {
            throw exception;
        } catch (Exception exception) {
            throw exception;
            //throw new APIException("An error occurred while video main thumbnail id");
        }
    }

    /**
     * get video metadata
     * @param id the video id
     * @return the metadata
     */
    @Override
    public Video getVideo(Long id) {
        try {
            return jdbcTemplate.queryForObject(SELECT_VIDEO_BY_ID_QUERY, Map.of("videoId", id), new BeanPropertyRowMapper<>(Video.class));
        } catch (EmptyResultDataAccessException exception) {
            throw new APIException("Could not find the video");
        } catch (Exception exception) {
            throw new APIException("An error occurred, please try again.");
        }
    }

    /**
     * get user video count
     * @param userId the user id
     * @return the video count
     */
    @Override
    public Long videoCount(Long userId) {
        Long count = 0L;
        try {
            count = jdbcTemplate.queryForObject(SELECT_VIDEO_COUNT_BY_USER_ID_QUERY, Map.of("userId", userId), Long.class);
        } catch (Exception exception) {
            throw new APIException("An error occurred");
        }
        return count;
    }

    /**
     * update the video metadata
     * @param videoMetadataForm
     * @return the video
     */
    @Override
    public Video updateMetadata(UpdateVideoMetadataForm videoMetadataForm) {
        try {
            SqlParameterSource parameterSource = getSqlParameterSource(videoMetadataForm);
            final String UPDATE_VIDEO_BY_ID_QUERY = buildUpdateQuery(parameterSource);
            jdbcTemplate.update(UPDATE_VIDEO_BY_ID_QUERY, parameterSource);
            return getVideo(videoMetadataForm.getVideoId());
        } catch (Exception exception) {
            throw new APIException("An error occurred, could not update video information ");
        }

    }

    /**
     * get all user video
     * @param userId the user id
     * @param pageSize the page size
     * @param offset the offset
     * @return the list of videos
     */
    @Override
    public List<Video> getAllByUserId(Long userId, Integer pageSize, Integer offset) {
        try {
            return jdbcTemplate.query(SELECT_USER_VIDEOS_QUERY, Map.of("userId", userId, "pageSize", pageSize, "offset", offset), new BeanPropertyRowMapper<>(Video.class));
        } catch (Exception exception) {
            throw new APIException("An error occurred while retrieving all user's videos");
        }
    }

    /**
     * get video category
     * @param videoId the video id
     * @return the category
     */
    @Override
    public Category getVideoCategory(Long videoId) {
        try {
            return jdbcTemplate.queryForObject(SELECT_VIDEO_CATEGORY_BY_VIDEO_ID_QUERY, Map.of("videoId", videoId), new BeanPropertyRowMapper<>(Category.class));
        } catch (EmptyResultDataAccessException exception) {
            throw new APIException("Could not find a category associated to this video");
        } catch (Exception exception) {
            throw exception;
            //throw new APIException("");
        }
    }

    /**
     * delete a video owned by this user
     * @param videoDto the video dto
     * @param userId the user id
     */
    @Override
    public void delete(VideoDto videoDto, Long userId) {
        try {
            if(!Objects.equals(videoDto.getUserId(), userId)) { throw new APIException("You do not own this video"); }
            String[] videoUrlParts = videoDto.getVideoUrl().split("/");
            fileUploadTestService.deleteVideo(videoUrlParts[videoUrlParts.length - 1]);
            fileUploadTestService.deleteGif(videoDto.getGifUrl().split("=")[1]);
            VideoThumbnail firstThumbnail = videoDto.getVideoThumbnails().get(0);
            fileUploadTestService.deleteThumbnails(firstThumbnail.getThumbnailUrl().split("=")[1]);

            jdbcTemplate.update(DELETE_VIDEO_QUERY, Map.of("videoId", videoDto.getId(), "userId", userId));
        } catch (APIException exception) {
            throw exception;
        } catch (Exception exception) {
            throw new APIException("An error occurred, could not delete the video. Please try again");
        }
    }

    /**
     * Built an update query
     * @param parameterSource the params
     * @return the string update
     */
    private String buildUpdateQuery(SqlParameterSource parameterSource) {

        StringBuilder queryBuilder = new StringBuilder("UPDATE Videos SET ");

        Set<String> parameterNames = Arrays.stream(parameterSource.getParameterNames()).collect(Collectors.toSet());
        boolean first = true;

        for (String paramName : parameterNames) {
            if(paramName != "videoId") {
                if (!first) {
                    queryBuilder.append(", ");
                } else {
                    first = false;
                }

                queryBuilder.append(camelToSnake(paramName)).append(" = :").append(paramName);
            }
        }
        queryBuilder.append(" WHERE id = :videoId"); // Assuming id is always present
        return queryBuilder.toString();
    }


    /**
     * dynamically create a sql parameter map for non-null fields
     * @param videoMetadataForm the video update form
     * @return the
     */
    private SqlParameterSource getSqlParameterSource(UpdateVideoMetadataForm videoMetadataForm) {
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
        Class<?> clazz = videoMetadataForm.getClass();
        Field[] fields = clazz.getDeclaredFields();
        for(Field field : fields) {
            try {
                field.setAccessible(true);
                Object value = field.get(videoMetadataForm);
                if(value != null) {
                    mapSqlParameterSource.addValue(field.getName(), value);
                }
            } catch (IllegalAccessException exception) {
                try {
                    throw new IllegalAccessException("Could not build map found illegal argument  "+ exception.getMessage());
                } catch (IllegalAccessException e) {
                    throw new RuntimeException(e);
                }
            }
        }
        return mapSqlParameterSource;
    }

    /**
     * get video length and uses local ffprobe for video manipulation
     * @param videoUUID the video file name
     * @return the video milliseconds
     */
    private long getVideoLength(String videoUUID) throws Exception {

            Path fileStorageLocation = Paths.get(System.getProperty("user.home")+"/Downloads/videos/"+videoUUID+"/"+videoUUID+".mp4").toAbsolutePath().normalize();
            // Save the uploaded video to a temporary file
            String videoPath = fileStorageLocation.toString();// Change this path to a suitable location
            //video.transferTo(new File(tempFilePath));
            log.info("temp path: {}", videoPath);
            String ffprobeExecutableName = "ffprobe";

            String osName = System.getProperty("os.name").toLowerCase();
            String command = (osName.contains("windows")) ? "where" : "which";

            ProcessBuilder processBuilder = new ProcessBuilder(command, ffprobeExecutableName);//find where the ffprobe is on the system
            Process process = processBuilder.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            String ffprobePath = null;
            long durationInSeconds;

            while ((line = reader.readLine()) != null) {
                ffprobePath = line;
                log.info("Found ffmpeg at location {}",line);
                break;
            }
            try {
                //if(ffprobePath != "") {
                    FFprobe ffprobe = new FFprobe(ffprobePath);
                    FFmpegProbeResult probeResult = ffprobe.probe(videoPath);

                    FFmpegFormat format = probeResult.getFormat();
                    durationInSeconds = (long) format.duration;
                    log.info("File: {} ; Format: {} ; Duration: {}",
                            format.filename,
                            format.format_long_name,
                            format.duration
                    );

                    FFmpegStream stream = probeResult.getStreams().get(0);
                    log.info("Codec: {} ; Width: {} ; Height: {}",
                            stream.codec_long_name,
                            stream.width,
                            stream.height
                    );
                //}
                return durationInSeconds;
            } catch (IOException exception) {
                log.error(exception.getMessage());
                throw new IOException("Could not find ffprobe on the system");
            } catch (Exception exception) {
                log.error(exception.getMessage());
                throw new Exception("An error occurred while using ffmpeg");
            }
            // Delete the temporary file
            //Files.deleteIfExists(Paths.get(tempFilePath));
    }

    /**
     * check if video has category
     * @param videoId the video id
     * @return true if video has an associated category, else false
     */
    private boolean hasCategory(Long videoId) {
        int count = jdbcTemplate.queryForObject(SELECT_VIDEO_CATEGORY_COUNT_QUERY, Map.of("videoId", videoId), Integer.class);
        return count > 0;
    }

    /**
     * Generate a videoURI
     * @param random
     * @param extension
     * @return
     */
    private String generateVideoUrl(String random, String extension) {
        String file = random + extension;
        return ServletUriComponentsBuilder.fromCurrentContextPath().path(API_VERSION + "video/watch/"+random)
                //.queryParam("v", file)
                .toUriString();
    }

    /**
     * generate server gif uri path
     * @param fileName the gif fileName
     * @return the gif url
     */
    private String generateGifUrl(String fileName) {
        return ServletUriComponentsBuilder.fromCurrentContextPath().path(API_VERSION + "video/gif")
                .queryParam("v", fileName)
                .toUriString();
    }

    /**
     * generate a server thumbnail uri path
     * @param thumbnailFiles the files
     * @return the list of thumbnail urls
     */
    private List<String> generateThumbnailUrls(List<String> thumbnailFiles) {
        List<String> serverPaths = new ArrayList<>();
        for(String fileName : thumbnailFiles) {
            serverPaths.add(
                    ServletUriComponentsBuilder.fromCurrentContextPath().path(API_VERSION + "video/thumbnail")
                            .queryParam("t", fileName)
                            .toUriString()
            );
        }
        return serverPaths;
    }

}
