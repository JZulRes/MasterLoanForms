package io.github.jhipster.masterloanforms.service.impl;

import io.github.jhipster.masterloanforms.service.QuestionService;
import io.github.jhipster.masterloanforms.domain.Question;
import io.github.jhipster.masterloanforms.repository.QuestionRepository;
import io.github.jhipster.masterloanforms.repository.search.QuestionSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Question.
 */
@Service
@Transactional
public class QuestionServiceImpl implements QuestionService {

    private final Logger log = LoggerFactory.getLogger(QuestionServiceImpl.class);

    private final QuestionRepository questionRepository;

    private final QuestionSearchRepository questionSearchRepository;

    public QuestionServiceImpl(QuestionRepository questionRepository, QuestionSearchRepository questionSearchRepository) {
        this.questionRepository = questionRepository;
        this.questionSearchRepository = questionSearchRepository;
    }

    /**
     * Save a question.
     *
     * @param question the entity to save
     * @return the persisted entity
     */
    @Override
    public Question save(Question question) {
        log.debug("Request to save Question : {}", question);
        Question result = questionRepository.save(question);
        questionSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the questions.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Question> findAll() {
        log.debug("Request to get all Questions");
        return questionRepository.findAll();
    }


    /**
     * Get one question by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Question> findOne(Long id) {
        log.debug("Request to get Question : {}", id);
        return questionRepository.findById(id);
    }

    /**
     * Delete the question by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Question : {}", id);
        questionRepository.deleteById(id);
        questionSearchRepository.deleteById(id);
    }

    /**
     * Search for the question corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Question> search(String query) {
        log.debug("Request to search Questions for query {}", query);
        return StreamSupport
            .stream(questionSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
