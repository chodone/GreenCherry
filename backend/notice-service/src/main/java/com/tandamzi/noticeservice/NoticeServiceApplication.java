package com.tandamzi.noticeservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
@EnableDiscoveryClient
@EnableJpaAuditing
@SpringBootApplication
@EnableFeignClients
public class NoticeServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(NoticeServiceApplication.class, args);
	}

}
