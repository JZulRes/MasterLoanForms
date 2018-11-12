package io.github.jhipster.masterloanforms.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.masterloanforms.domain.CustomerForm;
import io.github.jhipster.masterloanforms.service.CustomerFormService;
import io.github.jhipster.masterloanforms.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.masterloanforms.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing CustomerForm.
 */
@RestController
@RequestMapping("/api")
public class CustomerFormResource {

    private final Logger log = LoggerFactory.getLogger(CustomerFormResource.class);

    private static final String ENTITY_NAME = "masterLoanFormsCustomerForm";

    private final CustomerFormService customerFormService;

    public CustomerFormResource(CustomerFormService customerFormService) {
        this.customerFormService = customerFormService;
    }

    /**
     * POST  /customer-forms : Create a new customerForm.
     *
     * @param customerForm the customerForm to create
     * @return the ResponseEntity with status 201 (Created) and with body the new customerForm, or with status 400 (Bad Request) if the customerForm has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/customer-forms")
    @Timed
    public ResponseEntity<CustomerForm> createCustomerForm(@RequestBody CustomerForm customerForm) throws URISyntaxException {
        log.debug("REST request to save CustomerForm : {}", customerForm);
        if (customerForm.getId() != null) {
            throw new BadRequestAlertException("A new customerForm cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CustomerForm result = customerFormService.save(customerForm);
        return ResponseEntity.created(new URI("/api/customer-forms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /customer-forms : Updates an existing customerForm.
     *
     * @param customerForm the customerForm to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated customerForm,
     * or with status 400 (Bad Request) if the customerForm is not valid,
     * or with status 500 (Internal Server Error) if the customerForm couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/customer-forms")
    @Timed
    public ResponseEntity<CustomerForm> updateCustomerForm(@RequestBody CustomerForm customerForm) throws URISyntaxException {
        log.debug("REST request to update CustomerForm : {}", customerForm);
        if (customerForm.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CustomerForm result = customerFormService.save(customerForm);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, customerForm.getId().toString()))
            .body(result);
    }

    /**
     * GET  /customer-forms : get all the customerForms.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of customerForms in body
     */
    @GetMapping("/customer-forms")
    @Timed
    public List<CustomerForm> getAllCustomerForms() {
        log.debug("REST request to get all CustomerForms");
        return customerFormService.findAll();
    }

    /**
     * GET  /customer-forms/:id : get the "id" customerForm.
     *
     * @param id the id of the customerForm to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the customerForm, or with status 404 (Not Found)
     */
    @GetMapping("/customer-forms/{id}")
    @Timed
    public ResponseEntity<CustomerForm> getCustomerForm(@PathVariable Long id) {
        log.debug("REST request to get CustomerForm : {}", id);
        Optional<CustomerForm> customerForm = customerFormService.findOne(id);
        return ResponseUtil.wrapOrNotFound(customerForm);
    }

    /**
     * DELETE  /customer-forms/:id : delete the "id" customerForm.
     *
     * @param id the id of the customerForm to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/customer-forms/{id}")
    @Timed
    public ResponseEntity<Void> deleteCustomerForm(@PathVariable Long id) {
        log.debug("REST request to delete CustomerForm : {}", id);
        customerFormService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/customer-forms?query=:query : search for the customerForm corresponding
     * to the query.
     *
     * @param query the query of the customerForm search
     * @return the result of the search
     */
    @GetMapping("/_search/customer-forms")
    @Timed
    public List<CustomerForm> searchCustomerForms(@RequestParam String query) {
        log.debug("REST request to search CustomerForms for query {}", query);
        return customerFormService.search(query);
    }

}
