package com.project.youtube.service.impl;

import com.project.youtube.dao.impl.TagsDaoImpl;
import com.project.youtube.model.Tag;
import com.project.youtube.service.TagService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class TagServiceImpl implements TagService {
    private final TagsDaoImpl tagsDao;

    /**
     * get tag by id
     * @param id the id
     * @return the tag
     */
    @Override
    public Tag get(Long id) {
        return tagsDao.get(id);
    }

    /**
     * get tag by name
     * @param name the tag name
     * @return the List of tags
     */
    @Override
    public List<Tag> getByName(String name) {
        return tagsDao.getByName(name);
    }

    /**
     * get video tags
     * @param videoId the video id
     * @return the list of tags
     */
    @Override
    public List<Tag> getByVideoId(Long videoId) {
        return tagsDao.getByVideoId(videoId);
    }

    /**
     * create a video tag
     * @param videoId the video id
     * @param tagName the list of tag names
     * @return
     */
    @Override
    public List<Tag> createVideoTag(Long videoId, List<String> tagName) {
        List<Tag> tags = new ArrayList<>();
        tagName.forEach(name -> {
            Tag tag = tagsDao.createVideoTag(videoId, name.trim());
            tags.add(tag);
        });
        return tags;
    }

    /**
     * delete all video tags
     * @param videoId the video id
     */
    @Override
    public void deleteVideoTags(Long videoId) {
        tagsDao.deleteVideoTags(videoId);
    }

    /**
     * delete the video tag by tag id
     * @param videoId the video id
     * @param tagId the tag id
     */
    @Override
    public void deleteVideoTagByTagId(Long videoId, Long tagId) {
        tagsDao.deleteVideoTagByTagId(videoId, tagId);
    }
}
