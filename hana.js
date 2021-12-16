'use strict';
const { PerformanceObserver, performance } = require('perf_hooks');
var util = require('util');
var hana = require('@sap/hana-client');

var connOptions = {
    //Option 1, retrieve the connection parameters from the hdbuserstore
    serverNode: '@USER1UserKey',  //host,port, uid, and pwd retrieved from hdbuserstore

    //As of SAP HANA Client 2.6, connections on port 443 enable encryption by default (HANA Cloud).
    //encrypt: 'true',  //Must be set to true when connecting to HANA as a Service
    sslValidateCertificate: 'false',  //Must be set to false when connecting to an SAP HANA, express edition instance that uses a self-signed certificate.
};

//Synchronous  example querying a table
var connection = hana.createConnection();

connection.connect(connOptions);

//connection.onTrace("", null);  //disables callback tracing for the rest of the program

var sql = 'SELECT * FROM USER1.Produto;';
var t0 = performance.now()
var result = connection.exec(sql);
console.log(util.inspect(result, { colors: false }));
var t1 = performance.now();
console.log("time in ms " +  (t1 - t0));
connection.disconnect();

exports.connection = connection;
exports.connOptions = connOptions;