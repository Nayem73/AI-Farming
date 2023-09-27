package com.javafest.aifarming.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Date;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Entity(name = "PaymentInfo")
@Table(name = "payment_info")
public class PaymentInfo {
    @Id
    @SequenceGenerator(
            name = "payment_info_sequence",
            sequenceName = "payment_info_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "payment_info_sequence"
    )
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;



    public Date getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }

    @Column(name = "expiry_date")
    private Date expiryDate;

    @Column(name = "tran_id")
    private String tranId;

    @Column(name = "amount")
    private String amount;

    @ManyToOne
    @JoinColumn(
            name = "payment_info_id",
            referencedColumnName = "id",
            nullable = false,
            foreignKey = @ForeignKey(
                    name = "user_payment_foreign_key"
            )
    )
    private UserInfo userInfo;

    public UserInfo getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(UserInfo userInfo) {
        this.userInfo = userInfo;
    }

    @Column(name = "val_id")
    private String valId;

    @Column(name = "card_type")
    private String cardType;

    @Column(name = "store_amount")
    private String storeAmount;

    @Column(name = "card_no")
    private String cardNo;

    @Column(name = "bank_tran_id")
    private String bankTranId;

    @Column(name = "status")
    private String status;

    @Column(name = "tran_date")
    String tranDate;
//    private LocalDateTime tranDate;

    @Column(name = "currency")
    private String currency;

    @Column(name = "card_issuer")
    private String cardIssuer;

    @Column(name = "card_brand")
    private String cardBrand;

    @Column(name = "card_issuer_country")
    private String cardIssuerCountry;

    @Column(name = "card_issuer_country_code")
    private String cardIssuerCountryCode;

    @Column(name = "store_id")
    private String storeId;

    @Column(name = "verify_sign")
    private String verifySign;

    @Column(name = "verify_key")
    private String verifyKey;

    @Column(name = "base_fair")
    private String baseFair;

    @Column(name = "currency_type")
    private String currencyType;

    @Column(name = "currency_amount")
    private String currencyAmount;

    @Column(name = "currency_rate")
    private String currencyRate;

    @Column(name = "risk_level")
    private String riskLevel;

    @Column(name = "risk_title")
    private String riskTitle;

    @Column(name = "value_a")
    private String valueA;

    @Column(name = "value_b")
    private String valueB;

    @Column(name = "value_c")
    private String valueC;

    @Column(name = "value_d")
    private String valueD;

    @Column(name = "verify_sign_sha2")
    private String verifySignSha2;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTranId() {
        return tranId;
    }

    public void setTranId(String tranId) {
        this.tranId = tranId;
    }

    public String getValId() {
        return valId;
    }

    public void setValId(String valId) {
        this.valId = valId;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getCardType() {
        return cardType;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }

    public String getStoreAmount() {
        return storeAmount;
    }

    public void setStoreAmount(String storeAmount) {
        this.storeAmount = storeAmount;
    }

    public String getCardNo() {
        return cardNo;
    }

    public void setCardNo(String cardNo) {
        this.cardNo = cardNo;
    }

    public String getBankTranId() {
        return bankTranId;
    }

    public void setBankTranId(String bankTranId) {
        this.bankTranId = bankTranId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTranDate() {
        return tranDate;
    }

    public void setTranDate(String tranDate) {
        this.tranDate = tranDate;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getCardIssuer() {
        return cardIssuer;
    }

    public void setCardIssuer(String cardIssuer) {
        this.cardIssuer = cardIssuer;
    }

    public String getCardBrand() {
        return cardBrand;
    }

    public void setCardBrand(String cardBrand) {
        this.cardBrand = cardBrand;
    }

    public String getCardIssuerCountry() {
        return cardIssuerCountry;
    }

    public void setCardIssuerCountry(String cardIssuerCountry) {
        this.cardIssuerCountry = cardIssuerCountry;
    }

    public String getCardIssuerCountryCode() {
        return cardIssuerCountryCode;
    }

    public void setCardIssuerCountryCode(String cardIssuerCountryCode) {
        this.cardIssuerCountryCode = cardIssuerCountryCode;
    }

    public String getStoreId() {
        return storeId;
    }

    public void setStoreId(String storeId) {
        this.storeId = storeId;
    }

    public String getVerifySign() {
        return verifySign;
    }

    public void setVerifySign(String verifySign) {
        this.verifySign = verifySign;
    }

    public String getVerifyKey() {
        return verifyKey;
    }

    public void setVerifyKey(String verifyKey) {
        this.verifyKey = verifyKey;
    }

    public String getBaseFair() {
        return baseFair;
    }

    public void setBaseFair(String baseFair) {
        this.baseFair = baseFair;
    }

    public String getCurrencyType() {
        return currencyType;
    }

    public void setCurrencyType(String currencyType) {
        this.currencyType = currencyType;
    }

    public String getCurrencyAmount() {
        return currencyAmount;
    }

    public void setCurrencyAmount(String currencyAmount) {
        this.currencyAmount = currencyAmount;
    }

    public String getCurrencyRate() {
        return currencyRate;
    }

    public void setCurrencyRate(String currencyRate) {
        this.currencyRate = currencyRate;
    }

    public String getRiskLevel() {
        return riskLevel;
    }

    public void setRiskLevel(String riskLevel) {
        this.riskLevel = riskLevel;
    }

    public String getRiskTitle() {
        return riskTitle;
    }

    public void setRiskTitle(String riskTitle) {
        this.riskTitle = riskTitle;
    }

    public String getValueA() {
        return valueA;
    }

    public void setValueA(String valueA) {
        this.valueA = valueA;
    }

    public String getValueB() {
        return valueB;
    }

    public void setValueB(String valueB) {
        this.valueB = valueB;
    }

    public String getValueC() {
        return valueC;
    }

    public void setValueC(String valueC) {
        this.valueC = valueC;
    }

    public String getValueD() {
        return valueD;
    }

    public void setValueD(String valueD) {
        this.valueD = valueD;
    }

    public String getVerifySignSha2() {
        return verifySignSha2;
    }

    public void setVerifySignSha2(String verifySignSha2) {
        this.verifySignSha2 = verifySignSha2;
    }
}
