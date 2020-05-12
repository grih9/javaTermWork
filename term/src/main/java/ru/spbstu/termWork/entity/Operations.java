package ru.spbstu.termWork.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Operations {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;

    @Column(name = "articleId")
    private Integer articleId;

    @Column(name = "debit")
    private Float debit;

    @Column(name = "credit")
    private Float credit;

    @Column(name = "creditDate", nullable = false)
    private String creditDate;

    @Column(name = "balanceId")
    private Integer balanceId;

    private String description;

    public Operations() {

    }

    public Operations(Integer articleId, Float debit, Float credit, String creditDate, Integer balanceId, String description) {
        if ((credit < 0) || (debit < 0)) {
            throw new IllegalArgumentException("Приход и/или расход не могут быть отрицательными.");
        }

        this.articleId = articleId;
        this.debit = debit;
        this.credit = credit;
        this.creditDate = creditDate;
        this.balanceId = balanceId;
        this.description = description;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getArticleId() {
        return articleId;
    }

    public void setArticleId(Integer articleId) {
        this.articleId = articleId;
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

    public Integer getBalanceId() {
        return balanceId;
    }

    public void setBalanceId(Integer balanceId) {
        this.balanceId = balanceId;
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
                articleId.equals(operations.articleId) &&
                debit.equals(operations.debit) &&
                credit.equals(operations.credit) &&
                creditDate.equals(operations.creditDate) &&
                balanceId.equals(operations.balanceId) &&
                description.equals(operations.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, articleId, debit, credit, creditDate, balanceId, description);
    }

    @Override
    public String toString() {
        return id + " : " + articleId + " : " + debit + " : " +
                credit +  " : " + creditDate + " : " + balanceId  + ". Description - " + description;
    }


}
