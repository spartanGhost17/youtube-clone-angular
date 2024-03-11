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
            process.waitFor();
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
