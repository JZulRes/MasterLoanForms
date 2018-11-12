package io.github.jhipster.masterloanforms.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.masterloanforms.domain.FormQuestion;
import io.github.jhipster.masterloanforms.service.FormQuestionService;
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
 * REST controller for managing FormQuestion.
 */
@RestController
@RequestMapping("/api")
public class FormQuestionResource {

    private final Logger log = LoggerFactory.getLogger(FormQuestionResource.class);

    private static final String ENTITY_NAME = "masterLoanFormsFormQuestion";

    private final FormQuestionService formQuestionService;

    public FormQuestionResource(FormQuestionService formQuestionService) {
        this.formQuestionService = formQuestionService;
    }

    /**
     * POST  /form-questions : Create a new formQuestion.
     *
     * @param formQuestion the formQuestion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new formQuestion, or with status 400 (Bad Request) if the formQuestion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/form-questions")
    @Timed
    public ResponseEntity<FormQuestion> createFormQuestion(@RequestBody FormQuestion formQuestion) throws URISyntaxException {
        log.debug("REST request to save FormQuestion : {}", formQuestion);
        if (formQuestion.getId() != null) {
            throw new BadRequestAlertException("A new formQuestion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FormQuestion result = formQuestionService.save(formQuestion);
        return ResponseEntity.created(new URI("/api/form-questions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /form-questions : Updates an existing formQuestion.
     *
     * @param formQuestion the formQuestion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated formQuestion,
     * or with status 400 (Bad Request) if the formQuestion is not valid,
     * or with status 500 (Internal Server Error) if the formQuestion couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/form-questions")
    @Timed
    public ResponseEntity<FormQuestion> updateFormQuestion(@RequestBody FormQuestion formQuestion) throws URISyntaxException {
        log.debug("REST request to update FormQuestion : {}", formQuestion);
        if (formQuestion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FormQuestion result = formQuestionService.save(formQuestion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, formQuestion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /form-questions : get all the formQuestions.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of formQuestions in body
     */
    @GetMapping("/form-questions")
    @Timed
    public List<FormQuestion> getAllFormQuestions(@RequestParam(required = false) String filter) {
        if ("customerform-is-null".equals(filter)) {
            log.debug("REST request to get all FormQuestions where customerForm is null");
            return formQuestionService.findAllWhereCustomerFormIsNull();
        }
        log.debug("REST request to get all FormQuestions");
        return formQuestionService.findAll();
    }

    /**
     * GET  /form-questions/:id : get the "id" formQuestion.
     *
     * @param id the id of the formQuestion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the formQuestion, or with status 404 (Not Found)
     */
    @GetMapping("/form-questions/{id}")
    @Timed
    public ResponseEntity<FormQuestion> getFormQuestion(@PathVariable Long id) {
        log.debug("REST request to get FormQuestion : {}", id);
        Optional<FormQuestion> formQuestion = formQuestionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(formQuestion);
    }

    /**
     * DELETE  /form-questions/:id : delete the "id" formQuestion.
     *
     * @param id the id of the formQuestion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/form-questions/{id}")
    @Timed
    public ResponseEntity<Void> deleteFormQuestion(@PathVariable Long id) {
        log.debug("REST request to delete FormQuestion : {}", id);
        formQuestionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/form-questions?query=:query : search for the formQuestion corresponding
     * to the query.
     *
     * @param query the query of the formQuestion search
     * @return the result of the search
     */
    @GetMapping("/_search/form-questions")
    @Timed
    public List<FormQuestion> searchFormQuestions(@RequestParam String query) {
        log.debug("REST request to search FormQuestions for query {}", query);
        return formQuestionService.search(query);
    }

}
