// components/pages/shop/apartment/main/index.js
import api from '../../../../../utils/api.js'
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    houseTypeId: {
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    buildingList: {},
    buildingModelType: {},
    othertype: [],
    isBooking: false,
    viewPic: ''
  },

  attached() {
    this.getApartmentDetail();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    gowebview(){
      wx.navigateTo({
        url: '/pages/webview/index?url=https://h5.jrfw360.com/calculatorMortgage',
      })
    },
    view_close_handle(e) {
      this.setData({
        viewPic: ''
      })
    },
    view_pic_handler(e) {
      this.setData({
        viewPic: e.currentTarget.dataset.key
      })
    },
    item_click_handler(e) {
      wx.redirectTo({
        url: '/pages/shop/apartment/index?id=' + e.detail.id,
      })
    },
    booking_handler() {
      this.houseTypeSubscribe();
    },
    getApartmentDetail() {
      return api.getApartmentDetail({
        id: this.data.houseTypeId
      }).then((res) => {
        this.setData({
          buildingModelType: res.data.content.buildingModelType,
          buildingList: res.data.content.buildingList,
          othertype: res.data.content.otherBuildingModelType,
          isBooking: res.data.content.isBooking
        })
      })
    },
    houseTypeSubscribe() {
      let userinfo = app.appData.userInfo;
      let location = app.appData.location;
      let data = {
        'accountId': userinfo.id,
        'id': this.data.houseTypeId,
        'lat': location.lat,
        'lng': location.lng,
        'loginToken': userinfo.loginToken
      }
      api.houseTypeSubscribe(data).then((res) => {
        wx.showToast({
          title: res.data.content,
        })
      })
    }
  }
})