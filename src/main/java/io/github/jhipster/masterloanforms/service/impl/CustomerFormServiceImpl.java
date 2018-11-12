package io.github.jhipster.masterloanforms.service.impl;

import io.github.jhipster.masterloanforms.service.CustomerFormService;
import io.github.jhipster.masterloanforms.domain.CustomerForm;
import io.github.jhipster.masterloanforms.repository.CustomerFormRepository;
import io.github.jhipster.masterloanforms.repository.search.CustomerFormSearchRepository;
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
 * Service Implementation for managing CustomerForm.
 */
@Service
@Transactional
public class CustomerFormServiceImpl implements CustomerFormService {

    private final Logger log = LoggerFactory.getLogger(CustomerFormServiceImpl.class);

    private final CustomerFormRepository customerFormRepository;

    private final CustomerFormSearchRepository customerFormSearchRepository;

    public CustomerFormServiceImpl(CustomerFormRepository customerFormRepository, CustomerFormSearchRepository customerFormSearchRepository) {
        this.customerFormRepository = customerFormRepository;
        this.customerFormSearchRepository = customerFormSearchRepository;
    }

    /**
     * Save a customerForm.
     *
     * @param customerForm the entity to save
     * @return the persisted entity
     */
    @Override
    public CustomerForm save(CustomerForm customerForm) {
        log.debug("Request to save CustomerForm : {}", customerForm);
        CustomerForm result = customerFormRepository.save(customerForm);
        customerFormSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the customerForms.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CustomerForm> findAll() {
        log.debug("Request to get all CustomerForms");
        return customerFormRepository.findAll();
    }


    /**
     * Get one customerForm by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CustomerForm> findOne(Long id) {
        log.debug("Request to get CustomerForm : {}", id);
        return customerFormRepository.findById(id);
    }

    /**
     * Delete the customerForm by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CustomerForm : {}", id);
        customerFormRepository.deleteById(id);
        customerFormSearchRepository.deleteById(id);
    }

    /**
     * Search for the customerForm corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CustomerForm> search(String query) {
        log.debug("Request to search CustomerForms for query {}", query);
        return StreamSupport
            .stream(customerFormSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
