package com.tandamzi.storeservice.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CherryBox extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int quantity;
    private int totalPriceBeforeDiscount;
    private int priceBeforeDiscount;
    private int priceAfterDiscount;
    private double discountRate;
    private String description;

    public void updateCherryBox(int quantity, int totalPriceBeforeDiscount, double discountRate, int priceAfterDiscount){
        this.quantity = quantity;
        this.totalPriceBeforeDiscount = totalPriceBeforeDiscount;
        this.discountRate = discountRate;
        this.priceAfterDiscount = priceAfterDiscount;
        this.priceBeforeDiscount = (int)(totalPriceBeforeDiscount / quantity);
    }

    public void decreaseCherryBox(int quantity){
        this.quantity -= quantity;
    }

    public void updateDescription(String description) {
        if(description!=null){
            this.description = description;
        }
    }
}
