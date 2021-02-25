// 1. git 提交规范
// 我们可以发现，commit message 分为三个部分(使用空行分割):

// 标题行（subject）: 必填, 描述主要修改类型和内容。
// 主题内容（body）: 描述为什么修改, 做了什么样的修改, 以及开发的思路等等。
// 页脚注释（footer）: 可以写注释，放 BUG 号的链接。

// commit 的类型
/**
 * feat: 新功能，新特性
 * fix: 修改bug
 * perf: 更改代码，以提高性能
 * refactor: 代码重工（重构，在不影响代码内部行为、功能的前提下修改代码）
 * docs: 文档修改
 * style: 代码格式修改，不是css修改（例如分号、空格等修改）
 * test: 测试用新增、修改
 * build: 影响项目构建或以来项修改
 * revert: 恢复上一次提交
 * ci: 持续集成相关文件修改
 * chore: 其他修改（不在上述类型当中的修改）
 * release: 发布新版本
 * workflow: 工作流相关文件修改
 */
// 例子：fix(global):修复checkbox不能复选的问题
// 例子：fix(home.vue):更改home错别字
// 例子：feat(global):新增selection复选框
// 例子：release: v0.2.0

// 2. 命名规范
/**
 * const smallObject = {} // 驼峰式，首字母小写
 * const SmallObject = {} // 帕斯卡式，首字母大写
 * const strName = 'strName' // 匈牙利式，前缀表示了变量是什么。这个前缀 str 表示了是一个字符串
 * // 变量命名示例  表明这个变量“是什么”，倾向于用名词命名
 * const appleNum = 1
 * const sum = 10
 * // 函数命名示例  表明这个函数“做什么”，倾向于用动宾结构来命名
 * function formatDate() { ... }
 * function toArray() { ... }
 * //文件夹命名
 * 文档 doc、资源 src、测试 test...
 */
