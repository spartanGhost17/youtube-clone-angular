package com.project.youtube.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.project.youtube.constants.ApplicationConstants.API_VERSION;

@RequestMapping(API_VERSION + "search/")
@RestController
@RequiredArgsConstructor
public class SearchController {
}
