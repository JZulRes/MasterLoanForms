package io.github.jhipster.masterloanforms.service;

import io.github.jhipster.masterloanforms.domain.LoanFee;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing LoanFee.
 */
public interface LoanFeeService {

    /**
     * Save a loanFee.
     *
     * @param loanFee the entity to save
     * @return the persisted entity
     */
    LoanFee save(LoanFee loanFee);

    /**
     * Get all the loanFees.
     *
     * @return the list of entities
     */
    List<LoanFee> findAll();


    /**
     * Get the "id" loanFee.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<LoanFee> findOne(Long id);

    /**
     * Delete the "id" loanFee.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the loanFee corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<LoanFee> search(String query);
}
