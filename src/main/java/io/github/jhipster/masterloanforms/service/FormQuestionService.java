package io.github.jhipster.masterloanforms.service;

import io.github.jhipster.masterloanforms.domain.FormQuestion;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing FormQuestion.
 */
public interface FormQuestionService {

    /**
     * Save a formQuestion.
     *
     * @param formQuestion the entity to save
     * @return the persisted entity
     */
    FormQuestion save(FormQuestion formQuestion);

    /**
     * Get all the formQuestions.
     *
     * @return the list of entities
     */
    List<FormQuestion> findAll();
    /**
     * Get all the FormQuestionDTO where CustomerForm is null.
     *
     * @return the list of entities
     */
    List<FormQuestion> findAllWhereCustomerFormIsNull();


    /**
     * Get the "id" formQuestion.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<FormQuestion> findOne(Long id);

    /**
     * Delete the "id" formQuestion.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the formQuestion corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<FormQuestion> search(String query);
}
