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
