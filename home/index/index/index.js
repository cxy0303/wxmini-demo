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
    this.getTabBar().setData({
      active: 'home'
    })
  },
  onReachBottom() {

  },
  onShareAppMessage() {
    return {
      title: app.appData.shopInfo.name + app.appData.shopInfo.companyName,
      path: '/home/index/index/index?shopAccountId=' + app.appData.shopInfo.accountId
    }
  }
})