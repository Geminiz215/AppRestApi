var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");
const bcrypt = require("bcrypt");
var salt = bcrypt.genSaltSync(10);

const { Accounts } = require("../models");

const v = new Validator();

router.get("/", async (req, res) => {
  const account = await Accounts.findAll();
  return res.json(account);
});

router.get("/:email", async (req, res) => {
  const Email = { email: req.params.email };

  const schema = {
    email: "email",
  };

  const validate = v.validate(Email, schema);

  if (validate.length > 0) {
    return res.status(400).json(validate);
  }

  const account = await Accounts.findOne({
    where: Email,
  });

  // return res.json(account || {});
  return res.json({status: 200, payload: account} || {} )
});

router.post("/", async (req, res) => {
  const schema = {
    email: "email",
    username: "string",
    password: "string",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length > 0) {
    return res.status(400).json(validate);
  }
  let password = req.body.password;

  var hashPassword = bcrypt.hashSync(password, salt);

  const SignUp = {
    email: req.body.email,
    username: req.body.username,
    password: hashPassword,
  };
  await Accounts.create(SignUp);

  res.json({ status: 200, payload: "berhasil input data" } || {});
});

router.put("/:email", async (req, res) => {
  const email = { email: req.params.email };

  let account = await Accounts.findOne({
    where: email,
  });

  if (!account) {
    return res.json({ massage: "pages not found" });
  }

  const schema = {
    email: "email|optional",
    username: "string|optional",
    password: "string|optional",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length > 0) {
    return res.status(400).json(validate);
  }

  account = await account.update(req.body);

  res.json({ massage: "complete update data" });
});

router.delete("/:email", async (req, res) => {
  const email = { email: req.params.email };

  let account = await Accounts.findOne({
    where: email,
  });

  // let isimenu = await Isimenu.findByPk(req.params.kode);

  if (!account) {
    return res.json({ massage: "Account not found" });
  }

  await account.destroy();

  // res.json({ massage: "product delete" });
  res.json({ massage: "already destroy" });
});

module.exports = router;
