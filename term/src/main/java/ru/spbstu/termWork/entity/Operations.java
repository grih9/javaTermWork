package ru.spbstu.termWork.entity;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "operations")
public class Operations {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Long id;

    @ManyToOne(targetEntity = Articles.class)
    @JoinColumn(name = "article_id", nullable = false)
    private Articles articles;

    @Column
    private Float debit;

    @Column
    private Float credit;

    @Column(name = "create_date", length = 3)
    @NotBlank(message = "Date can't be blank")
    private Timestamp createDate;

    @ManyToOne(targetEntity = Balance.class)
    @JoinColumn(name = "balance_id", nullable = false)
    private Balance balance;

    public Operations() {

    }

    public Operations(Articles articles, Float debit, Float credit, Timestamp createDate, Balance balance) {
        if ((credit < 0) || (debit < 0)) {
            throw new IllegalArgumentException("Приход и/или расход не могут быть отрицательными.");
        }

        this.articles = articles;
        this.debit = debit;
        this.credit = credit;
        this.createDate = createDate;
        this.balance = balance;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Articles getArticles() {
        return articles;
    }

    public void setArticles(Articles articles) {
        this.articles = articles;
    }

    public Float getDebit() {
        return debit;
    }

    public void setDebit(Float debit) {
        this.debit = debit;
    }

    public Float getCredit() {
        return credit;
    }

    public void setCredit(Float credit) {
        this.credit = credit;
    }

    public Timestamp getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Timestamp createDate) {
        this.createDate = createDate;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Operations operations = (Operations) o;
        return id.equals(operations.id) &&
                articles.equals(operations.articles) &&
                debit.equals(operations.debit) &&
                credit.equals(operations.credit) &&
                createDate.equals(operations.createDate) &&
                balance.equals(operations.balance);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, articles, debit, credit, createDate, balance);
    }

    @Override
    public String toString() {
        return id + " : " + debit + " : " +
                credit +  " : " + createDate;
    }
}
