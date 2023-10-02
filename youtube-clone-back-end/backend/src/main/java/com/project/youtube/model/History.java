package com.project.youtube.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(value = "History") //this is a mongodb document 'equivalent of SQL table'
@Data
@EntityScan
@NoArgsConstructor
@AllArgsConstructor
public class History {


}
