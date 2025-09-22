-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `nuvie_dispute_data` (
	`id` int AUTO_INCREMENT NOT NULL,
	`upload_id` int NOT NULL DEFAULT 0,
	`transaction_date` datetime NOT NULL,
	`method_name` tinyint NOT NULL DEFAULT 0,
	`dispute_status` varchar(250) NOT NULL DEFAULT '',
	`dispute_reason` varchar(250) NOT NULL DEFAULT '',
	`dispute_category` varchar(250) NOT NULL DEFAULT '',
	`dispute_amount` decimal(13,4) NOT NULL DEFAULT '0.0000',
	`currency` varchar(20) NOT NULL DEFAULT '',
	`bin` int NOT NULL DEFAULT 0,
	`order_id` int NOT NULL DEFAULT 0,
	`quote` decimal(13,4) NOT NULL DEFAULT '0.0000',
	`sso_order_id` varchar(255) NOT NULL DEFAULT '',
	`order_uuid` varchar(255) NOT NULL DEFAULT '',
	`merchant_id` bigint NOT NULL DEFAULT 0,
	`currency_id` bigint NOT NULL DEFAULT 0,
	`final_amount` decimal(13,4) NOT NULL DEFAULT '0.0000',
	`order_created` datetime NOT NULL,
	`crypto_amount` decimal(16,6) NOT NULL DEFAULT '0.000000',
	`order_status` tinyint NOT NULL DEFAULT 0,
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	`issuer_country` varchar(200) NOT NULL DEFAULT '',
	`dispute_date` datetime NOT NULL,
	CONSTRAINT `nuvie_dispute_data_id` PRIMARY KEY(`id`),
	CONSTRAINT `uk_order_id` UNIQUE(`order_id`)
);
--> statement-breakpoint
CREATE TABLE `nuvie_dispute_file` (
	`id` int AUTO_INCREMENT NOT NULL,
	`upload_id` int NOT NULL DEFAULT 0,
	`transaction_date` datetime NOT NULL,
	`method_name` tinyint NOT NULL DEFAULT 0,
	`dispute_status` varchar(250) NOT NULL DEFAULT '',
	`dispute_reason` varchar(250) NOT NULL DEFAULT '',
	`dispute_category` varchar(250) NOT NULL DEFAULT '',
	`dispute_amount` decimal(13,4) NOT NULL DEFAULT '0.0000',
	`currency` varchar(20) NOT NULL DEFAULT '',
	`bin` int NOT NULL DEFAULT 0,
	`order_id` int NOT NULL DEFAULT 0,
	`status` tinyint NOT NULL DEFAULT 0,
	`fail_reason` varchar(300) NOT NULL DEFAULT '',
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	`issuer_country` varchar(200) NOT NULL DEFAULT '',
	`dispute_date` datetime NOT NULL,
	CONSTRAINT `nuvie_dispute_file_id` PRIMARY KEY(`id`),
	CONSTRAINT `uk_order_id` UNIQUE(`order_id`)
);
--> statement-breakpoint
CREATE TABLE `nuvie_fraud_data` (
	`id` int AUTO_INCREMENT NOT NULL,
	`upload_id` int NOT NULL DEFAULT 0,
	`report_date` datetime NOT NULL,
	`fraud_amount` decimal(13,4) NOT NULL DEFAULT '0.0000',
	`fraud_currency` varchar(20) NOT NULL DEFAULT '',
	`method_name` tinyint NOT NULL DEFAULT 0,
	`bin` int NOT NULL DEFAULT 0,
	`order_id` int NOT NULL DEFAULT 0,
	`transaction_date` datetime NOT NULL,
	`issuer_country` varchar(200) NOT NULL DEFAULT '',
	`sso_order_id` varchar(255) NOT NULL DEFAULT '',
	`order_uuid` varchar(255) NOT NULL DEFAULT '',
	`merchant_id` bigint NOT NULL DEFAULT 0,
	`currency_id` bigint NOT NULL DEFAULT 0,
	`final_amount` decimal(13,4) NOT NULL DEFAULT '0.0000',
	`order_created` datetime NOT NULL,
	`crypto_amount` decimal(16,6) NOT NULL DEFAULT '0.000000',
	`order_status` tinyint NOT NULL DEFAULT 0,
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	`quote` decimal(13,4) NOT NULL DEFAULT '0.0000',
	CONSTRAINT `nuvie_fraud_data_id` PRIMARY KEY(`id`),
	CONSTRAINT `uk_order_id` UNIQUE(`order_id`)
);
--> statement-breakpoint
CREATE TABLE `nuvie_fraud_file` (
	`id` int AUTO_INCREMENT NOT NULL,
	`upload_id` int NOT NULL DEFAULT 0,
	`report_date` datetime NOT NULL,
	`fraud_amount` decimal(13,4) NOT NULL DEFAULT '0.0000',
	`fraud_currency` varchar(20) NOT NULL DEFAULT '',
	`method_name` tinyint NOT NULL DEFAULT 0,
	`bin` int NOT NULL DEFAULT 0,
	`order_id` int NOT NULL DEFAULT 0,
	`transaction_date` datetime NOT NULL,
	`issuer_country` varchar(200) NOT NULL DEFAULT '',
	`status` tinyint NOT NULL DEFAULT 0,
	`fail_reason` varchar(300) NOT NULL DEFAULT '',
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	CONSTRAINT `nuvie_fraud_file_id` PRIMARY KEY(`id`),
	CONSTRAINT `uk_order_id` UNIQUE(`order_id`)
);
--> statement-breakpoint
CREATE TABLE `nuvie_transaction_data` (
	`id` int AUTO_INCREMENT NOT NULL,
	`upload_id` int NOT NULL DEFAULT 0,
	`date` datetime NOT NULL,
	`amount` decimal(13,4) NOT NULL DEFAULT '0.0000',
	`currency` varchar(20) NOT NULL DEFAULT '',
	`transaction_result` varchar(200) NOT NULL DEFAULT '',
	`method_name` tinyint NOT NULL DEFAULT 0,
	`bin` int NOT NULL DEFAULT 0,
	`order_id` int NOT NULL DEFAULT 0,
	`reason_code` varchar(200) NOT NULL DEFAULT '',
	`quote` decimal(13,4) NOT NULL DEFAULT '0.0000',
	`sso_order_id` varchar(255) NOT NULL DEFAULT '',
	`order_uuid` varchar(255) NOT NULL DEFAULT '',
	`merchant_id` bigint NOT NULL DEFAULT 0,
	`currency_id` bigint NOT NULL DEFAULT 0,
	`final_amount` decimal(13,4) NOT NULL DEFAULT '0.0000',
	`order_created` datetime NOT NULL,
	`crypto_amount` decimal(16,6) NOT NULL DEFAULT '0.000000',
	`order_status` tinyint NOT NULL DEFAULT 0,
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	`transaction_id` varchar(250) NOT NULL DEFAULT '',
	`issuer_country` varchar(200) NOT NULL DEFAULT '',
	CONSTRAINT `nuvie_transaction_data_id` PRIMARY KEY(`id`),
	CONSTRAINT `uk_unique_transaction_order_result` UNIQUE(`transaction_id`,`order_id`,`transaction_result`)
);
--> statement-breakpoint
CREATE TABLE `nuvie_transaction_file` (
	`id` int AUTO_INCREMENT NOT NULL,
	`upload_id` int NOT NULL DEFAULT 0,
	`date` datetime NOT NULL,
	`amount` decimal(13,4) NOT NULL DEFAULT '0.0000',
	`currency` varchar(20) NOT NULL DEFAULT '',
	`transaction_result` varchar(200) NOT NULL DEFAULT '',
	`method_name` tinyint NOT NULL DEFAULT 0,
	`bin` int NOT NULL DEFAULT 0,
	`order_id` int NOT NULL DEFAULT 0,
	`status` tinyint NOT NULL DEFAULT 0,
	`fail_reason` varchar(300) NOT NULL DEFAULT '',
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	`reason_code` varchar(200) NOT NULL DEFAULT '',
	`transaction_id` varchar(250) NOT NULL DEFAULT '',
	`issuer_country` varchar(200) NOT NULL DEFAULT '',
	CONSTRAINT `nuvie_transaction_file_id` PRIMARY KEY(`id`),
	CONSTRAINT `uk_unique_transaction_order_result` UNIQUE(`transaction_id`,`order_id`,`transaction_result`)
);
--> statement-breakpoint
CREATE TABLE `report_data_record` (
	`id` int AUTO_INCREMENT NOT NULL,
	`reference` varchar(100),
	`type` int,
	`url` varchar(200),
	`line_count` int,
	`status` int DEFAULT 0,
	`created_time` datetime DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `report_data_record_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `report_quote` (
	`id` int AUTO_INCREMENT NOT NULL,
	`from_code` varchar(10) NOT NULL DEFAULT '',
	`from_id` int NOT NULL DEFAULT 0,
	`to_code` varchar(10) NOT NULL DEFAULT '',
	`to_id` int NOT NULL DEFAULT 0,
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	`quote` decimal(13,4) NOT NULL DEFAULT '0.0000',
	CONSTRAINT `report_quote_id` PRIMARY KEY(`id`),
	CONSTRAINT `uk_from_code_to_code` UNIQUE(`from_code`,`to_code`)
);
--> statement-breakpoint
CREATE INDEX `idx_upload_id` ON `nuvie_dispute_data` (`upload_id`);--> statement-breakpoint
CREATE INDEX `idx_merchant_id` ON `nuvie_dispute_data` (`merchant_id`);--> statement-breakpoint
CREATE INDEX `idx_transaction_date_merchant_id` ON `nuvie_dispute_data` (`transaction_date`,`merchant_id`);--> statement-breakpoint
CREATE INDEX `idx_dispute_date_merchant_id` ON `nuvie_dispute_data` (`dispute_date`,`merchant_id`);--> statement-breakpoint
CREATE INDEX `idx_upload_id` ON `nuvie_dispute_file` (`upload_id`);--> statement-breakpoint
CREATE INDEX `idx_upload_id` ON `nuvie_fraud_data` (`upload_id`);--> statement-breakpoint
CREATE INDEX `idx_merchant_id` ON `nuvie_fraud_data` (`merchant_id`);--> statement-breakpoint
CREATE INDEX `idx_report_date_merchant_id` ON `nuvie_fraud_data` (`report_date`,`merchant_id`);--> statement-breakpoint
CREATE INDEX `idx_transaction_date_merchant_id` ON `nuvie_fraud_data` (`transaction_date`,`merchant_id`);--> statement-breakpoint
CREATE INDEX `idx_upload_id` ON `nuvie_fraud_file` (`upload_id`);--> statement-breakpoint
CREATE INDEX `idx_upload_id` ON `nuvie_transaction_data` (`upload_id`);--> statement-breakpoint
CREATE INDEX `idx_merchant_id` ON `nuvie_transaction_data` (`merchant_id`);--> statement-breakpoint
CREATE INDEX `idx_order_id` ON `nuvie_transaction_data` (`order_id`);--> statement-breakpoint
CREATE INDEX `idx_date_merchant_trans_result` ON `nuvie_transaction_data` (`date`,`merchant_id`,`transaction_result`);--> statement-breakpoint
CREATE INDEX `idx_upload_id` ON `nuvie_transaction_file` (`upload_id`);--> statement-breakpoint
CREATE INDEX `reference_state_index` ON `report_data_record` (`reference`,`status`);
*/