package com.project.youtube.service;

import com.project.youtube.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import com.project.youtube.model.Video;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class VideoService {

    //auto-wire
    @Autowired
    private final S3Service s3Service;
    @Autowired
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
