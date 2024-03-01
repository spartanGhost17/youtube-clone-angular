package com.project.youtube.controller;

import com.project.youtube.model.HttpResponse;
import com.project.youtube.model.Role;
import com.project.youtube.service.impl.RoleServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.List;
import java.util.Map;

import static com.project.youtube.constants.ApplicationConstants.API_VERSION;

@RestController
@RequestMapping(value = API_VERSION+ "role/")
@RequiredArgsConstructor
public class RoleController {
    private final RoleServiceImpl roleService;

    @GetMapping
    public ResponseEntity<HttpResponse> getRoles() {
        List<Role> roles = roleService.getRoles();
        return new ResponseEntity(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .message("Retrieved roles.")
                        .data(Map.of("roles", roles))
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }

}
