package com.project.youtube.service;

import com.project.youtube.dto.PlayListDto;
import com.project.youtube.model.PlayList;

import java.util.List;

public interface PlayListService {
    PlayListDto getPlayList(String playListId);
    PlayList getPlayListById(String playListId);

    boolean addVideo(String videoId, String PlayLiatId);
}
