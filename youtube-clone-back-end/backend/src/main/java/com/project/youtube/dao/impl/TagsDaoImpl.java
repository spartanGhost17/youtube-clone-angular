package com.project.youtube.dao.impl;

import com.project.youtube.Exception.APIException;
import com.project.youtube.dao.TagsDao;
import com.project.youtube.model.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.checkerframework.checker.nullness.qual.RequiresNonNull;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;

import static com.project.youtube.query.TagQuery.*;
import static java.util.Objects.requireNonNull;

@Service
@RequiredArgsConstructor
@Slf4j
public class TagsDaoImpl implements TagsDao<Tag> {
    private final NamedParameterJdbcTemplate jdbcTemplate;

    /**
     * get the tag by id
     * @param id the tag id
     * @return the tag
     */
    @Override
    public Tag get(Long id) {
        try {
            return jdbcTemplate.queryForObject(SELECT_TAG_BY_ID_QUERY, Map.of("id", id), new BeanPropertyRowMapper<>(Tag.class));
        } catch (EmptyResultDataAccessException exception) {
            throw new APIException("Could not find tag");
        } catch (Exception exception) {
            throw new APIException("An error occurred while retrieving the tag.");
        }
    }

    /**
     * get tag by name
     * @param name the tag name
     * @return the list of tags with the same name
     */
    @Override
    public List<Tag> getByName(String name) {
        try {
            return jdbcTemplate.query(SELECT_TAG_BY_NAME_QUERY, Map.of("tagName", name), new BeanPropertyRowMapper<>(Tag.class));
        } catch (Exception exception) {
            throw new APIException("An error occurred while retrieving the tags by name "+name+".");
        }
    }

    /**
     * create a tag
     * @param name the tag name
     */
    @Override
    public Tag create(String name) {
        try {

            MapSqlParameterSource parameterSource = new MapSqlParameterSource();
            parameterSource.addValue("tagName", name);
            KeyHolder keyHolder = new GeneratedKeyHolder();
            jdbcTemplate.update(INSERT_TAG_QUERY, parameterSource, keyHolder);
            Tag tag = new Tag();
            tag.setTagName(name);
            tag.setId(requireNonNull(keyHolder.getKey().longValue()));
            return tag;
        } catch (Exception exception) {
            throw new APIException("An error occurred while creating tag");
        }
    }

    /**
     * add video tag to video
     * @param videoId the video id
     * @param tagName the tag id
     * @return the inserted tag
     */
    @Override
    public Tag createVideoTag(Long videoId, String tagName) {
        try {
            Tag tag = create(tagName);
            jdbcTemplate.update(INSERT_VIDEO_TAG_QUERY, Map.of("videoId", videoId, "tagId", tag.getId()));
            return tag;
        } catch (Exception exception) {
            throw new APIException("An error occurred while creating tag for video");
        }
    }

    /**
     * get list of tag associated with a video
     * @param videoId the video id
     * @return the list of tags
     */
    @Override
    public List<Tag> getByVideoId(Long videoId) {
        try {
            return jdbcTemplate.query(SELECT_VIDEO_TAGS_QUERY, Map.of("videoId", videoId), new BeanPropertyRowMapper<>(Tag.class));
        } catch (Exception exception) {
            throw new APIException("An error occurred while finding the video tags");
        }
    }

    /**
     * delete tag
     * @param id the tag id
     */
    @Override
    @Transactional
    public void delete(Long id) {
        try {
            jdbcTemplate.update(DELETE_TAG_QUERY, Map.of("id", id));
        } catch (Exception exception) {
            throw new APIException("An error occurred while deleting tag");
        }
    }

    /**
     * delete all tags associated with a video
     * @param videoId the video id
     */
    @Override
    @Transactional
    public void deleteVideoTags(Long videoId) {
        try {
            List<Tag> tags = getByVideoId(videoId);
            jdbcTemplate.update(DELETE_VIDEO_TAGS_QUERY, Map.of("videoId", videoId));
            tags.forEach(tag -> delete(tag.getId()));
        } catch (Exception exception) {
            throw new APIException("An error occurred while deleting all video tags");
        }
    }

    /**
     * delete single video tag
     * @param videoId the video id
     * @param tagId the tag id
     */
    @Override
    @Transactional
    public void deleteVideoTagByTagId(Long videoId, Long tagId) {
        try {
            jdbcTemplate.update(DELETE_SINGLE_VIDEO_TAG_QUERY, Map.of("videoId", videoId, "tagId", tagId));
            delete(tagId);
        } catch (Exception exception) {
            throw new APIException("An error occurred while deleting the video tag");
        }
    }
}
