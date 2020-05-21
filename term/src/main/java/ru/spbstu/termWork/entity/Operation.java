package ru.spbstu.termWork.entity;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Objects;

@Entity
@Table(name = "operations")
public class Operation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @ManyToOne(targetEntity = Article.class, cascade = CascadeType.MERGE)
    @JoinColumn(name = "article_id", nullable = false)
    private Article article;

    @Column
    private Float debit;

    @Column
    private Float credit;

    @Column(name = "create_date", length = 10)
    @NotBlank(message = "Date can't be blank")
    private String createDate;

    @ManyToOne(targetEntity = Balance.class, cascade=CascadeType.MERGE)
    @JoinColumn(name = "balance_id", nullable = false)
    private Balance balance;

    public Operation() {

    }

    public Operation(Article article, Float debit, Float credit, String createDate, Balance balance) {
        if ((credit < 0) || (debit < 0)) {
            throw new IllegalArgumentException("Приход и/или расход не могут быть отрицательными.");
        }

        this.article = article;
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

    public Article getArticle() {
        return article;
    }

    public void setArticle(Article article) {
        this.article = article;
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

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public Balance getBalance() {
        return balance;
    }

    public void setBalance(Balance balance) {
        this.balance = balance;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Operation operation = (Operation) o;
        return id.equals(operation.id) &&
                article.equals(operation.article) &&
                debit.equals(operation.debit) &&
                credit.equals(operation.credit) &&
                createDate.equals(operation.createDate) &&
                balance.equals(operation.balance);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, article, debit, credit, createDate, balance);
    }

    @Override
    public String toString() {
        return id + " : " + debit + " : " +
                credit +  " : " + createDate;
    }
}
