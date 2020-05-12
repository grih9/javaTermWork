package ru.spbstu.termWork.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
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

    @Column
    private String creditDate;

    @ManyToOne(targetEntity = Balance.class)
    @JoinColumn(name = "balance_id", nullable = false)
    private Balance balance;

//    @ManyToOne
//    @JoinColumn(name = "articleId")
//    private Articles article;
//
//    @ManyToOne
//    @JoinColumn(name = "balanceId")
//    private Balance balance;


    public Operations() {

    }

    public Operations(Articles articles, Float debit, Float credit, String creditDate, Balance balance) {
        if ((credit < 0) || (debit < 0)) {
            throw new IllegalArgumentException("Приход и/или расход не могут быть отрицательными.");
        }

        this.articles = articles;
        this.debit = debit;
        this.credit = credit;
        this.creditDate = creditDate;
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

    public String getCreditDate() {
        return creditDate;
    }

    public void setCreditDate(String creditDate) {
        this.creditDate = creditDate;
    }

    public Balance getBalance() {
        return balance;
    }

    public void setBalance(Balance balanceId) {
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

        Operations operations = (Operations) o;
        return id.equals(operations.id) &&
                articles.equals(operations.articles) &&
                debit.equals(operations.debit) &&
                credit.equals(operations.credit) &&
                creditDate.equals(operations.creditDate) &&
                balance.equals(operations.balance);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, articles, debit, credit, creditDate, balance);
    }

    @Override
    public String toString() {
        return id + " : " + debit + " : " +
                credit +  " : " + creditDate;
    }


}
