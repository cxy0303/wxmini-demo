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
    commentList: [],
    supporting: [],
    isFavorite: false
  },
  attached() {
    this.getHouseDetail();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    gomore() {
      wx.navigateTo({
        url: `/pages/shop/detail/second/interest/index?cityId=${this.data.house.cityId}`,
      })
    },
    gomap() {
      wx.navigateTo({
        url: `/pages/map/index/index?lat=${this.data.house.lat}&lng=${this.data.house.lng}`,
      })
    },
    addstar() {
      let data = {
        'accountId': app.appData.userInfo.id,
        'lat': app.appData.location.lat,
        'lng': app.appData.location.lng,
        'targetId': this.data.releaseId,
        'targetType': 3
      }
      api.addstar(data).then((res) => {
        if (res.data.code == 1) {
          this.setData({
            isFavorite: res.data.content == 1
          })
          wx.showToast({
            title: res.data.content == 1 ? "已收藏" : "已取消收藏",
          })
        }
      })
    },
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
        url: `/pages/shop/order/house/index?buildingId=${this.data.buildingId}&releaseId=${this.data.house.releaseId}`,
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
            commentList: content.commendList,
            supporting: content.supporting,
            isFavorite: content.isFavorite
          })
        }
      })
    }
  }
})