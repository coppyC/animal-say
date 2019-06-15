# What's this? / 这啥玩意啊?
* This is an interesting tiptool for web page.
这是一个有丶意思的网页提示工具。
* It has many Custom options.
它拥有许多自定义选项。
* it has fashioned UI for default option.
默认选项拥有着时尚的UI。
* It don't need to dependent on any JavaScript framework.
It mean you can use it with any web page project.
它不依赖任何框架，这意味着你可以在任web page项目中使用它。

# How to install / 如何安装
* if you use npm / 使用 npm 安装
``` bash
$ npm i animal-say
```
* if you use yarn / 使用 yarn 安装
``` bash
$ yarn add animal-say
```
* if you use script with cdn / 使用 cdn 引入
``` html
<script src="https://unpkg.com/animal-say/dist/index.js"></script>

<!-- 推荐使用 @x.x.x 来锁定版本号，避免更新时不同版本带来的兼容性问题，示例 -->
<script src="https://unpkg.com/animal-say@0.8.2/dist/index.js"></script>
```
* if you use script with local file / 下载到本地引入
[download(下载)](https://github.com/coppyC/animal-say/releases)
``` html
<script src="path_to_animal-say/index.js"></script>
```

# get Started / 开始使用
* use es 6 module
``` js
import Animal from 'animal-say'

// 使用默认选项
// use the default configure
Animal.say('hello world')

// 当然，你也可以修改默认选项，像这样
// also you can edit the configure, like this
Animal.conf.animal.animation = 'slide'
// ...

// 或者使用新的独立配置，继承于默认配置
// or use a new configure, extends from default configure
const animal = new Animal({
  animal: {
    animation: 'slide'
  }
  // ... some other Configures options here
})

// message
animal.say('hello word')

// dialog
animal.tell('I am here')
  .then(() => console.log('click!'))

// confirm dialog
animal.confirm('Are you OK ?')
  .then(() => console.log('choose yes'))
  .catch(() => console.log('choose no'))

// confirm dialog with a input
animal.ask('What your favorite moive ?')
  .then(({answer}) => console.log('your answer is ' + answer))
  .catch(({answer}) => console.log('you reject to answer.'))

// call loading
animal.loading('')
// close loading
animal.quiet('loading')

// call progress (0~100)
animal.progress(15)
// auto close when progress is 100
animal.progress(100)
// close progress
animal.quiet('progress')
```

# wiki
[在wiki上查看更多 / see more about it on wiki](https://github.com/coppyC/animal-say/wiki)

[查看演示 / see demonstration](https://coppyc.github.io/animal-say)

# The End
* If you like my work, give me a start to support my project.
* 如果你喜欢我的项目，不妨给个star来支持一下。
