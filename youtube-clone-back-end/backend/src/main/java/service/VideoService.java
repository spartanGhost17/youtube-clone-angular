package service;

import lombok.RequiredArgsConstructor;
import model.Video;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import repository.VideoRepository;

@Service
@RequiredArgsConstructor
public class VideoService {

    //auto-wire
    private final S3Service s3Service;
    private final VideoRepository videoRepository;

    public void uploadVideo(MultipartFile multipartFile){
        // Upload file to AWS S3
        // Save Video Data to MongoDB DataBase
        String videoURL = s3Service.uploadFile(multipartFile);//get video URL from s3 call
        Video video = new Video();
        video.setVideoUrl(videoURL);
        videoRepository.save(video);//save to mongoDB
    }

}
