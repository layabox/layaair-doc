# Shortcut key for code editing 

### 1. Custom shortcut keys

A part of shortcut keycodes of LayaAirIDE inherited function from vscode. Individual shortcuts will be different. The user can set according to their own preferences, if the developer wants to change the shortcut keys, please follow the following steps:



**Menu - File - Preferences - Keyboard shortcuts.**

Open the shortcut key to set the interface will open the two editors, the default shortcut keys set on the left, edit the right side of the editor keybindings.json file to custom shortcut keys, as shown in Figure 1.

​        ![blob.png](img/1.png)<br/>
​        (Figure 1) default shortcut keys

**Modification method: **

​        1. on the left (the default key binding) find the shortcut keys to modify the command, and then copy the left side item to the right (keybindings.json), modify the key field. Figure 2 :

​        ![blob.png](img/2.png)<br/>
​        (Figure 2) to modify the shortcut keys

​        2. press the `Ctrl+K` shortcut twice, or click on the keybindings.json edit area in the lower right corner of the "definition key binding" button. When the shortcut key settings panel appears, set a shortcut key that does not conflict and press Enter. And then modify the Command value to the shortcut we want to set the command, that is.

​        ![blob.png](img/3.png)<br/>
​        (Figure 3) to set a new shortcut key

​        ![blob.png](img/4.png)<br/>
​        (Figure 4) a number of shortcut key settings to use, number separation

​       

### 2. Commonly used shortcut keys (General)

| **（Key Press）**        | **（ Function）**                        |
| --------------------- | ---------------------------------------- |
| `Ctrl + Shift + P，F1` |  Show Command Palette              |
| `Ctrl + P`            | Quick Open                          |
| `Ctrl + Shift + N`    | New window/instance               |
| `Ctrl + Shift + W`    | Close window/instance            |
| `Ctrl+X`              | Cut line (empty selection)      |
| `Ctrl+C`              | Copy line (empty selection)      |
| `Alt+ ↑ / ↓`          | Move line up/down               |
| `Shift+Alt + ↓ / ↑`   | Copy line up/down               |
| `Ctrl+Shift+K`        | Delete line                          |
| `Ctrl+Enter`          | Insert line below                 |
| `Ctrl+Shift+Enter`    | Insert line above                 |
| `Ctrl+Shift+\`        | Jump to matching bracket         |
| `Ctrl+] / [`          | Indent/outdent line               |
| Home                  | Go to beginning of line             |
| End                   | Go to end of line                   |
| `Ctrl+Home`           | Go to beginning of file           |
| `Ctrl+End`            | Go to end of file                 |
| `Ctrl+↑ / ↓`          | Scroll line up/down             |
| `Alt+PgUp / PgDown`   | Scroll page up/down            |
| `Ctrl+Shift+[`        | Fold (collapse) region          |
| `Ctrl+Shift+]`        | Unfold (uncollapse) region     |
| `Ctrl+K Ctrl+[`       | Fold (collapse) all subregions |
| `Ctrl+K Ctrl+]`       | Unfold (uncollapse) all subregions |
| `Ctrl+K Ctrl+0`       | Fold (collapse) all regions   |
| `Ctrl+K Ctrl+J`       | Unfold (uncollapse) all regions |
| `Ctrl+K Ctrl+C`       | Add line comment                   |
| `Ctrl+K Ctrl+U`       | Remove line comment                |
| `Ctrl+/`              | Toggle line comment                |
| `Shift+Alt+A`         | Toggle block comment               |
| `Alt+Z`               | Toggle word wrap                    |
