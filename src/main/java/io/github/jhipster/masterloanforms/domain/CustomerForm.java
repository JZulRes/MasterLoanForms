package io.github.jhipster.masterloanforms.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A CustomerForm.
 */
@Entity
@Table(name = "customer_form")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "customerform")
public class CustomerForm implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "score")
    private String score;

    @Column(name = "verified")
    private String verified;

    @OneToOne    @JoinColumn(unique = true)
    private FormQuestion formQuestion;

    @ManyToOne
    @JsonIgnoreProperties("customerForms")
    private Customer customer;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getScore() {
        return score;
    }

    public CustomerForm score(String score) {
        this.score = score;
        return this;
    }

    public void setScore(String score) {
        this.score = score;
    }

    public String getVerified() {
        return verified;
    }

    public CustomerForm verified(String verified) {
        this.verified = verified;
        return this;
    }

    public void setVerified(String verified) {
        this.verified = verified;
    }

    public FormQuestion getFormQuestion() {
        return formQuestion;
    }

    public CustomerForm formQuestion(FormQuestion formQuestion) {
        this.formQuestion = formQuestion;
        return this;
    }

    public void setFormQuestion(FormQuestion formQuestion) {
        this.formQuestion = formQuestion;
    }

    public Customer getCustomer() {
        return customer;
    }

    public CustomerForm customer(Customer customer) {
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
        CustomerForm customerForm = (CustomerForm) o;
        if (customerForm.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerForm.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerForm{" +
            "id=" + getId() +
            ", score='" + getScore() + "'" +
            ", verified='" + getVerified() + "'" +
            "}";
    }
}
