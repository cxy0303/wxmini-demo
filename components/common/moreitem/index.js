// components/common/moreitem/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    items: {
      type: Object,
      value: {
        list: [],
        name: '',
        type: ''
      }
    },
    value: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    select_Value: []
  },
  observers: {
    value: function(field) {
      this.setData({
        select_Value: field
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    clear_group(e) {
      var index = e.currentTarget.dataset.key;
      this.data.items.list[index].list.forEach((item) => {
        var item_index = this.data.select_Value.indexOf(item.id);
        if (item_index >= 0) {
          this.data.select_Value.splice(item_index, 1);
        }
      })
      this.triggerEvent("change", this.data.select_Value);
    },
    setactive(e) {
      var id = e.currentTarget.dataset.key;
      var index = this.data.select_Value.indexOf(id);
      if (index >= 0) {
        this.data.select_Value.splice(index, 1);
      } else {
        this.data.select_Value.push(id);
      }
      this.triggerEvent("change", this.data.select_Value);
    }
  }
})