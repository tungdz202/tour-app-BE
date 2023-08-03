const { default: axios } = require("axios");
const cheerio = require("cheerio");

module.exports.getBlog = async () => {
  baseURL = "https://www.vietnambooking.com/du-lich/blog-du-lich";
  const respond = await axios.get(baseURL);
  const $ = cheerio.load(respond.data);

  for (let i = 1; i < 10; i++) {
    const respond = await axios.get(baseURL + "?page=" + i);
    const $ = cheerio.load(respond.data);
    if ($) {
      $(".category-box-list-default-inner > ul >li").each(async (index, el) => {
        const url = $(el).find("h3 a").attr("href");
        const name = $(el).find("h3 a").text();
        const img = $(el).find(".box-img a img").attr("data-src");
        const description = $(el)
          .find(".box-content .box-description")
          .text()
          .trim();
        const blog = {
          name: name,
          url: url,
          description: description,
          img: img,
        };
        const res = await uploadToDB(blog);
      });
    } else {
      console.log(error);
    }
  }
};

const uploadToDB = async (blog) => {
  try {
    const respond = await axios.post("http://localhost:8888/api/blog/create", {
      blog,
    });
    if (respond) {
      console.log(respond.data);
    }
  } catch (error) {
    console.log("không thành công");
  }
};

// uploadToDB(tourTest);
