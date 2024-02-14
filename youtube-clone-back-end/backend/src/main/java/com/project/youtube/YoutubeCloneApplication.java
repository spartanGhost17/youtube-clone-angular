package com.project.youtube;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })//(scanBasePackages = "com.project.youtube.backend")
public class YoutubeCloneApplication {
	public static void main(String[] args) {
		SpringApplication.run(YoutubeCloneApplication.class, args);
	}
}
