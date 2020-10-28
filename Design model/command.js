// 执行命令
const setCommand = function (button, command) {
  button.click = function () {
    command.execute();
  }
}

const MenuBar = {
  refresh() {
    console.log("刷新菜单界面")
  }
}
const RefreshMenuBarCommand = function (receiver) {
  return {
    execute: function () {
      receiver.refresh();
    }
  }
}

const refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar);
setCommand(button, refreshMenuBarCommand);

const ball = document.getElementById("ball")
const pos = document.getElementById("pos")
const pos = document.getElementById("pos");
const moveBtn = document.getElementById("moveBtn");
const cancelBtn = document.getElementById("cancelBtn");

class MoveCommand {
  constructor(receiver, pos) {
    this.receiver = receiver;
    this.pos = pos;
    this.oldPos = null;
  }
  execute() {
    this.receiver.start("left", this.pos, 1000, "strongEaseOut")
    // 记录小球开始移动之前的位置
    this.oldPos = this.receiver.dom.getBoundingClientRect()[this.receiver.propertyName]
  }
  undo() {
    // 回到小球移动前的位置
    this.receiver.start("left", this.oldPos, 1000, "stringEaseOut")
  }
}
let moveCommand;
moveBtn.onclick = function (ball) {
  const animate = new Animation(ball)
  moveCommand = new MoveCommand(animate, pos.value)
  moveCommand.execute();
}
cancelBtn.onclick = function () {
  moveCommand.undo();
}

// 撤消和重做（街头霸王）
const Ryu = {
  attack() {
    console.log("攻击")
  },
  defense() {
    console.log("防御")
  },
  jump() {
    console.log("跳跃")
  },
  crouch() {
    console.log("蹲下")
  }
}

const makeCommand = function (receiver, state) {
  return function () {
    receiver[state]();
  }
}

const commands = {
  119: "jump",
  115: "crouch",
  97: "defense",
  100: "attack"
}

let commandStack = [];// 保存命令的堆栈

document.onkeypress = function () {
  const keyCode = ev.keyCode
  const command = makeCommand(Ryu, commands[keyCode])
  if (command) {
    command(); // 执行命令
    commandStack.push(command) // 将刚刚执行过的命令保存进堆栈
  }
}
// 重复播放之前的动作
document.getElementById("replay").onclick = function () {
  let command;
  while (command = commandStack.shift()) { // 从堆栈里依次取出命令并执行
    command();
  }
}
// 宏命令（一组命令的集合）
const closeDoorCommand = {
  execute() {
    console.log("close Door")
  }
}
const OpenPcCommand = {
  execute() {
    console.log("open computer")
  }
}
const OpenQQCommand = {
  execute() {
    console.log("login QQ ")
  }
}

class MacroCommand {
  commandsList = []
  add(command) {
    this.commandsList.push(command)
  }
  execute() {
    for (let i = 0, command; command = this.commandsList[i++];) {
      command.execute();
    }
  }
}

const macroCommand = new MacroCommand();
macroCommand.add(closeDoorCommand)
macroCommand.add(OpenPcCommand)
macroCommand.add(OpenQQCommand)
macroCommand.execute();
