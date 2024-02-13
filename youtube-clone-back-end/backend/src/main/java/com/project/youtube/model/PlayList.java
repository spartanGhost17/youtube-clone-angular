package com.project.youtube.model;

import com.project.youtube.enumaration.VisibilityStatus;
import lombok.*;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.annotation.Id;

import java.util.List;

//@Document(value="PlayList")
@Data
@EntityScan
@AllArgsConstructor
@NoArgsConstructor
public class PlayList {
    @Id
    private String id;
    private String title;
    private List<String> videoIds;
    private String description;
    private VisibilityStatus visibilityStatus;
}
