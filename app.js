const { crawlJob } = require("./crawl.service");
const { sendEMail, transporter } = require("./utils/utils");
var CronJob = require("cron").CronJob;

var job = new CronJob(
  "*/5 * * * *",
  async function () {
    crawlJob();
  },
  null,
  true,
  "America/Los_Angeles"
);

job.start();
