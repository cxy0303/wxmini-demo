const app = getApp();
Component({
  data: {
    show: false,
    qty: 0,
    active: ''
  },
  created() {},
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.url
      wx.switchTab({
        url
      })
      this.setData({
        active: data.key
      })
      app.appData.tabBarInfo.active = data.key;
    },
    goMsg() {
      wx.navigateTo({
        url: '/pages/chat/user/index',
      })
      this.setData({
        active: 'msg'
      })
    }
  }
})