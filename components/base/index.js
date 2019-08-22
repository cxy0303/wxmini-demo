// 组件基类，所有组件都套用此模板，页面显示权限逻辑在此设置
const app = getApp();
Component({
  properties: {
    // 是否必须登录
    mustLogin: {
      type: Boolean,
      value: false,
    },
    loading: {
      type: String,
      value: "page"
    }
  },
  data: {
    pageloaded: false
  },
  attached() {
    setTimeout(() => {
      this.setData({
        loading: ""
      })
      this.triggerEvent('loadchange', this.data.loading);
    }, 3000)
    if (this.mustLogin) {

    } else {

    }
    if (app.appData.logined) {

    }
  }
})