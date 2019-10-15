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
  onShareAppMessage(e) {
    var shareInfo=e.target.dataset.key;
    return {
      title: shareInfo.title,
      imageUrl: shareInfo.imageUrl,
      path: '/home/index/index/index?shopAccountId=' + app.appData.shopInfo.accountId
    }
  }
})