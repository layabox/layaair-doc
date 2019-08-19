# 代码模式的快捷键设置

### 一、自定义快捷键

LayaAirIDE的code部分快捷键继承了vscode的功能。个别快捷键会有所不同。用户可以根据自己的喜好来进行设置；如果开发者想更改快捷键请按照如下步骤操作：



**菜单 -文件- 首选项-键盘快捷方式。**

打开快捷键设置界面将打开两个编辑器，默认快捷键设置在左侧，编辑右侧编辑器中的 keybindings.json 文件自定义快捷键，如图1。

​        ![blob.png](img/1.png)<br/>
​        （图1）默认快捷键

**修改方法：**

​        1、在左侧（默认键绑定）找到要修改的快捷键命令，然后复制左侧的项到右侧（keybindings.json），修改key字段即可。如图2

​        ![blob.png](img/2.png)<br/>
​        （图2）修改快捷键

​        2、按两次`Ctrl+K`快捷键，或者是点击keybindings.json编辑区右下角的”定义键绑定“按钮。出现快捷键设置面板后，设置一个不冲突的快捷键，按Enter。然后将Command的值修改为我们要设置的快捷命令后，即完成快捷键设置。

​        ![blob.png](img/3.png)<br/>
​        （图3）设置新的快捷键

​        ![blob.png](img/4.png)<br/>
​        （图4）多个快捷键设置要用，号分隔

​       

### 二、常用快捷键（General）

| **按 键（Press）**        | **功能（ Function）**                        |
| --------------------- | ---------------------------------------- |
| `Ctrl + Shift + P，F1` | 显示命令面板 Show Command Palette              |
| `Ctrl + P`            | 快速打开 Quick Open                          |
| `Ctrl + Shift + N`    | 新窗口/实例 New window/instance               |
| `Ctrl + Shift + W`    | 关闭窗口/实例 Close window/instance            |
| `Ctrl+X`              | 剪切行（空选定） Cut line (empty selection)      |
| `Ctrl+C`              | 复制行（空选定）Copy line (empty selection)      |
| `Alt+ ↑ / ↓`          | 向上/向下移动行 Move line up/down               |
| `Shift+Alt + ↓ / ↑`   | 向上/向下复制行 Copy line up/down               |
| `Ctrl+Shift+K`        | 删除行 Delete line                          |
| `Ctrl+Enter`          | 在下面插入行 Insert line below                 |
| `Ctrl+Shift+Enter`    | 在上面插入行 Insert line above                 |
| `Ctrl+Shift+\`        | 跳到匹配的括号 Jump to matching bracket         |
| `Ctrl+] / [`          | 缩进/缩进行 Indent/outdent line               |
| Home                  | 转到行首 Go to beginning of line             |
| End                   | 转到行尾 Go to end of line                   |
| `Ctrl+Home`           | 转到文件开头 Go to beginning of file           |
| `Ctrl+End`            | 转到文件末尾 Go to end of file                 |
| `Ctrl+↑ / ↓`          | 向上/向下滚动行 Scroll line up/down             |
| `Alt+PgUp / PgDown`   | 向上/向下滚动页面 Scroll page up/down            |
| `Ctrl+Shift+[`        | 折叠（折叠）区域 Fold (collapse) region          |
| `Ctrl+Shift+]`        | 展开（未折叠）区域 Unfold (uncollapse) region     |
| `Ctrl+K Ctrl+[`       | 折叠（未折叠）所有子区域 Fold (collapse) all subregions |
| `Ctrl+K Ctrl+]`       | 展开（未折叠）所有子区域 Unfold (uncollapse) all subregions |
| `Ctrl+K Ctrl+0`       | 折叠（折叠）所有区域 Fold (collapse) all regions   |
| `Ctrl+K Ctrl+J`       | 展开（未折叠）所有区域 Unfold (uncollapse) all regions |
| `Ctrl+K Ctrl+C`       | 添加行注释 Add line comment                   |
| `Ctrl+K Ctrl+U`       | 删除行注释 Remove line comment                |
| `Ctrl+/`              | 切换行注释 Toggle line comment                |
| `Shift+Alt+A`         | 切换块注释 Toggle block comment               |
| `Alt+Z`               | 切换换行 Toggle word wrap                    |