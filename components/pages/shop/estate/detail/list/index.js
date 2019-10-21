// components/pages/shop/estate/detail/list/index.js
import api from '../../../../../../utils/api.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    buildingId: {
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: []
  },
  attached() {
    this.getSameEstate();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getSameEstate() {
      var data = {
        id: this.data.buildingId,
        "pageNo": 0,
        "pageSize": 0
      }
      api.getSameEstate(data).then((res) => {
        if (res.data.code == 1) {
          this.setData({
            list: res.data.content
          })
        }
      })
    }
  }
})