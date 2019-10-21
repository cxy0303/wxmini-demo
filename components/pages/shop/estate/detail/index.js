// components/pages/shop/estate/detail/index.js
import api from '../../../../../utils/api.js'
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    buildingId: {
      type: Number,
      value: 2
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    detail: {

    },
    houseList: [],
    estateList: [],
    viewUrl: ''
  },

  attached() {
    this.getDetail();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    gohousemore(e) {
      wx.navigateTo({
        url: '/pages/shop/estate/detail/list/index?buildingId=' + this.data.buildingId,
      })
    },
    pic_view_close(e) {
      this.setData({
        viewUrl: ''
      })
    },
    viewPic(e) {
      this.setData({
        viewUrl: e.currentTarget.dataset.key
      })
    },
    gomap() {
      wx.navigateTo({
        url: `/pages/map/index/index?lat=${this.data.detail.lat}&lng=${this.data.detail.lng}`,
      })
    },
    getDetail() {
      var data = {
        id: this.data.buildingId,
        "pageNo": 0,
        "pageSize": 0
      }

      api.getEstateDetail(data).then((res) => {
        if (res.data.code == 1) {
          var content = res.data.content;
          this.setData({
            detail: content.detail,
            houseList: content.houseList,
            estateList: content.estateList
          })
        }
      })
    }
  }
})