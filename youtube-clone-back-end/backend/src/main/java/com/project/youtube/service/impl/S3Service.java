package com.project.youtube.service.impl;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
//import com.project.youtube.service.FileService;
import com.project.youtube.service.FileService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor //generates a construnctors with required args like non-null, final etc.
public class S3Service implements FileService {

    public static final String BUCKET_NAME = "youtubevideostorage1";
    @Autowired
    private final AmazonS3Client amazonS3Client;

    private static final Logger LOGGER = LoggerFactory.getLogger(S3Service.class);

    /**
     * Uploads file to AWS S3
     * @param file
     * @return
     */
    @Override
    public String uploadFile(MultipartFile file){
        LOGGER.info("Enterring uploadFile in com.project.youtube.service.impl.S3Service");
        // Upload File to AWSS3
        // Prepare a unique key for a file to upload to aws s3
        var filenameExtension = StringUtils.getFilenameExtension(file.getOriginalFilename());
        //create UUID to get a unique string associated with extension
        var key = UUID.randomUUID().toString() +"."+ filenameExtension;

        var metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        metadata.setContentType(file.getContentType());
        try {
            LOGGER.info("Uploading file to S3 bucket: "+BUCKET_NAME+" com.project.youtube.service.impl.S3Service");
            amazonS3Client.putObject(BUCKET_NAME, key, file.getInputStream(), metadata);
        } catch (IOException e) {
            LOGGER.error("Could not upload file to S3 bucket: "+BUCKET_NAME+" with exception \n"+e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An exception occurred while attempting to upload this file");
        }
        //allow to read file publicly without need for authentication
        amazonS3Client.setObjectAcl(BUCKET_NAME, key, CannedAccessControlList.PublicRead);
        LOGGER.info("Leaving uploadFile in com.project.youtube.service.impl.S3Service");
        return amazonS3Client.getResourceUrl(BUCKET_NAME, key);
    }
}
