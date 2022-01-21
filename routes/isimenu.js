var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");
const db = require("../config/db")


const { Isimenu } = require("../models");

const v = new Validator();

router.get("/", async (req, res) => {
  const menu = await Isimenu.findAll();
  return res.json(menu);
});

router.get("/cari/:menu", async (req, res) => {
  const kode = { kode: req.params.menu };

  const menu = await Isimenu.findAll({
    where: kode,
  });

  return res.json(menu || {});
});

router.get("/keranjang/:email", async (req, res) => {
  let email = req.params.email;
  let sql = `SELECT pemesanan.kode, isimenu.menu , pemesanan.email,pemesanan.kuantitas ,isimenu.harga
  FROM isimenu 
  INNER JOIN pemesanan ON pemesanan.kode=isimenu.kode 
  where email = "${email}"`;

  db.query(sql, function (err, result) {
    if (err) throw err;
    res.json({ status: 200, payload: result } || {});
  });
});

router.post("/", async (req, res) => {
  const schema = {
    menu: "string",
    harga: "string",
    description: "string|optional",
    kode: "string",
    tanggal: "date|optional",
    gambar: "string|optional",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length > 0) {
    return res.status(400).json(validate);
  }

  const isimenu = await Isimenu.create(req.body);

  res.json({ status: 200, payload: isimenu } || {});
});

router.put("/:kode", async (req, res) => {
  const kode = { kode: req.params.kode };

  let isimenu = await Isimenu.findOne({
    where: kode,
  });

  if (isimenu == 0) {
    return res.json({ massage: "pages not found" });
  }

  const schema = {
    menu: "string|optional",
    harga: "string|optional",
    description: "string|optional",
    kode: "string|optional",
    tanggal: "date|optional",
    gambar: "string|optional",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length > 0) {
    return res.status(400).json(validate);
  }

  isimenu = await isimenu.update(req.body);
  res.json(isimenu);
});

router.delete("/:kode", async (req, res) => {
  const kode = { kode: req.params.kode };

  let isimenu = await Isimenu.findOne({
    where: kode,
  });

  // let isimenu = await Isimenu.findByPk(req.params.kode);

  if (isimenu == 0) {
    return res.json({ massage: "Account not found" });
  }

  await isimenu.destroy();

  // res.json({ massage: "product delete" });
  res.json({ massage: "already destroy" });
});

module.exports = router;
