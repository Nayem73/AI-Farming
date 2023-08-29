package com.javafest.aifarming.repository;

import com.javafest.aifarming.model.PaymentInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PaymentInfoRepository extends JpaRepository<PaymentInfo, Long> {

    @Query("SELECT c FROM PaymentInfo c WHERE c.tranId = ?1")
    PaymentInfo findByTranId(String tranId);
}
