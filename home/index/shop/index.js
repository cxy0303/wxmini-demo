// pages/shop/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: 'page',
    hidefilter: false
  },
  pageloaded(e) {
    this.setData({
      loading: e.detail
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getTabBar().setData({
      active: 'search'
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.selectComponent("#main").loadData();
  }
})