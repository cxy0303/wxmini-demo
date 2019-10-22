// components/pages/common/filterbar/index.js
import api from '../../../utils/api.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showindex: {
      type: String,
      value: ''
    },
    searchType: {
      type: Number,
      value: 1
    },
    value: {
      type: Object,
      value: {
        area: {
          activeIndex: 0,
          activeType: '',
          type: 0,
          id: 0
        },
        houseType: {
          id: 0,
          name: ''
        },
        price: {
          type: '',
          activeIndex: 0,
          id: 0,
          text: ''
        },
        moreitems: [],
        sort: {
          id: 0,
          name: ''
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    icon: '../../../assets/images/arrow-down.png',
    iconactive: '../../../assets/images/arrow-up-red.png',
    condition: {
      type: Object,
      value: {
        data_Area: {},
        data_HouseType: {},
        data_Price: {},
        data_More: {},
        data_Sort: {}
      }
    },
    confirm_Value: {
      area: {
        activeIndex: 0,
        activeType: '',
        type: 0,
        id: 0
      },
      price: {
        id: 0,
        activeIndex: 0,
        type: '',
        text: ''
      },
      houseType: {
        id: 0,
        name: ''
      },
      moreitems: [],
      sort: {
        id: 0,
        name: ''
      }
    }
  },
  attached() {
    this.setData({
      confirm_Value: Object.assign({}, this.data.value)
    })
    this.getCondition();
  },
  observers: {
    showindex: function() {
      this.setData({
        confirm_Value: Object.assign({}, this.data.value)
      })

      var tab = this.getTabBar();
      if (this.data.showindex) {
        if (tab && tab.data.show) {
          tab.setData({
            show: false
          })
        }
      } else {
        if (tab && !tab.data.show) {
          tab.setData({
            show: true
          })
        }
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    close(e) {
      this.setData({
        showindex: ''
      })
    },
    area_select_change(e) {
      this.setData({
        'confirm_Value.area': {
          activeType: e.detail.type,
          type: e.detail.select.type,
          id: e.detail.select.id[0],
          activeIndex: e.detail.activeIndex
        }
      })
    },
    search_Clear(e) {
      var key = e.currentTarget.dataset.key;
      if ("price" == key) {
        this.setData({
          'confirm_Value.price': {
            id: 0,
            activeIndex: 0,
            type: '',
            text: ''
          }
        })
        this.data.value.price = this.data.confirm_Value.price;
      } else if ("housetype" == key) {
        this.setData({
          'confirm_Value.houseType': {
            id: 0,
            name: ''
          }
        })
        this.data.value.houseType = this.data.confirm_Value.houseType;
      } else if ("more" == key) {
        this.setData({
          'confirm_Value.moreitems': []
        })
        this.data.value.moreitems = this.data.confirm_Value.moreitems;
      } else if ("area" == key) {
        this.setData({
          'confirm_Value.area': {
            id: 0,
            activeIndex: 0,
            activeType: '',
            type: ''
          }
        })
        this.data.value.area = this.data.confirm_Value.area;
      }
      this.triggerEvent("search", this.data.value);
      this.setData({
        showindex: ''
      })
    },
    search_Confirm(e) {
      var key = e.currentTarget.dataset.key;
      if ("price" == key) {
        this.data.value.price = this.data.confirm_Value.price;
      } else if ("housetype" == key) {
        this.data.value.houseType = this.data.confirm_Value.houseType;
      } else if ("more" == key) {
        this.data.value.moreitems = this.data.confirm_Value.moreitems;
      } else if ("area" == key) {
        this.data.value.area = this.data.confirm_Value.area;
      }
      this.triggerEvent("search", this.data.value);
      this.setData({
        showindex: ''
      })
    },
    sort_change(e) {
      e.currentTarget.dataset.key.id += ''
      this.setData({
        'confirm_Value.sort': e.currentTarget.dataset.key
      })
      this.data.value.sort = this.data.confirm_Value.sort;
      this.triggerEvent("search", this.data.value);
      this.setData({
        showindex: ''
      })
    },
    more_Change(e) {
      this.setData({
        'confirm_Value.moreitems': e.detail
      })
    },
    housetype_change(e) {
      e.currentTarget.dataset.key.id += '';
      this.setData({
        'confirm_Value.houseType': e.currentTarget.dataset.key
      })
    },
    price_nav_change(e) {
      this.setData({
        'confirm_Value.price.activeIndex': e.detail.index,
        'confirm_Value.price.type': this.data.condition.data_Price.list[e.detail.index].type
      })
    },
    price_nav_item(e) {
      this.setData({
        'confirm_Value.price.id': [e.detail.id],
        'confirm_Value.price.text': e.detail.text,
        'confirm_Value.price.type': this.data.condition.data_Price.list[this.data.confirm_Value.price.activeIndex].type
      })
    },
    price_change(e) {
      var key = e.currentTarget.dataset.key;
      this.setData({
        'confirm_Value.price.id': key.id + '',
        'confirm_Value.price.text': key.name,
        'confirm_Value.price.type': 'totalPrice'
      })
    },
    showdropdown(e) {
      this.setData({
        showindex: e.currentTarget.dataset.key == this.data.showindex ? '' : e.currentTarget.dataset.key
      })
    },
    dropdownclose(e) {
      this.setData({
        showindex: ''
      })
    },
    getCondition() {
      api.getLocation().then((res) => {
 
        var city = res.originalData.result.addressComponent.city;
        if (this.data.searchType == 1) {
          api.getCondition({
            cityName: city,
            type: 1
          }).then((res) => {
            if (res.data.code == 1) {
              var condition = res.data.content;
              this.setData({
                'condition.data_Area': this.getFormatTree(condition[0]),
                'condition.data_Price': this.getFormatTree(condition[1]),
                'condition.data_HouseType': condition[2],
                'condition.data_More': condition[3],
                'condition.data_Sort': condition[4]
              })
            }
          })
        } else {
          api.getSecondCondition({
            cityName: city,
            type: 1
          }).then((res) => {
            if (res.data.code == 1) {
              var condition = res.data.content;
              this.setData({
                'condition.data_Area': this.getFormatTree(condition[0]),
                'condition.data_Price': condition[1],
                'condition.data_HouseType': condition[2],
                'condition.data_More': condition[3],
                'condition.data_Sort': condition[4]
              })
            }
          })
        }

      })
    },
    getFormatTree(data) {
      var obj = {
        name: data.name,
        type: data.type,
        list: []
      };
      data.list.forEach((item) => {
        let node = {
          text: item.name,
          type: item.type,
          children: []
        }
        if (item.list) {
          item.list.forEach((subitem) => {
            let subnode = {
              text: subitem.name,
              id: subitem.id,
              children: []
            }
            node.children.push(subnode);
            if (subitem.child) {
              subitem.child.forEach((seconditem) => {
                let secondnode = {
                  text: seconditem.name,
                  id: seconditem.id
                }
                subnode.children.push(secondnode);
              })
            }
          })
        }
        obj.list.push(node);
      })
      return obj;
    }
  }
})