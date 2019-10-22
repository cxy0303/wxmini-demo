// components/pages/shop/report/index.js
import api from '../../../../utils/api.js'
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
    type: "0",
    typeList: [],
    remark: ''
  },
  attached() {
    this.getInfoType();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    remark_change(e) {
      this.setData({
        remark: e.detail.value
      })
    },
    check_change(e) {
      this.setData({
        type: e.currentTarget.dataset.key + ''
      })
    },
    getInfoType() {
      api.getInfoType().then((res) => {
        if (res.data.code == 1) {
          this.setData({
            typeList: res.data.content
          })
        }
      })
    },
    add() {
      if (!this.data.remark) {
        wx.showModal({
          title: '消息',
          content: '请输入举报理由',
        })
        return;
      }
      var data = {
        targetType: 2,
        "informContent": this.data.remark,
        "informId": this.data.buildingId,
        "informType": this.data.type
      }
      api.addInform(data).then((res) => {
        if (res.data.code == 1) {
          wx.showToast({
            title: '已提交',
          })
          wx.navigateBack();
        } else {
          wx.showModal({
            title: '消息',
            content: res.msg,
          })
        }
      })
    }
  }
})