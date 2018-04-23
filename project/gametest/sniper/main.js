const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  app.quit();
});
app.on('open-file', function(event,path) {
  console.log("openFile:",path);
});
function trace(msg)
{
     console.log(msg);
}
app.on('ready', function() {
  mainWindow = new BrowserWindow({
	width: 800,
	height: 400,
	"min-width":300,
		"min-height":200,
	'auto-hide-menu-bar': false,
	'use-content-size': true,
	'overlay-scrollbars': false,

	frame:true
	});

	//mainWindow.webContents.openDevTools();
	mainWindow.focus();
	trace("hello electron")

});


const ipc = require('electron').ipcMain
const dialog = require('electron').dialog

ipc.on('open-file-dialog', function (event) {
  dialog.showOpenDialog({
    properties: ['openFile', 'openFile']
  }, function (files) {
    if (files) event.sender.send('selected-directory', files)
  })
})


ipc.on('open-information-dialog', function (event,text1) {

	event.sender.send('selected-directory', text1);
	console.log(text1);
})


function runScript()
{
	var url='file://' + __dirname + '/pngCreater.html';
	var url = 'file://' + __dirname + '/input.html';
	mainWindow.loadURL(url);

}

const Menu = require('electron').Menu;
var template = [
  {
    label: '工具',
     submenu: [
	   {
		   label: '生成高度图',
		   click: runScript
	   }
     ]
  },
  {
    label: '关闭',
     submenu: [
       {
			label: 'Close',
			accelerator: 'CmdOrCtrl+Z',
			click: function () { app.quit();console.log("close")}
        // role: 'undo'
       }
     ]
  }]
var menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu);

