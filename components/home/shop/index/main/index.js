// components/pages/index/main/index.js
var tabbehavior = require('../../../../../utils/tabbase.js')
import api from '../../../../../utils/api.js'
var app = getApp();
Component({
  behaviors: [tabbehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    hide: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    touchS: [0, 0],
    touchE: [0, 0],
    key: '',
    pageIndex: 0,
    pageSize: 10,
    list: [],
    loadAll: false
  },
  attached() {
    this.loadData();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    key_Search(e) {
      this.setData({
        key: e.detail
      })
      this.reload();
    },
    reload() {
      this.setData({
        pageIndex: 0,
        loadAll: false,
        list: []
      })
      this.loadData();
    },
    loadData() {
      if (this.data.loadAll) {
        return;
      }

      let userInfo = app.appData.userInfo;
      let data = {
        "accountId": 52,
        "app": 0,
        "buildingGroupName": this.data.key,
        "cityIds": "",
        "districtId": "",
        "eachPrice": "",
        "firstPayment": "",
        "lat": "",
        "lineId": 0,
        "lng": "",
        "moduleType": "",
        "moreIds": "",
        "orderBy": 0,
        "pageNo": this.data.pageIndex + 1,
        "pageSize": this.data.pageSize,
        "stepIds": "",
        "streetIds": "",
        "totalPrice": "",
        "type": 0
      }
      api.getMyBuilding(data).then((res) => {
        if (res.data.code == 1) {
          let content = res.data.content;
          this.data.list.splice(0, 0, ...content.list)
          this.setData({
            list: this.data.list,
            pageIndex: this.data.pageIndex + 1,
            loadAll: content.list.length < this.data.pageSize
          })
        }
      })
    },
    touchStart: function(e) {
      let sx = e.touches[0].pageX
      let sy = e.touches[0].pageY
      this.data.touchS = [sx, sy];
    },
    touchMove: function(e) {
      let sx = e.touches[0].pageX;
      let sy = e.touches[0].pageY;
      this.data.touchE = [sx, sy];

      let start = this.data.touchS
      let end = this.data.touchE
      if (start[1] < end[1] && this.data.hide) {
        this.setData({
          hide: false
        })
        this.getTabBar().setData({
          show: true
        })
      } else if (start[1] > end[1] && !this.data.hide) {
        this.setData({
          hide: true
        })
        this.getTabBar().setData({
          show: false
        })
      }
    },
    touchEnd: function(e) {
      let start = this.data.touchS
      let end = this.data.touchE
      if (start[1] < end[1] && this.data.hide) {
        this.setData({
          hide: false
        })
      } else if (start[1] > end[1] && !this.data.hide) {
        this.setData({
          hide: true
        })
      }
    }
  }
})