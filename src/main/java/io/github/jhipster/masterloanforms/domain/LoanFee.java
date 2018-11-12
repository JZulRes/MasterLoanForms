package io.github.jhipster.masterloanforms.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A LoanFee.
 */
@Entity
@Table(name = "loan_fee")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "loanfee")
public class LoanFee implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "paid")
    private String paid;

    @Column(name = "expiration_date")
    private Instant expirationDate;

    @Column(name = "pay_date")
    private Instant payDate;

    @Column(name = "fee_value")
    private Integer feeValue;

    @ManyToOne
    @JsonIgnoreProperties("loanFees")
    private Loan loan;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPaid() {
        return paid;
    }

    public LoanFee paid(String paid) {
        this.paid = paid;
        return this;
    }

    public void setPaid(String paid) {
        this.paid = paid;
    }

    public Instant getExpirationDate() {
        return expirationDate;
    }

    public LoanFee expirationDate(Instant expirationDate) {
        this.expirationDate = expirationDate;
        return this;
    }

    public void setExpirationDate(Instant expirationDate) {
        this.expirationDate = expirationDate;
    }

    public Instant getPayDate() {
        return payDate;
    }

    public LoanFee payDate(Instant payDate) {
        this.payDate = payDate;
        return this;
    }

    public void setPayDate(Instant payDate) {
        this.payDate = payDate;
    }

    public Integer getFeeValue() {
        return feeValue;
    }

    public LoanFee feeValue(Integer feeValue) {
        this.feeValue = feeValue;
        return this;
    }

    public void setFeeValue(Integer feeValue) {
        this.feeValue = feeValue;
    }

    public Loan getLoan() {
        return loan;
    }

    public LoanFee loan(Loan loan) {
        this.loan = loan;
        return this;
    }

    public void setLoan(Loan loan) {
        this.loan = loan;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        LoanFee loanFee = (LoanFee) o;
        if (loanFee.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), loanFee.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LoanFee{" +
            "id=" + getId() +
            ", paid='" + getPaid() + "'" +
            ", expirationDate='" + getExpirationDate() + "'" +
            ", payDate='" + getPayDate() + "'" +
            ", feeValue=" + getFeeValue() +
            "}";
    }
}
