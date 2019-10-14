const app = getApp();
module.exports = Behavior({
  attached: function() {
    this.getTabBar().setData({
      qty: app.appData.tabBarInfo.qty,
      show: true,
      active: app.appData.tabBarInfo.active
    })
  }
})