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
    showcoupon: false, //优惠活动
    couponcheck: [false, false, false],
    sideindex: 0,
    tabindex: 0,
    isFavorite: false,
    buildingInfo: {},
    buildTypeList: [],
    buildingNews: [],
    buildingModelType: [], //房型
    buildScore: {}, //评分
    nearBuildingList: [], //同区域
    samePriceList: [], //同价格
    shareInfo: {},
    btntext: "报备客户",
  },
  attached() {
    this.getbuildingdetail(this.data.buildingId);
    if (app.appData.userInfo.type <= 2) {
      this.setData({
        btntext: "我要看房"
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    goHouseTypeDetail() {
      wx.navigateTo({
        url: '/pages/webview/index?url=https://h5.jrfw360.com/building/' + this.data.buildingId,
      })
    },
    apartment_click_handler(e) {
      wx.navigateTo({
        url: '/pages/shop/apartment/index?id=' + e.detail.id,
      })
    },
    addsubscribe() {
      let data = {
        accountId: app.appData.userInfo.id,
        buildGroupId: this.data.buildingId,
        discount: this.data.couponcheck[0],
        sale: this.data.couponcheck[1],
        news: this.data.couponcheck[2]
      }
      api.addsubscribe(data).then((res) => {
        if (res.data.code == 1) {
          wx.showToast({
            title: '订阅成功！',
          })
          this.setData({
            showcoupon: false
          })
        }
      })
    },
    addstar() {
      let data = {
        'accountId': app.appData.userInfo.id,
        'lat': app.appData.location.lat,
        'lng': app.appData.location.lng,
        'targetId': this.data.buildingId,
        'targetType': 1 // 1楼盘 2新闻
      }
      api.addstar(data).then((res) => {
        if (res.data.code == 1) {
          this.setData({
            isFavorite: res.data.content == 1
          })
          wx.showToast({
            title: res.data.content == 1 ? "已收藏" : "已取消收藏",
          })
        }
      })
    },
    chat_handle(e) {
      wx.navigateTo({
        url: '/pages/chat/user/index',
      })
    },
    report_handle(e) {
      wx.navigateTo({
        url: '/pages/shop/detail/detail_report/index?buildingId=' + this.data.buildingId,
      })
    },
    goablum() {
      wx.navigateTo({
        url: "/pages/shop/detail/detail_album/index",
      })
    },
    gomap() {
      wx.navigateTo({
        url: `/pages/map/index/index?lat=${this.data.buildingInfo.lat}&lng=${this.data.buildingInfo.lng}`,
      })
    },
    goservice() {
      wx.navigateTo({
        url: '/pages/shop/detail/detail_service/index?sureRedirect=true&buildingId=' + this.data.buildingId,
      })
    },
    //通知订阅
    booking() {
      this.addsubscribe();
    },
    //优惠通知确认
    coupon_sure() {
      var checked = this.data.couponcheck;
      if (!checked[0] && !checked[1] && !checked[2]) {
        wx.showToast({
          icon: 'none',
          title: '请至少选择一项',
        })
        return;
      }
      this.booking();
    },
    //优惠通知选择
    toggle_coupon_check(e) {
      var index = e.currentTarget.dataset.key;
      var f = 'couponcheck[' + index + "]";
      this.setData({
        [f]: !this.data.couponcheck[index]
      })
    },
    //优惠通知面板隐藏
    close_coupon_popup() {
      this.setData({
        showcoupon: false
      })
    },
    togglecoupon() {
      this.setData({
        showcoupon: !this.data.showcoupon
      })
    },
    gomore() {
      wx.navigateTo({
        url: '/pages/webview/index?url=https://h5.jrfw360.com/propertyBaseInfoDetail/' + this.data.buildingId,
      })
    },
    settab(e) {
      this.setData({
        tabindex: e.target.dataset.key
      })
    },
    sidechange(e) {
      this.setData({
        sideindex: e.detail.current
      })
    },
    drawCircle(percent) {
      var ctx = wx.createCanvasContext('starCanvas', this);
      ctx.setLineWidth(2);
      ctx.setStrokeStyle('#EEEEEE');
      ctx.setFillStyle("#3347D1");

      ctx.beginPath();
      ctx.arc(50, 50, 48, 0, 2 * Math.PI);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(50, 50, 24, 0, 2 * Math.PI);
      ctx.fill();

      ctx.beginPath();
      ctx.setStrokeStyle('rgba(51,71,209,1)');
      console.log(0.01 * Math.PI);
      ctx.arc(50, 50, 48, 1.5 * Math.PI, (1.5 + percent * 2) * Math.PI);
      ctx.stroke();

      ctx.setFontSize(12);
      ctx.setTextAlign("center");
      ctx.setTextBaseline("middle");
      ctx.setStrokeStyle("white");
      ctx.setLineWidth(1);
      ctx.strokeText(this.data.buildScore.scoreNum + " 分", 50, 50, 100);

      ctx.draw();
    },
    getbuildingdetail(id) {
      this.triggerEvent('pageloaded', "api");
      api.getbuildingdetail({
        accountId: app.appData.userInfo.id,
        id: id,
        lat: app.appData.location.lat,
        lng: app.appData.location.lng,
        shareAccountId: 0
      }).then((res) => {
        this.triggerEvent('pageloaded', "");
        if (res.data.code === 1) {
          let info = res.data.content.buildingInfo;
          this.setData({
            buildingInfo: info,
            buildTypeList: res.data.content.buildTypeList,
            buildingNews: res.data.content.buildingNews,
            buildingModelType: res.data.content.buildingModelType,
            buildScore: res.data.content.buildScore,
            nearBuildingList: res.data.content.nearBuildingList,
            samePriceList: res.data.content.samePriceList,
            isFavorite: res.data.content.isFavorite,
            shareInfo: res.data.content.shareInfo,
            'couponcheck[0]': res.data.content.booking.discount,
            'couponcheck[1]': res.data.content.booking.sale,
            'couponcheck[2]': res.data.content.booking.news
          })

          this.drawCircle(this.data.buildScore.scoreNum / 5);
        }
      })
    },
    goAlbum() {
      wx.navigateTo({
        url: '/pages/shop/detail/detail_album/index?buildingGroupId=' + this.data.buildingId,
      })
    }
  }
})