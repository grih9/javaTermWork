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
                amount.equals(balance.amount);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, creditDate, debit, credit, amount);
    }

    @Override
    public String toString() {
        return id + " : " + creditDate + " : " + debit + " : " +
                credit +  " : " + amount + ". Description - " + description;
    }
}
