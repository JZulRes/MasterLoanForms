package io.github.jhipster.masterloanforms.repository;

import io.github.jhipster.masterloanforms.domain.LoanFee;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the LoanFee entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LoanFeeRepository extends JpaRepository<LoanFee, Long> {

}
