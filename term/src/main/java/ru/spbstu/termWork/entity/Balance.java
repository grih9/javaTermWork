package ru.spbstu.termWork.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Balance {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Long id;

    @Column(nullable = false)
    private String creditDate;

    @Column
    private Float debit;

    @Column
    private Float credit;

    @Column
    private Float amount;

    public Balance() {

    }

    public Balance(String creditDate, Float debit, Float credit, Float amount) {
        if ((credit < 0) || (debit < 0)) {
            throw new IllegalArgumentException("Приход и/или расход не могут быть отрицательными.");
        }

        this.creditDate = creditDate;
        this.debit = debit;
        this.credit = credit;
        this.amount = amount;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCreditDate() {
        return creditDate;
    }

    public void setCreditDate(String creditDate) {
        this.creditDate = creditDate;
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

    public Float getAmount() {
        return amount;
    }

    public void setAmount(Float amount) {
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
        return id.equals(balance.id) &&
                creditDate.equals(balance.creditDate) &&
                debit.equals(balance.debit) &&
                credit.equals(balance.credit) &&
                amount.equals(balance.amount);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, creditDate, debit, credit, amount);
    }

    @Override
    public String toString() {
        return id + " : " + creditDate + " : " + debit + " : " +
                credit +  " : " + amount;
    }
}
