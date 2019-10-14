// components/pages/common/buildingitem/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
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
    click_handler(e) {
      wx.navigateTo({
        url: '/pages/shop/detail/index/index?buildingId=' + this.data.item.buildingGroupId,
      })
    }
  }
})