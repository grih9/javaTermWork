package ru.spbstu.termWork.model;

import java.util.Objects;

public class Balance {
    private int id;
    private String creditDate;
    private float debit;
    private float credit;
    private float amount;

    public Balance(int id, String creditDate, float debit, float credit, float amount) {
        if ((credit < 0) || (debit < 0)) {
            throw new IllegalArgumentException("Приход и/или расход не могут быть отрицательными.");
        }

        this.id = id;
        this.creditDate = creditDate;
        this.debit = debit;
        this.credit = credit;
        this.amount = amount;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCreditDate() {
        return creditDate;
    }

    public void setCreditDate(String creditDate) {
        this.creditDate = creditDate;
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

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Balance balance = (Balance) o;
        return id == balance.id &&
                creditDate.equals(balance.creditDate) &&
                debit == balance.debit &&
                credit == balance.credit &&
                amount == balance.amount;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, creditDate, debit, credit, amount);
    }

    @Override
    public String toString() {
        return id + " : " + creditDate + " : " +
                debit + " : " + credit +  " : " + amount;
    }
}
