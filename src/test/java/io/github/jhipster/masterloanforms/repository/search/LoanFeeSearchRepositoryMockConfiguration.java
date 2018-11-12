package io.github.jhipster.masterloanforms.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of LoanFeeSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class LoanFeeSearchRepositoryMockConfiguration {

    @MockBean
    private LoanFeeSearchRepository mockLoanFeeSearchRepository;

}
