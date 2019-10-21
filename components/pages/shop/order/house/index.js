// components/pages/shop/order/house/index.js
import api from '../../../../../utils/api.js'
var app = getApp();
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
    item: {

    },
    agree: false,
    address: '',
    timevisible: false,
    visitTime: null,
    visitNum: 1,
    remark: '',
    minDate: new Date().getTime(),
    focusRemark: false,
    error: [true, true, true]
  },

  attached() {
    this.getHouseDetail();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    visitNum_Change(e) {
      this.setData({
        visitNum: e.detail
      })
    },
    submit() {
      this.setData({
        'error[0]': this.data.visitTime ? true : false,
        'error[1]': this.data.address ? true : false,
        'error[2]': this.data.visitNum ? true : false
      })
      if (!this.data.error[0] || !this.data.error[1] || !this.data.error[2]) {
        wx.showModal({
          title: '消息',
          content: '请完善信息',
        })
        return;
      }
      if (!this.data.agree) {
        wx.showModal({
          title: '消息',
          content: '请仔细阅读并同意《诚信协议》',
        })
        return;
      }
      var userInfo = app.appData.userInfo;
      api.houseInspectionInsert({
        "accountId": userInfo.id,
        "appointmentAddress": this.data.address,
        "appointmentDate": this.data.visitTime,
        "appointmentRemark": this.data.remark,
        "houseId": this.data.buildingId,
        "loginToken": userInfo.loginToken,
        "visitorNum": this.data.visitNum
      }).then((res) => {
        if (res.data.code == 1) {
          wx.showToast({
            title: '已提交',
          })
          wx.redirectTo({
            url: '/pages/shop/order/success/index',
          });
        } else {
          wx.showModal({
            title: '预约失败',
            content: res.msg,
          })
        }
      })
    },
    gomap() {
      wx.navigateTo({
        url: '/pages/address/index?address=' + this.data.address,
        events: {
          sure: (data) => {
            this.setData({
              address: data
            })
          }
        }
      })
    },
    remark_blur(e) {
      this.setData({
        focusRemark: false
      })
    },
    remark_input(e) {
      this.setData({
        remark: e.detail.value
      })
    },
    ShowKeyBorad() {
      this.setData({
        focusRemark: true
      })
    },
    showtime() {
      this.setData({
        timevisible: true
      })
    },
    time_confirm(e) {
      this.setData({
        visitTime: e.detail,
        timevisible: false
      })
    },
    close_time_popup() {
      this.setData({
        timevisible: false
      })
    },
    agree() {
      this.setData({
        agree: !this.data.agree
      })
    },
    getHouseDetail() {
      api.getSecondHouseDetail({
        id: this.data.buildingId
      }).then((res) => {
        if (res.data.code == 1) {
          var content = res.data.content;
          this.setData({
            item: content.house
          })
        }
      })
    }
  }
})