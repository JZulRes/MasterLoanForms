package io.github.jhipster.masterloanforms.repository.search;

import io.github.jhipster.masterloanforms.domain.FormQuestion;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the FormQuestion entity.
 */
public interface FormQuestionSearchRepository extends ElasticsearchRepository<FormQuestion, Long> {
}
