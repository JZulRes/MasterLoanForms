package io.github.jhipster.masterloanforms.repository.search;

import io.github.jhipster.masterloanforms.domain.LoanFee;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the LoanFee entity.
 */
public interface LoanFeeSearchRepository extends ElasticsearchRepository<LoanFee, Long> {
}
