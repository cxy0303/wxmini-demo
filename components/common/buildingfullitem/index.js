// components/pages/common/buildingfullitem/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: "new"
    },
    buildingInfo: {
      type: Object,
      value: {}
    },
    showaddress: {
      type: Boolean,
      value: true
    },
    showfoot: {
      type: Boolean,
      value: true
    },
    defaultClickHandler: { //使用默认的点击事件，即跳转楼盘详情，如果为false，需要自己注册点击事件
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    item: {

    }
  },
  observers: {
    buildingInfo() {
      this.init();
    }
  },
  attached() {
    this.init();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    init() {
      var item = {};
      var info = this.data.buildingInfo;
      if (this.data.type == "second") {
        item = {
          id: info.id,
          name: info.estateName,
          logo: info.logo,
          buildingType: info.buildingType,
          roomType: '',
          roomArea: info.content,
          tags: info.characteristic,
          totalPrice: info.totalPrice + "万",
          price: info.price + "万",
          address: info.address,
          saying: info.saying
        }
      } else {
        item = info;
      }
      this.setData({
        item: item
      })
    },
    clickhandle(e) {
      if (this.data.defaultClickHandler) {
        if (this.data.type == "new") {
          wx.navigateTo({
            url: '/pages/shop/detail/index/index?buildingId=' + (e.currentTarget.dataset.id || 1),
          })
        } else {
          wx.navigateTo({
            url: '/pages/shop/detail/second/house/index?buildingId=' + (e.currentTarget.dataset.id || 1),
          })
        }

      } else {
        this.triggerEvent("click", this.data.buildingInfo);
      }
    }
  }
})