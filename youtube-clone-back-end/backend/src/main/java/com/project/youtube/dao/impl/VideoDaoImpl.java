package com.project.youtube.dao.impl;

import com.project.youtube.Exception.APIException;
import com.project.youtube.dao.VideoDao;
import com.project.youtube.form.UpdateVideoMetadataForm;
import com.project.youtube.model.Video;
import com.project.youtube.service.impl.FileUploadTestService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.bramp.ffmpeg.FFprobe;
import net.bramp.ffmpeg.probe.FFmpegFormat;
import net.bramp.ffmpeg.probe.FFmpegProbeResult;
import net.bramp.ffmpeg.probe.FFmpegStream;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.*;
import java.lang.reflect.Field;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Time;
import java.util.Arrays;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.project.youtube.constants.ApplicationConstants.API_VERSION;
import static com.project.youtube.constants.ApplicationConstants.DEFAULT_VIDEO_TITLE;
import static com.project.youtube.query.VideoQuery.INSERT_VIDEO_QUERY;
import static com.project.youtube.query.VideoQuery.SELECT_VIDEO_BY_ID_QUERY;
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
     * @param userId the logged in user
     * @return the video
     */
    @Override
    public Video create(MultipartFile video, Long userId) {
        try {
            // Generate a random UUID for the video ID
            String randomId = UUID.randomUUID().toString();

            String url = fileUploadTestService.saveVideo(video, randomId);//TODO: replace with amazonS3
            String extension = fileUploadTestService.getVideoFileExtension(video);
            String videoServerUrl = generateVideoUrl(randomId, extension);

            long totalBytes = video.getSize();
            long videoLength = getVideoLength(url);
            //get key
            KeyHolder keyHolder = new GeneratedKeyHolder();

            Map<String, ?> map = Map.of(
                    "userId", userId,
                    "title", DEFAULT_VIDEO_TITLE,
                    "duration", videoLength,
                    "totalBytes", totalBytes,
                    "thumbnailUrl", "adam---4545454",
                    "videoUrl", videoServerUrl
            );

            MapSqlParameterSource params = new MapSqlParameterSource();
            params.addValues(map);
            jdbcTemplate.update(INSERT_VIDEO_QUERY, params, keyHolder);

            log.info("video file: {}, extension: {}, videoServerUrl: {}, totalBytes: {}, videoLength sec: {} sec", url, extension, videoServerUrl, totalBytes, videoLength);

            return getVideo(requireNonNull(keyHolder.getKey().longValue()));
        } catch (Exception exception) {
            try {
                throw new Exception("An error occurred ", exception.getCause());
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
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
     * @param fileName the video file name
     * @return the video milliseconds
     */
    private long getVideoLength(String fileName) throws Exception {

            Path fileStorageLocation = Paths.get(System.getProperty("user.home")+"/Downloads/videos/"+fileName).toAbsolutePath().normalize();
            // Save the uploaded video to a temporary file
            String videoPath = fileStorageLocation.toString();// Change this path to a suitable location
            //video.transferTo(new File(tempFilePath));
            log.info("temp path: {}", videoPath);
            String ffprobeExecutableName = "ffprobe";

            ProcessBuilder processBuilder = new ProcessBuilder("where", ffprobeExecutableName);//find where the ffprobe is on the system
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
     * Generate a videoURI
     * @param random
     * @param extension
     * @return
     */
    private String generateVideoUrl(String random, String extension) {
        String file = random + extension;
        return ServletUriComponentsBuilder.fromCurrentContextPath().path(API_VERSION + "video/watch")
                .queryParam("v", file)
                .toUriString();
    }

}