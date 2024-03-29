package com.project.youtube.service.impl;

import com.project.youtube.Exception.APIException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import static com.project.youtube.constants.ApplicationConstants.*;

@Service
@AllArgsConstructor
@Slf4j
public class FileUploadTestService {

    /**
     * save user image locally for test development
     * @param image the image the
     * @param username the username
     */
    public void saveImage(MultipartFile image, String username) {
        Path fileStorageLocation = Paths.get(System.getProperty("user.home") + PROFILE_IMAGES_DEFAULT_FOLDER).toAbsolutePath().normalize();
        log.info("Got file path {}", fileStorageLocation);
        if(!Files.exists(fileStorageLocation)) {
            try {
                log.info("creating directory it does not exist");
                Files.createDirectories(fileStorageLocation);
            } catch (Exception exception) {
                log.info("random error");
                log.error(exception.getMessage());
                throw new APIException("Could not create directories to save user profile images");
            }
            log.info("Created image directories");
        }
        try {
            Files.copy(image.getInputStream(), fileStorageLocation.resolve(username+".png"), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException exception) {
            throw new RuntimeException(exception);
        }

        log.info("FIle saved in: {} folder", fileStorageLocation);

    }

    /**
     * get user image from local machine
     * @param fileName the filename
     * @return the image byte array
     */
    public byte[] getProfileImage(String fileName) {
        try {
            return Files.readAllBytes(Paths.get(System.getProperty("user.home") + PROFILE_IMAGES_DEFAULT_FOLDER +"/"+fileName));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * update video thumbnail locally for test development
     * @param image the image the
     * @param randomId the username
     */
    public void updateThumbnail(MultipartFile image, String randomId) {
        Path fileStorageLocation = Paths.get(System.getProperty("user.home") + VIDEO_THUMBNAILS_DEFAULT_FOLDER).toAbsolutePath().normalize();
        log.info("Got file path {}", fileStorageLocation);
        if(!Files.exists(fileStorageLocation)) {
            try {
                log.info("creating directory it does not exist");
                Files.createDirectories(fileStorageLocation);
            } catch (Exception exception) {
                log.error(exception.getMessage());
                throw new APIException("Could not create directories to save user thumbnail images");
            }
            log.info("Created image directories");
        }
        try {
            Files.copy(image.getInputStream(), fileStorageLocation.resolve(randomId+".png"), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException exception) {
            throw new RuntimeException(exception);
        }
        log.info("FIle saved in: {} folder", fileStorageLocation);
    }

    /**
     * get video thumbnail Image
     * @param fileName the file name
     * @return the byte array representing image
     */
    public byte[] getThumbnailImage(String fileName) {
        try {
            return Files.readAllBytes(Paths.get(System.getProperty("user.home") + VIDEO_THUMBNAILS_DEFAULT_FOLDER +"/"+fileName));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


    /**
     * upload video
     * @param video the video
     * @param videoUrl the url
     */
    public String saveVideo(MultipartFile video, String videoUrl) {
        String uploadUrl;
        Path fileStorageLocation = Paths.get(System.getProperty("user.home") + VIDEOS_DEFAULT_FOLDER).toAbsolutePath().normalize();
        log.info("Got file path {}", fileStorageLocation);
        if(!Files.exists(fileStorageLocation)) {
            try {
                log.info("creating directory it does not exist");
                Files.createDirectories(fileStorageLocation);
            } catch (Exception exception) {
                log.error(exception.getMessage());
                throw new APIException("Could not create directories to save video");
            }
            log.info("Created video directories");
        }
        try {
            String extension = getVideoFileExtension(video);
            Path fileName = Paths.get(videoUrl + extension);
            //log.info("Saved video {}",fileName.getFileName().toString());
            uploadUrl = fileName.getFileName().toString();

            //Files.copy(video.getInputStream(), fileStorageLocation.resolve(fileName.getFileName().toString()));
            // Save the video to the specified folder
            File outputFile = new File(fileStorageLocation.toFile(), uploadUrl);
            log.info("Video full path {}", outputFile.getAbsolutePath());

            FileOutputStream outputStream = new FileOutputStream(outputFile);
            outputStream.write(video.getBytes());
            outputStream.close();

            //log.info("FIle saved in: {} folder", fileStorageLocation);
            return uploadUrl;
        } catch (IOException exception) {
            throw new RuntimeException(exception);
        }
    }

    public void deleteVideo(String fileName) {
        Path fileStorageLocation = Paths.get(System.getProperty("user.home") + VIDEOS_DEFAULT_FOLDER).toAbsolutePath().normalize();

        try {
            File file = new File(fileStorageLocation.toFile(), fileName);
            Files.delete(file.toPath());
        } catch (IOException exception) {
            throw new RuntimeException(exception);
        }
    }

    public void deleteThumbnails(String fileName) {
        Path fileStorageLocation = Paths.get(System.getProperty("user.home") + VIDEO_THUMBNAILS_DEFAULT_FOLDER).toAbsolutePath().normalize();

        try {
            File file = new File(fileStorageLocation.toFile(), fileName);
            Files.delete(file.toPath());
        } catch (IOException exception) {
            throw new RuntimeException(exception);
        }
    }

    public void deleteGif(String fileName) {
        Path fileStorageLocation = Paths.get(System.getProperty("user.home") + GIFS_DEFAULT_FOLDER).toAbsolutePath().normalize();

        try {
            File file = new File(fileStorageLocation.toFile(), fileName);
            Files.delete(file.toPath());
        } catch (IOException exception) {
            throw new RuntimeException(exception);
        }
    }



    /**
     * save a 10 seconds version of the uploaded video
     * @param videoFileName the file name
     * @param videoLengthInSeconds the video length
     * @return the file name
     */
    public String saveGif(String videoFileName, Long videoLengthInSeconds) {
        Path gifStorageLocation = Paths.get(System.getProperty("user.home") + GIFS_DEFAULT_FOLDER).toAbsolutePath().normalize();
        Path videoFileLocation = Paths.get(System.getProperty("user.home") + VIDEOS_DEFAULT_FOLDER).toAbsolutePath().normalize();
        File videoFile = videoFileLocation.resolve(videoFileName).toFile();
        if(!Files.exists(gifStorageLocation)) {
            try {
                log.info("creating directory it does not exist");
                Files.createDirectories(gifStorageLocation);
            } catch (Exception exception) {
                log.error(exception.getMessage());
                throw new APIException("Could not create directories to save gifs");
            }
            log.info("Created gifs directories");
        }

        try {
            String randomId = UUID.randomUUID().toString();
            // Define output GIF file randomId+".gif"
            String fileName = randomId + ".mp4";
            File gifFile = gifStorageLocation.resolve(fileName).toFile();
            log.info("Creating 10 seconds clip for video ",videoFile.getAbsolutePath());

            // Define the duration of each scene (in seconds)
            int sceneDuration = 1;

            // Calculate the maximum start timestamp to ensure scenes don't exceed the video length
            long maxStartTimestamp = videoLengthInSeconds - sceneDuration;

            // Initialize random number generator
            Random random = new Random();

            // Generate random start timestamps within the valid range for each scene
            long startTimestamp1 = 0;//random.nextInt((int) maxStartTimestamp + 1);
            long startTimestamp2;
            long startTimestamp3;

            do {
                startTimestamp2 = random.nextInt((int) maxStartTimestamp + 1);
            } while (startTimestamp2 <= startTimestamp1);

            do {
                startTimestamp3 = random.nextInt((int) maxStartTimestamp + 1);
            } while (startTimestamp3 <= startTimestamp2);

            try {

                // Create a ProcessBuilder command to concatenate the segments
                //TODO: Think of making the scene extraction static start=0:end=1 etc.
                ProcessBuilder processBuilder = new ProcessBuilder(
                        "ffmpeg",
                        "-i", videoFile.getAbsolutePath(),
                        "-filter_complex",
                        String.format("[0:v]trim=start=%d:end=%d,setpts=PTS-STARTPTS[v0]; " +
                                "[0:v]trim=start=%d:end=%d,setpts=PTS-STARTPTS[v1]; " +
                                "[0:v]trim=start=%d:end=%d,setpts=PTS-STARTPTS[v2]; " +
                                "[v0][v1][v2]concat=n=3:v=1:a=0[v]", startTimestamp1, (startTimestamp1 + 1), startTimestamp2, (startTimestamp2 + 1), startTimestamp3, (startTimestamp3 + 1)),
                        /*"[0:v]trim=start=0:end=1,setpts=PTS-STARTPTS[v0]; " +
                                "[0:v]trim=start=10:end=11,setpts=PTS-STARTPTS[v1]; " +
                                "[0:v]trim=start=20:end=21,setpts=PTS-STARTPTS[v2]; " +
                                "[v0][v1][v2]concat=n=3:v=1:a=0[v]",*/
                        "-map", "[v]",
                        gifFile.getAbsolutePath()
                );
                Process process = processBuilder.start();
                BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
                String line;
                while ((line = errorReader.readLine()) != null) {
                    log.info(line); // or log it
                }
                process.waitFor();
                log.info("Gif creating process exited with code: {}", process.exitValue());
                process.destroy();
                log.info("saving gif to {} ", gifFile.getAbsolutePath());

                return fileName; //gifFile.getAbsolutePath();
            } catch (Exception exception) {
                throw exception;
            }

        } catch (IOException exception) {
            throw new RuntimeException(exception);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

    }

    /**
     * extract thumbnail on upload
     * @param videoFileName the video filename
     * @param videoLength the video length
     * @throws Exception the exception
     */
    public List<String> extractThumbnails(String videoFileName, long videoLength) throws Exception {
        List<String> thumbnailFileNames = new ArrayList<>();

        Path thumbnailStorageLocation = Paths.get(System.getProperty("user.home") + VIDEO_THUMBNAILS_DEFAULT_FOLDER).toAbsolutePath().normalize();
        Path videoFileLocation = Paths.get(System.getProperty("user.home") + VIDEOS_DEFAULT_FOLDER).toAbsolutePath().normalize();
        File videoFile = videoFileLocation.resolve(videoFileName).toFile();

        if(!Files.exists(thumbnailStorageLocation)) {
            try {
                log.info("creating directory it does not exist");
                Files.createDirectories(thumbnailStorageLocation);
            } catch (Exception exception) {
                log.error(exception.getMessage());
                throw new APIException("Could not create directories to save gifs");
            }
            log.info("Created gifs directories");
        }
        log.info("Extracting thumbnails from video");
        // Define the number of thumbnails you want
        int numberOfThumbnails = 4;
        // Calculate the interval between thumbnails
        long interval = videoLength / (numberOfThumbnails + 1); // Adding 1 to account for the first thumbnail at 0s
        // Generate random ID for output files
        String randomId = UUID.randomUUID().toString();

        // Execute ffmpeg command to extract thumbnails
        for (int i = 0; i < numberOfThumbnails; i++) {
            long timestamp = (i + 1) * interval; // Calculate timestamp for the current thumbnail
            String thumbnailName = String.format("%s_thumbnail_%d.jpg", randomId, i + 1);
            File thumbnailFile = new File(thumbnailStorageLocation.toFile(), thumbnailName);
            thumbnailFileNames.add(thumbnailName);

            ProcessBuilder processBuilder = new ProcessBuilder(
                    "ffmpeg",
                    "-i", videoFile.getAbsolutePath(),
                    "-ss", String.valueOf(timestamp), // Seek to the specified timestamp
                    "-vframes", "1", // Extract one frame
                    "-q:v", "2", // Output quality
                    thumbnailFile.getAbsolutePath()
            );
            Process process = processBuilder.start();

            BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
            String line;
            while ((line = errorReader.readLine()) != null) {
                //log.info(line); // or log it
            }

            process.waitFor();
            log.info("Thumbnail process exited with code: {}", process.exitValue());
            process.destroy();
        }
        return thumbnailFileNames;
    }

    //Files.write(filePath, video.getBytes());
    //Files.write(video.getInputStream(), fileStorageLocation.resolve(videoUrl + "."+extension));//, StandardCopyOption.REPLACE_EXISTING);

    /**
     * get the video file extension
     * @param video the video multipart
     * @return the extension
     */
    public String getVideoFileExtension(MultipartFile video) {
        // Get the original filename
        String originalFilename = video.getOriginalFilename();
        // Get the extension from the original filename
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        return extension;
    }

}
