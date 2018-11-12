package io.github.jhipster.masterloanforms.repository;

import io.github.jhipster.masterloanforms.domain.FormQuestion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FormQuestion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FormQuestionRepository extends JpaRepository<FormQuestion, Long> {

}
