// components/pages/common/searchbar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    keywords: {
      type: String,
      value: ''
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
    keywords_input(e) {
      this.setData({
        keywords: e.detail.value
      })
    },
    keyword_confirm(e) {
      this.triggerEvent("search", e.detail.value);
    },
    keywords_clear(e) {
      this.setData({
        keywords: ''
      })
      this.triggerEvent("search",'');
    }
  }
})