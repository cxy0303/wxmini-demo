// components/pages/shop/detail/second/house/index.js
import api from '../../../../../../utils/api.js'
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    buildingId: {
      type: Number,
      value: 3
    },
    releaseId: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    account: {},
    housePic: [],
    house: {},
    news: [],
    loan: '',
    commentList: []
  },
  attached() {
    this.getHouseDetail();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    godynamic() {
      wx.navigateTo({
        url: '/pages/shop/dynamic/index?buildingId=' + this.data.buildingId,
      })
    },
    goreport() {
      wx.navigateTo({
        url: '/pages/shop/report/index?buildingId=' + this.data.buildingId,
      })
    },
    gosameestate() {
      wx.navigateTo({
        url: '/pages/shop/estate/detail/list/index?buildingId=' + this.data.house.estateId,
      })
    },
    gocal() {
      wx.navigateTo({
        url: '/pages/webview/index?url=https://h5.jrfw360.com/calculatorMortgage',
      })
    },
    goorder() {
      wx.navigateTo({
        url: '/pages/shop/order/house/index?buildingId=' + this.data.buildingId,
      })
    },
    gochat() {
      wx.navigateTo({
        url: '/pages/chat/user/index',
      })
    },
    goAblum() {
      wx.navigateTo({
        url: "/pages/shop/detail/detail_album/index?houseType=1&buildingGroupId=" + this.data.buildingId,
      })
    },
    goEstate() {
      wx.navigateTo({
        url: `/pages/shop/estate/detail/index?buildingId=${this.data.house.estateId}`,
      })
    },
    getHouseDetail() {
      api.getSecondHouseDetail({
        id: this.data.buildingId,
        releaseId: this.data.releaseId,
        accountId: app.appData.userInfo.id,
        loginToken: app.appData.userInfo.loginToken,
      }).then((res) => {
        if (res.data.code == 1) {
          var content = res.data.content;
          var houseNews = content.houseNews;

          this.setData({
            account: content.account,
            house: content.house,
            housePic: content.housePic,
            news: houseNews,
            loan: content.loan,
            commentList: content.commendList
          })
        }
      })
    }
  }
})