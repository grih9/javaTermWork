package ru.spbstu.termWork.model;

import java.util.Objects;

public class Operations {
    private int id;
    private int articleId;
    private float debit;
    private float credit;
    private String creditDate;
    private int balanceId;

    public Operations(int id, int articleId, float debit, float credit, String creditDate, int balanceId) {
        if ((credit < 0) || (debit < 0)) {
            throw new IllegalArgumentException("Приход и/или расход не могут быть отрицательными.");
        }

        this.id = id;
        this.articleId = articleId;
        this.debit = debit;
        this.credit = credit;
        this.creditDate = creditDate;
        this.balanceId = balanceId;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getArticleId() {
        return articleId;
    }

    public void setArticleId(int articleId) {
        this.articleId = articleId;
    }

    public float getDebit() {
        return debit;
    }

    public void setDebit(float debit) {
        this.debit = debit;
    }

    public float getCredit() {
        return credit;
    }

    public void setCredit(float credit) {
        this.credit = credit;
    }

    public String getCreditDate() {
        return creditDate;
    }

    public void setCreditDate(String creditDate) {
        this.creditDate = creditDate;
    }

    public int getBalanceId() {
        return balanceId;
    }

    public void setBalanceId(int balanceId) {
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
        return id == operations.id &&
                articleId == operations.articleId &&
                debit == operations.debit &&
                credit == operations.credit &&
                creditDate.equals(operations.creditDate) &&
                balanceId == operations.balanceId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, articleId, debit, credit, creditDate, balanceId);
    }

    @Override
    public String toString() {
        return id + " : " + articleId + " : " +
                debit + " : " + credit +  " : " + creditDate + " : " + balanceId;
    }
}
