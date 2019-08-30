// components/pages/common/categorybar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: [{
        value: '1',
        text: '一手房'
      }, {
        value: '2',
        text: '二手房'
      }, {
        value: '3',
        text: '租赁'
      }, {
        value: '4',
        text: '商铺'
      }, {
        value: '5',
        text: '商务楼'
      }]
    },
    highkey: {
      type: String,
      value: "-1"
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
    item_tap(e) {
      this.setData({
        highkey: e.currentTarget.dataset.key
      })
    }
  }
})