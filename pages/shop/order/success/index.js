// pages/shop/order/success/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const eventChannel = this.getOpenerEventChannel();
    if (eventChannel) {
      eventChannel.on('acceptDataFromOpenerPage', (data) => {
        this.setData({
          list: data.data
        })
      })
    }
  },
  goapp() {
    var systemInfo = wx.getSystemInfoSync();
    var url = '';
    if (systemInfo.system.match(/Android/i)) {
      url = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.housing.network.broker'
    } else if (systemInfo.system.match(/iphone|ipod|ipad/i)) {
      url = 'https://itunes.apple.com/cn/app/%E6%88%BF%E7%BB%8F%E7%BA%AA/id1456333516?mt=8'
    }
    console.log(url)
    wx.navigateTo({
      url: '/pages/webview/index?url=' + url,
    })
  }
})