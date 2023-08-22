const { Router } = require("express");
const listar = require("./controladores/contasBancarias/listar");
const cadastrar = require("./controladores/contasBancarias/cadastrar");
const atualizar = require("./controladores/contasBancarias/atualizar");
const deletar = require("./controladores/contasBancarias/deletar");
const exibirSaldo = require("./controladores/OperaçõesBancarias/saldo");
const transferir = require("./controladores/OperaçõesBancarias/transferir");
const depositar = require("./controladores/OperaçõesBancarias/deposito");
const sacar = require("./controladores/OperaçõesBancarias/sacar");
const tirarExtrato = require("./controladores/OperaçõesBancarias/extrato");
const {
  validarSenhaBanco,
  validarNumeroConta,
  buscarConta,
  validarDados,
  validarQueryParams,
  validarNumeroDaConta,
} = require("./intermediarios");
const rotas = Router();

rotas.get("/contas", validarSenhaBanco, listar);
rotas.get("/contas/saldo", validarQueryParams, exibirSaldo);
rotas.get("/contas/extrato", validarQueryParams, tirarExtrato);
rotas.post("/contas", validarDados, buscarConta, cadastrar);
rotas.post("/transacoes/transferir", transferir);
rotas.post("/transacoes/depositar", validarNumeroDaConta, depositar);
rotas.post("/transacoes/sacar", sacar);
rotas.put(
  "/contas/:numero/usuario",
  buscarConta,
  validarNumeroConta,
  atualizar
);
rotas.delete("/contas/:numero", buscarConta, validarNumeroConta, deletar);

module.exports = rotas;
