# Search Zen Tool 极速搜索助手

![sample](https://user-images.githubusercontent.com/46062972/96347813-adcef780-10d6-11eb-92e5-811bc6eea988.png)

> An application for user to quick search something using hotkey.

这是我学习 Electron + Vue (with Quasar) 开发的第一个实验性小项目。目前已经基本完成一下需求功能：

> Here is my first experimental project, built with Electron & Vue(Quasar), now I've already implemented the following requirements.

- 快捷键 `Shift + Alt + Enter` 呼出窗口

  Registered hotkey to call up application window.

- 默认配置一些常用网址的搜索模板

  Provide some default templates of some commonly used URLs.

- 可以手动添加带 `{%s}` 格式的网址模板

  You can add some URL template string with `{%s}` format.

- 模板列表保存在本地配置文件 `settings.json` 中

  Saving configs in local file.

- 可以查看、删除和修改模板列表

  Provide a table view to show, modified and delete template.

—— **Documentation below will only provide Chinese Version** ——

## 为什么选用 Quasar

其实作为一个中国大陆开发者，Material Design 的风格和国内用户的审美并不是很搭，但但凡读过或动手使用过 Quasar CLI 的同学都会称赞 Quasar 是一款优秀的框架封装。

```bash
quasar mode add electron
quasar dev -m electron
```

仅凭这两条命令，就能够启动一个非常不错的 Electron + Vue 的项目，目前 [electron-vue](https://github.com/SimulatedGREG/electron-vue) 那边维护的情况实在是不理想，默认下载的代码模板 `package.json` 中竟然 Electron 的版本是 `v2.x` 😓...

## Electron 知识拾遗

在制作一款 Electron 桌面端 App 时，我们会有一个主进程 `main-process` 和一个渲染进程 `render-process`。

一般的，我们会有独立的 `electron.main.js` 存放主进程的相关逻辑，其中涵盖了 **为 `app` 注册各类生命周期事件的回调方法、配置窗口加载什么 URL、注册快捷键、设置系统托盘图标与菜单** 等等...

另外，渲染进程执行即是在绘制页面、构建 DOM 等，故文件结构也就大致类同于常见的 Vue 项目。

在 Vue SFC(Single File Components) （传统 Options API Vue 2.x）代码中，可以通过 `this.$q` 访问到 Quasar 全局对象，在其上我们还可以通过 `.electron` 访问到项目关联的 Electron 实例。
