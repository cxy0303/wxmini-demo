import storage from '/utils/storage.js'
var bmap = require('/utils/bmap-wx.min.js');
import api from '/utils/api.js'
App({
  onLaunch: function() {
    var userinfo = wx.getStorageSync(storage.keys.userInfo) || null;
    userinfo["sycned"] = false;
    if (userinfo)
      this.setLogin(userinfo);
    this.getlocation();
  },
  getlocation() {
    api.getLocation((data) => {
      var addressobj = data.originalData.result.addressComponent;
      var location = data.originalData.result.location;
      this.appData.location = {
        cityId: addressobj.adcode,
        province: addressobj.province,
        city: addressobj.city,
        district: addressobj.district,
        street: addressobj.street,
        lat: location.lat,
        lng: location.lng
      }
    })
  },
  setLogin(userinfo) {
    this.appData.userInfo = userinfo;
    wx.setStorageSync(storage.keys.userInfo, this.appData.userInfo)
  },
  appData: {
    userInfo: null,
    shopInfo: {
      accountId: 146
    },
    location: {
      cityId: 0,
      province: '上海',
      city: '上海市',
      district: '',
      street: '',
      lat: 0,
      lng: 0
    },
    chat: {
      connected: false,
      socketTask: null,
      groupId: 0,
      msglist: [],
      onMessage: null,
      onConnected: null,
      onLoadAll: null,
      loadMore: null,
      pageIndex: 0,
      pageSize: 10,
      loadAll: false
    },
    // userInfo: {
    //   'id': 146,
    //   'phone': '',
    //   'name': '戏子•辰',
    //   'avatar': 'http://img.jrfw360.com/usertrend/image1557469080554.jpg',
    //   'loginToken': '5c07bd525e42aa92da621345f7217b08041e1592',
    //   'phone': '176****9486',
    //   'type': 8,
    //   'roles': 4,
    //   companyName: '',
    //   provinceName: '',
    //   cityName: '',
    //   districtName: '',
    //   wxAccount: '',
    //   'authenticationFlag': 1
    // },
    tabBarInfo: {
      qty: 8
    }
  }
})