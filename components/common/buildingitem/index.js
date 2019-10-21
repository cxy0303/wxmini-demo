// components/pages/common/buildingitem/index.js
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
    click_handler(e) {
      wx.navigateTo({
        url: '/pages/shop/detail/index/index?buildingId=' + this.data.item.buildingGroupId,
      })
    }
  }
})