package ru.spbstu.termWork.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Balance {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;

    @Column(name = "creditDate", nullable = false)
    private String creditDate;

    @Column(name = "debit")
    private Float debit;

    @Column(name = "credit")
    private Float credit;

    @Column(name = "amount")
    private Float amount;

    private String description;

    public Balance() {

    }

    public Balance(String creditDate, Float debit, Float credit, Float amount, String description) {
        if ((credit < 0) || (debit < 0)) {
            throw new IllegalArgumentException("Приход и/или расход не могут быть отрицательными.");
        }

        this.creditDate = creditDate;
        this.debit = debit;
        this.credit = credit;
        this.amount = amount;
        this.description = description;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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
                amount.equals(balance.amount) &&
                description.equals(balance.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, creditDate, debit, credit, amount, description);
    }

    @Override
    public String toString() {
        return id + " : " + creditDate + " : " + debit + " : " +
                credit +  " : " + amount + ". Description - " + description;
    }
}
