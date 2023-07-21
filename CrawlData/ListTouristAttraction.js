const { default: axios } = require("axios");

//lấy thông tin các địa điểm du lịch theo từng tỉnh thành
const getAllProvince = async () => {
  try {
    const respond = await axios.get(
      "http://localhost:8888/api/province/showall"
    );
    return respond.data;
  } catch (error) {
    console.log("không thành công");
  }
};

//Lấy thông tin các tour theo từng tỉnh thành
const getTourbyProvince = async (province) => {
  try {
    const respond = await axios.get("http://localhost:8888/api/tour/province", {
      province: province,
    });
    return respond.data;
  } catch (error) {
    console.log("không thành công");
  }
};

//check thông xem thông tin du lịch đã tồn tại hay chưa
const checkExist = (place, highlightDestinations) => {
  return highlightDestinations.include(place);
};

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

const addTouristAttraction = async () => {
  const provinces = getAllProvince();
  for (const province of provinces) {
    const listPlaces = province.TouristAttrations;
    const tours = getTourbyProvince();
    if (tours) {
      for (const place of listPlaces) {
        for (let tour of tours) {
          let newlistPlace = [...tour.listPlace];
          if (checkExist(place, tour.highlightDestinations)) {
            if (!checkExist(place, tour.listPlace)) {
              newlistPlace.push(place);
              tour.listPlace = newlistPlace;
              uploadToDB(tour);
            }
          }
        }
      }
    }
  }
};
