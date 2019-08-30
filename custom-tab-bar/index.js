const app = getApp();
Component({
  data: {
    show: false,
    qty:0
  },
  created() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.url
      wx.switchTab({
        url
      })
    }
  }
})