// components/pages/index/main/index.js
var tabbehavior = require('../../../../../utils/tabbase.js')
var app = getApp();
Component({
  behaviors: [tabbehavior],
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    username: '',
    companyName: '',
    avatar: '',
    address: '',
    phone: '',
    wx: '',
    sideindex: 0
  },
  attached() {
    var userinfo = app.appData.userInfo;
    var address = userinfo.provinceName + userinfo.cityName + userinfo.districtName;
    this.setData({
      username: app.appData.userInfo.name,
      companyName: app.appData.userInfo.companyName,
      avatar: app.appData.userInfo.avatar,
      address: address,
      phone: userinfo.phone,
      wx: userinfo.wxAccount
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    godetail() {
      // wx.navigateTo({
      //   url: '/pages/shop/detail/index',
      // })
    },
    sidechange(e) {
      console.log(e.detail.current);
      this.setData({
        sideindex: e.detail.current
      })
    }
  }
})