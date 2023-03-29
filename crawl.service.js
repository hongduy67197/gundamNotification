const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const { Toy } = require("./model/Toy.Model");
const { unionWith, isEqual } = require("lodash");
const { sendEMail, transporter } = require("./utils/utils");
// const { listEmail } = require("./constant");

const listEmail = [
  "hongduy67197@gmail.com",
  "thaihmcsp@gmail.com",
  "quangnd2106@gmail.com",
  "destinyoblivion97@gmail.com",
  "minhcrazy85@gmail.com",
  "thinh61197@gmail.com",
];
const compareData = async (listName) => {
  try {
    const oldData = await Toy.findOne().sort("-createdAt");
    if (!oldData) {
      await Toy.create({
        name: listName,
        link: "https://www.bnkrmall.co.kr/premium/p_category.do",
      });

      console.log("done");
      return;
    }
    const groupList = [oldData.name, listName];
    const CompareResult = unionWith(groupList, isEqual);

    if (CompareResult.length === 1) {
      console.log("nothing new");
      return;
    } else {
      await Toy.create({
        name: listName,
        link: "https://www.bnkrmall.co.kr/premium/p_category.do",
      });
      listEmail.forEach(async (item) => {
        await sendEMail(item, transporter);
      });
    }

    console.log("created new");
  } catch (error) {
    console.log(error);
  }
};

const crawlJob = async () => {
  try {
    const listName = [];
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setDefaultNavigationTimeout(0);
    await page.goto("https://www.bnkrmall.co.kr/premium/p_category.do");

    let content = await page.content();
    const $ = cheerio.load(content);
    $(".list.open.fclear")
      .children()
      .each((i, el) => {
        listName.push($(el).find(".text_box .name").html());
      });
    await compareData(listName);

    await browser.close();
  } catch (error) {
    console.log(error);
  }
};

module.exports.crawlJob = crawlJob;
