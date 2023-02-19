package service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor //generates a construnctors with required args like non-null, final etc.
public class S3Service implements FileService{

    public static final String BUCKET_NAME = "youtubeproject1";
    private final AmazonS3Client amazonS3Client;

    /**
     * Uploads file to AWS S3
     * @param file
     * @return
     */
    @Override
    public String uploadFile(MultipartFile file){
        // Upload File to AWSS3
        // Prepare a unique key for a file to upload to aws s3
        var filenameExtension = StringUtils.getFilenameExtension(file.getOriginalFilename());
        //create UUID to get a unique string associated with extension
        var key = UUID.randomUUID().toString() + filenameExtension;

        var metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        metadata.setContentType(file.getContentType());
        try {
            amazonS3Client.putObject(BUCKET_NAME, key, file.getInputStream(), metadata);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An exception occurred while attempting to upload this file");
        }
        //allow to read file publicly without need for authentication
        amazonS3Client.setObjectAcl(BUCKET_NAME, key, CannedAccessControlList.PublicRead);
        return amazonS3Client.getResourceUrl(BUCKET_NAME, key);
    }
}
