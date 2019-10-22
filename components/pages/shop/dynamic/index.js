// components/pages/shop/dynamic/index.js
import api from '../../../../utils/api.js'
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
    pageIndex: 0,
    pageSize: 10,
    loadAll: false,
    list: [],
    url: ''
  },
  attached() {
    this.getDynamicList();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    close_view(e) {
      this.setData({
        url: ''
      })
    },
    view(e) {
      this.setData({
        url: e.currentTarget.dataset.url
      })
    },
    getDynamicList() {
      if (this.data.loadAll) {
        return;
      }
      var data = {
        accountId: app.appData.userInfo.id,
        id: this.data.buildingId,
        pageNo: this.data.pageIndex + 1,
        pageSize: this.data.pageSize
      }
      api.getDynamicList(data).then((res) => {
        if (res.data.code == 1) {
          this.setData({
            list: res.data.content.userDynamics,
            pageIndex: res.data.content.userDynamics.length > 0 ? this.data.pageIndex + 1 : this.data.pageIndex,
            loadAll: res.data.content.userDynamics.length < this.data.pageSize
          })

        }
      })
    },
    star(e) {
      var item = e.currentTarget.dataset.key;
      var index = e.currentTarget.dataset.index;
      var data = {
        accountId: app.appData.userInfo.id,
        targetId: item.id,
        targetType: 1
      }
      api.addStar(data).then((res) => {
        if (res.data.code == 1) {
          if (item.likeStatus) {
            this.setData({
              [`list[${index}].likeStatus`]: 0,
              [`list[${index}].likeNum`]: item.likeNum - 1
            })
            wx.showToast({
              title: '已取消',
            })
          } else {
            this.setData({
              [`list[${index}].likeStatus`]: 1,
              [`list[${index}].likeNum`]: item.likeNum + 1
            })
            wx.showToast({
              title: '已赞',
            })
          }
        } else {
          wx.showModal({
            title: '操作失败',
            content: res.msg,
          })
        }
      })
    }
  }
})