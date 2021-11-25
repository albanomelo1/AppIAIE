const http = require('http');
const app = require('./app')
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);

'use strict';
const { PerformanceObserver, performance } = require('perf_hooks');
var util = require('util');
var hana = require('@sap/hana-client');

var connOptions = {
    //Option 1, retrieve the connection parameters from the hdbuserstore
    //serverNode: '@USER1UserKey',  //host,port, uid, and pwd retrieved from hdbuserstore

    //Option 2, specify the connection parameters
    serverNode:  "jdbc:sap://9c037a7f-9e83-4035-85cc-76237ae66394.hana.trial-us10.hanacloud.ondemand.com:443?encrypt=true&validateCertificate=true",
    UID: 'DBADMIN',
    PWD: 'Albanomelo1',

    sslValidateCertificate: 'false',
};

//Synchronous  example querying a table
var connection = hana.createConnection();
connection.connect(connOptions);