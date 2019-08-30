// components/pages/index/main/index.js
var tabbehavior = require('../../../../../utils/tabbase.js')
Component({
  behaviors: [tabbehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    hide: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    touchS: [0, 0],
    touchE: [0, 0]
  },
  attached() {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    godetail() {
      wx.startPullDownRefresh();
      // wx.navigateTo({
      //   url: '/pages/shop/detail/index',
      // })
    },
    touchStart: function(e) {
      let sx = e.touches[0].pageX
      let sy = e.touches[0].pageY
      this.data.touchS = [sx, sy];
    },
    touchMove: function(e) {
      let sx = e.touches[0].pageX;
      let sy = e.touches[0].pageY;
      this.data.touchE = [sx, sy];

      let start = this.data.touchS
      let end = this.data.touchE
      if (start[1] < end[1] && this.data.hide) {
        this.setData({
          hide: false
        })
        this.getTabBar().setData({
          show: true
        })
      } else if (start[1] > end[1] && !this.data.hide) {
        this.setData({
          hide: true
        })
        this.getTabBar().setData({
          show: false
        })
      }
    },
    touchEnd: function(e) {
      let start = this.data.touchS
      let end = this.data.touchE
      if (start[1] < end[1]&& this.data.hide) {
        this.setData({
          hide: false
        })
      } else if (start[1] > end[1] && !this.data.hide) {
        this.setData({
          hide: true
        })
      }
    }
  }
})