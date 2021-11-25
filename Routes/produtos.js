const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).send({
        mensagem:"pila"
    });
});

router.post("/", (req, res, next) => {
    const produto = {
        nome: req.body.nome,
        preco: req.body.preco
    }
    res.status(201).send({
        mensagem:"post",
        produtoCriado: produto
    });
});

router.get("/:id_produto", (req, res, next) => {
    const id = req.params.id_produto;
    res.status(200).send({
        mensagem: id
    });
});

router.delete("/", (req, res, next) => {
    res.status(201).send({
        mensagem:"delete"
    });
});

module.exports = router;