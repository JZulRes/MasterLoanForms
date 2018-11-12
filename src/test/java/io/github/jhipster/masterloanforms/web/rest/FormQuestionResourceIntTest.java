package io.github.jhipster.masterloanforms.web.rest;

import io.github.jhipster.masterloanforms.MasterLoanFormsApp;

import io.github.jhipster.masterloanforms.domain.FormQuestion;
import io.github.jhipster.masterloanforms.repository.FormQuestionRepository;
import io.github.jhipster.masterloanforms.repository.search.FormQuestionSearchRepository;
import io.github.jhipster.masterloanforms.service.FormQuestionService;
import io.github.jhipster.masterloanforms.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;


import static io.github.jhipster.masterloanforms.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the FormQuestionResource REST controller.
 *
 * @see FormQuestionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MasterLoanFormsApp.class)
public class FormQuestionResourceIntTest {

    @Autowired
    private FormQuestionRepository formQuestionRepository;

    @Autowired
    private FormQuestionService formQuestionService;

    /**
     * This repository is mocked in the io.github.jhipster.masterloanforms.repository.search test package.
     *
     * @see io.github.jhipster.masterloanforms.repository.search.FormQuestionSearchRepositoryMockConfiguration
     */
    @Autowired
    private FormQuestionSearchRepository mockFormQuestionSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFormQuestionMockMvc;

    private FormQuestion formQuestion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FormQuestionResource formQuestionResource = new FormQuestionResource(formQuestionService);
        this.restFormQuestionMockMvc = MockMvcBuilders.standaloneSetup(formQuestionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FormQuestion createEntity(EntityManager em) {
        FormQuestion formQuestion = new FormQuestion();
        return formQuestion;
    }

    @Before
    public void initTest() {
        formQuestion = createEntity(em);
    }

    @Test
    @Transactional
    public void createFormQuestion() throws Exception {
        int databaseSizeBeforeCreate = formQuestionRepository.findAll().size();

        // Create the FormQuestion
        restFormQuestionMockMvc.perform(post("/api/form-questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formQuestion)))
            .andExpect(status().isCreated());

        // Validate the FormQuestion in the database
        List<FormQuestion> formQuestionList = formQuestionRepository.findAll();
        assertThat(formQuestionList).hasSize(databaseSizeBeforeCreate + 1);
        FormQuestion testFormQuestion = formQuestionList.get(formQuestionList.size() - 1);

        // Validate the FormQuestion in Elasticsearch
        verify(mockFormQuestionSearchRepository, times(1)).save(testFormQuestion);
    }

    @Test
    @Transactional
    public void createFormQuestionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = formQuestionRepository.findAll().size();

        // Create the FormQuestion with an existing ID
        formQuestion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFormQuestionMockMvc.perform(post("/api/form-questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formQuestion)))
            .andExpect(status().isBadRequest());

        // Validate the FormQuestion in the database
        List<FormQuestion> formQuestionList = formQuestionRepository.findAll();
        assertThat(formQuestionList).hasSize(databaseSizeBeforeCreate);

        // Validate the FormQuestion in Elasticsearch
        verify(mockFormQuestionSearchRepository, times(0)).save(formQuestion);
    }

    @Test
    @Transactional
    public void getAllFormQuestions() throws Exception {
        // Initialize the database
        formQuestionRepository.saveAndFlush(formQuestion);

        // Get all the formQuestionList
        restFormQuestionMockMvc.perform(get("/api/form-questions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(formQuestion.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getFormQuestion() throws Exception {
        // Initialize the database
        formQuestionRepository.saveAndFlush(formQuestion);

        // Get the formQuestion
        restFormQuestionMockMvc.perform(get("/api/form-questions/{id}", formQuestion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(formQuestion.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingFormQuestion() throws Exception {
        // Get the formQuestion
        restFormQuestionMockMvc.perform(get("/api/form-questions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFormQuestion() throws Exception {
        // Initialize the database
        formQuestionService.save(formQuestion);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockFormQuestionSearchRepository);

        int databaseSizeBeforeUpdate = formQuestionRepository.findAll().size();

        // Update the formQuestion
        FormQuestion updatedFormQuestion = formQuestionRepository.findById(formQuestion.getId()).get();
        // Disconnect from session so that the updates on updatedFormQuestion are not directly saved in db
        em.detach(updatedFormQuestion);

        restFormQuestionMockMvc.perform(put("/api/form-questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFormQuestion)))
            .andExpect(status().isOk());

        // Validate the FormQuestion in the database
        List<FormQuestion> formQuestionList = formQuestionRepository.findAll();
        assertThat(formQuestionList).hasSize(databaseSizeBeforeUpdate);
        FormQuestion testFormQuestion = formQuestionList.get(formQuestionList.size() - 1);

        // Validate the FormQuestion in Elasticsearch
        verify(mockFormQuestionSearchRepository, times(1)).save(testFormQuestion);
    }

    @Test
    @Transactional
    public void updateNonExistingFormQuestion() throws Exception {
        int databaseSizeBeforeUpdate = formQuestionRepository.findAll().size();

        // Create the FormQuestion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFormQuestionMockMvc.perform(put("/api/form-questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formQuestion)))
            .andExpect(status().isBadRequest());

        // Validate the FormQuestion in the database
        List<FormQuestion> formQuestionList = formQuestionRepository.findAll();
        assertThat(formQuestionList).hasSize(databaseSizeBeforeUpdate);

        // Validate the FormQuestion in Elasticsearch
        verify(mockFormQuestionSearchRepository, times(0)).save(formQuestion);
    }

    @Test
    @Transactional
    public void deleteFormQuestion() throws Exception {
        // Initialize the database
        formQuestionService.save(formQuestion);

        int databaseSizeBeforeDelete = formQuestionRepository.findAll().size();

        // Get the formQuestion
        restFormQuestionMockMvc.perform(delete("/api/form-questions/{id}", formQuestion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FormQuestion> formQuestionList = formQuestionRepository.findAll();
        assertThat(formQuestionList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the FormQuestion in Elasticsearch
        verify(mockFormQuestionSearchRepository, times(1)).deleteById(formQuestion.getId());
    }

    @Test
    @Transactional
    public void searchFormQuestion() throws Exception {
        // Initialize the database
        formQuestionService.save(formQuestion);
        when(mockFormQuestionSearchRepository.search(queryStringQuery("id:" + formQuestion.getId())))
            .thenReturn(Collections.singletonList(formQuestion));
        // Search the formQuestion
        restFormQuestionMockMvc.perform(get("/api/_search/form-questions?query=id:" + formQuestion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(formQuestion.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FormQuestion.class);
        FormQuestion formQuestion1 = new FormQuestion();
        formQuestion1.setId(1L);
        FormQuestion formQuestion2 = new FormQuestion();
        formQuestion2.setId(formQuestion1.getId());
        assertThat(formQuestion1).isEqualTo(formQuestion2);
        formQuestion2.setId(2L);
        assertThat(formQuestion1).isNotEqualTo(formQuestion2);
        formQuestion1.setId(null);
        assertThat(formQuestion1).isNotEqualTo(formQuestion2);
    }
}
