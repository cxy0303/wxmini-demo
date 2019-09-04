// components/pages/common/buildingfullitem/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showaddress: {
      type: Boolean,
      value: true
    },
    showfoot: {
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
    clickhandle() {
      this.triggerEvent("view");
    }
  }
})