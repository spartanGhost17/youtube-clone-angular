package com.project.youtube.model;

import com.project.youtube.constants.ApplicationConstants;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(value="PlayList")
@EntityScan
@Data
@AllArgsConstructor
@Getter
@Setter
public class PlayList {
    @Id
    private int ID;
    private List<String> videoIds;
}
