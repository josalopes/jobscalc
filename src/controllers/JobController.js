const Job = require('../models/Job');
const JobUtils = require('../utils/jobUtils');
const Profile = require('../models/Profile');

module.exports = {
  

  save(req, res) {

    const newJob = {
      name: req.body.name,
      "daily_hours": req.body["daily-hours"],
      "total_hours": req.body["total-hours"],
      created_at: Date.now()  
    }

    Job.create(newJob);

    return res.redirect('/');
  },

  create(req, res) {
    return res.render("job");
  },

  async show(req, res) {
    const jobs = await Job.get();
    const profile = await Profile.get();

    const jobId = req.params.id;
    const job = jobs.find(job => Number(job.id) === Number(jobId));

    if (!job) {
      return res.send('Job not found"');
    }

    job.budget = JobUtils.calculateBudget(job, profile["value-hour"]);

    return res.render("job-edit", { job });
  },

  async update(req, res) {
    const jobs = await Job.get();
    const jobId = req.params.id;
    const job = jobs.find(job => Number(job.id) === Number(jobId));

    if (!job) {
      return res.send('Job not found"');
    }

    const updatedJob = {
      ...job,
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"],
    }

    await Job.update(updatedJob);

    res.redirect('/job/' + jobId);
  },

  async delete(req, res) {
    const jobId = req.params.id;

    await Job.delete(jobId);

    return res.redirect('/');
  }
}