package io.github.jhipster.masterloanforms.service.impl;

import io.github.jhipster.masterloanforms.service.FormQuestionService;
import io.github.jhipster.masterloanforms.domain.FormQuestion;
import io.github.jhipster.masterloanforms.repository.FormQuestionRepository;
import io.github.jhipster.masterloanforms.repository.search.FormQuestionSearchRepository;
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
 * Service Implementation for managing FormQuestion.
 */
@Service
@Transactional
public class FormQuestionServiceImpl implements FormQuestionService {

    private final Logger log = LoggerFactory.getLogger(FormQuestionServiceImpl.class);

    private final FormQuestionRepository formQuestionRepository;

    private final FormQuestionSearchRepository formQuestionSearchRepository;

    public FormQuestionServiceImpl(FormQuestionRepository formQuestionRepository, FormQuestionSearchRepository formQuestionSearchRepository) {
        this.formQuestionRepository = formQuestionRepository;
        this.formQuestionSearchRepository = formQuestionSearchRepository;
    }

    /**
     * Save a formQuestion.
     *
     * @param formQuestion the entity to save
     * @return the persisted entity
     */
    @Override
    public FormQuestion save(FormQuestion formQuestion) {
        log.debug("Request to save FormQuestion : {}", formQuestion);
        FormQuestion result = formQuestionRepository.save(formQuestion);
        formQuestionSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the formQuestions.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<FormQuestion> findAll() {
        log.debug("Request to get all FormQuestions");
        return formQuestionRepository.findAll();
    }



    /**
     *  get all the formQuestions where CustomerForm is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<FormQuestion> findAllWhereCustomerFormIsNull() {
        log.debug("Request to get all formQuestions where CustomerForm is null");
        return StreamSupport
            .stream(formQuestionRepository.findAll().spliterator(), false)
            .filter(formQuestion -> formQuestion.getCustomerForm() == null)
            .collect(Collectors.toList());
    }

    /**
     * Get one formQuestion by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<FormQuestion> findOne(Long id) {
        log.debug("Request to get FormQuestion : {}", id);
        return formQuestionRepository.findById(id);
    }

    /**
     * Delete the formQuestion by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete FormQuestion : {}", id);
        formQuestionRepository.deleteById(id);
        formQuestionSearchRepository.deleteById(id);
    }

    /**
     * Search for the formQuestion corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<FormQuestion> search(String query) {
        log.debug("Request to search FormQuestions for query {}", query);
        return StreamSupport
            .stream(formQuestionSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
