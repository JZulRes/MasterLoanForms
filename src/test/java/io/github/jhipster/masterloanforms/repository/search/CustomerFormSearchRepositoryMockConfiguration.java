package io.github.jhipster.masterloanforms.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of CustomerFormSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class CustomerFormSearchRepositoryMockConfiguration {

    @MockBean
    private CustomerFormSearchRepository mockCustomerFormSearchRepository;

}
