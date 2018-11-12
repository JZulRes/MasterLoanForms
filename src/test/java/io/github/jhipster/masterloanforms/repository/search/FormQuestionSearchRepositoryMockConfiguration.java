package io.github.jhipster.masterloanforms.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of FormQuestionSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class FormQuestionSearchRepositoryMockConfiguration {

    @MockBean
    private FormQuestionSearchRepository mockFormQuestionSearchRepository;

}
