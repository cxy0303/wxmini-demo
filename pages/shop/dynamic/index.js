// pages/shop/dynamic/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buildingId: 1,
    loading: 'page'
  },

  pageloaded(e) {
    this.setData({
      loading: e.detail
    })
  },

  onLoad: function (options) {
    this.setData({
      buildingId: options.buildingId
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.selectComponent("#main").getDynamicList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})