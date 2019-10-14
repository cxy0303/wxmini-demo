// components/pages/common/areachoice/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    items: {
      type: Object,
      value: {
        list: []
      }
    },
    value: {
      activeIndex: 0,
      activetype: '',
      id: 0,
      type: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    activeIndex: 0,//左边“区域”和“地铁”选项
    type: '',//选择“区域”还是“地铁”，仅用于识别选了那种
    select: {
      type: 0,//大类
      id: [0],//小类
      text: ''
    }
  },

  attached() {
    this.setData({
      'activeIndex': this.data.value.activeIndex,
      'type': this.data.value.activetype,
      'select.type': this.data.value.type,
      'select.id': [this.data.value.id]
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    area_nav_item(e) {
      this.setData({
        'type': 'area',
        'select.id': [e.detail.id],
        'select.text': e.detail.text
      })
      this.triggerEvent("change", {
        activeIndex: this.data.activeIndex,
        type: this.data.type,
        select: this.data.select
      })
    },
    area_nav_change(e) {
      this.setData({
        'type': 'area',
        'select.type': e.detail.index
      })
      this.triggerEvent("change", {
        activeIndex: this.data.activeIndex,
        type: this.data.type,
        select: this.data.select
      })
    },
    traffic_nav_item(e) {
      this.setData({
        'type': 'traffic',
        'select.id': [e.detail.id],
        'select.text': e.detail.text
      })
      this.triggerEvent("change", {
        activeIndex: this.data.activeIndex,
        type: this.data.type,
        select: this.data.select
      })
    },
    traffic_nav_change(e) {
      this.setData({
        'type': 'traffic',
        'select.type': e.detail.index
      })
      this.triggerEvent("change", {
        activeIndex: this.data.activeIndex,
        type: this.data.type,
        select: this.data.select
      })
    },
    setactive(e) {
      this.setData({
        activeIndex: e.currentTarget.dataset.key,
        "select": {
          type: 0,
          id: 0,
          text: ''
        }
      })
    }
  }
})