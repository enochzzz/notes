module.exports = {
  base: '/notes/',
  theme: 'reco',
  title: 'notes',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  description: 'Enoch的学习笔记',
  themeConfig: {
    subSidebar: 'auto',
    nav: [{
        text: '首页',
        link: '/'
      },
      {
        text: 'Enoch的学习笔记',
        items: [{
            text: 'Github',
            link: 'https://github.com/Enochzzz'
          }
        ]
      }
    ],
    sidebar: [{
        title: '欢迎学习',
        path: '/',
        collapsable: false, // 不折叠
        children: [{
          title: "学前必读",
          path: "/"
        }]
      },
      {
        title: "es6+",
        path: '/notes/es6/letAndConst',
        collapsable: false, // 不折叠
        children: [{
            title: "let与const",
            path: "/notes/es6/letAndConst"
          },
          {
            title: "解构赋值",
            path: "/notes/es6/jiegou"
          }
        ],
      },
      {
        title: "js高程4",
        path: '/notes/jsAdvancedProgramming/javaScriptInHtml',
        collapsable: false, // 不折叠
        children: [{
            title: "第二章 HTML中的JavaScript",
            path: "/notes/jsAdvancedProgramming/javaScriptInHtml"
          },
          {
            title: "第三章 数据类型",
            path: "/notes/jsAdvancedProgramming/languageFoundation"
          }
        ],
      }
    ]
  }
}

// 2. 【es6+】 解构赋值