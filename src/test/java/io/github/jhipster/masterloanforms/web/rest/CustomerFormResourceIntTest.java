package io.github.jhipster.masterloanforms.web.rest;

import io.github.jhipster.masterloanforms.MasterLoanFormsApp;

import io.github.jhipster.masterloanforms.domain.CustomerForm;
import io.github.jhipster.masterloanforms.repository.CustomerFormRepository;
import io.github.jhipster.masterloanforms.repository.search.CustomerFormSearchRepository;
import io.github.jhipster.masterloanforms.service.CustomerFormService;
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
 * Test class for the CustomerFormResource REST controller.
 *
 * @see CustomerFormResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MasterLoanFormsApp.class)
public class CustomerFormResourceIntTest {

    private static final String DEFAULT_SCORE = "AAAAAAAAAA";
    private static final String UPDATED_SCORE = "BBBBBBBBBB";

    private static final String DEFAULT_VERIFIED = "AAAAAAAAAA";
    private static final String UPDATED_VERIFIED = "BBBBBBBBBB";

    @Autowired
    private CustomerFormRepository customerFormRepository;

    @Autowired
    private CustomerFormService customerFormService;

    /**
     * This repository is mocked in the io.github.jhipster.masterloanforms.repository.search test package.
     *
     * @see io.github.jhipster.masterloanforms.repository.search.CustomerFormSearchRepositoryMockConfiguration
     */
    @Autowired
    private CustomerFormSearchRepository mockCustomerFormSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCustomerFormMockMvc;

    private CustomerForm customerForm;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CustomerFormResource customerFormResource = new CustomerFormResource(customerFormService);
        this.restCustomerFormMockMvc = MockMvcBuilders.standaloneSetup(customerFormResource)
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
    public static CustomerForm createEntity(EntityManager em) {
        CustomerForm customerForm = new CustomerForm()
            .score(DEFAULT_SCORE)
            .verified(DEFAULT_VERIFIED);
        return customerForm;
    }

    @Before
    public void initTest() {
        customerForm = createEntity(em);
    }

    @Test
    @Transactional
    public void createCustomerForm() throws Exception {
        int databaseSizeBeforeCreate = customerFormRepository.findAll().size();

        // Create the CustomerForm
        restCustomerFormMockMvc.perform(post("/api/customer-forms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerForm)))
            .andExpect(status().isCreated());

        // Validate the CustomerForm in the database
        List<CustomerForm> customerFormList = customerFormRepository.findAll();
        assertThat(customerFormList).hasSize(databaseSizeBeforeCreate + 1);
        CustomerForm testCustomerForm = customerFormList.get(customerFormList.size() - 1);
        assertThat(testCustomerForm.getScore()).isEqualTo(DEFAULT_SCORE);
        assertThat(testCustomerForm.getVerified()).isEqualTo(DEFAULT_VERIFIED);

        // Validate the CustomerForm in Elasticsearch
        verify(mockCustomerFormSearchRepository, times(1)).save(testCustomerForm);
    }

    @Test
    @Transactional
    public void createCustomerFormWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = customerFormRepository.findAll().size();

        // Create the CustomerForm with an existing ID
        customerForm.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCustomerFormMockMvc.perform(post("/api/customer-forms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerForm)))
            .andExpect(status().isBadRequest());

        // Validate the CustomerForm in the database
        List<CustomerForm> customerFormList = customerFormRepository.findAll();
        assertThat(customerFormList).hasSize(databaseSizeBeforeCreate);

        // Validate the CustomerForm in Elasticsearch
        verify(mockCustomerFormSearchRepository, times(0)).save(customerForm);
    }

    @Test
    @Transactional
    public void getAllCustomerForms() throws Exception {
        // Initialize the database
        customerFormRepository.saveAndFlush(customerForm);

        // Get all the customerFormList
        restCustomerFormMockMvc.perform(get("/api/customer-forms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(customerForm.getId().intValue())))
            .andExpect(jsonPath("$.[*].score").value(hasItem(DEFAULT_SCORE.toString())))
            .andExpect(jsonPath("$.[*].verified").value(hasItem(DEFAULT_VERIFIED.toString())));
    }
    
    @Test
    @Transactional
    public void getCustomerForm() throws Exception {
        // Initialize the database
        customerFormRepository.saveAndFlush(customerForm);

        // Get the customerForm
        restCustomerFormMockMvc.perform(get("/api/customer-forms/{id}", customerForm.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(customerForm.getId().intValue()))
            .andExpect(jsonPath("$.score").value(DEFAULT_SCORE.toString()))
            .andExpect(jsonPath("$.verified").value(DEFAULT_VERIFIED.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCustomerForm() throws Exception {
        // Get the customerForm
        restCustomerFormMockMvc.perform(get("/api/customer-forms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCustomerForm() throws Exception {
        // Initialize the database
        customerFormService.save(customerForm);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockCustomerFormSearchRepository);

        int databaseSizeBeforeUpdate = customerFormRepository.findAll().size();

        // Update the customerForm
        CustomerForm updatedCustomerForm = customerFormRepository.findById(customerForm.getId()).get();
        // Disconnect from session so that the updates on updatedCustomerForm are not directly saved in db
        em.detach(updatedCustomerForm);
        updatedCustomerForm
            .score(UPDATED_SCORE)
            .verified(UPDATED_VERIFIED);

        restCustomerFormMockMvc.perform(put("/api/customer-forms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCustomerForm)))
            .andExpect(status().isOk());

        // Validate the CustomerForm in the database
        List<CustomerForm> customerFormList = customerFormRepository.findAll();
        assertThat(customerFormList).hasSize(databaseSizeBeforeUpdate);
        CustomerForm testCustomerForm = customerFormList.get(customerFormList.size() - 1);
        assertThat(testCustomerForm.getScore()).isEqualTo(UPDATED_SCORE);
        assertThat(testCustomerForm.getVerified()).isEqualTo(UPDATED_VERIFIED);

        // Validate the CustomerForm in Elasticsearch
        verify(mockCustomerFormSearchRepository, times(1)).save(testCustomerForm);
    }

    @Test
    @Transactional
    public void updateNonExistingCustomerForm() throws Exception {
        int databaseSizeBeforeUpdate = customerFormRepository.findAll().size();

        // Create the CustomerForm

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCustomerFormMockMvc.perform(put("/api/customer-forms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerForm)))
            .andExpect(status().isBadRequest());

        // Validate the CustomerForm in the database
        List<CustomerForm> customerFormList = customerFormRepository.findAll();
        assertThat(customerFormList).hasSize(databaseSizeBeforeUpdate);

        // Validate the CustomerForm in Elasticsearch
        verify(mockCustomerFormSearchRepository, times(0)).save(customerForm);
    }

    @Test
    @Transactional
    public void deleteCustomerForm() throws Exception {
        // Initialize the database
        customerFormService.save(customerForm);

        int databaseSizeBeforeDelete = customerFormRepository.findAll().size();

        // Get the customerForm
        restCustomerFormMockMvc.perform(delete("/api/customer-forms/{id}", customerForm.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CustomerForm> customerFormList = customerFormRepository.findAll();
        assertThat(customerFormList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the CustomerForm in Elasticsearch
        verify(mockCustomerFormSearchRepository, times(1)).deleteById(customerForm.getId());
    }

    @Test
    @Transactional
    public void searchCustomerForm() throws Exception {
        // Initialize the database
        customerFormService.save(customerForm);
        when(mockCustomerFormSearchRepository.search(queryStringQuery("id:" + customerForm.getId())))
            .thenReturn(Collections.singletonList(customerForm));
        // Search the customerForm
        restCustomerFormMockMvc.perform(get("/api/_search/customer-forms?query=id:" + customerForm.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(customerForm.getId().intValue())))
            .andExpect(jsonPath("$.[*].score").value(hasItem(DEFAULT_SCORE)))
            .andExpect(jsonPath("$.[*].verified").value(hasItem(DEFAULT_VERIFIED)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CustomerForm.class);
        CustomerForm customerForm1 = new CustomerForm();
        customerForm1.setId(1L);
        CustomerForm customerForm2 = new CustomerForm();
        customerForm2.setId(customerForm1.getId());
        assertThat(customerForm1).isEqualTo(customerForm2);
        customerForm2.setId(2L);
        assertThat(customerForm1).isNotEqualTo(customerForm2);
        customerForm1.setId(null);
        assertThat(customerForm1).isNotEqualTo(customerForm2);
    }
}
