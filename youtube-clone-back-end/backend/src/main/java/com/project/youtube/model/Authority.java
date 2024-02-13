package com.project.youtube.model;

import lombok.*;
import org.springframework.data.annotation.Id;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Authority {
    //@Id
    //@Generated Value(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    //@ManyToOne
    //@JoinColumn(name = "customer_id")
    private User user;
}
