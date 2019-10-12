// components/pages/common/areachoice/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    activeIndex: 0,
    items_area: [],
    items_trafic: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    click_nav(e) {
      this.setData({
        activeIndex: e.detail.index
      })
    },
    setactive(e) {
      this.setData({
        activeIndex: e.currentTarget.dataset.key
      })
    }
  }
})