package io.github.jhipster.masterloanforms.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.masterloanforms.domain.LoanFee;
import io.github.jhipster.masterloanforms.service.LoanFeeService;
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
 * REST controller for managing LoanFee.
 */
@RestController
@RequestMapping("/api")
public class LoanFeeResource {

    private final Logger log = LoggerFactory.getLogger(LoanFeeResource.class);

    private static final String ENTITY_NAME = "masterLoanFormsLoanFee";

    private final LoanFeeService loanFeeService;

    public LoanFeeResource(LoanFeeService loanFeeService) {
        this.loanFeeService = loanFeeService;
    }

    /**
     * POST  /loan-fees : Create a new loanFee.
     *
     * @param loanFee the loanFee to create
     * @return the ResponseEntity with status 201 (Created) and with body the new loanFee, or with status 400 (Bad Request) if the loanFee has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/loan-fees")
    @Timed
    public ResponseEntity<LoanFee> createLoanFee(@RequestBody LoanFee loanFee) throws URISyntaxException {
        log.debug("REST request to save LoanFee : {}", loanFee);
        if (loanFee.getId() != null) {
            throw new BadRequestAlertException("A new loanFee cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LoanFee result = loanFeeService.save(loanFee);
        return ResponseEntity.created(new URI("/api/loan-fees/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /loan-fees : Updates an existing loanFee.
     *
     * @param loanFee the loanFee to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated loanFee,
     * or with status 400 (Bad Request) if the loanFee is not valid,
     * or with status 500 (Internal Server Error) if the loanFee couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/loan-fees")
    @Timed
    public ResponseEntity<LoanFee> updateLoanFee(@RequestBody LoanFee loanFee) throws URISyntaxException {
        log.debug("REST request to update LoanFee : {}", loanFee);
        if (loanFee.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LoanFee result = loanFeeService.save(loanFee);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, loanFee.getId().toString()))
            .body(result);
    }

    /**
     * GET  /loan-fees : get all the loanFees.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of loanFees in body
     */
    @GetMapping("/loan-fees")
    @Timed
    public List<LoanFee> getAllLoanFees() {
        log.debug("REST request to get all LoanFees");
        return loanFeeService.findAll();
    }

    /**
     * GET  /loan-fees/:id : get the "id" loanFee.
     *
     * @param id the id of the loanFee to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the loanFee, or with status 404 (Not Found)
     */
    @GetMapping("/loan-fees/{id}")
    @Timed
    public ResponseEntity<LoanFee> getLoanFee(@PathVariable Long id) {
        log.debug("REST request to get LoanFee : {}", id);
        Optional<LoanFee> loanFee = loanFeeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(loanFee);
    }

    /**
     * DELETE  /loan-fees/:id : delete the "id" loanFee.
     *
     * @param id the id of the loanFee to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/loan-fees/{id}")
    @Timed
    public ResponseEntity<Void> deleteLoanFee(@PathVariable Long id) {
        log.debug("REST request to delete LoanFee : {}", id);
        loanFeeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/loan-fees?query=:query : search for the loanFee corresponding
     * to the query.
     *
     * @param query the query of the loanFee search
     * @return the result of the search
     */
    @GetMapping("/_search/loan-fees")
    @Timed
    public List<LoanFee> searchLoanFees(@RequestParam String query) {
        log.debug("REST request to search LoanFees for query {}", query);
        return loanFeeService.search(query);
    }

}
