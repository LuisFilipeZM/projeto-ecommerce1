const { text } = require('express');
const Database = require('../connection');

async function findAll() {
  const result = await Database.query('SELECT * FROM produtos');
  return result;
}

async function findOne(id) {
  const result = await Database.query('SELECT * FROM produtos WHERE id = ' + id);
  console.log(result, id);
  return result[0];
}

async function save(produto) {
  const query = {
    text: 'INSERT INTO produtos (nome, valor, quantidade, descricao, imagem_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    values: [produto.nome, produto.valor, Number(produto.quantidade), produto.descricao, produto.imagem_url]
  };
  await Database.query(query);

}

async function update(id, nome, valor, quantidade, descricao, imagem_url) {

  const query = {
    text: 'UPDATE produtos SET nome = $1, valor = $2, quantidade = $3, descricao = $4, imagem_url = $5 WHERE id = $6',
    values: [nome, valor, quantidade, descricao, imagem_url, id]
  };
  await Database.query(query);
}

async function remove(id) {
  const query = {
    text: 'DELETE FROM produtos WHERE id = $1',
    values: [id]
  }
  await Database.query(query);
}

module.exports = { findAll, save, update, remove, findOne};
