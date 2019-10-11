// components/pages/common/buildingfullitem/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    buildingInfo: {
      type: Object,
      value: {}
    },
    showaddress: {
      type: Boolean,
      value: true
    },
    showfoot: {
      type: Boolean,
      value: true
    },
    defaultClickHandler: { //使用默认的点击事件，即跳转楼盘详情，如果为false，需要自己注册点击事件
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickhandle(e) {
      if (this.data.defaultClickHandler) {
        wx.navigateTo({
          url: '/pages/shop/detail/index/index?buildingId=' + (e.currentTarget.dataset.id || 1),
        })
      } else {
        this.triggerEvent("click", this.data.buildingInfo);
      }
    }
  }
})