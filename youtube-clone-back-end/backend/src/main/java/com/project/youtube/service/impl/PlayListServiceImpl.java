package com.project.youtube.service.impl;

import com.project.youtube.constants.ApplicationConstants;
import com.project.youtube.dto.PlayListDto;
import com.project.youtube.model.PlayList;
import com.project.youtube.model.Video;
import com.project.youtube.repository.PlayListRepository;
import com.project.youtube.service.PlayListService;
import com.project.youtube.service.VideoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

public class PlayListServiceImpl implements PlayListService {
    @Autowired
    private PlayListRepository playListRepository;
    @Autowired
    private VideoService videoService;
    @Autowired
    private ApplicationConstants constants;

    private static final Logger LOGGER = LoggerFactory.getLogger(PlayListServiceImpl.class);

    @Override
    public PlayListDto getPlayList(String playListId) {
        LOGGER.info("Entering getPlayList for playList id: "+playListId);
        PlayList playList = getPlayListById(playListId);
        List<Video> playListVideos = new ArrayList<>();

        for(String videoId : playList.getVideoIds()){
            Video video = this.videoService.getVideoById(videoId);
            playListVideos.add(video);
        }
        return new PlayListDto(playList.getID(), playListVideos);
    }



    @Override
    public PlayList getPlayListById(String playListId) {
        LOGGER.info("Getting user playList for playListId: "+playListId);
        return this.playListRepository.findById(playListId).orElseThrow(()-> {
                LOGGER.error("Could not find playList for playListId: "+playListId);
                return new NoSuchElementException("Could not find playList for for Id "+playListId);
            }
        );
    }

    /**
     * add video in playlist only if playlist doesn't exceed max size
     * @param videoId string videoId
     * @param playLiatId string playlistId
     * @return true if video was added to playlist; else false
     */
    @Override
    public boolean addVideo(String videoId, String playLiatId) {
        PlayList playList = getPlayListById(playLiatId);
        boolean canAddvideo = true;
        if(playList.getVideoIds().size() < this.constants.getPLAYLIST_MAXSIZE()) {
            playList.getVideoIds().add(videoId);
            this.playListRepository.save(playList);
        }
        else{
            canAddvideo = false;
        }
        return canAddvideo;
    }
}
