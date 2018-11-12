package io.github.jhipster.masterloanforms.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
 * A Customer.
 */
@Entity
@Table(name = "customer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "customer")
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "cedula_customer", nullable = false)
    private Long cedulaCustomer;

    @NotNull
    @Column(name = "type_id_customer", nullable = false)
    private String typeIdCustomer;

    @Column(name = "signature_wallet")
    private String signatureWallet;

    @OneToMany(mappedBy = "customer")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CustomerForm> customerForms = new HashSet<>();
    @OneToMany(mappedBy = "customer")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Loan> loans = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCedulaCustomer() {
        return cedulaCustomer;
    }

    public Customer cedulaCustomer(Long cedulaCustomer) {
        this.cedulaCustomer = cedulaCustomer;
        return this;
    }

    public void setCedulaCustomer(Long cedulaCustomer) {
        this.cedulaCustomer = cedulaCustomer;
    }

    public String getTypeIdCustomer() {
        return typeIdCustomer;
    }

    public Customer typeIdCustomer(String typeIdCustomer) {
        this.typeIdCustomer = typeIdCustomer;
        return this;
    }

    public void setTypeIdCustomer(String typeIdCustomer) {
        this.typeIdCustomer = typeIdCustomer;
    }

    public String getSignatureWallet() {
        return signatureWallet;
    }

    public Customer signatureWallet(String signatureWallet) {
        this.signatureWallet = signatureWallet;
        return this;
    }

    public void setSignatureWallet(String signatureWallet) {
        this.signatureWallet = signatureWallet;
    }

    public Set<CustomerForm> getCustomerForms() {
        return customerForms;
    }

    public Customer customerForms(Set<CustomerForm> customerForms) {
        this.customerForms = customerForms;
        return this;
    }

    public Customer addCustomerForm(CustomerForm customerForm) {
        this.customerForms.add(customerForm);
        customerForm.setCustomer(this);
        return this;
    }

    public Customer removeCustomerForm(CustomerForm customerForm) {
        this.customerForms.remove(customerForm);
        customerForm.setCustomer(null);
        return this;
    }

    public void setCustomerForms(Set<CustomerForm> customerForms) {
        this.customerForms = customerForms;
    }

    public Set<Loan> getLoans() {
        return loans;
    }

    public Customer loans(Set<Loan> loans) {
        this.loans = loans;
        return this;
    }

    public Customer addLoan(Loan loan) {
        this.loans.add(loan);
        loan.setCustomer(this);
        return this;
    }

    public Customer removeLoan(Loan loan) {
        this.loans.remove(loan);
        loan.setCustomer(null);
        return this;
    }

    public void setLoans(Set<Loan> loans) {
        this.loans = loans;
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
        Customer customer = (Customer) o;
        if (customer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Customer{" +
            "id=" + getId() +
            ", cedulaCustomer=" + getCedulaCustomer() +
            ", typeIdCustomer='" + getTypeIdCustomer() + "'" +
            ", signatureWallet='" + getSignatureWallet() + "'" +
            "}";
    }
}
