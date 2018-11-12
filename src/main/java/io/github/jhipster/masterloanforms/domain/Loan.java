package io.github.jhipster.masterloanforms.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Loan.
 */
@Entity
@Table(name = "loan")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "loan")
public class Loan implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "loan_value", nullable = false)
    private Integer loanValue;

    @Column(name = "paid")
    private String paid;

    @OneToMany(mappedBy = "loan")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<LoanFee> loanFees = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("loans")
    private Customer customer;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getLoanValue() {
        return loanValue;
    }

    public Loan loanValue(Integer loanValue) {
        this.loanValue = loanValue;
        return this;
    }

    public void setLoanValue(Integer loanValue) {
        this.loanValue = loanValue;
    }

    public String getPaid() {
        return paid;
    }

    public Loan paid(String paid) {
        this.paid = paid;
        return this;
    }

    public void setPaid(String paid) {
        this.paid = paid;
    }

    public Set<LoanFee> getLoanFees() {
        return loanFees;
    }

    public Loan loanFees(Set<LoanFee> loanFees) {
        this.loanFees = loanFees;
        return this;
    }

    public Loan addLoanFee(LoanFee loanFee) {
        this.loanFees.add(loanFee);
        loanFee.setLoan(this);
        return this;
    }

    public Loan removeLoanFee(LoanFee loanFee) {
        this.loanFees.remove(loanFee);
        loanFee.setLoan(null);
        return this;
    }

    public void setLoanFees(Set<LoanFee> loanFees) {
        this.loanFees = loanFees;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Loan customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
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
        Loan loan = (Loan) o;
        if (loan.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), loan.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Loan{" +
            "id=" + getId() +
            ", loanValue=" + getLoanValue() +
            ", paid='" + getPaid() + "'" +
            "}";
    }
}
