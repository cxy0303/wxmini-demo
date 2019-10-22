// components/pages/index/main/index.js
var tabbehavior = require('../../../../utils/tabbase.js')
import api from '../../../../utils/api.js'
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
    roles: '',
    type: '',
    username: '',
    companyName: '',
    companyIntroduction: '',
    avatar: '',
    address: '',
    phone: '',
    wx: '',
    message: '',
    sideindex: 0,
    news: [],
    newhouselist: [],
    secondList: [],
    shareInfo: {}
  },
  attached() {
    var userinfo = app.appData.userInfo;
    this.getMyIndex();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    call(e) {
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.key, //此号码并非真实电话号码，仅用于测试  
        success: function() {
          console.log("拨打电话成功！")
        },
        fail: function() {
          console.log("拨打电话失败！")
        }
      })
    },
    copy(e) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.key,
        success: function(res) {
          wx.showToast({
            title: '已复制',
          })
        }
      })
    },
    godetail(e) {
      wx.navigateTo({
        url: '/pages/webview/index?title=文章详情&url=http://h5.jrfw360.com/newsDetail/' + e.currentTarget.dataset.key,
      })
    },
    sidechange(e) {
      this.setData({
        sideindex: e.detail.current
      })
    },
    getMyIndex() {
      let shopInfo = app.appData.shopInfo;
      var userinfo = app.appData.userInfo;
      api.getMyIndex({
        "accountId": shopInfo.accountId,
        "app": 0,
        "content": "",
        "lat": "",
        "lng": "",
        "loginToken": userinfo ? userinfo.loginToken : '',
        "pageNo": 1,
        "pageSize": 10,
        "platform": 0,
        "username": ""
      }).then((res) => {
        if (res.data.code == 1) {
          var content = res.data.content;
          var account = content.account.yyUser;
          var company = content.account.company;
          this.setData({
            roles: content.account.roles,
            type: parseInt(content.account.type),
            username: account.userName,
            avatar: account.avatar,
            wx: account.weixin,
            message: account.message,
            news: content.news,
            newhouselist: content.list,
            secondList: content.secondList,
            shareInfo: content.shareInfo
          });
          if (company) {
            this.setData({
              companyName: company.companyname,
              companyIntroduction: company.introduction,
              address: company.address,
              phone: company.phone
            })
            app.appData.shopInfo.companyName = this.data.companyName;
          }
          app.appData.shopInfo.name = this.data.username;
          app.appData.tabBarInfo.qty = content.msnNum;
        }
      })
    }
  }
})