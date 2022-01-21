var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");

const { Pemesanan } = require("../models/");

const v = new Validator();

router.get("/", async (req, res) => {
  const pemesanan = await Pemesanan.findAll();
  return res.json(pemesanan);
});

router.get("/s", async (req, res) => {
  const cari = { email: req.body.email, kode: req.body.kode };

  const schema = {
    email: "email",
    kode: "string",
  };

  const validate = v.validate(cari, schema);

  if (validate.length > 0) {
    return res.status(400).json(validate);
  }

  const pemesanan = await Pemesanan.findOne({
    where: cari,
  });

  // return res.json(account || {});
  return res.json({ status: 200, payload: pemesanan } || {});
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

  const pemesanan = await Pemesanan.findAll({
    where: Email,
  });

  // return res.json(account || {});
  return res.json({ status: 200, payload: pemesanan } || {});
});

router.post("/", async (req, res) => {
  const schema = {
    kode : "string",
    email: "email",
    kuantitas: "number",
    notes: "string|optional"
  };

  const validate = v.validate(req.body, schema);

  if (validate.length > 0) {
    return res.status(400).json(validate);
  }

  await Pemesanan.create(req.body);

  return res.json({ status: 200, payload: "berhasil post data" } || {});
});

router.put("/", async (req, res) => {

  const data = { email: req.body.email, 
    kode : req.body.kode};
  
  const data1 = {
    kuantitas : req.body.kuantitas,
    notes : req.body.notes
  }

  let pemesanan = await Pemesanan.findOne({
    where: data
  });

  if (!pemesanan) {
    return res.json({ massage: "pages not found" });
  }

  const schema = {
    email: "email",
    kode: "string",
    kuantitas : "number|optional",
    notes: "string|optional",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length > 0) {
    return res.status(400).json(validate);
  }

  pemesanan = await pemesanan.update(data1);

  res.json({ massage: "complete update data" });
});

router.delete("/", async (req, res) => {

  const schema = {
    email: "email",
    kode: "string"
  };

  const validate = v.validate(req.body, schema);

  if (validate.length > 0) {
    return res.status(400).json(validate);
  }

  let pemesanan = await Pemesanan.findOne({
    where: req.body,
  });

  if (!pemesanan) {
    return res.json({ massage: "Account not found" });
  }

  await pemesanan.destroy();

  res.json({ massage: "already destroy" });
});

module.exports = router;
