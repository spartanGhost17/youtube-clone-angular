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
import java.util.concurrent.TimeUnit;

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
            String folderName = fileName.split("_")[0];
            return Files.readAllBytes(Paths.get(System.getProperty("user.home") + VIDEO_THUMBNAILS_DEFAULT_FOLDER + "/" + folderName + "/" + fileName));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


    /**
     * upload video
     * @param video the video
     * @param randomId the uuid
     */
    public String saveVideo(MultipartFile video, String randomId) {
        //String uploadUrl;
        Path fileStorageLocation = Paths.get(System.getProperty("user.home") + VIDEOS_DEFAULT_FOLDER+"/"+randomId).toAbsolutePath().normalize();
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

            //TODO: COPY TO MP4 First then Fragment the file to make it streamable
            //ffmpeg -i trailer_1080p.mov -c:v copy -c:a copy bunny.mp4
            //ffmpeg -i non_fragmented.mp4 -movflags frag_keyframe+empty_moov+default_base_moof fragmented.mp4
            //https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API/Transcoding_assets_for_MSE

            // Save the MultipartFile to a temporary file
            File tempFile = File.createTempFile(fileStorageLocation.toString(),"temp"+ extension);
            video.transferTo(tempFile);

            // Specify the output file
            String videoCopyFile = "temporary_copy.mp4";
            String videoFragmentedFile = randomId + ".mp4";

            String videoCopyOutputFile = Paths.get(System.getProperty("user.home") + VIDEOS_DEFAULT_FOLDER+"/"+randomId+"/"+videoCopyFile).toAbsolutePath().normalize().toString();

            log.info("Start of copying video file to {}",videoCopyOutputFile);
            // Build and execute the first ffmpeg command
            ProcessBuilder processBuilder1 = new ProcessBuilder(
                    "ffmpeg",
                    "-i", tempFile.getAbsolutePath(),
                    "-c:v", "copy",
                    "-c:a", "copy",
                    videoCopyOutputFile
            );
            Process process1 = processBuilder1.start();

            BufferedReader errorReader = new BufferedReader(new InputStreamReader(process1.getErrorStream()));
            String line;
            while ((line = errorReader.readLine()) != null) {
                log.info(line); // or log it
            }

            process1.waitFor();
            process1.destroy();

            // Clean up the temporary file
            tempFile.delete();

            //generate dash files & manifest
            Path videoCopyPath = Paths.get(System.getProperty("user.home") + VIDEOS_DEFAULT_FOLDER+"/"+randomId).toAbsolutePath().normalize();
            File videoPath = new File(videoCopyPath.toFile(), videoCopyFile);

            String manifestOutput = Paths.get(System.getProperty("user.home") + VIDEOS_DEFAULT_FOLDER+"/"+randomId+"/adaptive.mpd").toAbsolutePath().normalize().toString();

            log.info("Manifest will be generated at {}",manifestOutput);
            // Build and execute the second ffmpeg command
            ProcessBuilder processBuilder2 = new ProcessBuilder(
                    "ffmpeg",
                    "-v", "error",
                    "-y",
                    "-i", videoPath.getAbsolutePath(),
                    "-filter_complex", "[0:v]fps=30,split=3[720_in][480_in][240_in];[720_in]scale=-2:720[720_out];[480_in]scale=-2:480[480_out];[240_in]scale=-2:240[240_out]",
                    "-map", "[720_out]",
                    "-map", "[480_out]",
                    "-map", "[240_out]",
                    "-map", "0:a",
                    "-b:v:0", "3500k",
                    "-maxrate:v:0", "3500k",
                    "-bufsize:v:0", "3500k",
                    "-b:v:1", "1690k",
                    "-maxrate:v:1", "1690k",
                    "-bufsize:v:1", "1690k",
                    "-b:v:2", "326k",
                    "-maxrate:v:2", "326k",
                    "-bufsize:v:2", "326k",
                    "-b:a:0", "128k",
                    "-x264-params", "keyint=60:min-keyint=60:scenecut=0",
                    "-hls_playlist", "1",
                    "-hls_master_name", MANIFEST_NAME_HLS,
                    "-seg_duration", "2",
                    MANIFEST_NAME_MPD
            );
            // Set the working directory
            processBuilder2.directory(fileStorageLocation.toFile());
            processBuilder2.redirectErrorStream(true);

            Process process2 = processBuilder2.start();
            BufferedReader errorReader2 = new BufferedReader(new InputStreamReader(process2.getErrorStream()));
            String line2;
            while ((line2 = errorReader2.readLine()) != null) {
                log.info(line2); // or log it
            }
            process2.waitFor(1, TimeUnit.MINUTES);
            process2.destroy();


            //fragment the mp4
            File nonFragmentedFile = new File(fileStorageLocation.toFile(), videoCopyFile);
            File fragmentedFile = new File(fileStorageLocation.toFile(), videoFragmentedFile);

            // Build and execute the first ffmpeg command
            ProcessBuilder processBuilder3 = new ProcessBuilder(
                    "ffmpeg",
                    "-i", nonFragmentedFile.getAbsolutePath(),
                    "-movflags", "frag_keyframe+empty_moov+default_base_moof",
                    fragmentedFile.getAbsolutePath()
            );
            Process process3 = processBuilder3.start();

            BufferedReader errorReader3 = new BufferedReader(new InputStreamReader(process3.getErrorStream()));
            String line3;
            while ((line3 = errorReader3.readLine()) != null) {
                log.info(line3); // or log it
            }

            process3.waitFor();
            process3.destroy();

            nonFragmentedFile.delete();

            return randomId;
        } catch (IOException exception) {
            throw new RuntimeException(exception);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * delete video
     * @param folderName the folder name
     */
    public void deleteVideo(String folderName) {
        log.info("video folder to delete {}",folderName);
        Path fileStorageLocation = Paths.get(System.getProperty("user.home") + VIDEOS_DEFAULT_FOLDER+"/"+folderName).toAbsolutePath().normalize();
        log.info("Try to delete the video {}", fileStorageLocation);
        try {
            boolean success = deleteDirectory(fileStorageLocation.toFile());
            if (success) {
                log.info("Video Folder deleted successfully.");
            } else {
                log.info("Error deleting the folder.");
            }
        } catch (Exception exception) {
            throw new RuntimeException(exception);
        }
    }

    /**
     * delete the folder including files
     * @param directoryToBeDeleted the directory to delete
     * @return true if deleted successfully
     */
    private boolean deleteDirectory(File directoryToBeDeleted) {
        File[] allContents = directoryToBeDeleted.listFiles();
        if (allContents != null) {
            for (File file : allContents) {
                deleteDirectory(file);
            }
        }
        return directoryToBeDeleted.delete();
    }

    /**
     * delete thumbnails
     * @param fileName the file name
     */
    public void deleteThumbnails(String fileName) {
        String folderName = fileName.split("_")[0];
        Path fileStorageLocation = Paths.get(System.getProperty("user.home") + VIDEO_THUMBNAILS_DEFAULT_FOLDER + "/" + folderName).toAbsolutePath().normalize();

        try {
            boolean success = deleteDirectory(fileStorageLocation.toFile());
            if (success) {
                log.info("Thumbnail Folder deleted successfully.");
            } else {
                log.info("Error deleting Thumbnail the folder.");
            }
        } catch (Exception exception) {
            throw new RuntimeException(exception);
        }
    }

    /**
     * delete gif
     * @param fileName the file name
     */
    public void deleteGif(String fileName) {
        String folderName = fileName.split("\\.")[0];
        Path fileStorageLocation = Paths.get(System.getProperty("user.home") + GIFS_DEFAULT_FOLDER + "/" + folderName).toAbsolutePath().normalize();
        log.info("Try to delete the video folder {}", fileStorageLocation);
        try {
            boolean success = deleteDirectory(fileStorageLocation.toFile());
            if (success) {
                log.info("Gif Folder deleted successfully.");
            } else {
                log.info("Error deleting Gif the folder.");
            }
        } catch (Exception exception) {
            throw new RuntimeException(exception);
        }
    }



    /**
     * save a 10 seconds version of the uploaded video
     * @param videoFileName the file name
     * @param extension the video extension
     * @param videoLengthInSeconds the video length
     * @return the file name
     */
    public String saveGif(String videoFileName, String extension, Long videoLengthInSeconds) {
        String videoFolderName = videoFileName;
        Path gifStorageLocation = Paths.get(System.getProperty("user.home") + GIFS_DEFAULT_FOLDER + "/" + videoFolderName).toAbsolutePath().normalize();
        Path videoFileLocation = Paths.get(System.getProperty("user.home") + VIDEOS_DEFAULT_FOLDER + "/" + videoFolderName).toAbsolutePath().normalize();
        File videoFile = videoFileLocation.resolve(videoFolderName + extension).toFile();
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
            String fileName = videoFileName + ".mp4";
            File gifFile = gifStorageLocation.resolve(fileName).toFile();
            log.info("Creating 10 seconds clip for video {}",videoFile.getAbsolutePath());

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
                        "-map", "[v]",
                        "-movflags", "frag_keyframe+empty_moov+default_base_moof", // Fragment the output
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
     * @param videoFolderName the video filename
     * @param extension the video extension
     * @param videoLength the video length
     * @throws Exception the exception
     */
    public List<String> extractThumbnails(String videoFolderName, String extension, long videoLength) throws Exception {
        List<String> thumbnailFileNames = new ArrayList<>();

        Path thumbnailStorageLocation = Paths.get(System.getProperty("user.home") + VIDEO_THUMBNAILS_DEFAULT_FOLDER + "/" + videoFolderName).toAbsolutePath().normalize();
        Path videoFileLocation = Paths.get(System.getProperty("user.home") + VIDEOS_DEFAULT_FOLDER + "/" + videoFolderName).toAbsolutePath().normalize();
        File videoFile = videoFileLocation.resolve(videoFolderName + extension).toFile();

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
            String thumbnailName = String.format("%s_thumbnail_%d.jpg", videoFolderName, i + 1);
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
