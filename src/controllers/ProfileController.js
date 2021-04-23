const Profile = require('../models/Profile');

module.exports = {
  async index(req, res) {
    const profile = await Profile.get();

    return res.render("profile", { profile });
  },

  async update(req, res) {
    // req.body para pegar os dados
    const data = req.body;

    // definir quantas semanas tem num ano = 52
    const weeksPerYear = 52;
    
    // remover as semanas de férias do ano, para pegar quantas semanas tem num mês
    const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;

    // total de horas trabalhadas por semanas
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"];

    // horas trabalhadas no mês
    const monthlyTotalHours = weekTotalHours * weeksPerMonth;

    // valor da minha hora de trabalho
    const valueHour = data["value-hour"] = data["monthly-budget"] / monthlyTotalHours;

    const profile = await Profile.get();
    
    await Profile.update({
      ...profile,
      ...req.body,
      "value-hour": valueHour,
    })

    return res.redirect('/profile');
  }
}