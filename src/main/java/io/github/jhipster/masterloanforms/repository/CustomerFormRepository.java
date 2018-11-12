package io.github.jhipster.masterloanforms.repository;

import io.github.jhipster.masterloanforms.domain.CustomerForm;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CustomerForm entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerFormRepository extends JpaRepository<CustomerForm, Long> {

}
