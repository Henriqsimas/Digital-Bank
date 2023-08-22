const { contas } = require("./bancodedados");

const validarSenhaBanco = (req, res, next) => {
  const { senha_banco } = req.query;
  const senhaBanco = "123";

  if (!senha_banco) {
    return res
      .status(400)
      .json({ mensagem: "Senha não informada. Por favor, informe a senha !" });
  }

  if (senha_banco != senhaBanco) {
    return res.status(400).json({ mensagem: "Senha incorreta !" });
  }

  next();
};

const validarQueryParams = (req, res, next) => {
  const { senha_conta, numero_conta } = req.query;

  if (!senha_conta || !numero_conta) {
    return res
      .status(400)
      .json({ mensagem: "Preencha os campos obrigatórios." });
  }

  next();
};

const validarDados = (req, res, next) => {
  const { nome, data_nascimento, telefone, email, senha, cpf } = req.body;

  if (!nome || !data_nascimento || !telefone || !email || !senha || !cpf) {
    return res
      .status(400)
      .json({ mensagem: "Preencha os campos obrigatórios!" });
  }

  next();
};

const buscarConta = (req, res, next) => {
  const { cpf, email } = req.body;

  const contaExiste = contas.filter((conta) => {
    return conta.usuario.cpf === cpf || conta.usuario.email === email;
  });

  if (contaExiste.length) {
    return res.status(400).json({
      mensagem: "Conta já existente, por favor insira dados válidos!",
    });
  }

  next();
};

const validarNumeroConta = (req, res, next) => {
  const { numero } = req.params;

  const contaExiste = contas.find((conta) => {
    return conta.numero === Number(numero);
  });

  if (!contaExiste) {
    return res.status(400).json({ mensagem: "Número de conta inválido!" });
  }

  req.conta = contaExiste;

  next();
};

const validarNumeroDaConta = (req, res, next) => {
  const { numeroConta } = req.body;

  const conta = contas.filter((conta) => {
    return conta.numero === Number(numeroConta);
  });

  if (!conta) {
    res.status(400).json({ mensagem: "Numero da conta inválido" });
  }

  next();
};

module.exports = {
  validarSenhaBanco,
  validarDados,
  validarNumeroConta,
  buscarConta,
  validarQueryParams,
  validarNumeroDaConta,
};
