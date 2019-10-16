import api from '../../../../../../utils/api.js'
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    buildingId: {
      type: Number,
      value: 0
    },
    datalist: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    activename: 'all',
    selects: {

    },
    all: {
      pageindex: 1,
      list: []
    },
    sameArea: {
      pageindex: 1,
      loadtoend: false,
      list: []
    },
    samePrice: {
      pageindex: 1,
      loadtoend: false,
      list: []
    },
    collect: {
      pageindex: 1,
      loadtoend: false,
      list: []
    }
  },
  attached() {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('acceptDataFromOpenerPage', (data) => {
      var _selects = {};
      data.data.forEach((item) => {
        _selects[item.buildingGroupId] = item;
      })

      this.setData({
        selects: _selects
      })
    })

    this.load();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    load() {
      switch (this.data.activename) {
        case 'all':
          this.findAll();
          break;
        case 'sameArea':
          this.getbuildingdetail();
          break;
        case 'samePrice':
          this.getbuildingdetail();
          break;
        case "collect":
          this.getfavorites();
          break;
        default:
          this.findAll();
          break;
      }
    },
    findAll() {
      if (this.data.all.loadtoend) {
        return;
      }
      let data = {
        'accountId': app.appData.userInfo.id,
        'lat': app.appData.location.lat,
        'lng': app.appData.location.lng,
        'pageNo': this.data.all.pageindex,
        'pageSize': 10
      }

      wx.request({
        url: api.find,
        method: "POST",
        data: data,
        success: (res) => {
          if (res && res.data.code == 1) {
            var list = this.data.all.list;
            list.push(...res.data.content);
            this.setData({
              ['all.list']: list,
              ['all.loadtoend']: res.data.content.length < 10,
              ['all.pageindex']: this.data.all.pageindex + 1
            })
          }
        },
        fail: (error) => {

        }
      })
    },
    getbuildingdetail() {
      let data = {
        'accountId': app.appData.userInfo.id,
        'id': this.data.buildingId,
        'lat': app.appData.location.lat,
        'lng': app.appData.location.lng,
        'loginToken': app.appData.userInfo.loginToken
      }
      api.getbuildingdetail(data).then((res) => {
        if (res.data.code == 1) {
          this.setData({
            ['sameArea.list']: res.data.content.nearBuildingList,
            ["samePrice.list"]: res.data.content.samePriceList
          })
        }
      })
    },
    getfavorites() {
      let data = {
        'accountId': app.appData.userInfo.id,
        'lat': app.appData.location.lat,
        'lng': app.appData.location.lng,
        'pageNo': this.data.collect.pageindex,
        'pageSize': 10,
        'targetId': 1,
        'targetType': 1
      }
      api.getfavorites(data).then((res) => {
        if (res && res.data.code == 1) {
          var list = this.data.collect.list;
          list.push(...res.data.content);
          this.setData({
            ['collect.list']: list,
            ['collect.loadtoend']: res.data.content.length < 10,
            ['collect.pageindex']: this.data.collect.pageindex + 1
          })
        }
      })
    },
    clickHandler(e) {debugger
      var item = e.detail;
      var selects = this.data.selects;
      if (item.id == this.data.buildingId) {
        wx.showModal({
          title: '消息',
          content: '此楼盘不能取消',
        })
        return;
      }

      if (!selects[item.id] && Object.keys(selects).length >= 3) {
        wx.showModal({
          title: '消息',
          content: '最多只能选择3个楼盘',
        })
        return;
      }

      if (selects[item.id]) {
        delete selects[item.id];
      } else {
        selects[item.id] = {
          buildingGroupId: item.id,
          buildingGroupName: item.name,
          visitTime: null,
          oneself: null,
          reportRemark: item.reportRemark || '',
          mustFullPhone: item.phoneIsShow
        };
      }
      this.setData({
        selects: selects
      })
    },
    tabclick_handler(e) {
      this.setData({
        activename: e.currentTarget.dataset.key
      })
      this.load();
    },
    sure_handler(e) {
      var datalist = [];
      for (var key in this.data.selects) {
        var item = this.data.selects[key];
        datalist.push(item);
      }

      const eventChannel = this.getOpenerEventChannel();
      eventChannel.emit("sure", datalist);
    }
  }
})