//index.js
//获取应用实例
const app = getApp()


Page({
  data: {
    loading: 'page'
  },

  pageloaded(e) {
    this.setData({
      loading: e.detail
    })
  },
  onLoad: function() {

  },
  onShow() {

  },
  onReachBottom() {
    wx.showToast({
      title: 'bottom',
    })
  }
})