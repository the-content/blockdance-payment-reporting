import { relations } from "drizzle-orm/relations";
import { user, account, bankAccount, configAcquirer, acquirerOrder, order, customerCardToken, reconBatchJobFile, acquirerReconBatchrun, currency, address, businessCustomerCorporation, saasUserCorporation, configMid, businessCustomerCorporationMember, configContinent, configCountry, cryptoTransaction, customer, subscriptionModel, vip, configRiskLevel, customerAddress, customerWallet, cryptoCurrency, documents, configDocumentType, feeType, houseWallet, kycInfo, mfaCode, offRampingCustomerWallet } from "./schema";

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
	bankAccount: one(bankAccount, {
		fields: [account.bankAccountId],
		references: [bankAccount.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	accounts: many(account),
	businessCustomerCorporations: many(businessCustomerCorporation),
	customers_userId: many(customer, {
		relationName: "customer_userId_user_id"
	}),
	customers_manager: many(customer, {
		relationName: "customer_manager_user_id"
	}),
	kycInfos: many(kycInfo),
	mfaCodes: many(mfaCode),
}));

export const bankAccountRelations = relations(bankAccount, ({one, many}) => ({
	accounts: many(account),
	currency: one(currency, {
		fields: [bankAccount.currencyId],
		references: [currency.id]
	}),
	address: one(address, {
		fields: [bankAccount.bankAddressId],
		references: [address.id]
	}),
}));

export const acquirerOrderRelations = relations(acquirerOrder, ({one}) => ({
	configAcquirer: one(configAcquirer, {
		fields: [acquirerOrder.acquirerId],
		references: [configAcquirer.id]
	}),
	order: one(order, {
		fields: [acquirerOrder.orderId],
		references: [order.id]
	}),
	customerCardToken: one(customerCardToken, {
		fields: [acquirerOrder.tokenId],
		references: [customerCardToken.id]
	}),
}));

export const configAcquirerRelations = relations(configAcquirer, ({many}) => ({
	acquirerOrders: many(acquirerOrder),
	configMids: many(configMid),
	customerCardTokens: many(customerCardToken),
}));

export const orderRelations = relations(order, ({many}) => ({
	acquirerOrders: many(acquirerOrder),
	cryptoTransactions: many(cryptoTransaction),
}));

export const customerCardTokenRelations = relations(customerCardToken, ({one, many}) => ({
	acquirerOrders: many(acquirerOrder),
	configAcquirer: one(configAcquirer, {
		fields: [customerCardToken.acquirerId],
		references: [configAcquirer.id]
	}),
}));

export const acquirerReconBatchrunRelations = relations(acquirerReconBatchrun, ({one}) => ({
	reconBatchJobFile: one(reconBatchJobFile, {
		fields: [acquirerReconBatchrun.reconFileId],
		references: [reconBatchJobFile.id]
	}),
}));

export const reconBatchJobFileRelations = relations(reconBatchJobFile, ({many}) => ({
	acquirerReconBatchruns: many(acquirerReconBatchrun),
}));

export const currencyRelations = relations(currency, ({many}) => ({
	bankAccounts: many(bankAccount),
}));

export const addressRelations = relations(address, ({many}) => ({
	bankAccounts: many(bankAccount),
	businessCustomerCorporations_businessAddress: many(businessCustomerCorporation, {
		relationName: "businessCustomerCorporation_businessAddress_address_id"
	}),
	businessCustomerCorporations_registrationAddress: many(businessCustomerCorporation, {
		relationName: "businessCustomerCorporation_registrationAddress_address_id"
	}),
	customerAddresses: many(customerAddress),
}));

export const businessCustomerCorporationRelations = relations(businessCustomerCorporation, ({one, many}) => ({
	user: one(user, {
		fields: [businessCustomerCorporation.userId],
		references: [user.id]
	}),
	address_businessAddress: one(address, {
		fields: [businessCustomerCorporation.businessAddress],
		references: [address.id],
		relationName: "businessCustomerCorporation_businessAddress_address_id"
	}),
	address_registrationAddress: one(address, {
		fields: [businessCustomerCorporation.registrationAddress],
		references: [address.id],
		relationName: "businessCustomerCorporation_registrationAddress_address_id"
	}),
	saasUserCorporation: one(saasUserCorporation, {
		fields: [businessCustomerCorporation.saasUserCorporationId],
		references: [saasUserCorporation.id]
	}),
	configMid: one(configMid, {
		fields: [businessCustomerCorporation.mid],
		references: [configMid.midCode]
	}),
	businessCustomerCorporationMembers: many(businessCustomerCorporationMember),
	documents: many(documents),
}));

export const saasUserCorporationRelations = relations(saasUserCorporation, ({many}) => ({
	businessCustomerCorporations: many(businessCustomerCorporation),
	customers: many(customer),
	houseWallets: many(houseWallet),
}));

export const configMidRelations = relations(configMid, ({one, many}) => ({
	businessCustomerCorporations: many(businessCustomerCorporation),
	configAcquirer: one(configAcquirer, {
		fields: [configMid.acquirerId],
		references: [configAcquirer.id]
	}),
}));

export const businessCustomerCorporationMemberRelations = relations(businessCustomerCorporationMember, ({one}) => ({
	businessCustomerCorporation: one(businessCustomerCorporation, {
		fields: [businessCustomerCorporationMember.businessCustomerCorporationId],
		references: [businessCustomerCorporation.id]
	}),
}));

export const configCountryRelations = relations(configCountry, ({one}) => ({
	configContinent: one(configContinent, {
		fields: [configCountry.continentCode],
		references: [configContinent.code]
	}),
}));

export const configContinentRelations = relations(configContinent, ({many}) => ({
	configCountries: many(configCountry),
}));

export const cryptoTransactionRelations = relations(cryptoTransaction, ({one}) => ({
	order: one(order, {
		fields: [cryptoTransaction.orderId],
		references: [order.id]
	}),
}));

export const customerRelations = relations(customer, ({one, many}) => ({
	user_userId: one(user, {
		fields: [customer.userId],
		references: [user.id],
		relationName: "customer_userId_user_id"
	}),
	saasUserCorporation: one(saasUserCorporation, {
		fields: [customer.saasUserCorporationId],
		references: [saasUserCorporation.id]
	}),
	user_manager: one(user, {
		fields: [customer.manager],
		references: [user.id],
		relationName: "customer_manager_user_id"
	}),
	subscriptionModel: one(subscriptionModel, {
		fields: [customer.subscriptionModelId],
		references: [subscriptionModel.id]
	}),
	vip: one(vip, {
		fields: [customer.vipId],
		references: [vip.id]
	}),
	configRiskLevel: one(configRiskLevel, {
		fields: [customer.riskLevel],
		references: [configRiskLevel.id]
	}),
	customerAddresses: many(customerAddress),
	customerWallets: many(customerWallet),
	documents: many(documents),
	offRampingCustomerWallets: many(offRampingCustomerWallet),
}));

export const subscriptionModelRelations = relations(subscriptionModel, ({many}) => ({
	customers: many(customer),
}));

export const vipRelations = relations(vip, ({many}) => ({
	customers: many(customer),
}));

export const configRiskLevelRelations = relations(configRiskLevel, ({many}) => ({
	customers: many(customer),
	feeTypes: many(feeType),
}));

export const customerAddressRelations = relations(customerAddress, ({one}) => ({
	customer: one(customer, {
		fields: [customerAddress.customerId],
		references: [customer.id]
	}),
	address: one(address, {
		fields: [customerAddress.addressId],
		references: [address.id]
	}),
}));

export const customerWalletRelations = relations(customerWallet, ({one}) => ({
	customer: one(customer, {
		fields: [customerWallet.customerId],
		references: [customer.id]
	}),
	cryptoCurrency: one(cryptoCurrency, {
		fields: [customerWallet.cryptoId],
		references: [cryptoCurrency.id]
	}),
}));

export const cryptoCurrencyRelations = relations(cryptoCurrency, ({many}) => ({
	customerWallets: many(customerWallet),
	houseWallets: many(houseWallet),
	offRampingCustomerWallets: many(offRampingCustomerWallet),
}));

export const documentsRelations = relations(documents, ({one}) => ({
	businessCustomerCorporation: one(businessCustomerCorporation, {
		fields: [documents.businessCustomerCorporationId],
		references: [businessCustomerCorporation.id]
	}),
	configDocumentType: one(configDocumentType, {
		fields: [documents.documentTypeCode],
		references: [configDocumentType.code]
	}),
	customer: one(customer, {
		fields: [documents.customerId],
		references: [customer.id]
	}),
}));

export const configDocumentTypeRelations = relations(configDocumentType, ({many}) => ({
	documents: many(documents),
}));

export const feeTypeRelations = relations(feeType, ({one}) => ({
	configRiskLevel: one(configRiskLevel, {
		fields: [feeType.riskLevel],
		references: [configRiskLevel.id]
	}),
}));

export const houseWalletRelations = relations(houseWallet, ({one}) => ({
	saasUserCorporation: one(saasUserCorporation, {
		fields: [houseWallet.saasUserCorporationId],
		references: [saasUserCorporation.id]
	}),
	cryptoCurrency: one(cryptoCurrency, {
		fields: [houseWallet.cryptoId],
		references: [cryptoCurrency.id]
	}),
}));

export const kycInfoRelations = relations(kycInfo, ({one}) => ({
	user: one(user, {
		fields: [kycInfo.userId],
		references: [user.id]
	}),
}));

export const mfaCodeRelations = relations(mfaCode, ({one}) => ({
	user: one(user, {
		fields: [mfaCode.userId],
		references: [user.id]
	}),
}));

export const offRampingCustomerWalletRelations = relations(offRampingCustomerWallet, ({one}) => ({
	cryptoCurrency: one(cryptoCurrency, {
		fields: [offRampingCustomerWallet.cryptoId],
		references: [cryptoCurrency.id]
	}),
	customer: one(customer, {
		fields: [offRampingCustomerWallet.customerId],
		references: [customer.id]
	}),
}));