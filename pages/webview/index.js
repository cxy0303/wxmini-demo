// pages/webview/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weburl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      weburl: options.url,
    })
    console.log(this.data.weburl);
    if (options.title) {
      wx.setNavigationBarTitle({
        title: options.title
      })
    }
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

  }
})