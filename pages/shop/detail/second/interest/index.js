// pages/shop/detail/second/interest/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityId: 0,
    loading: 'page'
  },

  pageloaded(e) {
    this.setData({
      loading: e.detail
    })
  },

  onLoad: function (options) {
    this.setData({
      cityId: options.cityId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.selectComponent("#main").getInterestList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})