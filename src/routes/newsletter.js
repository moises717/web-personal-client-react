const { Router } = require("express");
const NewsLetterController = require("../controllers/newsletter");

const api = Router();

api.post("/suscribe-newsletter/:email", NewsLetterController.suscribeEmail);

module.exports = api;
