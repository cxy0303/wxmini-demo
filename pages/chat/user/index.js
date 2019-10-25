// pages/chat/user/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: 'page'
  },

  pageloaded(e) {
    this.setData({
      loading: e.detail
    })
  }
})