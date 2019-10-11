// components/pages/common/filterbar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showindex: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    icon: '../../../assets/images/arrow-down.png',
    iconactive: '../../../assets/images/arrow-up-red.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showdropdown(e) {

      this.setData({
        showindex: e.currentTarget.dataset.key == this.data.showindex ? '' : e.currentTarget.dataset.key
      })
    },
    dropdownclose(e) {
      this.setData({
        showindex: ''
      })
    }
  }
})