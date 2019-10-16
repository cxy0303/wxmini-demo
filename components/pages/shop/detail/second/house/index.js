// components/pages/shop/detail/second/house/index.js
import api from '../../../../../../utils/api.js'
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    buildingId: {
      type: Number,
      value: 3
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    housePic: [],
    house: {}
  },
  attached() {
    this.getHouseDetail();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    goablum() {
      wx.navigateTo({
        url: "/pages/shop/detail/detail_album/index",
      })
    },
    gomap(){
      wx.navigateTo({
        url: `/pages/map/index/index?lat=${this.data.house.lat}&lng=${this.data.house.lng}`,
      })
    },
    getHouseDetail() {
      api.getSecondHouseDetail({
        id: this.data.buildingId
      }).then((res) => {
        if (res.data.code == 1) {
          var content = res.data.content;
          this.setData({
            house: content.house,
            housePic: content.housePic
          })
        }
      })
    }
  }
})