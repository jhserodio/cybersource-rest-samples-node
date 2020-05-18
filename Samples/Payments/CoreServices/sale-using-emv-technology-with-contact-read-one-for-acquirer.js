'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);

function sale_using_emv_technology_with_contact_read_one_for_acquirer(callback) {
	try {
		var configObject = new configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.CreatePaymentRequest();

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = '123456';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var processingInformation = new cybersourceRestApi.Ptsv2paymentsProcessingInformation();
		processingInformation.capture = false;
		processingInformation.commerceIndicator = 'retail';
		requestObj.processingInformation = processingInformation;

		var orderInformation = new cybersourceRestApi.Ptsv2paymentsOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
		orderInformationAmountDetails.totalAmount = '100.00';
		orderInformationAmountDetails.currency = 'USD';
		orderInformation.amountDetails = orderInformationAmountDetails;

		requestObj.orderInformation = orderInformation;

		var pointOfSaleInformation = new cybersourceRestApi.Ptsv2paymentsPointOfSaleInformation();
		pointOfSaleInformation.catLevel = 1;
		pointOfSaleInformation.entryMode = 'contact';
		pointOfSaleInformation.terminalCapability = 1;
		var pointOfSaleInformationEmv = new cybersourceRestApi.Ptsv2paymentsPointOfSaleInformationEmv();
		pointOfSaleInformationEmv.cardSequenceNumber = '0';
		pointOfSaleInformationEmv.fallback = false;
		pointOfSaleInformation.emv = pointOfSaleInformationEmv;

		pointOfSaleInformation.trackData = '%B4111111111111111^TEST/CYBS         ^2012121019761100      00868000000?;';
		requestObj.pointOfSaleInformation = pointOfSaleInformation;


		var instance = new cybersourceRestApi.PaymentsApi(configObject, apiClient);

		instance.createPayment( requestObj, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Process a Payment : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		sale_using_emv_technology_with_contact_read_one_for_acquirer(function () {
		console.log('\nCreatePayment end.');
	});
}
module.exports.sale_using_emv_technology_with_contact_read_one_for_acquirer = sale_using_emv_technology_with_contact_read_one_for_acquirer;
