const cheerio = require("cheerio");
const request = require("request-promise");
const TourModel = require("../app/models/tours");

baseURL = "https://www.vietnambooking.com/du-lich-trong-nuoc.html/";
function tour(name, tourcode, url, img) {
  (this.name = name),
    (this.tourcode = tourcode),
    (this.url = url),
    (this.img = img);
}
const tours = [];

for (let i = 1; i < 6; i++) {
  async function getData() {
    await request(
      "https://www.vietnambooking.com/du-lich-trong-nuoc.html/",
      (error, response, html) => {
        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html);
          $(".category-box-list-default-inner > ul>li").each((index, el) => {
            const name = $(el).find(".box-content .title-h3");
            const tourcode = $(el).find(".box-content .table td:first");
            const time = $(el).find(".box-content .table td:eq(1)");
            const link = $(el).find(".box-content .title-h3 a").attr("href");
            const img = $(el).find(".box-img img").attr("src");
            const prices = $(el).find(".box-price-promotion-tour span");
            const newtour = new tour(name.text(), tourcode.text(), link, img);
            console.log(newtour);
            tours.push(newtour);
          });
        } else {
          console.log(error);
        }
      }
    );
    console.log(tours);
  }

  getData();
}
