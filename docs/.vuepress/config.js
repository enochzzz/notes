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
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
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
        }]
      }
    ],
    sidebar: [
      {
        title: '欢迎交流',
        path: '/',
        collapsable: false, // 不折叠
        children: [{
          title: "小声叨叨",
          path: "/"
        }]
      },
      {
        title: "es6+",
        path: '/notes/es6/letAndConst',
        collapsable: true, // 不折叠
        children: [{
            title: "let与const",
            path: "/notes/es6/letAndConst"
          },
          {
            title: "解构赋值",
            path: "/notes/es6/jiegou"
          },
          {
            title: "模板字符串",
            path: "/notes/es6/stringExtens"
          }
        ],
      },
      {
        title: "js高程4",
        path: '/notes/jsAdvancedProgramming/javaScriptInHtml',
        collapsable: true, // 不折叠
        children: [{
            title: "第二章 HTML中的JavaScript",
            path: "/notes/jsAdvancedProgramming/javaScriptInHtml"
          },
          {
            title: "第三章 数据类型",
            path: "/notes/jsAdvancedProgramming/languageFoundation"
          }
        ],
      },
      {
        title: "浏览器",
        path: '/notes/browser/browserCache',
        collapsable: true, // 不折叠
        children: [{
          title: "第二章 HTML中的JavaScript",
          path: "/notes/browser/browserCache"
        }],
      }
    ]
  }
}