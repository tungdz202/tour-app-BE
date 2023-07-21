const { default: axios } = require("axios");
var natural = require("natural");

async function checkDuplicate(newTour, tour) {
  const string1 = newTour;
  const string2 = tour;
  const levenshteinDistance = natural.LevenshteinDistance(string1, string2);
  const maxLen = Math.max(string1.length, string2.length);
  const similarityRate = (maxLen - levenshteinDistance) / maxLen;
  return similarityRate;
}

const getAllTour = async () => {
  try {
    const respond = await axios.get("http://localhost:8888/api/tour/showall");
    return respond.data;
  } catch (error) {
    console.log("không thành công");
  }
};

const getCollection = async () => {
  try {
    const respond = await axios.get("http://localhost:8888/api/collection");
    return respond.data;
  } catch (error) {
    console.log("không thành công");
  }
};

const addCollection = async (collection) => {
  try {
    await axios.post("http://localhost:8888/api/collection/create", {
      collection,
    });
    console.log("thêm thành công");
  } catch (error) {
    console.log("không thành công");
  }
};

const updateCollection = async (collection) => {
  try {
    await axios.put("http://localhost:8888/api/collection/update", {
      collection,
    });
    console.log("sửa thành công");
  } catch (error) {
    console.log("không thành công");
  }
};

async function addorupdate(tour) {
  let collectionCheck = {};
  let similarityRate = 0.5;
  let listTour = [];
  const newTour = {
    name: tour.name,
    tourcode: tour.tourcode,
    time: tour.time,
    vehicle: tour.vehicle,
    highlightDestinations: tour.highlightDestinations,
    originalPrice: tour.originalPrice,
    presentPrice: tour.presentPrice,
    schedules: tour.schedules,
    url: tour.url,
    imgs: tour.imgs,
    origin: tour.origin,
  };
  listTour.push(newTour);
  const collections = await getCollection();
  //nếu chưa có collecion thì thêm thẳng collection
  if (collections.length === 0) {
    const newCollection = {
      name: tour.name,
      departurePoint: tour.departurePoint,
      imgs: tour.imgs,
      listTour: listTour,
    };
    await addCollection(newCollection);
    console.log("thêm thành công");
  } else {
    for (let collection of collections) {
      let rate = await checkDuplicate(tour.name, collection.name);
      if (rate > similarityRate) {
        similarityRate = rate;
        collectionCheck = collection;
      }
    }
    console.log(similarityRate, collectionCheck.name);

    if (
      similarityRate >= 0.75 &&
      collectionCheck.departurePoint == tour.departurePoint
    ) {
      let testArray2 = [];
      let check = true;
      try {
        let newCollectionTours = collectionCheck.listTour;
        for (let newCollectionTour of newCollectionTours) {
          if (newCollectionTour.name === newTour.name) {
            testArray2.push(newTour);
            check = false;
          } else {
            testArray2.push(newCollectionTour);
          }
        }

        if (check) {
          testArray2.push(newTour);
        }
        const newCollection = {
          name: collectionCheck.name,
          departurePoint: collectionCheck.departurePoint,
          imgs: collectionCheck.imgs,
          listTour: testArray2,
        };
        await updateCollection(newCollection);
      } catch (error) {
        console.log("cập nhật thất bại");
      }
      // thêm tour vào collection
    } else {
      try {
        const newCollection = {
          name: tour.name,
          departurePoint: tour.departurePoint,
          imgs: tour.imgs,
          listTour: listTour,
        };
        await addCollection(newCollection);
      } catch (err) {
        console.log("Thêm thất bại");
      }
    }
  }
}

// const tourTest = {
//   name: "Tour Quy Nhơn – Phú Yên 4 ngày 3 đêm | Lãng mạn xứ Hoa vàng cỏ",
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
//   url: "http://www.vietnambooking.com/wp-content",
//   originalPrice: 5700000,
//   presentPrice: 3990000,
// };
// const testArray = [
//   { name: "một hai ba", description: "một hai ba" },
//   { name: "một hai ba bốn", description: "một hai ba" },
//   { name: "một hai ba năm", description: "một hai ba" },
//   { name: "một hai ba sáu", description: "một hai ba" },
//   { name: "một hai ba bảy", description: "một hai ba" },
// ];

// addorupdate(tourTest);

const CreateAllCollection = async () => {
  const listTour = await getAllTour();
  for (let tour of listTour) {
    await addorupdate(tour);
  }
};

CreateAllCollection();
