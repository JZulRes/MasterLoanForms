package io.github.jhipster.masterloanforms.repository.search;

import io.github.jhipster.masterloanforms.domain.CustomerForm;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the CustomerForm entity.
 */
public interface CustomerFormSearchRepository extends ElasticsearchRepository<CustomerForm, Long> {
}
