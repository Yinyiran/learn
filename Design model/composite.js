// 组合模式
// 优点：将对象组合成树形结构，表示“部分— 整体”
// 利用多态同意对待组合对象和单个对象


// 更强大的宏命令

class MacroCommand {
  commandsList = [];
  add(command) {
    this.commandsList.push(command)
  }
  execute() {
    for (let i = 0, command; command = this.commandsList[i++];) {
      command.execute();
    }
  }
}
// 命令1
const openAcCommand = {
  execute() {
    console.log("open air conditioner")
  }
}
// 命令2
// 同时打开 电视和音响；
const openTvCommand = {
  execute() {
    console.log("open Tv")
  }
}
const openSoundCommand = {
  execute() {
    console.log("open Sound")
  }
}

const macroCommand1 = new MacroCommand();
macroCommand1.add(openTvCommand);
macroCommand1.add(openSoundCommand);

// 命令3
const closeDoorCommand = {
  execute() {
    console.log("close door")
  }
}
const openPcCommand = {
  execute() {
    console.log("open computer")
  }
}
const openQQCommand = {
  execute() {
    console.log("open QQ")
  },
  add(command) {
    throw new Error("leaf has not add methods")
  }
}

const macroCommand2 = new MacroCommand();
macroCommand2.add(closeDoorCommand)
macroCommand2.add(openPcCommand)
macroCommand2.add(openQQCommand)

// 把所有的命令组合成一个超级命令
const macroCommand = new MacroCommand();
macroCommand.add(openAcCommand)
macroCommand.add(macroCommand1)
macroCommand.add(macroCommand2)

macroCommand.execute(); // 执行所有命令

// 组合模式最大的优点在于可以一致地对待组合对象和基本对象。客户不需要知道当前处理的是宏命令还是普通命令，
// 只要它是一个命令，并且有execute方法，这个命令就可以被添加到树中。

//例：扫描文件夹

class Folder {
  constructor(name) {
    this.name = name;
    this.parent = null;
    this.files = []
  }
  add(file) {
    file.parent = this;
    this.files.push(file)
  }
  scan() {
    console.log(`开始扫描文件夹${this.name}`)
    for (let i = 0, file; file = this.files[i++];) {
      file.scan();
    }
  }
  // 移除该文件夹
  remove() {
    if (!this.parent) return;//根节点或没有添加的游离节点
    for (let files = this.parent.files, l = files.length - 1; l >= 0; l--) {
      const file = files[l]
      if (file === this) {
        files.splice(l, 1);
      }
    }
  }
}

class File {
  constructor(name) {
    this.name = name;
    this.parent = null;
  }
  add() {
    throw new Error("文件下面不能再添加文件")
  }
  scan() {
    console.log(`开始扫描文件${this.name}`)
  }
  remove() {
    if (!this.parent) return;
    for (let files = this.parent.files, l = files.length - 1; l >= 0; l--) {
      const file = files[l]
      if (file === this) {
        files.splice(l, 1); // 删除当前节点
      }
    }
  }
}

const folder = new Folder("学习资料")
const folder1 = new Folder("JavaScript")
const folder2 = new Folder("JQuery")

const file1 = new File("JavaScript设计模式与开发")
const file2 = new File("精通JQuery")
const file3 = new File("重构与模式")

folder1.add(file1)
folder2.add(file2)

folder.add(folder1)
folder.add(folder2)
folder.add(file3)

// 添加我呢见
const folder3 = new Folder("Nodejs")
const file4 = new File("深入浅出Nodejs")
folder3.add(file4)
const file5 = new File("JavaScript语言精髓与编程实践");
// folder2.remove();
folder.scan();

// 什么时候使用组合模式
// 1.表示对象的部分-整体层次结构，也就是树状结构，不知道有多少层，只要对最顶层操作，便可以对树的所有层做统一操作
// 2.统一对待树中的所有对象，忽略组合对象和叶对象的区别