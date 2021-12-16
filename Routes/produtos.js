const express = require("express");
const router = express.Router();
var hana = require("@sap/hana-client");

var connOptions = {
  //Option 1, retrieve the connection parameters from the hdbuserstore
  serverNode: "@USER1UserKey", //host,port, uid, and pwd retrieved from hdbuserstore

  //As of SAP HANA Client 2.6, connections on port 443 enable encryption by default (HANA Cloud).
  //encrypt: 'true',  //Must be set to true when connecting to HANA as a Service
  sslValidateCertificate: "false", //Must be set to false when connecting to an SAP HANA, express edition instance that uses a self-signed certificate.
};
var connection = hana.createConnection();

router.get("/", (req, res, next) => {
  connection.connect(connOptions, function (err) {
    if (err) throw err;
    connection.exec("SELECT * FROM Produto", function (err, result) {
      if (err) throw err;
      console.log(result);
      res.status(200).send(result);
      connection.disconnect();
    });
  });
});

router.post("/", (req, res, next) => {
  const nome = req.body.nome;
  const preco = req.body.preco;
  const id_fornecedor = req.body.id_fornecedor;
  const quantidade = req.body.quantidade;
  connection.connect(connOptions, function (err) {
    if (err) throw err;
    connection.exec(
      "INSERT INTO Produto (nome, preco, id_fornecedor, quantidade) VALUES(?, ?, ?, ?)",
      [nome, preco, id_fornecedor, quantidade],
      function (err, result) {
        connection.disconnect();
        if (err) {
          throw err;
        } else {
          console.log(result);
          res.status(200).send(result);
        }
      }
    );
  });
});

router.get("/:id_produto", (req, res, next) => {
  const id = req.params.id_produto;
  connection.connect(connOptions, function (err) {
    if (err) throw err;
    connection.exec(
      "SELECT * FROM Produto WHERE id_produto = ?",
      [id],
      function (err, result) {
        connection.disconnect();
        if (err) {
          throw err;
        } else {
          console.log(result);
          res.status(200).send(result);
        }
      }
    );
  });
});

router.delete("/:id_produto", (req, res, next) => {
  const id = req.params.id_produto;
  connection.connect(connOptions, function (err) {
    if (err) throw err;
    connection.exec(
      "Delete FROM Produto WHERE id_produto = ?",
      [id],
      function (err, result) {
        connection.disconnect();
        if (err) {
          throw err;
        } else {
          res.status(202).send("Produto removido com sucesso");
        }
      }
    );
  });
});

module.exports = router;
