基础知识补全

### 一、 指令

> 1.  v-cloak vue 没有加载时，不显示插值语法
> 2.  v-model.lazy 将触发事件由 input 改为 change
> 3.  v-model.number 输入的值自动转为数值类型
> 4.  v-once 元素内只渲染一次，不再动态渲染
> 5.  @click.once 事件只执行一次
> 6.  v-directive inserted()执行之后页面 DOM 才会插入，指令的钩子函数内部 this 是 window

---

### 生命周期

1. beforeCreate 初始化生命周期、事件，但数据代理还未开始（无法获取 data 和 methods）
2. | 初始化数据监测、数据代理
3. created 可以通过 vm 访问到 data 中的数据、methods 中的配置方法；
4. | 解析模板，生成虚拟 DOM（内存中）
5. beforeMount 页面呈现未经过编译的 DOM 结构；
6. | 虚拟 DOM 转为真是 DOM 插入页面；
7. mounted 完成模板解析并把处事的真实 DOM 挂载到页面上；
8. | 页面呈现的时经过 vue 编译的 DOM，一般在此开启定时器，发送请求，订阅消息，绑定事件等；
9. beforeUpdate 此时数据是新的，页面是旧的；
10. | 生成新的虚拟 DOM，与旧的 DOM 比较，完成页面更新；Model-> View ;
11. updated 页面更新完成；
12. beforeDestroy 所有 vue 都可用，关闭定时器，取消订阅消息，解绑自定义事件；
13. destroyed 所有 vm 的（data,methods,自定义事件）都不可用，原生事件还可以用；

---

### 自定义事件

1. this.$refs.childRef.$on("emitHanlder",()=>{}); 父组件通过 ref 动态绑定事件
2. child 组件 通过 this.$emit("emitHanlder") 触发；
3. 子组件的自定义事件的回调，一定是写在父组件的
4. 组件添加原生事件如 click，需要添加.native 来触发；如果不添加会被当做自定义事件，子组件需要 emit 出来；

### 动画

1. 进入动画类名顺序：v-enter ; v-enter-active ; v-enter-to;
2. 退出动画类名顺序：v-leave ; v-leave-active ; v-leave-to;
3. .v-enter, .v-leave-to 进入的起点就是离开的重点
4. .v-enter-to, .v-leave 进入的终点就是离开的起点
5. transform 写在 div 的类名里或者 v-enter-active 里面

### 服务和引入

1. devServer.proxy

   ```
   devServe:{
     proxy:{
       "/api":{
         target:"http://localhost:5000",
         pathRewrite:("^/api":""), // 删除路径中的/api
         changeOrigin:true
       }
     }
   }
   ```

2. 引入外部样式，可以写在 index.html 头部 link 当中,可以避免用 import 方式引入时，css 里面关联引用的报错

### slot

1. 插槽的内容在父模板里面编译解析后，再插入子组件内指定位置（slot)；
2. 新 api v-slot:title="{name}" // 名字为 title 的作用域插槽，给出的数据 name

### keep-alive

1. include - 字符串或正则表达式。只有名称匹配的组件会被缓存，支持字符、数组、include="a,b"
2. exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
3. max - 数字。最多可以缓存多少组件实例。
4. activated, deactivated 是 keep-alive 独有的生命周期钩子

### 路由导航首位

1. router.beforeEach((to,from,next)=>{}) 全局前置路由守卫钩子，路由解析跳转之前
2. router.afterEach((to,from,next)=>{}) 全局后置路由守卫钩子，路由解析跳转之后
3. 路由独享守卫与全局守卫一样；
4. 组件内守卫：beforeRouteEnter 渲染该组件对应的路由前被调用，不同调用 this，因为实例还未被创建
5. 组件内守卫：beforeRouteLeave 导航离开该组件时被调用，可以调用 this
6. 组件内守卫：beforeRouteUpdate 导航离开该组件组件被复用（该组件多个地方同时被调用）时调用，可以调用 this
7. 利用 meta 可以携带数据，判断是否要检测授权，改变 title 等页面统一处理的操作
