-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `access_token` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`access_token` varchar(100) NOT NULL DEFAULT '',
	`expires_in` bigint unsigned NOT NULL DEFAULT 0,
	`version` bigint unsigned NOT NULL DEFAULT 0,
	`token_type` varchar(100) NOT NULL DEFAULT '',
	CONSTRAINT `access_token_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `account` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`user_id` bigint NOT NULL,
	`name` varchar(255) NOT NULL,
	`bank_account_id` bigint,
	`total_balance` decimal(13,4) NOT NULL DEFAULT '0.0000',
	`available_balance` decimal(13,4) NOT NULL DEFAULT '0.0000',
	`freezed_balance` decimal(13,4) NOT NULL DEFAULT '0.0000',
	`color` varchar(10) NOT NULL DEFAULT 'white',
	`status` int NOT NULL DEFAULT 0,
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	`counterparty_id` varchar(100) NOT NULL DEFAULT 'create a counterpartyId',
	`counterparty_state` varchar(100) NOT NULL DEFAULT 'create a counterparty state',
	`counterparty_type` int NOT NULL,
	`internal_bank_account_id` varchar(100) DEFAULT '',
	CONSTRAINT `account_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `acquirer_order` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`acquirer_id` bigint NOT NULL,
	`recon_request_id` varchar(255) NOT NULL,
	`order_id` bigint NOT NULL,
	`type` int NOT NULL DEFAULT 0,
	`currency_id` bigint NOT NULL,
	`amount` decimal(13,4) NOT NULL,
	`status` int NOT NULL DEFAULT 0,
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	`payment_declined_payload` text,
	`payment_response_payload` text,
	`token_id` bigint,
	`response_code` varchar(255),
	`acs_transaction_id` varchar(255),
	CONSTRAINT `acquirer_order_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `acquirer_recon_batchrun` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`acquirer_id` tinyint NOT NULL,
	`recon_file_id` bigint NOT NULL,
	`acquirer_batch_payout_id` varchar(255) NOT NULL,
	`recon_start` datetime,
	`recon_end` datetime,
	`total_number_of_order` int,
	`matched_number_of_order` int,
	`unmatched_number_of_order` int,
	`total_captured_amount` decimal(13,4),
	`total_chargeback_amount` decimal(13,4),
	`total_refund_amount` decimal(13,4),
	`total_acquirer_fee_amount` decimal(13,4),
	`total_settled_amount` decimal(13,4),
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	`total_holding_currency_amount` decimal(13,4),
	`holding_currency` varchar(255),
	`fx_rates` json,
	CONSTRAINT `acquirer_recon_batchrun_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `address` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`address1` varchar(100) NOT NULL,
	`address2` varchar(100),
	`city` varchar(100),
	`state` varchar(100),
	`iso_3166_code` varchar(3),
	`country_name` varchar(100),
	`post_code` varchar(100),
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	CONSTRAINT `address_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `audit_log` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`audit_entity_type` tinyint NOT NULL,
	`entity_id` bigint NOT NULL,
	`saas_user_corporation_id` bigint NOT NULL,
	`requester_id` bigint NOT NULL,
	`content` text,
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	`action` tinyint(1),
	CONSTRAINT `audit_log_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bank_account` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`bank_name` varchar(50) NOT NULL,
	`bank_address_id` bigint,
	`sort_code` varchar(100),
	`account_number` varchar(100),
	`iban` varchar(100),
	`bic_swift` varchar(100),
	`currency_id` bigint NOT NULL,
	`type` int NOT NULL DEFAULT 0,
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	`routing_number` varchar(100),
	`bank_counterparty_id` varchar(100) DEFAULT '',
	`bank_country` varchar(5),
	`bsb_code` varchar(100),
	`ifsc` varchar(100),
	`clabe` varchar(100),
	`cpty_address_postcode` varchar(20),
	`cpty_address` varchar(100),
	`cpty_country` varchar(5),
	`cpty_city` varchar(5),
	`cpty_street_line1` varchar(100),
	`first_name` varchar(100) DEFAULT '',
	`last_name` varchar(100) DEFAULT '',
	`company_name` varchar(300) DEFAULT '',
	CONSTRAINT `bank_account_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `blacklisted_credit_cards` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`full_number` varchar(50) NOT NULL,
	`bin_number` varchar(10),
	`last_four_number` varchar(10),
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	CONSTRAINT `blacklisted_credit_cards_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `business_customer_corporation` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`user_id` bigint NOT NULL,
	`business_name` varchar(100) NOT NULL,
	`business_no` varchar(100),
	`business_address` bigint,
	`country` varchar(100),
	`industry` varchar(255),
	`side_industry` varchar(255),
	`registration_date` datetime,
	`registration_address` bigint,
	`shareholding_structure` varchar(100),
	`turnover_year` varchar(100),
	`turnover_week` varchar(100),
	`station` varchar(100),
	`website` varchar(255),
	`supplier_name` varchar(255),
	`supplier_contracts` varchar(255),
	`business_profile_status` tinyint NOT NULL DEFAULT 0,
	`director_profile_status` varchar(20),
	`director_document_status` varchar(255),
	`saas_user_corporation_id` bigint NOT NULL,
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`remark` varchar(500),
	`deleted` tinyint NOT NULL DEFAULT 0,
	`business_desc` text,
	`mid` varchar(255),
	`request_crypto_transaction_endpoint` varchar(255),
	`merchant_hash_secret_key` varchar(255),
	`notify_order_status_endpoint` varchar(255),
	`is_sift_on` tinyint NOT NULL DEFAULT 0,
	`is_3ds_on` tinyint NOT NULL DEFAULT 0,
	`crypto_delivery_method` tinyint DEFAULT 0,
	`is_house_merchant` tinyint DEFAULT 0,
	`notify_order_status_endpoint_2` varchar(255),
	`reserve_percentage` decimal(13,2),
	`reserve_holding_period` int,
	`settlement_currency` tinyint NOT NULL DEFAULT 2,
	`profit_sharing` longtext,
	`is_whitelist_on` tinyint NOT NULL DEFAULT 0,
	`notify_order_status_endpoint_3` varchar(350) NOT NULL DEFAULT '',
	`ani_check` tinyint DEFAULT 0,
	`acquirer_id` int DEFAULT 2,
	`order_status_change_notification` varchar(200),
	`crypto_delivery_delay_time` varchar(10),
	`three_d_success_url` varchar(255),
	`three_d_failure_url` varchar(255),
	`default_redirect_success_url` varchar(255),
	`default_redirect_failure_url` varchar(255),
	`on_ramp_min` decimal(13,4),
	`on_ramp_max` decimal(13,4),
	`off_ramp_min` decimal(13,4),
	`off_ramp_max` decimal(13,4),
	`notify_sof_status_endpoint` varchar(350) DEFAULT '',
	`site_id` varchar(100),
	CONSTRAINT `business_customer_corporation_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `business_customer_corporation_member` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`business_customer_corporation_id` bigint,
	`first_name` varchar(50),
	`middle_name` varchar(50),
	`last_name` varchar(20),
	`birthday` date,
	`nationality` varchar(30),
	`document_type` int,
	`document_no` varchar(100),
	`document_front_url` varchar(255),
	`document_back_url` varchar(255),
	`document_handy_url` varchar(255),
	`member_type` tinyint NOT NULL DEFAULT 0,
	`email` varchar(255),
	`country_code` varchar(255),
	`phone_number` varchar(20),
	`address` varchar(255),
	`city` varchar(255),
	`post_code` varchar(255),
	`country` varchar(255),
	`kyc_veriff_uuid` varchar(100),
	`kyc_status` int NOT NULL DEFAULT 0,
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`remark` varchar(500),
	`deleted` tinyint NOT NULL DEFAULT 0,
	`business_name` varchar(100),
	`business_registration_no` varchar(100),
	`kyc_sumsub_applicant_id` varchar(100),
	CONSTRAINT `business_customer_corporation_member_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `company_account` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`account_id` varchar(150) NOT NULL DEFAULT '',
	`currency` varchar(10) NOT NULL,
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	CONSTRAINT `company_account_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `config_acquirer` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`acquirer_name` varchar(255),
	`status` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `config_acquirer_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `config_checkout_error_mapping` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`code` varchar(255),
	`message` longtext,
	CONSTRAINT `config_checkout_error_mapping_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `config_continent` (
	`code` char(2) NOT NULL,
	`name` varchar(255),
	CONSTRAINT `config_continent_code` PRIMARY KEY(`code`)
);
--> statement-breakpoint
CREATE TABLE `config_country` (
	`code` char(2) NOT NULL,
	`name` varchar(255) NOT NULL,
	`full_name` varchar(255) NOT NULL,
	`iso3` char(3) NOT NULL,
	`number` char(3) NOT NULL,
	`continent_code` char(2) NOT NULL,
	CONSTRAINT `config_country_code` PRIMARY KEY(`code`)
);
--> statement-breakpoint
CREATE TABLE `config_document_type` (
	`code` varchar(50) NOT NULL,
	`description` varchar(500),
	`status` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `config_document_type_code` PRIMARY KEY(`code`)
);
--> statement-breakpoint
CREATE TABLE `config_mid` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`acquirer_id` bigint NOT NULL,
	`mid_code` varchar(255) NOT NULL,
	`description` varchar(500),
	`settlement_currency_id` bigint,
	`settlement_currency_type` tinyint NOT NULL,
	`status` tinyint NOT NULL DEFAULT 0,
	`site_id` varchar(255),
	`site_name` varchar(255),
	`client_id` varchar(255),
	`client_name` varchar(255),
	`acquirer_merchant_id` varchar(255),
	`type` int,
	`secret_key` varchar(100),
	`saas_user_corporation_id` int,
	`dynamic_descriptor` varchar(100),
	CONSTRAINT `config_mid_id` PRIMARY KEY(`id`),
	CONSTRAINT `mid_code` UNIQUE(`mid_code`)
);
--> statement-breakpoint
CREATE TABLE `config_order_status` (
	`code` varchar(20) NOT NULL,
	`desc` varchar(500),
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500)
);
--> statement-breakpoint
CREATE TABLE `config_risk_level` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `config_risk_level_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `conversion_rate` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`from_currency` varchar(20) NOT NULL,
	`to_currency` varchar(20) NOT NULL,
	`rate` decimal(40,20) NOT NULL,
	`updated_at` datetime DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `conversion_rate_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `crypto_currency` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`short_name` varchar(20),
	`name` varchar(20),
	`chain` varchar(20) NOT NULL,
	`b2c2_ticker` varchar(3) NOT NULL,
	`decimal_precision` int,
	`fireblocks_asset_id` varchar(20) NOT NULL,
	`is_utxo_based` tinyint NOT NULL DEFAULT 0,
	`blockchair_network_name` varchar(100),
	`coinlayer_ticker` varchar(20) NOT NULL,
	`liquidity_provider` varchar(10) NOT NULL,
	`okx_network_name` varchar(100),
	CONSTRAINT `crypto_currency_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `crypto_transaction` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`order_id` bigint NOT NULL,
	`transaction_id` varchar(256) DEFAULT '',
	`transaction_hash` varchar(256) DEFAULT '',
	`crypto_amount` decimal(16,6) NOT NULL,
	`network_fee` decimal(16,6) NOT NULL,
	`from_wallet` varchar(256) DEFAULT '',
	`to_wallet` varchar(256) DEFAULT '',
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	CONSTRAINT `crypto_transaction_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `currency` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`code` varchar(5) NOT NULL,
	`symbol` varchar(10) NOT NULL,
	`name` varchar(20),
	CONSTRAINT `currency_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `customer` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`user_id` bigint NOT NULL,
	`saas_user_corporation_id` bigint NOT NULL,
	`type` int NOT NULL,
	`manager` bigint,
	`subscription_model_id` bigint NOT NULL,
	`risk_level` bigint NOT NULL DEFAULT 1,
	`id_ref` varchar(100),
	`vip_id` bigint,
	`merchant_id` bigint,
	`sso_customer_id` varchar(100),
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	`fireblocks_vault_account_id` varchar(10),
	`sum_90_day` decimal(13,4),
	`referral_code` varchar(255),
	CONSTRAINT `customer_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `customer_address` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`customer_id` bigint NOT NULL,
	`address_id` bigint NOT NULL,
	`activated` tinyint NOT NULL DEFAULT 0,
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	CONSTRAINT `customer_address_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `customer_card_token` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`user_id` bigint NOT NULL,
	`acquirer_id` bigint NOT NULL,
	`token` varchar(500),
	`card_number` varchar(255),
	`card_type` varchar(100),
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	`bin` varchar(50),
	`scheme` varchar(50),
	`currency` varchar(50),
	`issuer` varchar(255),
	`issuer_country` varchar(50),
	`cardholder_name` varchar(255),
	`cardholder_email_address` varchar(255),
	CONSTRAINT `customer_card_token_id` PRIMARY KEY(`id`),
	CONSTRAINT `uc_card_number` UNIQUE(`card_number`)
);
--> statement-breakpoint
CREATE TABLE `customer_wallet` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`customer_id` bigint NOT NULL,
	`crypto_id` bigint NOT NULL,
	`wallet_address` varchar(256) DEFAULT '',
	`wallet_name` varchar(100) DEFAULT '',
	`active` tinyint NOT NULL DEFAULT 0,
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	CONSTRAINT `customer_wallet_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `documents` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`business_customer_corporation_id` bigint,
	`customer_id` bigint,
	`document_url` varchar(500),
	`document_type_code` varchar(50),
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`remark` varchar(500),
	`deleted` tinyint NOT NULL DEFAULT 0,
	`other_document_desc` text,
	`business_member_id` bigint,
	CONSTRAINT `documents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `fee_type` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`type` tinyint NOT NULL DEFAULT 0,
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	`risk_level` bigint,
	`transaction_type` int,
	CONSTRAINT `fee_type_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `house_wallet` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`crypto_id` bigint NOT NULL,
	`wallet_address` varchar(256) DEFAULT '',
	`wallet_name` varchar(100) DEFAULT '',
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	`saas_user_corporation_id` bigint NOT NULL,
	`is_default` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `house_wallet_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `kyc_info` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`user_id` bigint NOT NULL,
	`first_name` varchar(50) NOT NULL,
	`middle_name` varchar(50),
	`last_name` varchar(20) NOT NULL,
	`birthday` date,
	`nationality` varchar(30),
	`document_type` int NOT NULL,
	`document_no` varchar(100) NOT NULL,
	`document_front_url` varchar(255),
	`document_back_url` varchar(255),
	`document_handy_url` varchar(255),
	`kyc_payload` text,
	`kyc_aml_payload` text,
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	`sso_kyc` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `kyc_info_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `merchant_account` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`merchant_id` bigint unsigned NOT NULL DEFAULT 0,
	`account_id` varchar(150) NOT NULL DEFAULT '',
	`currency` varchar(10) NOT NULL,
	`min_balance` decimal(16,4) unsigned NOT NULL DEFAULT '0.0000',
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	CONSTRAINT `merchant_account_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `merchant_payout_ip` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`merchant_id` bigint unsigned NOT NULL DEFAULT 0,
	`payout_ips` varchar(1000) NOT NULL DEFAULT '',
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	CONSTRAINT `merchant_payout_ip_id` PRIMARY KEY(`id`),
	CONSTRAINT `uk_merchant_id` UNIQUE(`merchant_id`)
);
--> statement-breakpoint
CREATE TABLE `mfa_code` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`user_id` bigint NOT NULL,
	`code` varchar(6) NOT NULL,
	`otp_ascii` varchar(255),
	`otp_hex` varchar(255),
	`otp_base_32` varchar(255),
	`otp_auth_url` varchar(255),
	`expire_at` datetime,
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	CONSTRAINT `mfa_code_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `off_ramping_customer_wallet` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`crypto_id` bigint NOT NULL,
	`wallet_address` varchar(256) DEFAULT '',
	`wallet_name` varchar(100) DEFAULT '',
	`customer_id` bigint NOT NULL,
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	CONSTRAINT `off_ramping_customer_wallet_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `order` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`merchant_id` bigint NOT NULL,
	`customer_id` bigint NOT NULL,
	`customer_wallet_id` bigint NOT NULL,
	`type` int NOT NULL DEFAULT 0,
	`currency_id` bigint NOT NULL,
	`fiat_amount` decimal(13,4) NOT NULL,
	`crypto_id` bigint NOT NULL,
	`crypto_amount` decimal(16,6) NOT NULL,
	`processing_fee` decimal(13,4) NOT NULL,
	`liquidity_quote` decimal(13,4) NOT NULL,
	`liquidity_provider` varchar(255),
	`order_uuid` varchar(255),
	`reference` varchar(255),
	`travel_rule_status` tinyint NOT NULL DEFAULT 0,
	`status` int NOT NULL DEFAULT 0,
	`aml_id` varchar(255),
	`aml_payload` text,
	`aml_score` varchar(255),
	`aml_status` tinyint NOT NULL DEFAULT 0,
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	`travel_rule_id` varchar(256),
	`payment_ip` varchar(100),
	`mid` varchar(255),
	`is_otc` tinyint NOT NULL DEFAULT 0,
	`sso_order_id` varchar(255),
	`include_fee` tinyint NOT NULL DEFAULT 1,
	`sum_90_checked` tinyint(1),
	`fraud_score` varchar(255),
	`gateway_fee` decimal(13,4),
	`referral_code` varchar(255),
	`bank_account_id` bigint,
	`ani_code` varchar(255),
	`is_rollback` tinyint DEFAULT 0,
	`merchant_notification_type` tinyint,
	CONSTRAINT `order_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `order_recon` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`recon_id` bigint NOT NULL,
	`order_id` bigint NOT NULL,
	`acquirer_batch_payment_id` varchar(255) NOT NULL,
	`acquirer_payment_id` varchar(255) NOT NULL,
	`comment` varchar(500),
	`status` tinyint NOT NULL DEFAULT 0,
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	CONSTRAINT `order_recon_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pay_to_card` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`user_id` bigint NOT NULL,
	`currency_id` bigint NOT NULL,
	`counterparty_name` varchar(255) NOT NULL DEFAULT '',
	`counterparty_id` varchar(255) NOT NULL DEFAULT '',
	`state` varchar(255) NOT NULL,
	`created_at` datetime DEFAULT (CURRENT_TIMESTAMP),
	`link_id` varchar(255) NOT NULL DEFAULT '',
	`account_id` varchar(255) NOT NULL DEFAULT '',
	CONSTRAINT `pay_to_card_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `payment_setting` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`key` varchar(100) NOT NULL DEFAULT '',
	`value` varchar(1000) NOT NULL DEFAULT '',
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	CONSTRAINT `payment_setting_id` PRIMARY KEY(`id`),
	CONSTRAINT `uk_key` UNIQUE(`key`)
);
--> statement-breakpoint
CREATE TABLE `payout_info` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`order_id` bigint NOT NULL DEFAULT 0,
	`processing_fee` decimal(13,4) NOT NULL DEFAULT '0.0000',
	`deduct_payout_amount` decimal(13,4) NOT NULL DEFAULT '0.0000',
	`deduct_fee` decimal(13,4) NOT NULL DEFAULT '0.0000',
	`deduct_rate` decimal(13,4) NOT NULL DEFAULT '0.0000',
	`merchant_currency_id` bigint NOT NULL,
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	`transfer_type` tinyint NOT NULL DEFAULT 0,
	`counterparty_id` varchar(100) NOT NULL DEFAULT '',
	`arrive_time` datetime,
	CONSTRAINT `payout_info_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `payout_refund` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`refund_id` char(100) NOT NULL DEFAULT '',
	`type` char(50) NOT NULL DEFAULT '',
	`related_transaction_id` char(100) NOT NULL DEFAULT '',
	`leg_id` char(100) NOT NULL DEFAULT '',
	`account_id` char(100) NOT NULL DEFAULT '',
	`amount` decimal(16,6) NOT NULL DEFAULT '0.000000',
	`currency` char(10) NOT NULL DEFAULT '',
	`balance` decimal(16,6) NOT NULL DEFAULT '0.000000',
	`sssOrderid` char(100) NOT NULL DEFAULT '',
	`orderUuid` char(100) NOT NULL DEFAULT '',
	`refund_time` datetime,
	`created_time` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`original_amount` decimal(13,4) NOT NULL DEFAULT '0.0000',
	`merchant_id` int NOT NULL DEFAULT 0,
	`description` varchar(500) NOT NULL DEFAULT '',
	`account_name` varchar(100) NOT NULL DEFAULT '',
	`status` varchar(50) NOT NULL DEFAULT '',
	`updated_time` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `payout_refund_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `payout_sof` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`sso_customer_id` varchar(200) NOT NULL DEFAULT '',
	`merchant_id` int NOT NULL DEFAULT 0,
	`file_url` text NOT NULL,
	`file_type` int NOT NULL DEFAULT 0,
	`link` varchar(200) NOT NULL DEFAULT '',
	`wallet_address` varchar(200) NOT NULL DEFAULT '',
	`status` tinyint NOT NULL DEFAULT 1,
	`review_remark` varchar(1000) NOT NULL DEFAULT '',
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	`limit_amount` decimal(13,4) NOT NULL DEFAULT '0.0000',
	`sso_order_id` varchar(255) NOT NULL DEFAULT '',
	`order_uuid` varchar(255) NOT NULL DEFAULT '',
	`full_url` varchar(200) NOT NULL DEFAULT '',
	`review_time` datetime,
	`review_user_id` int DEFAULT 0,
	CONSTRAINT `payout_sof_id` PRIMARY KEY(`id`),
	CONSTRAINT `uk_order_uuid` UNIQUE(`order_uuid`)
);
--> statement-breakpoint
CREATE TABLE `recon_batch_job_file` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`upload_time` datetime,
	`file_url` varchar(500) NOT NULL,
	`status` tinyint NOT NULL DEFAULT 0,
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	`acquirer_id` bigint NOT NULL DEFAULT 2,
	`type` int,
	CONSTRAINT `recon_batch_job_file_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reset_password_link` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`user_id` bigint NOT NULL,
	`link` varchar(255) NOT NULL,
	`used` tinyint NOT NULL DEFAULT 0,
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	CONSTRAINT `reset_password_link_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `role` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`description` varchar(255),
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`remark` varchar(500),
	CONSTRAINT `role_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rolling_reserve_ledger` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`settlement_id` varchar(255),
	`merchant_id` bigint,
	`transaction_date` datetime,
	`transaction_type` tinyint,
	`reference` bigint,
	`rolling_balance` decimal(10,4),
	`payout_date` datetime,
	CONSTRAINT `rolling_reserve_ledger_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `saas_user` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`user_id` bigint NOT NULL,
	`corporation_id` bigint NOT NULL,
	`id_ref` varchar(100),
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	CONSTRAINT `saas_user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `saas_user_corporation` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`acquirer_id` bigint NOT NULL,
	`code` varchar(100) NOT NULL,
	`name` varchar(100),
	`domain` varchar(100) NOT NULL,
	`theme_url` varchar(255),
	`partner_bank` varchar(255) NOT NULL DEFAULT 'MOCK',
	`partner_bank_sort_code` varchar(255) NOT NULL DEFAULT '040605',
	`email_id_verify_code` varchar(255) NOT NULL DEFAULT 'd-3f5b5620f5bb4a0a964364f235560239',
	`email_id_veriff` varchar(255) NOT NULL DEFAULT 'd-c2769ba393fe452c80140b44d9a2cdef',
	`email_id_veriff_address` varchar(255) NOT NULL DEFAULT 'd-61bfd8d97f4f40d6bd5d07c558312a78',
	`email_id_bank` varchar(255) NOT NULL DEFAULT 'd-3747300bfb9d4247b45dee57af1a050c',
	`email_id_forgot_pwd` varchar(255) NOT NULL DEFAULT 'd-39b817bc637f4b1c818f8919bf7c3379',
	`email_id_veriff_kyc` varchar(255) NOT NULL DEFAULT 'd-a3a6b031ea5d49d29d9e1eb270aa7e77',
	`revenue_share` text,
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	`address_id` bigint NOT NULL,
	`notabene_vasp_did` varchar(256) NOT NULL,
	`notabene_client_id` varchar(255) NOT NULL,
	`notabene_client_secret` varchar(255) NOT NULL,
	`notabene_client_credentials` varchar(255) NOT NULL,
	`email_template_sendfrom` varchar(255) NOT NULL,
	`email_id_email_address_verification` varchar(255) NOT NULL,
	`legal_person_name` varchar(255),
	`house_wallet_provider` varchar(50) NOT NULL,
	`email_id_order_completion_notification` varchar(256) NOT NULL,
	`travel_rule_check_limit` int NOT NULL,
	`travel_rule_limit_currency_id` bigint NOT NULL,
	`fireblocks_withdrawal_account_id` bigint,
	`fireblocks_operational_account_id` bigint,
	`fireblocks_hidden_on_ui` tinyint,
	`fireblocks_auto_fuel` tinyint,
	`email_id_off_order_completion_notification` varchar(255),
	`email_id_off_order_failed_notification` varchar(255),
	`kyc_channel` tinyint unsigned NOT NULL,
	CONSTRAINT `saas_user_corporation_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `saas_user_corporation_off_ramp_supported_crypto_currency` (
	`id` bigint NOT NULL,
	`saas_user_corporation_id` bigint NOT NULL,
	`crypto_currency_id` bigint NOT NULL DEFAULT 1,
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500)
);
--> statement-breakpoint
CREATE TABLE `saas_user_corporation_off_ramp_supported_currency` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`saas_user_corporation_id` bigint NOT NULL,
	`currency_id` bigint NOT NULL DEFAULT 108,
	`is_basic_currency` tinyint(1) NOT NULL DEFAULT 0,
	`currency_account_checkout` varchar(100),
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	CONSTRAINT `saas_user_corporation_off_ramp_supported_currency_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `saas_user_corporation_supported_country` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`saas_user_corporation_id` bigint NOT NULL,
	`country_code` varchar(2) NOT NULL,
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	CONSTRAINT `saas_user_corporation_supported_country_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `saas_user_corporation_supported_crypto_currency` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`saas_user_corporation_id` bigint NOT NULL,
	`crypto_currency_id` bigint NOT NULL DEFAULT 1,
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	CONSTRAINT `saas_user_corporation_supported_crypto_currency_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `saas_user_corporation_supported_currency` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`saas_user_corporation_id` bigint NOT NULL,
	`currency_id` bigint NOT NULL DEFAULT 108,
	`is_basic_currency` tinyint(1) NOT NULL DEFAULT 0,
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	`currency_account_checkout` varchar(100),
	CONSTRAINT `saas_user_corporation_supported_currency_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `settlement_config` (
	`id` int AUTO_INCREMENT NOT NULL,
	`merchant_id` int NOT NULL,
	`percentage` decimal(13,2),
	`gateway_fee_great_than` decimal(13,2),
	`gateway_fee_less` decimal(13,2),
	`gateway_fee_more` decimal(13,2),
	`processing_fee_eu` decimal(13,2),
	`processing_fee_non_eu` decimal(13,2),
	`refund_fee` decimal(13,2),
	`rdr_fee` decimal(13,2),
	`cb_fee` decimal(13,2),
	CONSTRAINT `settlement_config_id` PRIMARY KEY(`id`),
	CONSTRAINT `settlement_config_merchant_id_index` UNIQUE(`merchant_id`)
);
--> statement-breakpoint
CREATE TABLE `settlement_currency` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`code` varchar(5) NOT NULL,
	`symbol` varchar(10) NOT NULL,
	`name` varchar(20),
	CONSTRAINT `settlement_currency_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `settlement_ledger` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`recon_id` bigint,
	`merchant_id` bigint,
	`settlement_amount` decimal(10,4),
	`chargebacks_refunds_amount` decimal(10,4),
	`rolling_reserve_deducted` decimal(10,4),
	`rolling_reserve_payout` decimal(10,4),
	`payout` decimal(10,4),
	`notes` varchar(255),
	`created_at` datetime,
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`remark` varchar(255),
	CONSTRAINT `settlement_ledger_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `signup_code` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`identifier` varchar(100) NOT NULL,
	`saas_user_corporation_id` bigint NOT NULL,
	`code` varchar(6) NOT NULL,
	`password` varchar(100) NOT NULL,
	`type` varchar(3),
	`expire_at` datetime,
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	`merchant_id` bigint NOT NULL,
	`referral_code` varchar(255),
	CONSTRAINT `signup_code_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscription_fee` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`subscription_model_id` bigint NOT NULL,
	`fee_type_id` bigint NOT NULL,
	`fixed_amount` decimal(13,2) NOT NULL,
	`percentage` decimal(13,2) NOT NULL,
	`option` int NOT NULL DEFAULT 0,
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	CONSTRAINT `subscription_fee_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscription_level` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`saas_user_corporation_id` bigint NOT NULL,
	`name` varchar(100) NOT NULL DEFAULT 'Default',
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	CONSTRAINT `subscription_level_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscription_model` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`saas_user_corporation_id` bigint NOT NULL,
	`model_name` varchar(100),
	`memo` varchar(500),
	`customer_type` int NOT NULL DEFAULT 0,
	`subscription_level_id` bigint NOT NULL,
	`currency_id` bigint NOT NULL,
	`default` tinyint NOT NULL DEFAULT 0,
	`status` int NOT NULL DEFAULT 0,
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	CONSTRAINT `subscription_model_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `transaction` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`order_id` bigint,
	`account_id` bigint NOT NULL,
	`currency_code` varchar(5) NOT NULL,
	`cp_name` varchar(100) NOT NULL,
	`cp_email` varchar(100) NOT NULL,
	`cp_bank_name` varchar(100) NOT NULL,
	`cp_sort_code` varchar(100) NOT NULL,
	`cp_account_name` varchar(100) NOT NULL,
	`cp_account_number` varchar(100) NOT NULL,
	`cp_iban` varchar(100) NOT NULL,
	`cp_bic_swift` varchar(100) NOT NULL,
	`type` int NOT NULL DEFAULT 0,
	`amount` decimal(13,4) NOT NULL,
	`fee_detail` text NOT NULL,
	`fee_amount` decimal(13,4) NOT NULL,
	`in_out` tinyint NOT NULL DEFAULT 0,
	`status` int NOT NULL DEFAULT 0,
	`comment` text,
	`internal` tinyint DEFAULT 0,
	`description` text,
	`risk_level` bigint NOT NULL DEFAULT 1,
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	CONSTRAINT `transaction_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `trx_mock` (
	`id` int AUTO_INCREMENT NOT NULL,
	`request_date` varchar(100) NOT NULL DEFAULT '',
	`status` varchar(100) NOT NULL DEFAULT '',
	`amount` float NOT NULL DEFAULT 0,
	`ccn` varchar(30) DEFAULT '',
	`customer_name` varchar(20) NOT NULL DEFAULT '',
	`customer_surname` varchar(30) NOT NULL DEFAULT '',
	`customer_address` varchar(100) NOT NULL DEFAULT '',
	`customer_email` varchar(40) NOT NULL DEFAULT '',
	`refund` tinyint DEFAULT 0,
	`chargeback` tinyint DEFAULT 0,
	CONSTRAINT `trx_mock_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`email` varchar(100),
	`country_code` varchar(3),
	`phone_number` varchar(20),
	`password` varchar(100),
	`display_name` varchar(100),
	`type` int,
	`avatar` varchar(100),
	`mfa_setting` int,
	`notification_setting` int,
	`kyc_id` bigint,
	`kyc_veriff_uuid` varchar(255),
	`kyc_status` int NOT NULL DEFAULT 0,
	`role` int NOT NULL DEFAULT 7,
	`activated` tinyint NOT NULL DEFAULT 0,
	`id_ref` varchar(100),
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	`kyc_sumsub_applicant_id` varchar(255) NOT NULL DEFAULT '',
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `vip` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`level` int NOT NULL DEFAULT 0,
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	CONSTRAINT `vip_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `whitelisted_credit_cards` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`full_number` varchar(50),
	`bin_number` varchar(10),
	`last_four_number` varchar(10),
	`email` varchar(100),
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	CONSTRAINT `whitelisted_credit_cards_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `whitelisted_credit_cards_old` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`full_number` varchar(50) NOT NULL,
	`bin_number` varchar(10),
	`last_four_number` varchar(10),
	`email` varchar(100) NOT NULL,
	`created_at` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`created_by` bigint,
	`deleted_at` datetime,
	`deleted_by` bigint,
	`deleted` tinyint NOT NULL DEFAULT 0,
	`remark` varchar(500),
	CONSTRAINT `whitelisted_credit_cards_old_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `account` ADD CONSTRAINT `account_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `account` ADD CONSTRAINT `account_ibfk_2` FOREIGN KEY (`bank_account_id`) REFERENCES `bank_account`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `acquirer_order` ADD CONSTRAINT `acquirer_order_ibfk_1` FOREIGN KEY (`acquirer_id`) REFERENCES `config_acquirer`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `acquirer_order` ADD CONSTRAINT `acquirer_order_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `order`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `acquirer_order` ADD CONSTRAINT `acquirer_order_ibfk_3` FOREIGN KEY (`token_id`) REFERENCES `customer_card_token`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `acquirer_recon_batchrun` ADD CONSTRAINT `acquirer_recon_batchrun_ibfk_1` FOREIGN KEY (`recon_file_id`) REFERENCES `recon_batch_job_file`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bank_account` ADD CONSTRAINT `bank_account_ibfk_1` FOREIGN KEY (`currency_id`) REFERENCES `currency`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bank_account` ADD CONSTRAINT `bank_account_ibfk_2` FOREIGN KEY (`bank_address_id`) REFERENCES `address`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `business_customer_corporation` ADD CONSTRAINT `business_customer_corporation_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `business_customer_corporation` ADD CONSTRAINT `business_customer_corporation_ibfk_2` FOREIGN KEY (`business_address`) REFERENCES `address`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `business_customer_corporation` ADD CONSTRAINT `business_customer_corporation_ibfk_3` FOREIGN KEY (`registration_address`) REFERENCES `address`(`id`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `business_customer_corporation` ADD CONSTRAINT `business_customer_corporation_ibfk_4` FOREIGN KEY (`saas_user_corporation_id`) REFERENCES `saas_user_corporation`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `business_customer_corporation` ADD CONSTRAINT `business_customer_corporation_ibfk_5` FOREIGN KEY (`mid`) REFERENCES `config_mid`(`mid_code`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `business_customer_corporation_member` ADD CONSTRAINT `business_customer_corporation_member_ibfk_1` FOREIGN KEY (`business_customer_corporation_id`) REFERENCES `business_customer_corporation`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `config_country` ADD CONSTRAINT `fk_country_continent` FOREIGN KEY (`continent_code`) REFERENCES `config_continent`(`code`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `config_mid` ADD CONSTRAINT `config_mid_ibfk_1` FOREIGN KEY (`acquirer_id`) REFERENCES `config_acquirer`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `crypto_transaction` ADD CONSTRAINT `crypto_transaction_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `customer` ADD CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `customer` ADD CONSTRAINT `customer_ibfk_2` FOREIGN KEY (`saas_user_corporation_id`) REFERENCES `saas_user_corporation`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `customer` ADD CONSTRAINT `customer_ibfk_3` FOREIGN KEY (`manager`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `customer` ADD CONSTRAINT `customer_ibfk_4` FOREIGN KEY (`subscription_model_id`) REFERENCES `subscription_model`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `customer` ADD CONSTRAINT `customer_ibfk_5` FOREIGN KEY (`vip_id`) REFERENCES `vip`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `customer` ADD CONSTRAINT `customer_ibfk_6` FOREIGN KEY (`risk_level`) REFERENCES `config_risk_level`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `customer_address` ADD CONSTRAINT `customer_address_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `customer_address` ADD CONSTRAINT `customer_address_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `address`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `customer_card_token` ADD CONSTRAINT `customer_card_token_ibfk_2` FOREIGN KEY (`acquirer_id`) REFERENCES `config_acquirer`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `customer_wallet` ADD CONSTRAINT `customer_wallet_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `customer_wallet` ADD CONSTRAINT `customer_wallet_ibfk_2` FOREIGN KEY (`crypto_id`) REFERENCES `crypto_currency`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `documents` ADD CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`business_customer_corporation_id`) REFERENCES `business_customer_corporation`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `documents` ADD CONSTRAINT `documents_ibfk_2` FOREIGN KEY (`document_type_code`) REFERENCES `config_document_type`(`code`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `documents` ADD CONSTRAINT `documents_ibfk_3` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `fee_type` ADD CONSTRAINT `fee_type_risk_level_fk` FOREIGN KEY (`risk_level`) REFERENCES `config_risk_level`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `house_wallet` ADD CONSTRAINT `FK_SAAS_USERCORPORATION` FOREIGN KEY (`saas_user_corporation_id`) REFERENCES `saas_user_corporation`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `house_wallet` ADD CONSTRAINT `house_wallet_ibfk_1` FOREIGN KEY (`crypto_id`) REFERENCES `crypto_currency`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `kyc_info` ADD CONSTRAINT `kyc_info_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `mfa_code` ADD CONSTRAINT `mfa_code_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `off_ramping_customer_wallet` ADD CONSTRAINT `off_ramping_customer_wallet_ibfk_1` FOREIGN KEY (`crypto_id`) REFERENCES `crypto_currency`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `off_ramping_customer_wallet` ADD CONSTRAINT `off_ramping_customer_wallet_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `user_id` ON `account` (`user_id`);--> statement-breakpoint
CREATE INDEX `bank_account_id` ON `account` (`bank_account_id`);--> statement-breakpoint
CREATE INDEX `acquirer_id` ON `acquirer_order` (`acquirer_id`);--> statement-breakpoint
CREATE INDEX `order_id` ON `acquirer_order` (`order_id`);--> statement-breakpoint
CREATE INDEX `token_id` ON `acquirer_order` (`token_id`);--> statement-breakpoint
CREATE INDEX `idx_recon_request_id` ON `acquirer_order` (`recon_request_id`);--> statement-breakpoint
CREATE INDEX `idx_acs_trx_id` ON `acquirer_order` (`acs_transaction_id`);--> statement-breakpoint
CREATE INDEX `recon_file_id` ON `acquirer_recon_batchrun` (`recon_file_id`);--> statement-breakpoint
CREATE INDEX `currency_id` ON `bank_account` (`currency_id`);--> statement-breakpoint
CREATE INDEX `bank_address_id` ON `bank_account` (`bank_address_id`);--> statement-breakpoint
CREATE INDEX `user_id` ON `business_customer_corporation` (`user_id`);--> statement-breakpoint
CREATE INDEX `saas_user_corporation_id` ON `business_customer_corporation` (`saas_user_corporation_id`);--> statement-breakpoint
CREATE INDEX `mid` ON `business_customer_corporation` (`mid`);--> statement-breakpoint
CREATE INDEX `settlement_currency_fk` ON `business_customer_corporation` (`settlement_currency`);--> statement-breakpoint
CREATE INDEX `business_customer_corporation_id` ON `business_customer_corporation_member` (`business_customer_corporation_id`);--> statement-breakpoint
CREATE INDEX `continent_code` ON `config_country` (`continent_code`);--> statement-breakpoint
CREATE INDEX `acquirer_id` ON `config_mid` (`acquirer_id`);--> statement-breakpoint
CREATE INDEX `idx_from_to_currency` ON `conversion_rate` (`from_currency`,`to_currency`);--> statement-breakpoint
CREATE INDEX `order_id` ON `crypto_transaction` (`order_id`);--> statement-breakpoint
CREATE INDEX `user_id` ON `customer` (`user_id`);--> statement-breakpoint
CREATE INDEX `saas_user_corporation_id` ON `customer` (`saas_user_corporation_id`);--> statement-breakpoint
CREATE INDEX `manager` ON `customer` (`manager`);--> statement-breakpoint
CREATE INDEX `vip_id` ON `customer` (`vip_id`);--> statement-breakpoint
CREATE INDEX `risk_level` ON `customer` (`risk_level`);--> statement-breakpoint
CREATE INDEX `idx_customer_sso_customer_id` ON `customer` (`sso_customer_id`);--> statement-breakpoint
CREATE INDEX `comb_idx_customer_id_merchant_id` ON `customer` (`id`,`merchant_id`);--> statement-breakpoint
CREATE INDEX `customer_id` ON `customer_address` (`customer_id`);--> statement-breakpoint
CREATE INDEX `address_id` ON `customer_address` (`address_id`);--> statement-breakpoint
CREATE INDEX `user_id` ON `customer_card_token` (`user_id`);--> statement-breakpoint
CREATE INDEX `acquirer_id` ON `customer_card_token` (`acquirer_id`);--> statement-breakpoint
CREATE INDEX `customer_id` ON `customer_wallet` (`customer_id`);--> statement-breakpoint
CREATE INDEX `crypto_id` ON `customer_wallet` (`crypto_id`);--> statement-breakpoint
CREATE INDEX `business_customer_corporation_id` ON `documents` (`business_customer_corporation_id`);--> statement-breakpoint
CREATE INDEX `document_type_code` ON `documents` (`document_type_code`);--> statement-breakpoint
CREATE INDEX `customer_id` ON `documents` (`customer_id`);--> statement-breakpoint
CREATE INDEX `crypto_id` ON `house_wallet` (`crypto_id`);--> statement-breakpoint
CREATE INDEX `user_id` ON `kyc_info` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_merchant_id_currency` ON `merchant_account` (`merchant_id`,`currency`);--> statement-breakpoint
CREATE INDEX `user_id` ON `mfa_code` (`user_id`);--> statement-breakpoint
CREATE INDEX `crypto_id` ON `off_ramping_customer_wallet` (`crypto_id`);--> statement-breakpoint
CREATE INDEX `customer_id` ON `off_ramping_customer_wallet` (`customer_id`);--> statement-breakpoint
CREATE INDEX `customer_id` ON `order` (`customer_id`);--> statement-breakpoint
CREATE INDEX `customer_wallet_id` ON `order` (`customer_wallet_id`);--> statement-breakpoint
CREATE INDEX `currency_id` ON `order` (`currency_id`);--> statement-breakpoint
CREATE INDEX `crypto_id` ON `order` (`crypto_id`);--> statement-breakpoint
CREATE INDEX `mid` ON `order` (`mid`);--> statement-breakpoint
CREATE INDEX `idx_sso_order_id` ON `order` (`sso_order_id`);--> statement-breakpoint
CREATE INDEX `idx_order_uuid` ON `order` (`order_uuid`);--> statement-breakpoint
CREATE INDEX `idx_created_at_merchant_id` ON `order` (`created_at`,`merchant_id`);--> statement-breakpoint
CREATE INDEX `bank_account_id` ON `order` (`bank_account_id`);--> statement-breakpoint
CREATE INDEX `idx_order_id` ON `payout_info` (`order_id`);--> statement-breakpoint
CREATE INDEX `idx_link` ON `payout_sof` (`link`);--> statement-breakpoint
CREATE INDEX `idx_created_at` ON `payout_sof` (`created_at`);--> statement-breakpoint
CREATE INDEX `user_id` ON `reset_password_link` (`user_id`);--> statement-breakpoint
CREATE INDEX `user_id` ON `saas_user` (`user_id`);--> statement-breakpoint
CREATE INDEX `corporation_id` ON `saas_user` (`corporation_id`);--> statement-breakpoint
CREATE INDEX `acquirer_id` ON `saas_user_corporation` (`acquirer_id`);--> statement-breakpoint
CREATE INDEX `FK_ADDRESS` ON `saas_user_corporation` (`address_id`);--> statement-breakpoint
CREATE INDEX `saas_user_corporation_currency_fk` ON `saas_user_corporation` (`travel_rule_limit_currency_id`);--> statement-breakpoint
CREATE INDEX `saas_user_corporation_id` ON `saas_user_corporation_off_ramp_supported_currency` (`saas_user_corporation_id`);--> statement-breakpoint
CREATE INDEX `currency_id` ON `saas_user_corporation_off_ramp_supported_currency` (`currency_id`);--> statement-breakpoint
CREATE INDEX `saas_user_corporation_id` ON `saas_user_corporation_supported_country` (`saas_user_corporation_id`);--> statement-breakpoint
CREATE INDEX `country_code` ON `saas_user_corporation_supported_country` (`country_code`);--> statement-breakpoint
CREATE INDEX `saas_user_corporation_id` ON `saas_user_corporation_supported_crypto_currency` (`saas_user_corporation_id`);--> statement-breakpoint
CREATE INDEX `crypto_currency_id` ON `saas_user_corporation_supported_crypto_currency` (`crypto_currency_id`);--> statement-breakpoint
CREATE INDEX `saas_user_corporation_id` ON `saas_user_corporation_supported_currency` (`saas_user_corporation_id`);--> statement-breakpoint
CREATE INDEX `currency_id` ON `saas_user_corporation_supported_currency` (`currency_id`);--> statement-breakpoint
CREATE INDEX `saas_user_corporation_id` ON `signup_code` (`saas_user_corporation_id`);--> statement-breakpoint
CREATE INDEX `idx_signup_code_identifier` ON `signup_code` (`identifier`);--> statement-breakpoint
CREATE INDEX `subscription_model_id` ON `subscription_fee` (`subscription_model_id`);--> statement-breakpoint
CREATE INDEX `fee_type_id` ON `subscription_fee` (`fee_type_id`);--> statement-breakpoint
CREATE INDEX `saas_user_corporation_id` ON `subscription_level` (`saas_user_corporation_id`);--> statement-breakpoint
CREATE INDEX `saas_user_corporation_id` ON `subscription_model` (`saas_user_corporation_id`);--> statement-breakpoint
CREATE INDEX `subscription_level_id` ON `subscription_model` (`subscription_level_id`);--> statement-breakpoint
CREATE INDEX `currency_id` ON `subscription_model` (`currency_id`);--> statement-breakpoint
CREATE INDEX `account_id` ON `transaction` (`account_id`);--> statement-breakpoint
CREATE INDEX `order_id` ON `transaction` (`order_id`);--> statement-breakpoint
CREATE INDEX `risk_level` ON `transaction` (`risk_level`);--> statement-breakpoint
CREATE INDEX `trx_mock_ccn_index` ON `trx_mock` (`ccn`);--> statement-breakpoint
CREATE INDEX `kyc_id` ON `user` (`kyc_id`);--> statement-breakpoint
CREATE INDEX `idx_user_uuid` ON `user` (`kyc_veriff_uuid`);--> statement-breakpoint
CREATE INDEX `idx_user_email` ON `user` (`email`);--> statement-breakpoint
CREATE INDEX `comb_idx_partial_card_number` ON `whitelisted_credit_cards_old` (`bin_number`,`last_four_number`);--> statement-breakpoint
CREATE INDEX `comb_idx_partial_card_number_dlt` ON `whitelisted_credit_cards_old` (`bin_number`,`last_four_number`,`deleted_at`);
*/