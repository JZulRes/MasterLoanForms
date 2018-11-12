package io.github.jhipster.masterloanforms.repository.search;

import io.github.jhipster.masterloanforms.domain.Loan;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Loan entity.
 */
public interface LoanSearchRepository extends ElasticsearchRepository<Loan, Long> {
}
