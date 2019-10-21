// pages/address/index.js
var app = getApp();
var bmap = require('../../utils/bmap-wx.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon: "../../assets/images/location.png",
    address: '',
    lat: null,
    lng: null,
    markers: [],
    pois: [],
    mapcontent: null,
    bMap: null,
    showDrop: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.mapcontent = wx.createMapContext("map");
    if (options.address) {
      this.setData({
        address: options.address
      });
      this.keySearch();
    } else {
      app.getlocation().then((res) => {
        var location = res.originalData.result.location;
        this.setData({
          lat: location.lat,
          lng: location.lng
        })
        this.search();
      })
    }
  },
  region_change(e) {
    if ("drag" == e.causedBy && "end" == e.type) {
      this.data.mapcontent.getCenterLocation({
        success: (res) => {
          this.setData({
            lat: res.latitude,
            lng: res.longitude
          })
          this.search();
        }
      })
    }
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
    var fail = function(data) {
      console.log(data)
    };
    var success = (data) => {
      var content = data.originalData.result;
      console.log(data);
      this.setData({
        address: content.formatted_address,
        // markers: data.wxMarkerData
        pois: content.pois
      })
    }

    map.regeocoding({
      location: `${this.data.lat},${this.data.lng}`,
      fail: fail,
      success: success,
      iconPath: this.data.icon
    });
  },
  keySearch() {
    var map = this.getBMap();
    var success = (data) => {
      var wxMarkerData = data.wxMarkerData;
      this.setData({
        lat: wxMarkerData[0].latitude,
        lng: wxMarkerData[0].longitude
      });
    }

    map.geocoding({
      address: this.data.address,
      fail: (data) => {
        console.log(data);
      },
      success: success,
      iconPath: this.data.icon
    });
  },
  address_change(e) {
    this.setData({
      address: e.detail.value
    })
    this.keySearch();
  },
  set_addr(e) {
    var item = e.currentTarget.dataset.key;
    this.setData({
      address: item.addr,
      showDrop: false
    })
  },
  focus_handler(e) {
    this.setData({
      showDrop: true
    })
  },
  blur_handler(e) {
    this.setData({
      showDrop: false
    })
  },
  sure(e) {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.emit("sure", this.data.address);
    wx.navigateBack();
  }
})