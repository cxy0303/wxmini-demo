import storage from '/utils/storage.js'
App({
  onLaunch: function() {

    var userinfo = wx.getStorageSync(storage.keys.userInfo) || null;
    if (userinfo)
      this.setLogin(userinfo);
  },
  setLogin(userinfo) {
    this.appData.userInfo = userinfo;
    wx.setStorageSync(storage.keys.userInfo, this.appData.userInfo)
  },
  appData: {
    userInfo: null,
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