// components/pages/common/areachoice/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    items: [{
      // 导航名称
      text: '区域',
      // 该导航下所有的可选项
      children: [{
          // 名称
          text: '上海',
          // id，作为匹配选中状态的标识
          id: 1,
          children: [{
            id: 11,
            text: '松江区'
          }, {
            id: 12,
            text: '闵行区'
          }, {
            id: 13,
            text: '长宁区'
          }]
        },
        {
          text: '北京',
          id: 2
        }
      ]
    }, {
      // 导航名称
      text: '地铁',
      // 该导航下所有的可选项
      children: [{
          // 名称
          text: '1号线',
          // id，作为匹配选中状态的标识
          id: 1
        },
        {
          text: '2号线',
          id: 2
        }
      ]
    }],
    activeIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})