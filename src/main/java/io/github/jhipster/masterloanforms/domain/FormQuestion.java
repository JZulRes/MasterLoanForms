package io.github.jhipster.masterloanforms.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A FormQuestion.
 */
@Entity
@Table(name = "form_question")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "formquestion")
public class FormQuestion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "formQuestion")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Question> questions = new HashSet<>();
    @OneToMany(mappedBy = "formQuestion")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Answer> answers = new HashSet<>();
    @OneToOne(mappedBy = "formQuestion")
    @JsonIgnore
    private CustomerForm customerForm;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Question> getQuestions() {
        return questions;
    }

    public FormQuestion questions(Set<Question> questions) {
        this.questions = questions;
        return this;
    }

    public FormQuestion addQuestion(Question question) {
        this.questions.add(question);
        question.setFormQuestion(this);
        return this;
    }

    public FormQuestion removeQuestion(Question question) {
        this.questions.remove(question);
        question.setFormQuestion(null);
        return this;
    }

    public void setQuestions(Set<Question> questions) {
        this.questions = questions;
    }

    public Set<Answer> getAnswers() {
        return answers;
    }

    public FormQuestion answers(Set<Answer> answers) {
        this.answers = answers;
        return this;
    }

    public FormQuestion addAnswer(Answer answer) {
        this.answers.add(answer);
        answer.setFormQuestion(this);
        return this;
    }

    public FormQuestion removeAnswer(Answer answer) {
        this.answers.remove(answer);
        answer.setFormQuestion(null);
        return this;
    }

    public void setAnswers(Set<Answer> answers) {
        this.answers = answers;
    }

    public CustomerForm getCustomerForm() {
        return customerForm;
    }

    public FormQuestion customerForm(CustomerForm customerForm) {
        this.customerForm = customerForm;
        return this;
    }

    public void setCustomerForm(CustomerForm customerForm) {
        this.customerForm = customerForm;
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
        FormQuestion formQuestion = (FormQuestion) o;
        if (formQuestion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), formQuestion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FormQuestion{" +
            "id=" + getId() +
            "}";
    }
}
