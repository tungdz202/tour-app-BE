const { default: axios } = require("axios");
const cheerio = require("cheerio");

//lấy list url của tour du lịch
const getUrl = async () => {
  let i = 0;
  baseURL = "https://www.saigontourist.net/vi/tour-trong-nuoc?limit=20&page=";
  const tourLinks = [];
  baseLink = "https://www.saigontourist.net";

  for (let i = 3; i < 6; i++) {
    const respond = await axios.get(baseURL + i);
    const $ = cheerio.load(respond.data);
    // thêm https://www.saigontourist.net/ vào đầu link
    const link = $(".mainContentSection .row:eq(1) .col-sm-12 .row").each(
      (index, el) => {
        const link = $(el)
          .find(".col-md-8 .row .col-md-8 .title-tour a")
          .attr("href");
        if (link) {
          const newLink = baseLink + link;
          tourLinks.push(newLink);
        }
      }
    );
  }

  console.log(tourLinks);
  return tourLinks;
};

getUrl();

const getlink = async () => {
  try {
    const links = await getUrl();
    for (const link of links) {
      const tourDetail = await getTourDetail(link);
      try {
        uploadToDB(tourDetail);
      } catch (error) {
        console.log("upload thất bại");
      }
    }
  } catch (error) {
    console.log(error);
  }
};
// getlink();

//lấy thông tin chi tiết tour du lịch theo url
const getTourDetail = async (url) => {
  const respond = await axios.get(url);
  const highlightDestination = [];
  const imgs = [];
  const Listschedule = [];
  const $ = cheerio.load(respond.data);
  if ($) {
    const name = $(".single-box-content-inner h1").text();
    const schedules = $(".panel .panel-collapse .panel-body h3").each(
      (index, el) => {
        const schedule = $(el).find("strong").text();
        highlightDestination.push(schedule);
      }
    );
    const schedule = $(".panel .panel-collapse .panel-body h3 span").each(
      (index, el) => {
        const schedule = $(el)
          .find("strong")
          .text()
          .trim()
          .replace("QUY TRÌNH ĐĂNG KÝ TOUR", "")
          .replace("ĐIỀU KIỆN HỦY TOUR", "")
          .replace("NHỮNG LƯU Ý KHÁC", "")
          .replace("LƯU Ý KHÁC", "")
          .replace("QUY TRÌNH ĐĂNG KÝ TOUR", "")
          .replace("ĐIỀU KIỆN HOÀN/HỦY TOUR", "")
          .replace("LƯU Ý", "")
          .replace("GIÁ TOUR BAO GỒM", "")
          .replace("GIÁ TOUR KHÔNG BAO GỒM", "")
          .replace("PHÍ HOÀN/HỦY:(Tính theo ngày làm việc)", "")
          .replace("QUAN TRỌNG", "")
          .replace("GIÁ TOUR:", "")
          .replace("GIÁ TOUR – ĐIỀU KIỆN ĐỐI VỚI TRẺ EM ĐI THEO:", "")
          .replace("ĐIỀU KIỆN HỦY TOUR", "")
          .replace("ĐIỀU KIỆN QUY ĐỊNH VÉ MÁY BAY", "")
          .replace(":", "")
          .replace("–", "");

        if (schedule !== "") {
          if (schedule !== "QUY TRÌNH ĐĂNG KÝ TOUR") {
            Listschedule.push(schedule);
          }
        }
      }
    );
    console.log(Listschedule);
    const highlightDestinations = highlightDestination.join();
    const img = $(".single-content .owl-carousel .item").each((index, el) => {
      const img = $(el).find("img").attr("src").replace(/\r?\n/g, "");
      imgs.push(img);
    });

    const departurePoint = $(".box-tlb-tour tbody tr:first td:first")
      .text()
      .replace(/\r?\n/g, "")
      .trim();
    const vehicles = $(".box-tlb-tour tbody tr:first td")
      .find("img")
      .attr("alt");
    const time = $(".box-tlb-tour tbody tr:first td:eq(1) ").text().trim();
    const tourcode = $(".box-tlb-tour tbody tr:eq(1) span:eq(1)")
      .text()
      .replace(/\r?\n/g, "")
      .replace(/\s+/g, "");
    const originalPrice = Number(
      $(".title-price-old:first").text().replace(/,/g, "").replace(/VND/g, "")
    );
    $(".title-price-old").remove();
    const presentPrice = Number(
      $(".price-tour:first")
        .text()
        .replace(/,/g, "")
        .replace(/VND/g, "")
        .replace(/người/g, "")
        .replace("/", "")
    );
    const tourDetail = {
      name: name,
      tourcode: tourcode,
      highlightDestinations: highlightDestinations,
      imgs: imgs,
      vehicle: vehicles,
      departurePoint: departurePoint,
      time: time,
      originalPrice: originalPrice,
      presentPrice: presentPrice,
      url: url,
    };
    return tourDetail;
  } else {
    console.log(error);
  }
};

// getTourDetail();
// const tourTest = {
//   name: "Tour Quy Nhơn – Phú Yên 4 ngày 3 đêm | Lãng mạn xứ Hoa vàng cỏ xanh",
//   tourcode: "TOQNHMTRPHY4N3D-TTHE-142458",
//   highlightDestinations:
//     "NGÀY 01: SÀI GÒN - CITY TOUR QUY NHƠN (ĂN TRƯA, TỐI),NGÀY 02: ĐẢO KỲ CO - BÃI DỨA - EO GIÓ - TỊNH XÁ NGỌC HÒA ( ĂN SÁNG, TRƯA, TỐI),NGÀY 03: PHÚ YÊN - XỨ SỞ HOA VÀNG CỎ XANH (ĂN SÁNG, TRƯA, TỐI),NGÀY 04: THÁP NGHINH PHONG - TẠM BIỆT KHÁCH (ĂN SÁNG),,,QUY TRÌNH ĐĂNG KÝ TOUR,ĐIỀU KIỆN HỦY TOUR,ĐIỀU KIỆN QUY ĐỊNH VÉ MÁY BAY,NHỮNG LƯU Ý KHÁC",
//   imgs: [
//     "https://www.vietnambooking.com/wp-content/uploads/2012/06/ghenh-da-dia.jpg",
//     "https://www.vietnambooking.com/wp-content/uploads/2012/06/thap-doi.jpg",
//     "https://www.vietnambooking.com/wp-content/uploads/2012/06/bai-xep.jpg",
//     "https://www.vietnambooking.com/wp-content/uploads/2012/06/bai-xep-hoa-vang-co-xanh.jpg",
//     "https://www.vietnambooking.com/wp-content/uploads/2012/06/eo-gio.jpg",
//     "https://www.vietnambooking.com/wp-content/uploads/2012/06/ky-co.jpg",
//     "https://www.vietnambooking.com/wp-content/uploads/2012/06/bai-trung.jpg",
//     "https://www.vietnambooking.com/wp-content/uploads/2012/06/cau-thi-nai.jpg",
//   ],
//   vehicle: "o_to",
//   departurePoint: "Qui Nhơn",
//   time: "4 ngày 3 đêm",
//   originalPrice: 5700000,
//   presentPrice: 3990000,
// };

const uploadToDB = async (tour) => {
  try {
    const respond = await axios.post("http://localhost:8888/api/tour/create", {
      tour,
    });
    if (respond) {
      console.log(respond.data);
    }
  } catch (error) {
    console.log("không thành công");
  }
};

// uploadToDB(tourTest);
