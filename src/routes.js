const express = require("express");
const routes = express.Router();

const basePath = __dirname + "/views/";

const profile = {
  name: "Francisco Josafá",
  avatar: "https://avatars.githubusercontent.com/u/7139440?s=400&u=d5f3d48c8e7ea7d09a6e3ac9131ae07dab2bf97e&v=4",
  "monthly-budget": 3000,
  "days-per-week": 5,
  "hours-per-day": 5,
  "vacation-per-year": 4
}

routes.get('/', (req, res) => res.render(basePath + "index"));
routes.get('/job', (req, res) => res.render(basePath + "job"));
routes.get('/job/edit', (req, res) => res.render(basePath + "job-edit"));
routes.get('/profile', (req, res) => res.render(basePath + "profile", { profile: profile })); 

module.exports = routes;