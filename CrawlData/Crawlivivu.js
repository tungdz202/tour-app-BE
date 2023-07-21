const { default: axios } = require("axios");
const cheerio = require("cheerio");
const Origin = "IVIVU";

//lấy list url của tour du lịch
//lấy theo tỉnh

const departureProvinces = [
  { province: "hồ chí minh" },
  { province: "nha trang" },
  { province: "hà nội" },
];

const provinces = [
  { URLprovince: "tour-ha-long" },
  { URLprovince: "tour-nha-trang" },
  { URLprovince: "tour-sapa" },
  { URLprovince: "tour-ha-noi" },
  { URLprovince: "tour-da-nang" },
  { URLprovince: "tour-quy-nhon" },
  { URLprovince: "tour-phu-yen" },
  { URLprovince: "tour-phan-thiet" },
  { URLprovince: "tour-phu-quoc" },
];

//lấy url và giá tour
const getUrl = async () => {
  baseLink = "https://www.ivivu.com";
  baseURL = "https://www.ivivu.com/du-lich/";
  const tourLinks = [];
  for (const departureProvince of departureProvinces) {
    for (const province of provinces) {
      const respond = await axios.get(
        baseURL + province.URLprovince + "?&form=" + departureProvince.province
      );
      const $ = cheerio.load(respond.data);
      const linkk = $(
        ".tourListContainerHeader .col-xs-12 .tourList .tourItem"
      ).each(async (index, el) => {
        const link = $(el).find(".tourItemImage a").attr("href");
        const price = Number(
          $(el)
            .find(".tourItemContentPrice .tourItemPrice")
            .text()
            .replace(/\s/g, "")
            .replaceAll(".", "")
            .replace("VND", "")
        );

        const newLink = baseLink + link;
        const newtour = {
          link: newLink,
          price: price,
        };
        tourLinks.push(newtour);
      });
    }
  }
  console.log(tourLinks);
  // console.log(tourLinks);
  return tourLinks;
};
// getUrl();

const getlistTour = async () => {
  try {
    const links = await getUrl();
    for (const link of links) {
      if (link.price > 0) {
        const tourDetail = await getTourDetail(link.link, link.price);
        try {
          uploadToDB(tourDetail);
        } catch (error) {
          console.log("upload thất bại");
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
getlistTour();

//lấy thông tin chi tiết tour du lịch theo url
const getTourDetail = async (url, price) => {
  const respond = await axios.get(url);
  const highlightDestination = [];
  const imgs = [];
  const Listschedule = [];
  try {
    const $ = cheerio.load(respond.data);
    if ($) {
      const name = $(".container .content .pageTitle").text();
      // console.log(name);
      const schedules = $(
        ".tourDetailContainer:eq(1) .tourDetailMainDiv .tourScheduleContainer h3"
      ).each((index, el) => {
        const schedule = $(el);
        Listschedule.push(schedule.text());
      });

      const highlightPlaces = await $(
        ".tourDetailContainer:eq(1) .tourDetailMainDiv .tourScheduleContainer p strong"
      ).each((index, el) => {
        const highlightplace = $(el);
        highlightDestination.push(highlightplace.text());
      });
      const highlightDestinations = highlightDestination.join();
      const img = $(
        ".tourDetailContainer:eq(1) .tourDetailMainDiv .tourScheduleContainer p img"
      ).each((index, el) => {
        const img = $(el).attr("data-src");
        const newimg = "https:" + img;
        imgs.push(newimg);
      });

      const departurePoint = $(
        ".container .tourHeaderInfo .col-xs-12 span:first"
      ).text();
      // console.log(departurePoint.text());

      const time = $(".container .tourHeaderInfo .col-xs-12 span:eq(1)").text();
      // console.log(time.text());

      const vehicle = $(
        ".container .tourHeaderInfo .col-xs-12 span:eq(3)"
      ).attr("data-transport");
      // console.log(vehicle);

      const tourcode = $(
        ".container .tourHeaderInfo .col-xs-12 .tourHeaderTourCodeDiv b"
      ).text();
      // console.log(tourcode.text());

      const tourDetail = {
        name: name,
        tourcode: tourcode,
        highlightDestinations: highlightDestinations,
        imgs: imgs,
        vehicle: vehicle,
        departurePoint: departurePoint,
        url: url,
        schedules: Listschedule,
        origin: Origin,
        time: time,
        originalPrice: price,
        presentPrice: price,
      };
      console.log(tourDetail);
      return tourDetail;
    }
  } catch (error) {
    console.log(error);
  }
  // if ($) {

  //   const schedule = $(".panel .panel-collapse .panel-body h3 span").each(
  //     (index, el) => {
  //       const schedule = $(el)
  //         .find("strong")
  //         .text()
  //         .trim()
  //         .replace("QUY TRÌNH ĐĂNG KÝ TOUR", "")
  //         .replace("ĐIỀU KIỆN HỦY TOUR", "")
  //         .replace("NHỮNG LƯU Ý KHÁC", "")
  //         .replace("LƯU Ý KHÁC", "")
  //         .replace("QUY TRÌNH ĐĂNG KÝ TOUR", "")
  //         .replace("ĐIỀU KIỆN HOÀN/HỦY TOUR", "")
  //         .replace("LƯU Ý", "")
  //         .replace("GIÁ TOUR BAO GỒM", "")
  //         .replace("GIÁ TOUR KHÔNG BAO GỒM", "")
  //         .replace("PHÍ HOÀN/HỦY:(Tính theo ngày làm việc)", "")
  //         .replace("QUAN TRỌNG", "")
  //         .replace("GIÁ TOUR:", "")
  //         .replace("GIÁ TOUR – ĐIỀU KIỆN ĐỐI VỚI TRẺ EM ĐI THEO:", "")
  //         .replace("ĐIỀU KIỆN HỦY TOUR", "")
  //         .replace("ĐIỀU KIỆN QUY ĐỊNH VÉ MÁY BAY", "")
  //         .replace(":", "")
  //         .replace("–", "");

  //       if (schedule !== "") {
  //         if (schedule !== "QUY TRÌNH ĐĂNG KÝ TOUR") {
  //           Listschedule.push(schedule);
  //         }
  //       }
  //     }
  //   );
  //   const highlightDestinations = highlightDestination.join();
  //   const img = $(".single-content .owl-carousel .item").each((index, el) => {
  //     const img = $(el).find("img").attr("src").replace(/\r?\n/g, "");
  //     imgs.push(img);
  //   });

  //   const departurePoint = $(".box-tlb-tour tbody tr:first td:first")
  //     .text()
  //     .replace(/\r?\n/g, "")
  //     .trim();
  //   const vehicles = $(".box-tlb-tour tbody tr:first td")
  //     .find("img")
  //     .attr("alt");
  //   const time = $(".box-tlb-tour tbody tr:first td:eq(1) ").text().trim();
  //   const tourcode = $(".box-tlb-tour tbody tr:eq(1) span:eq(1)")
  //     .text()
  //     .replace(/\r?\n/g, "")
  //     .replace(/\s+/g, "");
  //   const originalPrice = Number(
  //     $(".title-price-old:first").text().replace(/,/g, "").replace(/VND/g, "")
  //   );
  //   $(".title-price-old").remove();
  //   const presentPrice = Number(
  //     $(".price-tour:first")
  //       .text()
  //       .replace(/,/g, "")
  //       .replace(/VND/g, "")
  //       .replace(/người/g, "")
  //       .replace("/", "")
  //   );
  //   const tourDetail = {
  //     name: name,
  //     tourcode: tourcode,
  //     highlightDestinations: highlightDestinations,
  //     imgs: imgs,
  //     vehicle: vehicles,
  //     departurePoint: departurePoint,
  //     time: time,
  //     originalPrice: originalPrice,
  //     presentPrice: presentPrice,
  //     url: url,
  //     schedule: Listschedule,
  //     origin: Origin,
  //   };
  //   console.log(tourDetail);
  //   return tourDetail;
  // } else {
  //   console.log(error);
  // }
};

// getTourDetail(
//   "https://www.ivivu.com/du-lich/tour-da-lat-4n3d-da-lat-nha-trang-thanh-pho-hoa-bien/2216",
//   1000000
// );

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
