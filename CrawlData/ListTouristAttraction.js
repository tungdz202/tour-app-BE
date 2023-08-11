const { default: axios } = require("axios");

//lấy thông tin các địa điểm du lịch theo từng tỉnh thành
const getAllProvince = async () => {
  try {
    const respond = await axios.get("http://localhost:8888/api/province");
    return respond.data;
  } catch (error) {
    console.log("không thành công");
  }
};

//Lấy thông tin các tour theo từng tỉnh thành
const getAllTour = async () => {
  try {
    const respond = await axios.get("http://localhost:8888/api/tour/showall");
    return respond.data;
  } catch (error) {
    console.log("không thành công");
  }
};

//lấy danh sách các địa điểm nổi tiếng
const getListTouristAttraction = async () => {
  const provinces = await getAllProvince();
  let listPopularAttractions = [];
  for (const province of provinces) {
    if (province.popularAttractions.length > 0) {
      for (const populateAttraction of province.popularAttractions) {
        listPopularAttractions.push(populateAttraction);
      }
    }
  }
  return listPopularAttractions;
};

// lấy thông tin các địa điểm nổi tiếng có trong tour
const checkTouristaAttractions = (
  highlightDestinations,
  listTouristaAttractions
) => {
  const foundTouristaAttractions = [];
  for (const TouristaAttraction of listTouristaAttractions) {
    if (
      highlightDestinations
        .replace(/,+/, ",")
        .replace(/,\s+/g, ",")
        .replace(/^\s+|\s+$/g, "")
        .toLowerCase()
        .includes(TouristaAttraction.toLowerCase())
    ) {
      foundTouristaAttractions.push(TouristaAttraction);
    }
  }

  return foundTouristaAttractions;
};

module.exports.addTouristAttractiontoTour = async () => {
  const listTouristaAttractions = await getListTouristAttraction();
  const listTour = await getAllTour();
  for (let tour of listTour) {
    const newTouristAttraction = checkTouristaAttractions(
      tour.highlightDestinations,
      listTouristaAttractions
    );
    tour.touristAttraction = newTouristAttraction;
    console.log(tour.touristAttraction);
    await uploadToDB(tour);
  }

  console.log("thêm thành công");
};

// getListTouristAttraction();

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
  const provinces = await getAllProvince();
  for (const province of provinces) {
    const listPlaces = province.TouristAttrations;
    const tours = await getTourbyProvince();
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
