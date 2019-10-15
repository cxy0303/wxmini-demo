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
    newhouselist: []
  },
  attached() {
    var userinfo = app.appData.userInfo;
    this.getMyIndex();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    godetail(e) {
      wx.navigateTo({
        url: '/pages/webview/index?title=文章详情&url=http://localhost:8080/newsDetail/' + e.currentTarget.dataset.key,
      })
    },
    sidechange(e) {
      console.log(e.detail.current);
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
        "loginToken": userinfo.loginToken,
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
            wx: '',
            message: account.message,
            news: content.news,
            newhouselist: content.list
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
        }
      })
    }
  }
})