const { default: axios } = require("axios");

const getAllProvince = async () => {
  try {
    const respond = await axios.get("http://localhost:8888/api/province/");
    return respond.data;
  } catch (error) {
    console.log(error);
  }
};

const getListProvince = async () => {
  const list = await getAllProvince();
  const listProvince = [];
  for (province of list) {
    listProvince.push(province.name);
  }
  return listProvince;
};

const getSumtour = async (province) => {
  try {
    const respond = await axios.post(
      "http://localhost:8888/api/tour/province",
      { province: province }
    );
    console.log(respond.data.length);
    return respond.data.length;
  } catch (error) {
    console.log(error);
  }
};

const getAllSumtour = async () => {
  const listProvince = await getListProvince();
  for (province of listProvince) {
    const sum = await getSumtour(province);
    const res = await axios.put(
      "http://localhost:8888/api/province/addSumTour",
      { name: province, sumTour: sum }
    );
    console.log(res.data);
  }
};
