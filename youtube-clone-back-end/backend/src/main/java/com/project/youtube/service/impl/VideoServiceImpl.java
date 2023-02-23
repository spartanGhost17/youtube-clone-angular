package com.project.youtube.service.impl;

import com.project.youtube.dto.VideoDto;
import com.project.youtube.repository.VideoRepository;
import com.project.youtube.service.VideoService;
import com.project.youtube.service.impl.S3Service;
import lombok.RequiredArgsConstructor;
import com.project.youtube.model.Video;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class VideoServiceImpl implements VideoService {

    //auto-wire
    @Autowired
    private final S3Service s3Service;
    //@Autowired
    private final VideoRepository videoRepository;

    public void uploadVideo(MultipartFile multipartFile){
        // Upload file to AWS S3
        // Save Video Data to MongoDB DataBase
        String videoURL = s3Service.uploadFile(multipartFile);//get video URL from s3 call
        Video video = new Video();
        video.setVideoUrl(videoURL);
        videoRepository.save(video);//save to mongoDB
    }

    /**
     * Update video metadata information in database
     * @param videoDto
     * @return
     */
    public VideoDto updateVideoMetadata(VideoDto videoDto) {
        System.out.println("video id : "+videoDto.getId());
        // find video by videoId
        Video videoToSave = videoRepository.findById(videoDto.getId())
                .orElseThrow(() -> new NoSuchElementException("Cannot retreive video by id: "+videoDto.getId()));

        System.out.println("retreived videoId: "+videoToSave.getId());
        System.out.println("retreived desc: "+videoToSave.getDescription());
        // map videoDto fields to Video POJO
        videoToSave.setTitle(videoDto.getTitle());
        videoToSave.setDescription(videoDto.getDescription());
        videoToSave.setThumbnailURL(videoDto.getThumbnailURL());
        videoToSave.setTags(videoDto.getTags());
        videoToSave.setVideoStatus(videoDto.getVideoStatus());

        // save video to database
        videoRepository.save(videoToSave);
        return videoDto;
    }
}
