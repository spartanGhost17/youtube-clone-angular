package com.project.youtube.model;

import com.project.youtube.constants.ApplicationConstants;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(value="PlayList")
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
