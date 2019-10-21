// components/common/estateitem/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    detail: {
      type: Object,
      value: {}
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
    godetail() {
      wx.navigateTo({
        url: '/pages/shop/estate/detail/index?buildingId=' + this.data.detail.id,
      })
    }
  }
})