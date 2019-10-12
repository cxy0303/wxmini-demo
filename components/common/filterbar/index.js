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
    value: {
      type: Object,
      value: {
        area: '',
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
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
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
        this.data.value.housetype = this.data.confirm_Value.housetype;
      } else if ("more" == key) {
        this.setData({
          'confirm_Value.moreitems': []
        })
        this.data.value.moreitems = this.data.confirm_Value.moreitems;
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
        var cityid = res.originalData.result.addressComponent.adcode;
        api.getCondition({
          cityIds: cityid
        }).then((res) => {
          if (res.data.code == 1) {
            var condition = res.data.content;
            this.setData({
              'condition.data_Area': condition[0],
              'condition.data_Price': this.getFormatTree(condition[1]),
              'condition.data_HouseType': condition[2],
              'condition.data_More': condition[3],
              'condition.data_Sort': condition[4]
            })
          }
        })
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
            }
            node.children.push(subnode);
          })
        }
        obj.list.push(node);
      })
      return obj;
    }
  }
})