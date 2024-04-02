package com.project.youtube.service;

import com.project.youtube.dto.VideoDto;
import com.project.youtube.form.UpdateVideoMetadataForm;
import com.project.youtube.model.Category;
import com.project.youtube.model.Status;
import com.project.youtube.model.VideoThumbnail;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;

import java.util.List;

public interface VideoService {
    VideoDto uploadVideo(MultipartFile multipartFile, Long userId);
    VideoDto updateVideoMetadata(UpdateVideoMetadataForm updateVideoMetadataForm);
    String uploadVideoThumbnail(MultipartFile thumbnailImage, Long videoId);
    Mono<ResponseEntity<Resource>> streamVideo2(String fileName);
    Mono<ResponseEntity<ResourceRegion>> streamVideo3(String fileName, HttpHeaders reqHeaders,  String defaultFolder);
    Mono<ResponseEntity<Resource>> streamVideoABR(String videoFileName, String abrFile);
    Long getLikeCount(VideoDto videoDto);
    List<VideoThumbnail> getThumbnails(Long videoId);
    byte[] getThumbnail(String fileName);
    VideoDto getVideoMetadataById(Long id);
    List<VideoDto> getAllByUserId(Long userId, Integer pageSize, Integer offset);
    Category getVideoCategory(Long videoId);
    Long videoCount(Long userId);
    Status updateVideoStatus(Long videoId, Long statusId);
    void delete(Long videoId, Long userId);
}
