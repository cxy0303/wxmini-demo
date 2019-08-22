// components/pages/index/main/index.js
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
    username: ''
  },
  attached() {
    this.triggerEvent('loadchange', 'api');
    setTimeout(() => {
      this.setData({
        username: 'test'
      })
      this.triggerEvent('loadchange', '');
    }, 3000)
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})