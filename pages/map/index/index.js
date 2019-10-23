// pages/map/index/index.js
var bmap = require('../../../utils/bmap-wx.min.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: -1,
    lat: 23.099994,
    lng: 113.324520,
    bMap: null,
    markers: [{
      id: 0.1,
      iconPath: './images/dot.png',
      latitude: 23.099994,
      longitude: 113.324520,
      label: {
        content: '当前楼盘位置',
        color: '#EEEEEE',
        bgColor: '#3347d1',
        padding: 5,
        borderRadius: 3
      }
    }],
    menuList: [{
        img: './images/bus.png',
        img_active: './images/busActive.png',
        text: '公交'
      },
      {
        img: './images/subway.png',
        img_active: './images/subwayActive.png',
        text: '地铁'
      },
      {
        img: './images/school.png',
        img_active: './images/schoolActive.png',
        text: '学校'
      },
      {
        img: './images/property.png',
        img_active: './images/propertyActive.png',
        text: '楼盘'
      },
      {
        img: './images/hospital.png',
        img_active: './images/hospitalActive.png',
        text: '医院'
      },
      {
        img: './images/bank.png',
        img_active: './images/bankActive.png',
        text: '银行'
      },
      {
        img: './images/shop.png',
        img_active: './images/shopActive.png',
        text: '购物'
      },
      {
        img: './images/fitness.png',
        img_active: './images/fitnessActive.png',
        text: '健身'
      },
      {
        img: './images/food.png',
        img_active: './images/foodActive.png',
        text: '餐饮'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      lat: parseFloat(options.lat),
      lng: parseFloat(options.lng),
      ['markers[0].latitude']: options.lat,
      ['markers[0].longitude']: options.lng
    })
  },
  setactive(e) {
    this.setData({
      active: e.currentTarget.dataset.key
    });
    this.search();
  },
  getBMap() {
    if (this.data.bMap == null) {
      this.data.bMap = new bmap.BMapWX({
        ak: app.appData.bMap_Key
      });
    }
    return this.data.bMap;
  },
  search() {
    var map = this.getBMap();
    var text = this.data.menuList[this.data.active].text;

    var fail = function(data) {
      console.log(data)
    };
    var success = (data) => {
      this.setData({
        markers: [{
          id: Math.random(),
          iconPath: './images/dot.png',
          latitude: this.data.lat,
          longitude: this.data.lng,
          label: {
            content: '当前楼盘位置',
            color: '#EEEEEE',
            bgColor: '#3347d1',
            padding: 5,
            borderRadius: 3
          }
        }, ...data.wxMarkerData]
      });
      console.log(this.data.markers);
    }
    // 发起POI检索请求 
    map.search({
      location: `${this.data.lat},${this.data.lng}`,
      "query": text,
      fail: fail,
      success: success,
      // 此处需要在相应路径放置图片文件 
      iconPath: './images/location.png'
    });
  }
})