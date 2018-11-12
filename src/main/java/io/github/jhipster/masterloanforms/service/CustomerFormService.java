package io.github.jhipster.masterloanforms.service;

import io.github.jhipster.masterloanforms.domain.CustomerForm;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing CustomerForm.
 */
public interface CustomerFormService {

    /**
     * Save a customerForm.
     *
     * @param customerForm the entity to save
     * @return the persisted entity
     */
    CustomerForm save(CustomerForm customerForm);

    /**
     * Get all the customerForms.
     *
     * @return the list of entities
     */
    List<CustomerForm> findAll();


    /**
     * Get the "id" customerForm.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CustomerForm> findOne(Long id);

    /**
     * Delete the "id" customerForm.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the customerForm corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<CustomerForm> search(String query);
}
