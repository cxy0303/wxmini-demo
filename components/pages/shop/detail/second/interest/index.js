// components/pages/shop/detail/second/interest/index.js
import api from '../../../../../../utils/api.js'
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cityId: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [],
    loadAll: false,
    pageIndex: 0,
    pageSize: 10
  },

  attached() {
    this.getInterestList();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getInterestList() {
      if (this.data.loadAll) {
        return;
      }
      let data = {
        "accountId": app.appData.shopInfo.accountId,
        "app": 0,
        "buildingGroupName": '',
        'commend': true,
        "cityIds": this.data.cityId,
        "districtId": "",
        "eachPrice": "",
        "firstPayment": "",
        "lat": "",
        "lineId": 0,
        "lng": "",
        "moduleType": '',
        "moreIds": '',
        "orderBy": 0,
        "pageNo": this.data.pageIndex + 1,
        "pageSize": this.data.pageSize,
        "stepIds": "",
        "streetIds": "",
        "totalPrice": "",
        "type": 0
      }
      api.getSecondBuilding(data).then((res) => {
        if (res.data.code == 1) {
          this.data.list.push(...res.data.content);
          this.setData({
            pageIndex: this.data.pageIndex + 1,
            list: this.data.list,
            loadAll: res.data.content.length < this.data.pageSize
          })
        }
      })
    }
  }
})