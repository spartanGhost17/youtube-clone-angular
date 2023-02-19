package com.project.youtube;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication//(scanBasePackages = "com.project.youtube.backend")
public class YoutubeCloneApplication {
	public static void main(String[] args) {
		SpringApplication.run(YoutubeCloneApplication.class, args);
	}
}
