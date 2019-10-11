const remote = 'http://119.3.36.212:8599';
const socketUrl = 'wss://api.jrfw360.com/websocket/';


var post = function(url, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: remote + url,
      data: data,
      method: "POST",
      success: (res) => {
        resolve(res);
      },
      fail: (error) => {
        reject(error);
      }
    })
  });
}


var getbuildingdetail = function(data) {
  return post("/buildingGroup/detail", data);
}

var getfavorites = function(data) {
  return post("/buildGroupFavorite/getFavorites", data);
}

var getdetailReport = function(data) {
  return post("/buildingGroup/detailForReport", data);
}

var submitReport = function(data) {
  return post("/buildingReport/insert", data);
}

var addstar = function(data) {
  return post("/buildGroupFavorite/addFavorite", data);
}

var addsubscribe = function(data) {
  return post('/booking/building', data);
}

var getbuildingattch = function(data) {
  return post("/buildingAttach/list", data);
}

var getApartmentDetail = function(data) {
  return post("/building/modelTypeDetail", data);
}

var houseTypeSubscribe = function(data) {
  return post("/booking/modelType", data);
}

var getQuestionMsnList = function(data) {
  return post("/group/getQuestionMsnList", data);
}

var getChatMsnList = function(data) {
  return post("/group/getChatMsnList", data);
}

var getMyBuilding = function(data) {
  return post("/shop/myBuilding", data);
}

export default {
  url: remote,
  socket: socketUrl,
  login: remote + "/wx/getUserInfoByCode",
  getAdsList: remote + "/ads/getList",
  getuserinfo: remote + "/user/getByAccountId",
  getbuildingdetail: getbuildingdetail,
  getbuildingdetailremark: remote + "/buildingGroup/detailInfo",
  getvisitlist: remote + "/buildingReport/visitList",
  getservicelist: remote + "/buildingReport/visitList",
  getbuilding_listcar: remote + "/buildingReport/listCar",
  bookingbuilding: remote + "/booking/building",
  detailforreport: remote + "/buildingGroup/detailForReport",
  find: remote + "/buildingGroup/find",
  getfavorites: getfavorites,
  getdetailReport: getdetailReport,
  submitReport: submitReport,
  addstar: addstar,
  addsubscribe: addsubscribe,
  getbuildingattch: getbuildingattch,
  getApartmentDetail: getApartmentDetail,
  houseTypeSubscribe: houseTypeSubscribe,
  getQuestionMsnList: getQuestionMsnList,
  getChatMsnList: getChatMsnList,
  getMyBuilding: getMyBuilding
}