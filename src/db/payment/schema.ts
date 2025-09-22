import {
    mysqlTable,
    primaryKey,
    int,
    varchar,
    bigint,
    index,
    decimal,
    datetime,
    tinyint,
    text,
    json,
    longtext,
    date,
    char,
    unique,
    float,
} from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const accessToken = mysqlTable(
    "access_token",
    {
        id: int({ unsigned: true }).autoincrement().notNull(),
        accessToken: varchar("access_token", { length: 100 }).default("").notNull(),
        expiresIn: bigint("expires_in", { mode: "number", unsigned: true }).notNull(),
        version: bigint({ mode: "number", unsigned: true }).notNull(),
        tokenType: varchar("token_type", { length: 100 }).default("").notNull(),
    },
    (table) => [primaryKey({ columns: [table.id], name: "access_token_id" })],
)

export const account = mysqlTable(
    "account",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        userId: bigint("user_id", { mode: "number" })
            .notNull()
            .references(() => user.id),
        name: varchar({ length: 255 }).notNull(),
        bankAccountId: bigint("bank_account_id", { mode: "number" }).references(() => bankAccount.id),
        totalBalance: decimal("total_balance", { precision: 13, scale: 4 }).default("0.0000").notNull(),
        availableBalance: decimal("available_balance", { precision: 13, scale: 4 }).default("0.0000").notNull(),
        freezedBalance: decimal("freezed_balance", { precision: 13, scale: 4 }).default("0.0000").notNull(),
        color: varchar({ length: 10 }).default("white").notNull(),
        status: int().default(0).notNull(),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
        counterpartyId: varchar("counterparty_id", { length: 100 }).default("create a counterpartyId").notNull(),
        counterpartyState: varchar("counterparty_state", { length: 100 }).default("create a counterparty state").notNull(),
        counterpartyType: int("counterparty_type").notNull(),
        internalBankAccountId: varchar("internal_bank_account_id", { length: 100 }).default(""),
    },
    (table) => [
        index("user_id").on(table.userId),
        index("bank_account_id").on(table.bankAccountId),
        primaryKey({ columns: [table.id], name: "account_id" }),
    ],
)

export const acquirerOrder = mysqlTable(
    "acquirer_order",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        acquirerId: bigint("acquirer_id", { mode: "number" })
            .notNull()
            .references(() => configAcquirer.id),
        reconRequestId: varchar("recon_request_id", { length: 255 }).notNull(),
        orderId: bigint("order_id", { mode: "number" })
            .notNull()
            .references(() => order.id),
        type: int().default(0).notNull(),
        currencyId: bigint("currency_id", { mode: "number" }).notNull(),
        amount: decimal({ precision: 13, scale: 4 }).notNull(),
        status: int().default(0).notNull(),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
        paymentDeclinedPayload: text("payment_declined_payload"),
        paymentResponsePayload: text("payment_response_payload"),
        tokenId: bigint("token_id", { mode: "number" }).references(() => customerCardToken.id),
        responseCode: varchar("response_code", { length: 255 }),
        acsTransactionId: varchar("acs_transaction_id", { length: 255 }),
    },
    (table) => [
        index("acquirer_id").on(table.acquirerId),
        index("order_id").on(table.orderId),
        index("token_id").on(table.tokenId),
        index("idx_recon_request_id").on(table.reconRequestId),
        index("idx_acs_trx_id").on(table.acsTransactionId),
        primaryKey({ columns: [table.id], name: "acquirer_order_id" }),
    ],
)

export const acquirerReconBatchrun = mysqlTable(
    "acquirer_recon_batchrun",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        acquirerId: tinyint("acquirer_id").notNull(),
        reconFileId: bigint("recon_file_id", { mode: "number" })
            .notNull()
            .references(() => reconBatchJobFile.id),
        acquirerBatchPayoutId: varchar("acquirer_batch_payout_id", { length: 255 }).notNull(),
        reconStart: datetime("recon_start", { mode: "string" }),
        reconEnd: datetime("recon_end", { mode: "string" }),
        totalNumberOfOrder: int("total_number_of_order"),
        matchedNumberOfOrder: int("matched_number_of_order"),
        unmatchedNumberOfOrder: int("unmatched_number_of_order"),
        totalCapturedAmount: decimal("total_captured_amount", { precision: 13, scale: 4 }),
        totalChargebackAmount: decimal("total_chargeback_amount", { precision: 13, scale: 4 }),
        totalRefundAmount: decimal("total_refund_amount", { precision: 13, scale: 4 }),
        totalAcquirerFeeAmount: decimal("total_acquirer_fee_amount", { precision: 13, scale: 4 }),
        totalSettledAmount: decimal("total_settled_amount", { precision: 13, scale: 4 }),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
        totalHoldingCurrencyAmount: decimal("total_holding_currency_amount", { precision: 13, scale: 4 }),
        holdingCurrency: varchar("holding_currency", { length: 255 }),
        fxRates: json("fx_rates"),
    },
    (table) => [index("recon_file_id").on(table.reconFileId), primaryKey({ columns: [table.id], name: "acquirer_recon_batchrun_id" })],
)

export const address = mysqlTable(
    "address",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        address1: varchar({ length: 100 }).notNull(),
        address2: varchar({ length: 100 }),
        city: varchar({ length: 100 }),
        state: varchar({ length: 100 }),
        iso3166Code: varchar("iso_3166_code", { length: 3 }),
        countryName: varchar("country_name", { length: 100 }),
        postCode: varchar("post_code", { length: 100 }),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
    },
    (table) => [primaryKey({ columns: [table.id], name: "address_id" })],
)

export const auditLog = mysqlTable(
    "audit_log",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        auditEntityType: tinyint("audit_entity_type").notNull(),
        entityId: bigint("entity_id", { mode: "number" }).notNull(),
        saasUserCorporationId: bigint("saas_user_corporation_id", { mode: "number" }).notNull(),
        requesterId: bigint("requester_id", { mode: "number" }).notNull(),
        content: text(),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
        action: tinyint(),
    },
    (table) => [primaryKey({ columns: [table.id], name: "audit_log_id" })],
)

export const bankAccount = mysqlTable(
    "bank_account",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        bankName: varchar("bank_name", { length: 50 }).notNull(),
        bankAddressId: bigint("bank_address_id", { mode: "number" }).references(() => address.id),
        sortCode: varchar("sort_code", { length: 100 }),
        accountNumber: varchar("account_number", { length: 100 }),
        iban: varchar({ length: 100 }),
        bicSwift: varchar("bic_swift", { length: 100 }),
        currencyId: bigint("currency_id", { mode: "number" })
            .notNull()
            .references(() => currency.id),
        type: int().default(0).notNull(),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
        routingNumber: varchar("routing_number", { length: 100 }),
        bankCounterpartyId: varchar("bank_counterparty_id", { length: 100 }).default(""),
        bankCountry: varchar("bank_country", { length: 5 }),
        bsbCode: varchar("bsb_code", { length: 100 }),
        ifsc: varchar({ length: 100 }),
        clabe: varchar({ length: 100 }),
        cptyAddressPostcode: varchar("cpty_address_postcode", { length: 20 }),
        cptyAddress: varchar("cpty_address", { length: 100 }),
        cptyCountry: varchar("cpty_country", { length: 5 }),
        cptyCity: varchar("cpty_city", { length: 5 }),
        cptyStreetLine1: varchar("cpty_street_line1", { length: 100 }),
        firstName: varchar("first_name", { length: 100 }).default(""),
        lastName: varchar("last_name", { length: 100 }).default(""),
        companyName: varchar("company_name", { length: 300 }).default(""),
    },
    (table) => [
        index("currency_id").on(table.currencyId),
        index("bank_address_id").on(table.bankAddressId),
        primaryKey({ columns: [table.id], name: "bank_account_id" }),
    ],
)

export const blacklistedCreditCards = mysqlTable(
    "blacklisted_credit_cards",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        fullNumber: varchar("full_number", { length: 50 }).notNull(),
        binNumber: varchar("bin_number", { length: 10 }),
        lastFourNumber: varchar("last_four_number", { length: 10 }),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
    },
    (table) => [primaryKey({ columns: [table.id], name: "blacklisted_credit_cards_id" })],
)

export const businessCustomerCorporation = mysqlTable(
    "business_customer_corporation",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        userId: bigint("user_id", { mode: "number" })
            .notNull()
            .references(() => user.id),
        businessName: varchar("business_name", { length: 100 }).notNull(),
        businessNo: varchar("business_no", { length: 100 }),
        businessAddress: bigint("business_address", { mode: "number" }).references(() => address.id, { onDelete: "restrict", onUpdate: "restrict" }),
        country: varchar({ length: 100 }),
        industry: varchar({ length: 255 }),
        sideIndustry: varchar("side_industry", { length: 255 }),
        registrationDate: datetime("registration_date", { mode: "string" }),
        registrationAddress: bigint("registration_address", { mode: "number" }).references(() => address.id, {
            onDelete: "restrict",
            onUpdate: "restrict",
        }),
        shareholdingStructure: varchar("shareholding_structure", { length: 100 }),
        turnoverYear: varchar("turnover_year", { length: 100 }),
        turnoverWeek: varchar("turnover_week", { length: 100 }),
        station: varchar({ length: 100 }),
        website: varchar({ length: 255 }),
        supplierName: varchar("supplier_name", { length: 255 }),
        supplierContracts: varchar("supplier_contracts", { length: 255 }),
        businessProfileStatus: tinyint("business_profile_status").default(0).notNull(),
        directorProfileStatus: varchar("director_profile_status", { length: 20 }),
        directorDocumentStatus: varchar("director_document_status", { length: 255 }),
        saasUserCorporationId: bigint("saas_user_corporation_id", { mode: "number" })
            .notNull()
            .references(() => saasUserCorporation.id),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        remark: varchar({ length: 500 }),
        deleted: tinyint().default(0).notNull(),
        businessDesc: text("business_desc"),
        mid: varchar({ length: 255 }).references(() => configMid.midCode),
        requestCryptoTransactionEndpoint: varchar("request_crypto_transaction_endpoint", { length: 255 }),
        merchantHashSecretKey: varchar("merchant_hash_secret_key", { length: 255 }),
        notifyOrderStatusEndpoint: varchar("notify_order_status_endpoint", { length: 255 }),
        isSiftOn: tinyint("is_sift_on").default(0).notNull(),
        is3DsOn: tinyint("is_3ds_on").default(0).notNull(),
        cryptoDeliveryMethod: tinyint("crypto_delivery_method").default(0),
        isHouseMerchant: tinyint("is_house_merchant").default(0),
        notifyOrderStatusEndpoint2: varchar("notify_order_status_endpoint_2", { length: 255 }),
        reservePercentage: decimal("reserve_percentage", { precision: 13, scale: 2 }),
        reserveHoldingPeriod: int("reserve_holding_period"),
        settlementCurrency: tinyint("settlement_currency").default(2).notNull(),
        profitSharing: longtext("profit_sharing"),
        isWhitelistOn: tinyint("is_whitelist_on").default(0).notNull(),
        notifyOrderStatusEndpoint3: varchar("notify_order_status_endpoint_3", { length: 350 }).default("").notNull(),
        aniCheck: tinyint("ani_check").default(0),
        acquirerId: int("acquirer_id").default(2),
        orderStatusChangeNotification: varchar("order_status_change_notification", { length: 200 }),
        cryptoDeliveryDelayTime: varchar("crypto_delivery_delay_time", { length: 10 }),
        threeDSuccessUrl: varchar("three_d_success_url", { length: 255 }),
        threeDFailureUrl: varchar("three_d_failure_url", { length: 255 }),
        defaultRedirectSuccessUrl: varchar("default_redirect_success_url", { length: 255 }),
        defaultRedirectFailureUrl: varchar("default_redirect_failure_url", { length: 255 }),
        onRampMin: decimal("on_ramp_min", { precision: 13, scale: 4 }),
        onRampMax: decimal("on_ramp_max", { precision: 13, scale: 4 }),
        offRampMin: decimal("off_ramp_min", { precision: 13, scale: 4 }),
        offRampMax: decimal("off_ramp_max", { precision: 13, scale: 4 }),
        notifySofStatusEndpoint: varchar("notify_sof_status_endpoint", { length: 350 }).default(""),
        siteId: varchar("site_id", { length: 100 }),
    },
    (table) => [
        index("user_id").on(table.userId),
        index("saas_user_corporation_id").on(table.saasUserCorporationId),
        index("mid").on(table.mid),
        index("settlement_currency_fk").on(table.settlementCurrency),
        primaryKey({ columns: [table.id], name: "business_customer_corporation_id" }),
    ],
)

export const businessCustomerCorporationMember = mysqlTable(
    "business_customer_corporation_member",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        businessCustomerCorporationId: bigint("business_customer_corporation_id", { mode: "number" }).references(
            () => businessCustomerCorporation.id,
        ),
        firstName: varchar("first_name", { length: 50 }),
        middleName: varchar("middle_name", { length: 50 }),
        lastName: varchar("last_name", { length: 20 }),
        // you can use { mode: 'date' }, if you want to have Date as type for this column
        birthday: date({ mode: "string" }),
        nationality: varchar({ length: 30 }),
        documentType: int("document_type"),
        documentNo: varchar("document_no", { length: 100 }),
        documentFrontUrl: varchar("document_front_url", { length: 255 }),
        documentBackUrl: varchar("document_back_url", { length: 255 }),
        documentHandyUrl: varchar("document_handy_url", { length: 255 }),
        memberType: tinyint("member_type").default(0).notNull(),
        email: varchar({ length: 255 }),
        countryCode: varchar("country_code", { length: 255 }),
        phoneNumber: varchar("phone_number", { length: 20 }),
        address: varchar({ length: 255 }),
        city: varchar({ length: 255 }),
        postCode: varchar("post_code", { length: 255 }),
        country: varchar({ length: 255 }),
        kycVeriffUuid: varchar("kyc_veriff_uuid", { length: 100 }),
        kycStatus: int("kyc_status").default(0).notNull(),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        remark: varchar({ length: 500 }),
        deleted: tinyint().default(0).notNull(),
        businessName: varchar("business_name", { length: 100 }),
        businessRegistrationNo: varchar("business_registration_no", { length: 100 }),
        kycSumsubApplicantId: varchar("kyc_sumsub_applicant_id", { length: 100 }),
    },
    (table) => [
        index("business_customer_corporation_id").on(table.businessCustomerCorporationId),
        primaryKey({ columns: [table.id], name: "business_customer_corporation_member_id" }),
    ],
)

export const companyAccount = mysqlTable(
    "company_account",
    {
        id: int({ unsigned: true }).autoincrement().notNull(),
        accountId: varchar("account_id", { length: 150 }).default("").notNull(),
        currency: varchar({ length: 10 }).notNull(),
        createdAt: datetime("created_at", { mode: "string" }).notNull(),
        updatedAt: datetime("updated_at", { mode: "string" }).notNull(),
    },
    (table) => [primaryKey({ columns: [table.id], name: "company_account_id" })],
)

export const configAcquirer = mysqlTable(
    "config_acquirer",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        acquirerName: varchar("acquirer_name", { length: 255 }),
        status: tinyint().default(0).notNull(),
    },
    (table) => [primaryKey({ columns: [table.id], name: "config_acquirer_id" })],
)

export const configCheckoutErrorMapping = mysqlTable(
    "config_checkout_error_mapping",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        code: varchar({ length: 255 }),
        message: longtext(),
    },
    (table) => [primaryKey({ columns: [table.id], name: "config_checkout_error_mapping_id" })],
)

export const configContinent = mysqlTable(
    "config_continent",
    {
        code: char({ length: 2 }).notNull(),
        name: varchar({ length: 255 }),
    },
    (table) => [primaryKey({ columns: [table.code], name: "config_continent_code" })],
)

export const configCountry = mysqlTable(
    "config_country",
    {
        code: char({ length: 2 }).notNull(),
        name: varchar({ length: 255 }).notNull(),
        fullName: varchar("full_name", { length: 255 }).notNull(),
        iso3: char({ length: 3 }).notNull(),
        number: char({ length: 3 }).notNull(),
        continentCode: char("continent_code", { length: 2 })
            .notNull()
            .references(() => configContinent.code),
    },
    (table) => [index("continent_code").on(table.continentCode), primaryKey({ columns: [table.code], name: "config_country_code" })],
)

export const configDocumentType = mysqlTable(
    "config_document_type",
    {
        code: varchar({ length: 50 }).notNull(),
        description: varchar({ length: 500 }),
        status: tinyint().default(0).notNull(),
    },
    (table) => [primaryKey({ columns: [table.code], name: "config_document_type_code" })],
)

export const configMid = mysqlTable(
    "config_mid",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        acquirerId: bigint("acquirer_id", { mode: "number" })
            .notNull()
            .references(() => configAcquirer.id),
        midCode: varchar("mid_code", { length: 255 }).notNull(),
        description: varchar({ length: 500 }),
        settlementCurrencyId: bigint("settlement_currency_id", { mode: "number" }),
        settlementCurrencyType: tinyint("settlement_currency_type").notNull(),
        status: tinyint().default(0).notNull(),
        siteId: varchar("site_id", { length: 255 }),
        siteName: varchar("site_name", { length: 255 }),
        clientId: varchar("client_id", { length: 255 }),
        clientName: varchar("client_name", { length: 255 }),
        acquirerMerchantId: varchar("acquirer_merchant_id", { length: 255 }),
        type: int(),
        secretKey: varchar("secret_key", { length: 100 }),
        saasUserCorporationId: int("saas_user_corporation_id"),
        dynamicDescriptor: varchar("dynamic_descriptor", { length: 100 }),
    },
    (table) => [
        index("acquirer_id").on(table.acquirerId),
        primaryKey({ columns: [table.id], name: "config_mid_id" }),
        unique("mid_code").on(table.midCode),
    ],
)

export const configOrderStatus = mysqlTable("config_order_status", {
    code: varchar({ length: 20 }).notNull(),
    desc: varchar({ length: 500 }),
    createdAt: datetime("created_at", { mode: "string" })
        .default(sql`(CURRENT_TIMESTAMP)`)
        .notNull(),
    createdBy: bigint("created_by", { mode: "number" }),
    deletedAt: datetime("deleted_at", { mode: "string" }),
    deletedBy: bigint("deleted_by", { mode: "number" }),
    deleted: tinyint().default(0).notNull(),
    remark: varchar({ length: 500 }),
})

export const configRiskLevel = mysqlTable(
    "config_risk_level",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        name: varchar({ length: 255 }).notNull(),
    },
    (table) => [primaryKey({ columns: [table.id], name: "config_risk_level_id" })],
)

export const conversionRate = mysqlTable(
    "conversion_rate",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        fromCurrency: varchar("from_currency", { length: 20 }).notNull(),
        toCurrency: varchar("to_currency", { length: 20 }).notNull(),
        rate: decimal({ precision: 40, scale: 20 }).notNull(),
        updatedAt: datetime("updated_at", { mode: "string" }).default(sql`(CURRENT_TIMESTAMP)`),
    },
    (table) => [
        index("idx_from_to_currency").on(table.fromCurrency, table.toCurrency),
        primaryKey({ columns: [table.id], name: "conversion_rate_id" }),
    ],
)

export const cryptoCurrency = mysqlTable(
    "crypto_currency",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        shortName: varchar("short_name", { length: 20 }),
        name: varchar({ length: 20 }),
        chain: varchar({ length: 20 }).notNull(),
        b2C2Ticker: varchar("b2c2_ticker", { length: 3 }).notNull(),
        decimalPrecision: int("decimal_precision"),
        fireblocksAssetId: varchar("fireblocks_asset_id", { length: 20 }).notNull(),
        isUtxoBased: tinyint("is_utxo_based").default(0).notNull(),
        blockchairNetworkName: varchar("blockchair_network_name", { length: 100 }),
        coinlayerTicker: varchar("coinlayer_ticker", { length: 20 }).notNull(),
        liquidityProvider: varchar("liquidity_provider", { length: 10 }).notNull(),
        okxNetworkName: varchar("okx_network_name", { length: 100 }),
    },
    (table) => [primaryKey({ columns: [table.id], name: "crypto_currency_id" })],
)

export const cryptoTransaction = mysqlTable(
    "crypto_transaction",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        orderId: bigint("order_id", { mode: "number" })
            .notNull()
            .references(() => order.id),
        transactionId: varchar("transaction_id", { length: 256 }).default(""),
        transactionHash: varchar("transaction_hash", { length: 256 }).default(""),
        cryptoAmount: decimal("crypto_amount", { precision: 16, scale: 6 }).notNull(),
        networkFee: decimal("network_fee", { precision: 16, scale: 6 }).notNull(),
        fromWallet: varchar("from_wallet", { length: 256 }).default(""),
        toWallet: varchar("to_wallet", { length: 256 }).default(""),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
    },
    (table) => [index("order_id").on(table.orderId), primaryKey({ columns: [table.id], name: "crypto_transaction_id" })],
)

export const currency = mysqlTable(
    "currency",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        code: varchar({ length: 5 }).notNull(),
        symbol: varchar({ length: 10 }).notNull(),
        name: varchar({ length: 20 }),
    },
    (table) => [primaryKey({ columns: [table.id], name: "currency_id" })],
)

export const customer = mysqlTable(
    "customer",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        userId: bigint("user_id", { mode: "number" })
            .notNull()
            .references(() => user.id),
        saasUserCorporationId: bigint("saas_user_corporation_id", { mode: "number" })
            .notNull()
            .references(() => saasUserCorporation.id),
        type: int().notNull(),
        manager: bigint({ mode: "number" }).references(() => user.id),
        subscriptionModelId: bigint("subscription_model_id", { mode: "number" })
            .notNull()
            .references(() => subscriptionModel.id),
        riskLevel: bigint("risk_level", { mode: "number" })
            .default(1)
            .notNull()
            .references(() => configRiskLevel.id),
        idRef: varchar("id_ref", { length: 100 }),
        vipId: bigint("vip_id", { mode: "number" }).references(() => vip.id),
        merchantId: bigint("merchant_id", { mode: "number" }),
        ssoCustomerId: varchar("sso_customer_id", { length: 100 }),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
        fireblocksVaultAccountId: varchar("fireblocks_vault_account_id", { length: 10 }),
        sum90Day: decimal("sum_90_day", { precision: 13, scale: 4 }),
        referralCode: varchar("referral_code", { length: 255 }),
    },
    (table) => [
        index("user_id").on(table.userId),
        index("saas_user_corporation_id").on(table.saasUserCorporationId),
        index("manager").on(table.manager),
        index("vip_id").on(table.vipId),
        index("risk_level").on(table.riskLevel),
        index("idx_customer_sso_customer_id").on(table.ssoCustomerId),
        index("comb_idx_customer_id_merchant_id").on(table.id, table.merchantId),
        primaryKey({ columns: [table.id], name: "customer_id" }),
    ],
)

export const customerAddress = mysqlTable(
    "customer_address",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        customerId: bigint("customer_id", { mode: "number" })
            .notNull()
            .references(() => customer.id),
        addressId: bigint("address_id", { mode: "number" })
            .notNull()
            .references(() => address.id),
        activated: tinyint().default(0).notNull(),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
    },
    (table) => [
        index("customer_id").on(table.customerId),
        index("address_id").on(table.addressId),
        primaryKey({ columns: [table.id], name: "customer_address_id" }),
    ],
)

export const customerCardToken = mysqlTable(
    "customer_card_token",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        userId: bigint("user_id", { mode: "number" }).notNull(),
        acquirerId: bigint("acquirer_id", { mode: "number" })
            .notNull()
            .references(() => configAcquirer.id),
        token: varchar({ length: 500 }),
        cardNumber: varchar("card_number", { length: 255 }),
        cardType: varchar("card_type", { length: 100 }),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
        bin: varchar({ length: 50 }),
        scheme: varchar({ length: 50 }),
        currency: varchar({ length: 50 }),
        issuer: varchar({ length: 255 }),
        issuerCountry: varchar("issuer_country", { length: 50 }),
        cardholderName: varchar("cardholder_name", { length: 255 }),
        cardholderEmailAddress: varchar("cardholder_email_address", { length: 255 }),
    },
    (table) => [
        index("user_id").on(table.userId),
        index("acquirer_id").on(table.acquirerId),
        primaryKey({ columns: [table.id], name: "customer_card_token_id" }),
        unique("uc_card_number").on(table.cardNumber),
    ],
)

export const customerWallet = mysqlTable(
    "customer_wallet",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        customerId: bigint("customer_id", { mode: "number" })
            .notNull()
            .references(() => customer.id),
        cryptoId: bigint("crypto_id", { mode: "number" })
            .notNull()
            .references(() => cryptoCurrency.id),
        walletAddress: varchar("wallet_address", { length: 256 }).default(""),
        walletName: varchar("wallet_name", { length: 100 }).default(""),
        active: tinyint().default(0).notNull(),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
    },
    (table) => [
        index("customer_id").on(table.customerId),
        index("crypto_id").on(table.cryptoId),
        primaryKey({ columns: [table.id], name: "customer_wallet_id" }),
    ],
)

export const documents = mysqlTable(
    "documents",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        businessCustomerCorporationId: bigint("business_customer_corporation_id", { mode: "number" }).references(
            () => businessCustomerCorporation.id,
        ),
        customerId: bigint("customer_id", { mode: "number" }).references(() => customer.id),
        documentUrl: varchar("document_url", { length: 500 }),
        documentTypeCode: varchar("document_type_code", { length: 50 }).references(() => configDocumentType.code),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        remark: varchar({ length: 500 }),
        deleted: tinyint().default(0).notNull(),
        otherDocumentDesc: text("other_document_desc"),
        businessMemberId: bigint("business_member_id", { mode: "number" }),
    },
    (table) => [
        index("business_customer_corporation_id").on(table.businessCustomerCorporationId),
        index("document_type_code").on(table.documentTypeCode),
        index("customer_id").on(table.customerId),
        primaryKey({ columns: [table.id], name: "documents_id" }),
    ],
)

export const feeType = mysqlTable(
    "fee_type",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        name: varchar({ length: 100 }).notNull(),
        type: tinyint().default(0).notNull(),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
        riskLevel: bigint("risk_level", { mode: "number" }).references(() => configRiskLevel.id),
        transactionType: int("transaction_type"),
    },
    (table) => [primaryKey({ columns: [table.id], name: "fee_type_id" })],
)

export const houseWallet = mysqlTable(
    "house_wallet",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        cryptoId: bigint("crypto_id", { mode: "number" })
            .notNull()
            .references(() => cryptoCurrency.id),
        walletAddress: varchar("wallet_address", { length: 256 }).default(""),
        walletName: varchar("wallet_name", { length: 100 }).default(""),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
        saasUserCorporationId: bigint("saas_user_corporation_id", { mode: "number" })
            .notNull()
            .references(() => saasUserCorporation.id),
        isDefault: tinyint("is_default").default(0).notNull(),
    },
    (table) => [index("crypto_id").on(table.cryptoId), primaryKey({ columns: [table.id], name: "house_wallet_id" })],
)

export const kycInfo = mysqlTable(
    "kyc_info",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        userId: bigint("user_id", { mode: "number" })
            .notNull()
            .references(() => user.id),
        firstName: varchar("first_name", { length: 50 }).notNull(),
        middleName: varchar("middle_name", { length: 50 }),
        lastName: varchar("last_name", { length: 20 }).notNull(),
        // you can use { mode: 'date' }, if you want to have Date as type for this column
        birthday: date({ mode: "string" }),
        nationality: varchar({ length: 30 }),
        documentType: int("document_type").notNull(),
        documentNo: varchar("document_no", { length: 100 }).notNull(),
        documentFrontUrl: varchar("document_front_url", { length: 255 }),
        documentBackUrl: varchar("document_back_url", { length: 255 }),
        documentHandyUrl: varchar("document_handy_url", { length: 255 }),
        kycPayload: text("kyc_payload"),
        kycAmlPayload: text("kyc_aml_payload"),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
        ssoKyc: tinyint("sso_kyc").default(0).notNull(),
    },
    (table) => [index("user_id").on(table.userId), primaryKey({ columns: [table.id], name: "kyc_info_id" })],
)

export const merchantAccount = mysqlTable(
    "merchant_account",
    {
        id: int({ unsigned: true }).autoincrement().notNull(),
        merchantId: bigint("merchant_id", { mode: "number", unsigned: true }).notNull(),
        accountId: varchar("account_id", { length: 150 }).default("").notNull(),
        currency: varchar({ length: 10 }).notNull(),
        minBalance: decimal("min_balance", { precision: 16, scale: 4, unsigned: true }).default("0.0000").notNull(),
        createdAt: datetime("created_at", { mode: "string" }).notNull(),
        updatedAt: datetime("updated_at", { mode: "string" }).notNull(),
    },
    (table) => [
        index("idx_merchant_id_currency").on(table.merchantId, table.currency),
        primaryKey({ columns: [table.id], name: "merchant_account_id" }),
    ],
)

export const merchantPayoutIp = mysqlTable(
    "merchant_payout_ip",
    {
        id: int({ unsigned: true }).autoincrement().notNull(),
        merchantId: bigint("merchant_id", { mode: "number", unsigned: true }).notNull(),
        payoutIps: varchar("payout_ips", { length: 1000 }).default("").notNull(),
        createdAt: datetime("created_at", { mode: "string" }).notNull(),
        updatedAt: datetime("updated_at", { mode: "string" }).notNull(),
    },
    (table) => [primaryKey({ columns: [table.id], name: "merchant_payout_ip_id" }), unique("uk_merchant_id").on(table.merchantId)],
)

export const mfaCode = mysqlTable(
    "mfa_code",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        userId: bigint("user_id", { mode: "number" })
            .notNull()
            .references(() => user.id),
        code: varchar({ length: 6 }).notNull(),
        otpAscii: varchar("otp_ascii", { length: 255 }),
        otpHex: varchar("otp_hex", { length: 255 }),
        otpBase32: varchar("otp_base_32", { length: 255 }),
        otpAuthUrl: varchar("otp_auth_url", { length: 255 }),
        expireAt: datetime("expire_at", { mode: "string" }),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
    },
    (table) => [index("user_id").on(table.userId), primaryKey({ columns: [table.id], name: "mfa_code_id" })],
)

export const offRampingCustomerWallet = mysqlTable(
    "off_ramping_customer_wallet",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        cryptoId: bigint("crypto_id", { mode: "number" })
            .notNull()
            .references(() => cryptoCurrency.id),
        walletAddress: varchar("wallet_address", { length: 256 }).default(""),
        walletName: varchar("wallet_name", { length: 100 }).default(""),
        customerId: bigint("customer_id", { mode: "number" })
            .notNull()
            .references(() => customer.id),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
    },
    (table) => [
        index("crypto_id").on(table.cryptoId),
        index("customer_id").on(table.customerId),
        primaryKey({ columns: [table.id], name: "off_ramping_customer_wallet_id" }),
    ],
)

export const order = mysqlTable(
    "order",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        merchantId: bigint("merchant_id", { mode: "number" }).notNull(),
        customerId: bigint("customer_id", { mode: "number" }).notNull(),
        customerWalletId: bigint("customer_wallet_id", { mode: "number" }).notNull(),
        type: int().default(0).notNull(),
        currencyId: bigint("currency_id", { mode: "number" }).notNull(),
        fiatAmount: decimal("fiat_amount", { precision: 13, scale: 4 }).notNull(),
        cryptoId: bigint("crypto_id", { mode: "number" }).notNull(),
        cryptoAmount: decimal("crypto_amount", { precision: 16, scale: 6 }).notNull(),
        processingFee: decimal("processing_fee", { precision: 13, scale: 4 }).notNull(),
        liquidityQuote: decimal("liquidity_quote", { precision: 13, scale: 4 }).notNull(),
        liquidityProvider: varchar("liquidity_provider", { length: 255 }),
        orderUuid: varchar("order_uuid", { length: 255 }),
        reference: varchar({ length: 255 }),
        travelRuleStatus: tinyint("travel_rule_status").default(0).notNull(),
        status: int().default(0).notNull(),
        amlId: varchar("aml_id", { length: 255 }),
        amlPayload: text("aml_payload"),
        amlScore: varchar("aml_score", { length: 255 }),
        amlStatus: tinyint("aml_status").default(0).notNull(),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
        travelRuleId: varchar("travel_rule_id", { length: 256 }),
        paymentIp: varchar("payment_ip", { length: 100 }),
        mid: varchar({ length: 255 }),
        isOtc: tinyint("is_otc").default(0).notNull(),
        ssoOrderId: varchar("sso_order_id", { length: 255 }),
        includeFee: tinyint("include_fee").default(1).notNull(),
        sum90Checked: tinyint("sum_90_checked"),
        fraudScore: varchar("fraud_score", { length: 255 }),
        gatewayFee: decimal("gateway_fee", { precision: 13, scale: 4 }),
        referralCode: varchar("referral_code", { length: 255 }),
        bankAccountId: bigint("bank_account_id", { mode: "number" }),
        aniCode: varchar("ani_code", { length: 255 }),
        isRollback: tinyint("is_rollback").default(0),
        merchantNotificationType: tinyint("merchant_notification_type"),
    },
    (table) => [
        index("customer_id").on(table.customerId),
        index("customer_wallet_id").on(table.customerWalletId),
        index("currency_id").on(table.currencyId),
        index("crypto_id").on(table.cryptoId),
        index("mid").on(table.mid),
        index("idx_sso_order_id").on(table.ssoOrderId),
        index("idx_order_uuid").on(table.orderUuid),
        index("idx_created_at_merchant_id").on(table.createdAt, table.merchantId),
        index("bank_account_id").on(table.bankAccountId),
        primaryKey({ columns: [table.id], name: "order_id" }),
    ],
)

export const orderRecon = mysqlTable(
    "order_recon",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        reconId: bigint("recon_id", { mode: "number" }).notNull(),
        orderId: bigint("order_id", { mode: "number" }).notNull(),
        acquirerBatchPaymentId: varchar("acquirer_batch_payment_id", { length: 255 }).notNull(),
        acquirerPaymentId: varchar("acquirer_payment_id", { length: 255 }).notNull(),
        comment: varchar({ length: 500 }),
        status: tinyint().default(0).notNull(),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
    },
    (table) => [primaryKey({ columns: [table.id], name: "order_recon_id" })],
)

export const payToCard = mysqlTable(
    "pay_to_card",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        userId: bigint("user_id", { mode: "number" }).notNull(),
        currencyId: bigint("currency_id", { mode: "number" }).notNull(),
        counterpartyName: varchar("counterparty_name", { length: 255 }).default("").notNull(),
        counterpartyId: varchar("counterparty_id", { length: 255 }).default("").notNull(),
        state: varchar({ length: 255 }).notNull(),
        createdAt: datetime("created_at", { mode: "string" }).default(sql`(CURRENT_TIMESTAMP)`),
        linkId: varchar("link_id", { length: 255 }).default("").notNull(),
        accountId: varchar("account_id", { length: 255 }).default("").notNull(),
    },
    (table) => [primaryKey({ columns: [table.id], name: "pay_to_card_id" })],
)

export const paymentSetting = mysqlTable(
    "payment_setting",
    {
        id: int({ unsigned: true }).autoincrement().notNull(),
        key: varchar({ length: 100 }).default("").notNull(),
        value: varchar({ length: 1000 }).default("").notNull(),
        createdAt: datetime("created_at", { mode: "string" }).notNull(),
        updatedAt: datetime("updated_at", { mode: "string" }).notNull(),
    },
    (table) => [primaryKey({ columns: [table.id], name: "payment_setting_id" }), unique("uk_key").on(table.key)],
)

export const payoutInfo = mysqlTable(
    "payout_info",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        orderId: bigint("order_id", { mode: "number" }).notNull(),
        processingFee: decimal("processing_fee", { precision: 13, scale: 4 }).default("0.0000").notNull(),
        deductPayoutAmount: decimal("deduct_payout_amount", { precision: 13, scale: 4 }).default("0.0000").notNull(),
        deductFee: decimal("deduct_fee", { precision: 13, scale: 4 }).default("0.0000").notNull(),
        deductRate: decimal("deduct_rate", { precision: 13, scale: 4 }).default("0.0000").notNull(),
        merchantCurrencyId: bigint("merchant_currency_id", { mode: "number" }).notNull(),
        createdAt: datetime("created_at", { mode: "string" }).notNull(),
        updatedAt: datetime("updated_at", { mode: "string" }).notNull(),
        transferType: tinyint("transfer_type").default(0).notNull(),
        counterpartyId: varchar("counterparty_id", { length: 100 }).default("").notNull(),
        arriveTime: datetime("arrive_time", { mode: "string" }),
    },
    (table) => [index("idx_order_id").on(table.orderId), primaryKey({ columns: [table.id], name: "payout_info_id" })],
)

export const payoutRefund = mysqlTable(
    "payout_refund",
    {
        id: int({ unsigned: true }).autoincrement().notNull(),
        refundId: char("refund_id", { length: 100 }).default("").notNull(),
        type: char({ length: 50 }).default("").notNull(),
        relatedTransactionId: char("related_transaction_id", { length: 100 }).default("").notNull(),
        legId: char("leg_id", { length: 100 }).default("").notNull(),
        accountId: char("account_id", { length: 100 }).default("").notNull(),
        amount: decimal({ precision: 16, scale: 6 }).default("0.000000").notNull(),
        currency: char({ length: 10 }).default("").notNull(),
        balance: decimal({ precision: 16, scale: 6 }).default("0.000000").notNull(),
        sssOrderid: char({ length: 100 }).default("").notNull(),
        orderUuid: char({ length: 100 }).default("").notNull(),
        refundTime: datetime("refund_time", { mode: "string" }),
        createdTime: datetime("created_time", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        originalAmount: decimal("original_amount", { precision: 13, scale: 4 }).default("0.0000").notNull(),
        merchantId: int("merchant_id").default(0).notNull(),
        description: varchar({ length: 500 }).default("").notNull(),
        accountName: varchar("account_name", { length: 100 }).default("").notNull(),
        status: varchar({ length: 50 }).default("").notNull(),
        updatedTime: datetime("updated_time", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
    },
    (table) => [primaryKey({ columns: [table.id], name: "payout_refund_id" })],
)

export const payoutSof = mysqlTable(
    "payout_sof",
    {
        id: int({ unsigned: true }).autoincrement().notNull(),
        ssoCustomerId: varchar("sso_customer_id", { length: 200 }).default("").notNull(),
        merchantId: int("merchant_id").default(0).notNull(),
        fileUrl: text("file_url").notNull(),
        fileType: int("file_type").default(0).notNull(),
        link: varchar({ length: 200 }).default("").notNull(),
        walletAddress: varchar("wallet_address", { length: 200 }).default("").notNull(),
        status: tinyint().default(1).notNull(),
        reviewRemark: varchar("review_remark", { length: 1000 }).default("").notNull(),
        createdAt: datetime("created_at", { mode: "string" }).notNull(),
        updatedAt: datetime("updated_at", { mode: "string" }).notNull(),
        limitAmount: decimal("limit_amount", { precision: 13, scale: 4 }).default("0.0000").notNull(),
        ssoOrderId: varchar("sso_order_id", { length: 255 }).default("").notNull(),
        orderUuid: varchar("order_uuid", { length: 255 }).default("").notNull(),
        fullUrl: varchar("full_url", { length: 200 }).default("").notNull(),
        reviewTime: datetime("review_time", { mode: "string" }),
        reviewUserId: int("review_user_id").default(0),
    },
    (table) => [
        index("idx_link").on(table.link),
        index("idx_created_at").on(table.createdAt),
        primaryKey({ columns: [table.id], name: "payout_sof_id" }),
        unique("uk_order_uuid").on(table.orderUuid),
    ],
)

export const reconBatchJobFile = mysqlTable(
    "recon_batch_job_file",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        uploadTime: datetime("upload_time", { mode: "string" }),
        fileUrl: varchar("file_url", { length: 500 }).notNull(),
        status: tinyint().default(0).notNull(),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
        acquirerId: bigint("acquirer_id", { mode: "number" }).default(2).notNull(),
        type: int(),
    },
    (table) => [primaryKey({ columns: [table.id], name: "recon_batch_job_file_id" })],
)

export const resetPasswordLink = mysqlTable(
    "reset_password_link",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        userId: bigint("user_id", { mode: "number" }).notNull(),
        link: varchar({ length: 255 }).notNull(),
        used: tinyint().default(0).notNull(),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
    },
    (table) => [index("user_id").on(table.userId), primaryKey({ columns: [table.id], name: "reset_password_link_id" })],
)

export const role = mysqlTable(
    "role",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        name: varchar({ length: 255 }),
        description: varchar({ length: 255 }),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        remark: varchar({ length: 500 }),
    },
    (table) => [primaryKey({ columns: [table.id], name: "role_id" })],
)

export const rollingReserveLedger = mysqlTable(
    "rolling_reserve_ledger",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        settlementId: varchar("settlement_id", { length: 255 }),
        merchantId: bigint("merchant_id", { mode: "number" }),
        transactionDate: datetime("transaction_date", { mode: "string" }),
        transactionType: tinyint("transaction_type"),
        reference: bigint({ mode: "number" }),
        rollingBalance: decimal("rolling_balance", { precision: 10, scale: 4 }),
        payoutDate: datetime("payout_date", { mode: "string" }),
    },
    (table) => [primaryKey({ columns: [table.id], name: "rolling_reserve_ledger_id" })],
)

export const saasUser = mysqlTable(
    "saas_user",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        userId: bigint("user_id", { mode: "number" }).notNull(),
        corporationId: bigint("corporation_id", { mode: "number" }).notNull(),
        idRef: varchar("id_ref", { length: 100 }),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
    },
    (table) => [
        index("user_id").on(table.userId),
        index("corporation_id").on(table.corporationId),
        primaryKey({ columns: [table.id], name: "saas_user_id" }),
    ],
)

export const saasUserCorporation = mysqlTable(
    "saas_user_corporation",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        acquirerId: bigint("acquirer_id", { mode: "number" }).notNull(),
        code: varchar({ length: 100 }).notNull(),
        name: varchar({ length: 100 }),
        domain: varchar({ length: 100 }).notNull(),
        themeUrl: varchar("theme_url", { length: 255 }),
        partnerBank: varchar("partner_bank", { length: 255 }).default("MOCK").notNull(),
        partnerBankSortCode: varchar("partner_bank_sort_code", { length: 255 }).default("040605").notNull(),
        emailIdVerifyCode: varchar("email_id_verify_code", { length: 255 }).default("d-3f5b5620f5bb4a0a964364f235560239").notNull(),
        emailIdVeriff: varchar("email_id_veriff", { length: 255 }).default("d-c2769ba393fe452c80140b44d9a2cdef").notNull(),
        emailIdVeriffAddress: varchar("email_id_veriff_address", { length: 255 }).default("d-61bfd8d97f4f40d6bd5d07c558312a78").notNull(),
        emailIdBank: varchar("email_id_bank", { length: 255 }).default("d-3747300bfb9d4247b45dee57af1a050c").notNull(),
        emailIdForgotPwd: varchar("email_id_forgot_pwd", { length: 255 }).default("d-39b817bc637f4b1c818f8919bf7c3379").notNull(),
        emailIdVeriffKyc: varchar("email_id_veriff_kyc", { length: 255 }).default("d-a3a6b031ea5d49d29d9e1eb270aa7e77").notNull(),
        revenueShare: text("revenue_share"),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
        addressId: bigint("address_id", { mode: "number" }).notNull(),
        notabeneVaspDid: varchar("notabene_vasp_did", { length: 256 }).notNull(),
        notabeneClientId: varchar("notabene_client_id", { length: 255 }).notNull(),
        notabeneClientSecret: varchar("notabene_client_secret", { length: 255 }).notNull(),
        notabeneClientCredentials: varchar("notabene_client_credentials", { length: 255 }).notNull(),
        emailTemplateSendfrom: varchar("email_template_sendfrom", { length: 255 }).notNull(),
        emailIdEmailAddressVerification: varchar("email_id_email_address_verification", { length: 255 }).notNull(),
        legalPersonName: varchar("legal_person_name", { length: 255 }),
        houseWalletProvider: varchar("house_wallet_provider", { length: 50 }).notNull(),
        emailIdOrderCompletionNotification: varchar("email_id_order_completion_notification", { length: 256 }).notNull(),
        travelRuleCheckLimit: int("travel_rule_check_limit").notNull(),
        travelRuleLimitCurrencyId: bigint("travel_rule_limit_currency_id", { mode: "number" }).notNull(),
        fireblocksWithdrawalAccountId: bigint("fireblocks_withdrawal_account_id", { mode: "number" }),
        fireblocksOperationalAccountId: bigint("fireblocks_operational_account_id", { mode: "number" }),
        fireblocksHiddenOnUi: tinyint("fireblocks_hidden_on_ui"),
        fireblocksAutoFuel: tinyint("fireblocks_auto_fuel"),
        emailIdOffOrderCompletionNotification: varchar("email_id_off_order_completion_notification", { length: 255 }),
        emailIdOffOrderFailedNotification: varchar("email_id_off_order_failed_notification", { length: 255 }),
        kycChannel: tinyint("kyc_channel", { unsigned: true }).notNull(),
    },
    (table) => [
        index("acquirer_id").on(table.acquirerId),
        index("FK_ADDRESS").on(table.addressId),
        index("saas_user_corporation_currency_fk").on(table.travelRuleLimitCurrencyId),
        primaryKey({ columns: [table.id], name: "saas_user_corporation_id" }),
    ],
)

export const saasUserCorporationOffRampSupportedCryptoCurrency = mysqlTable("saas_user_corporation_off_ramp_supported_crypto_currency", {
    id: bigint({ mode: "number" }).notNull(),
    saasUserCorporationId: bigint("saas_user_corporation_id", { mode: "number" }).notNull(),
    cryptoCurrencyId: bigint("crypto_currency_id", { mode: "number" }).default(1).notNull(),
    createdAt: datetime("created_at", { mode: "string" })
        .default(sql`(CURRENT_TIMESTAMP)`)
        .notNull(),
    createdBy: bigint("created_by", { mode: "number" }),
    deletedAt: datetime("deleted_at", { mode: "string" }),
    deletedBy: bigint("deleted_by", { mode: "number" }),
    deleted: tinyint().default(0).notNull(),
    remark: varchar({ length: 500 }),
})

export const saasUserCorporationOffRampSupportedCurrency = mysqlTable(
    "saas_user_corporation_off_ramp_supported_currency",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        saasUserCorporationId: bigint("saas_user_corporation_id", { mode: "number" }).notNull(),
        currencyId: bigint("currency_id", { mode: "number" }).default(108).notNull(),
        isBasicCurrency: tinyint("is_basic_currency").default(0).notNull(),
        currencyAccountCheckout: varchar("currency_account_checkout", { length: 100 }),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
    },
    (table) => [
        index("saas_user_corporation_id").on(table.saasUserCorporationId),
        index("currency_id").on(table.currencyId),
        primaryKey({ columns: [table.id], name: "saas_user_corporation_off_ramp_supported_currency_id" }),
    ],
)

export const saasUserCorporationSupportedCountry = mysqlTable(
    "saas_user_corporation_supported_country",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        saasUserCorporationId: bigint("saas_user_corporation_id", { mode: "number" }).notNull(),
        countryCode: varchar("country_code", { length: 2 }).notNull(),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
    },
    (table) => [
        index("saas_user_corporation_id").on(table.saasUserCorporationId),
        index("country_code").on(table.countryCode),
        primaryKey({ columns: [table.id], name: "saas_user_corporation_supported_country_id" }),
    ],
)

export const saasUserCorporationSupportedCryptoCurrency = mysqlTable(
    "saas_user_corporation_supported_crypto_currency",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        saasUserCorporationId: bigint("saas_user_corporation_id", { mode: "number" }).notNull(),
        cryptoCurrencyId: bigint("crypto_currency_id", { mode: "number" }).default(1).notNull(),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
    },
    (table) => [
        index("saas_user_corporation_id").on(table.saasUserCorporationId),
        index("crypto_currency_id").on(table.cryptoCurrencyId),
        primaryKey({ columns: [table.id], name: "saas_user_corporation_supported_crypto_currency_id" }),
    ],
)

export const saasUserCorporationSupportedCurrency = mysqlTable(
    "saas_user_corporation_supported_currency",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        saasUserCorporationId: bigint("saas_user_corporation_id", { mode: "number" }).notNull(),
        currencyId: bigint("currency_id", { mode: "number" }).default(108).notNull(),
        isBasicCurrency: tinyint("is_basic_currency").default(0).notNull(),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
        currencyAccountCheckout: varchar("currency_account_checkout", { length: 100 }),
    },
    (table) => [
        index("saas_user_corporation_id").on(table.saasUserCorporationId),
        index("currency_id").on(table.currencyId),
        primaryKey({ columns: [table.id], name: "saas_user_corporation_supported_currency_id" }),
    ],
)

export const settlementConfig = mysqlTable(
    "settlement_config",
    {
        id: int().autoincrement().notNull(),
        merchantId: int("merchant_id").notNull(),
        percentage: decimal({ precision: 13, scale: 2 }),
        gatewayFeeGreatThan: decimal("gateway_fee_great_than", { precision: 13, scale: 2 }),
        gatewayFeeLess: decimal("gateway_fee_less", { precision: 13, scale: 2 }),
        gatewayFeeMore: decimal("gateway_fee_more", { precision: 13, scale: 2 }),
        processingFeeEu: decimal("processing_fee_eu", { precision: 13, scale: 2 }),
        processingFeeNonEu: decimal("processing_fee_non_eu", { precision: 13, scale: 2 }),
        refundFee: decimal("refund_fee", { precision: 13, scale: 2 }),
        rdrFee: decimal("rdr_fee", { precision: 13, scale: 2 }),
        cbFee: decimal("cb_fee", { precision: 13, scale: 2 }),
    },
    (table) => [
        primaryKey({ columns: [table.id], name: "settlement_config_id" }),
        unique("settlement_config_merchant_id_index").on(table.merchantId),
    ],
)

export const settlementCurrency = mysqlTable(
    "settlement_currency",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        code: varchar({ length: 5 }).notNull(),
        symbol: varchar({ length: 10 }).notNull(),
        name: varchar({ length: 20 }),
    },
    (table) => [primaryKey({ columns: [table.id], name: "settlement_currency_id" })],
)

export const settlementLedger = mysqlTable(
    "settlement_ledger",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        reconId: bigint("recon_id", { mode: "number" }),
        merchantId: bigint("merchant_id", { mode: "number" }),
        settlementAmount: decimal("settlement_amount", { precision: 10, scale: 4 }),
        chargebacksRefundsAmount: decimal("chargebacks_refunds_amount", { precision: 10, scale: 4 }),
        rollingReserveDeducted: decimal("rolling_reserve_deducted", { precision: 10, scale: 4 }),
        rollingReservePayout: decimal("rolling_reserve_payout", { precision: 10, scale: 4 }),
        payout: decimal({ precision: 10, scale: 4 }),
        notes: varchar({ length: 255 }),
        createdAt: datetime("created_at", { mode: "string" }),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        remark: varchar({ length: 255 }),
    },
    (table) => [primaryKey({ columns: [table.id], name: "settlement_ledger_id" })],
)

export const signupCode = mysqlTable(
    "signup_code",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        identifier: varchar({ length: 100 }).notNull(),
        saasUserCorporationId: bigint("saas_user_corporation_id", { mode: "number" }).notNull(),
        code: varchar({ length: 6 }).notNull(),
        password: varchar({ length: 100 }).notNull(),
        type: varchar({ length: 3 }),
        expireAt: datetime("expire_at", { mode: "string" }),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
        merchantId: bigint("merchant_id", { mode: "number" }).notNull(),
        referralCode: varchar("referral_code", { length: 255 }),
    },
    (table) => [
        index("saas_user_corporation_id").on(table.saasUserCorporationId),
        index("idx_signup_code_identifier").on(table.identifier),
        primaryKey({ columns: [table.id], name: "signup_code_id" }),
    ],
)

export const subscriptionFee = mysqlTable(
    "subscription_fee",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        subscriptionModelId: bigint("subscription_model_id", { mode: "number" }).notNull(),
        feeTypeId: bigint("fee_type_id", { mode: "number" }).notNull(),
        fixedAmount: decimal("fixed_amount", { precision: 13, scale: 2 }).notNull(),
        percentage: decimal({ precision: 13, scale: 2 }).notNull(),
        option: int().default(0).notNull(),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
    },
    (table) => [
        index("subscription_model_id").on(table.subscriptionModelId),
        index("fee_type_id").on(table.feeTypeId),
        primaryKey({ columns: [table.id], name: "subscription_fee_id" }),
    ],
)

export const subscriptionLevel = mysqlTable(
    "subscription_level",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        saasUserCorporationId: bigint("saas_user_corporation_id", { mode: "number" }).notNull(),
        name: varchar({ length: 100 }).default("Default").notNull(),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
    },
    (table) => [
        index("saas_user_corporation_id").on(table.saasUserCorporationId),
        primaryKey({ columns: [table.id], name: "subscription_level_id" }),
    ],
)

export const subscriptionModel = mysqlTable(
    "subscription_model",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        saasUserCorporationId: bigint("saas_user_corporation_id", { mode: "number" }).notNull(),
        modelName: varchar("model_name", { length: 100 }),
        memo: varchar({ length: 500 }),
        customerType: int("customer_type").default(0).notNull(),
        subscriptionLevelId: bigint("subscription_level_id", { mode: "number" }).notNull(),
        currencyId: bigint("currency_id", { mode: "number" }).notNull(),
        default: tinyint().default(0).notNull(),
        status: int().default(0).notNull(),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
    },
    (table) => [
        index("saas_user_corporation_id").on(table.saasUserCorporationId),
        index("subscription_level_id").on(table.subscriptionLevelId),
        index("currency_id").on(table.currencyId),
        primaryKey({ columns: [table.id], name: "subscription_model_id" }),
    ],
)

export const transaction = mysqlTable(
    "transaction",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        orderId: bigint("order_id", { mode: "number" }),
        accountId: bigint("account_id", { mode: "number" }).notNull(),
        currencyCode: varchar("currency_code", { length: 5 }).notNull(),
        cpName: varchar("cp_name", { length: 100 }).notNull(),
        cpEmail: varchar("cp_email", { length: 100 }).notNull(),
        cpBankName: varchar("cp_bank_name", { length: 100 }).notNull(),
        cpSortCode: varchar("cp_sort_code", { length: 100 }).notNull(),
        cpAccountName: varchar("cp_account_name", { length: 100 }).notNull(),
        cpAccountNumber: varchar("cp_account_number", { length: 100 }).notNull(),
        cpIban: varchar("cp_iban", { length: 100 }).notNull(),
        cpBicSwift: varchar("cp_bic_swift", { length: 100 }).notNull(),
        type: int().default(0).notNull(),
        amount: decimal({ precision: 13, scale: 4 }).notNull(),
        feeDetail: text("fee_detail").notNull(),
        feeAmount: decimal("fee_amount", { precision: 13, scale: 4 }).notNull(),
        inOut: tinyint("in_out").default(0).notNull(),
        status: int().default(0).notNull(),
        comment: text(),
        internal: tinyint().default(0),
        description: text(),
        riskLevel: bigint("risk_level", { mode: "number" }).default(1).notNull(),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
    },
    (table) => [
        index("account_id").on(table.accountId),
        index("order_id").on(table.orderId),
        index("risk_level").on(table.riskLevel),
        primaryKey({ columns: [table.id], name: "transaction_id" }),
    ],
)

export const trxMock = mysqlTable(
    "trx_mock",
    {
        id: int().autoincrement().notNull(),
        requestDate: varchar("request_date", { length: 100 }).default("").notNull(),
        status: varchar({ length: 100 }).default("").notNull(),
        amount: float().notNull(),
        ccn: varchar({ length: 30 }).default(""),
        customerName: varchar("customer_name", { length: 20 }).default("").notNull(),
        customerSurname: varchar("customer_surname", { length: 30 }).default("").notNull(),
        customerAddress: varchar("customer_address", { length: 100 }).default("").notNull(),
        customerEmail: varchar("customer_email", { length: 40 }).default("").notNull(),
        refund: tinyint().default(0),
        chargeback: tinyint().default(0),
    },
    (table) => [index("trx_mock_ccn_index").on(table.ccn), primaryKey({ columns: [table.id], name: "trx_mock_id" })],
)

export const user = mysqlTable(
    "user",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        email: varchar({ length: 100 }),
        countryCode: varchar("country_code", { length: 3 }),
        phoneNumber: varchar("phone_number", { length: 20 }),
        password: varchar({ length: 100 }),
        displayName: varchar("display_name", { length: 100 }),
        type: int(),
        avatar: varchar({ length: 100 }),
        mfaSetting: int("mfa_setting"),
        notificationSetting: int("notification_setting"),
        kycId: bigint("kyc_id", { mode: "number" }),
        kycVeriffUuid: varchar("kyc_veriff_uuid", { length: 255 }),
        kycStatus: int("kyc_status").default(0).notNull(),
        role: int().default(7).notNull(),
        activated: tinyint().default(0).notNull(),
        idRef: varchar("id_ref", { length: 100 }),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
        kycSumsubApplicantId: varchar("kyc_sumsub_applicant_id", { length: 255 }).default("").notNull(),
    },
    (table) => [
        index("kyc_id").on(table.kycId),
        index("idx_user_uuid").on(table.kycVeriffUuid),
        index("idx_user_email").on(table.email),
        primaryKey({ columns: [table.id], name: "user_id" }),
    ],
)

export const vip = mysqlTable(
    "vip",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        name: varchar({ length: 100 }).notNull(),
        level: int().default(0).notNull(),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
    },
    (table) => [primaryKey({ columns: [table.id], name: "vip_id" })],
)

export const whitelistedCreditCards = mysqlTable(
    "whitelisted_credit_cards",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        fullNumber: varchar("full_number", { length: 50 }),
        binNumber: varchar("bin_number", { length: 10 }),
        lastFourNumber: varchar("last_four_number", { length: 10 }),
        email: varchar({ length: 100 }),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
    },
    (table) => [primaryKey({ columns: [table.id], name: "whitelisted_credit_cards_id" })],
)

export const whitelistedCreditCardsOld = mysqlTable(
    "whitelisted_credit_cards_old",
    {
        id: bigint({ mode: "number" }).autoincrement().notNull(),
        fullNumber: varchar("full_number", { length: 50 }).notNull(),
        binNumber: varchar("bin_number", { length: 10 }),
        lastFourNumber: varchar("last_four_number", { length: 10 }),
        email: varchar({ length: 100 }).notNull(),
        createdAt: datetime("created_at", { mode: "string" })
            .default(sql`(CURRENT_TIMESTAMP)`)
            .notNull(),
        createdBy: bigint("created_by", { mode: "number" }),
        deletedAt: datetime("deleted_at", { mode: "string" }),
        deletedBy: bigint("deleted_by", { mode: "number" }),
        deleted: tinyint().default(0).notNull(),
        remark: varchar({ length: 500 }),
    },
    (table) => [
        index("comb_idx_partial_card_number").on(table.binNumber, table.lastFourNumber),
        index("comb_idx_partial_card_number_dlt").on(table.binNumber, table.lastFourNumber, table.deletedAt),
        primaryKey({ columns: [table.id], name: "whitelisted_credit_cards_old_id" }),
    ],
)
