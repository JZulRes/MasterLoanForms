package io.github.jhipster.masterloanforms.service.impl;

import io.github.jhipster.masterloanforms.service.LoanFeeService;
import io.github.jhipster.masterloanforms.domain.LoanFee;
import io.github.jhipster.masterloanforms.repository.LoanFeeRepository;
import io.github.jhipster.masterloanforms.repository.search.LoanFeeSearchRepository;
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
 * Service Implementation for managing LoanFee.
 */
@Service
@Transactional
public class LoanFeeServiceImpl implements LoanFeeService {

    private final Logger log = LoggerFactory.getLogger(LoanFeeServiceImpl.class);

    private final LoanFeeRepository loanFeeRepository;

    private final LoanFeeSearchRepository loanFeeSearchRepository;

    public LoanFeeServiceImpl(LoanFeeRepository loanFeeRepository, LoanFeeSearchRepository loanFeeSearchRepository) {
        this.loanFeeRepository = loanFeeRepository;
        this.loanFeeSearchRepository = loanFeeSearchRepository;
    }

    /**
     * Save a loanFee.
     *
     * @param loanFee the entity to save
     * @return the persisted entity
     */
    @Override
    public LoanFee save(LoanFee loanFee) {
        log.debug("Request to save LoanFee : {}", loanFee);
        LoanFee result = loanFeeRepository.save(loanFee);
        loanFeeSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the loanFees.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<LoanFee> findAll() {
        log.debug("Request to get all LoanFees");
        return loanFeeRepository.findAll();
    }


    /**
     * Get one loanFee by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<LoanFee> findOne(Long id) {
        log.debug("Request to get LoanFee : {}", id);
        return loanFeeRepository.findById(id);
    }

    /**
     * Delete the loanFee by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete LoanFee : {}", id);
        loanFeeRepository.deleteById(id);
        loanFeeSearchRepository.deleteById(id);
    }

    /**
     * Search for the loanFee corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<LoanFee> search(String query) {
        log.debug("Request to search LoanFees for query {}", query);
        return StreamSupport
            .stream(loanFeeSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
