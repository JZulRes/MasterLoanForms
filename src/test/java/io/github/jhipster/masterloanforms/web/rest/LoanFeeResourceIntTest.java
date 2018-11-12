package io.github.jhipster.masterloanforms.web.rest;

import io.github.jhipster.masterloanforms.MasterLoanFormsApp;

import io.github.jhipster.masterloanforms.domain.LoanFee;
import io.github.jhipster.masterloanforms.repository.LoanFeeRepository;
import io.github.jhipster.masterloanforms.repository.search.LoanFeeSearchRepository;
import io.github.jhipster.masterloanforms.service.LoanFeeService;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
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
 * Test class for the LoanFeeResource REST controller.
 *
 * @see LoanFeeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MasterLoanFormsApp.class)
public class LoanFeeResourceIntTest {

    private static final String DEFAULT_PAID = "AAAAAAAAAA";
    private static final String UPDATED_PAID = "BBBBBBBBBB";

    private static final Instant DEFAULT_EXPIRATION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_EXPIRATION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_PAY_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_PAY_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_FEE_VALUE = 1;
    private static final Integer UPDATED_FEE_VALUE = 2;

    @Autowired
    private LoanFeeRepository loanFeeRepository;

    @Autowired
    private LoanFeeService loanFeeService;

    /**
     * This repository is mocked in the io.github.jhipster.masterloanforms.repository.search test package.
     *
     * @see io.github.jhipster.masterloanforms.repository.search.LoanFeeSearchRepositoryMockConfiguration
     */
    @Autowired
    private LoanFeeSearchRepository mockLoanFeeSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restLoanFeeMockMvc;

    private LoanFee loanFee;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LoanFeeResource loanFeeResource = new LoanFeeResource(loanFeeService);
        this.restLoanFeeMockMvc = MockMvcBuilders.standaloneSetup(loanFeeResource)
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
    public static LoanFee createEntity(EntityManager em) {
        LoanFee loanFee = new LoanFee()
            .paid(DEFAULT_PAID)
            .expirationDate(DEFAULT_EXPIRATION_DATE)
            .payDate(DEFAULT_PAY_DATE)
            .feeValue(DEFAULT_FEE_VALUE);
        return loanFee;
    }

    @Before
    public void initTest() {
        loanFee = createEntity(em);
    }

    @Test
    @Transactional
    public void createLoanFee() throws Exception {
        int databaseSizeBeforeCreate = loanFeeRepository.findAll().size();

        // Create the LoanFee
        restLoanFeeMockMvc.perform(post("/api/loan-fees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(loanFee)))
            .andExpect(status().isCreated());

        // Validate the LoanFee in the database
        List<LoanFee> loanFeeList = loanFeeRepository.findAll();
        assertThat(loanFeeList).hasSize(databaseSizeBeforeCreate + 1);
        LoanFee testLoanFee = loanFeeList.get(loanFeeList.size() - 1);
        assertThat(testLoanFee.getPaid()).isEqualTo(DEFAULT_PAID);
        assertThat(testLoanFee.getExpirationDate()).isEqualTo(DEFAULT_EXPIRATION_DATE);
        assertThat(testLoanFee.getPayDate()).isEqualTo(DEFAULT_PAY_DATE);
        assertThat(testLoanFee.getFeeValue()).isEqualTo(DEFAULT_FEE_VALUE);

        // Validate the LoanFee in Elasticsearch
        verify(mockLoanFeeSearchRepository, times(1)).save(testLoanFee);
    }

    @Test
    @Transactional
    public void createLoanFeeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = loanFeeRepository.findAll().size();

        // Create the LoanFee with an existing ID
        loanFee.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLoanFeeMockMvc.perform(post("/api/loan-fees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(loanFee)))
            .andExpect(status().isBadRequest());

        // Validate the LoanFee in the database
        List<LoanFee> loanFeeList = loanFeeRepository.findAll();
        assertThat(loanFeeList).hasSize(databaseSizeBeforeCreate);

        // Validate the LoanFee in Elasticsearch
        verify(mockLoanFeeSearchRepository, times(0)).save(loanFee);
    }

    @Test
    @Transactional
    public void getAllLoanFees() throws Exception {
        // Initialize the database
        loanFeeRepository.saveAndFlush(loanFee);

        // Get all the loanFeeList
        restLoanFeeMockMvc.perform(get("/api/loan-fees?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(loanFee.getId().intValue())))
            .andExpect(jsonPath("$.[*].paid").value(hasItem(DEFAULT_PAID.toString())))
            .andExpect(jsonPath("$.[*].expirationDate").value(hasItem(DEFAULT_EXPIRATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].payDate").value(hasItem(DEFAULT_PAY_DATE.toString())))
            .andExpect(jsonPath("$.[*].feeValue").value(hasItem(DEFAULT_FEE_VALUE)));
    }
    
    @Test
    @Transactional
    public void getLoanFee() throws Exception {
        // Initialize the database
        loanFeeRepository.saveAndFlush(loanFee);

        // Get the loanFee
        restLoanFeeMockMvc.perform(get("/api/loan-fees/{id}", loanFee.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(loanFee.getId().intValue()))
            .andExpect(jsonPath("$.paid").value(DEFAULT_PAID.toString()))
            .andExpect(jsonPath("$.expirationDate").value(DEFAULT_EXPIRATION_DATE.toString()))
            .andExpect(jsonPath("$.payDate").value(DEFAULT_PAY_DATE.toString()))
            .andExpect(jsonPath("$.feeValue").value(DEFAULT_FEE_VALUE));
    }

    @Test
    @Transactional
    public void getNonExistingLoanFee() throws Exception {
        // Get the loanFee
        restLoanFeeMockMvc.perform(get("/api/loan-fees/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLoanFee() throws Exception {
        // Initialize the database
        loanFeeService.save(loanFee);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockLoanFeeSearchRepository);

        int databaseSizeBeforeUpdate = loanFeeRepository.findAll().size();

        // Update the loanFee
        LoanFee updatedLoanFee = loanFeeRepository.findById(loanFee.getId()).get();
        // Disconnect from session so that the updates on updatedLoanFee are not directly saved in db
        em.detach(updatedLoanFee);
        updatedLoanFee
            .paid(UPDATED_PAID)
            .expirationDate(UPDATED_EXPIRATION_DATE)
            .payDate(UPDATED_PAY_DATE)
            .feeValue(UPDATED_FEE_VALUE);

        restLoanFeeMockMvc.perform(put("/api/loan-fees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLoanFee)))
            .andExpect(status().isOk());

        // Validate the LoanFee in the database
        List<LoanFee> loanFeeList = loanFeeRepository.findAll();
        assertThat(loanFeeList).hasSize(databaseSizeBeforeUpdate);
        LoanFee testLoanFee = loanFeeList.get(loanFeeList.size() - 1);
        assertThat(testLoanFee.getPaid()).isEqualTo(UPDATED_PAID);
        assertThat(testLoanFee.getExpirationDate()).isEqualTo(UPDATED_EXPIRATION_DATE);
        assertThat(testLoanFee.getPayDate()).isEqualTo(UPDATED_PAY_DATE);
        assertThat(testLoanFee.getFeeValue()).isEqualTo(UPDATED_FEE_VALUE);

        // Validate the LoanFee in Elasticsearch
        verify(mockLoanFeeSearchRepository, times(1)).save(testLoanFee);
    }

    @Test
    @Transactional
    public void updateNonExistingLoanFee() throws Exception {
        int databaseSizeBeforeUpdate = loanFeeRepository.findAll().size();

        // Create the LoanFee

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLoanFeeMockMvc.perform(put("/api/loan-fees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(loanFee)))
            .andExpect(status().isBadRequest());

        // Validate the LoanFee in the database
        List<LoanFee> loanFeeList = loanFeeRepository.findAll();
        assertThat(loanFeeList).hasSize(databaseSizeBeforeUpdate);

        // Validate the LoanFee in Elasticsearch
        verify(mockLoanFeeSearchRepository, times(0)).save(loanFee);
    }

    @Test
    @Transactional
    public void deleteLoanFee() throws Exception {
        // Initialize the database
        loanFeeService.save(loanFee);

        int databaseSizeBeforeDelete = loanFeeRepository.findAll().size();

        // Get the loanFee
        restLoanFeeMockMvc.perform(delete("/api/loan-fees/{id}", loanFee.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<LoanFee> loanFeeList = loanFeeRepository.findAll();
        assertThat(loanFeeList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the LoanFee in Elasticsearch
        verify(mockLoanFeeSearchRepository, times(1)).deleteById(loanFee.getId());
    }

    @Test
    @Transactional
    public void searchLoanFee() throws Exception {
        // Initialize the database
        loanFeeService.save(loanFee);
        when(mockLoanFeeSearchRepository.search(queryStringQuery("id:" + loanFee.getId())))
            .thenReturn(Collections.singletonList(loanFee));
        // Search the loanFee
        restLoanFeeMockMvc.perform(get("/api/_search/loan-fees?query=id:" + loanFee.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(loanFee.getId().intValue())))
            .andExpect(jsonPath("$.[*].paid").value(hasItem(DEFAULT_PAID)))
            .andExpect(jsonPath("$.[*].expirationDate").value(hasItem(DEFAULT_EXPIRATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].payDate").value(hasItem(DEFAULT_PAY_DATE.toString())))
            .andExpect(jsonPath("$.[*].feeValue").value(hasItem(DEFAULT_FEE_VALUE)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LoanFee.class);
        LoanFee loanFee1 = new LoanFee();
        loanFee1.setId(1L);
        LoanFee loanFee2 = new LoanFee();
        loanFee2.setId(loanFee1.getId());
        assertThat(loanFee1).isEqualTo(loanFee2);
        loanFee2.setId(2L);
        assertThat(loanFee1).isNotEqualTo(loanFee2);
        loanFee1.setId(null);
        assertThat(loanFee1).isNotEqualTo(loanFee2);
    }
}
