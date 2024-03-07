package com.project.youtube.dtomapper;

import com.project.youtube.dto.PlaylistDto;
import com.project.youtube.model.Playlist;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class PlaylistDTOMapper {

    public static PlaylistDto toPlaylistDto(Playlist playList) {
        PlaylistDto playlistDto = new PlaylistDto();
        BeanUtils.copyProperties(playList, playlistDto);
        return playlistDto;
    }
}
