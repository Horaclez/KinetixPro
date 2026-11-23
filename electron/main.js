const {app,BrowserWindow,Menu,shell}=require('electron');const path=require('path');
if(!app.requestSingleInstanceLock())app.quit();
let win;
function create(){
 win=new BrowserWindow({width:480,height:900,minWidth:360,minHeight:600,backgroundColor:'#090D16',title:'KINETIX PRO',icon:path.join(__dirname,'..','www','icon-512.png'),
  webPreferences:{backgroundThrottling:false,contextIsolation:true,nodeIntegration:false,sandbox:true}});
 if(process.platform!=='darwin')Menu.setApplicationMenu(null);
 win.loadFile(path.join(__dirname,'..','www','index.html'));
 win.webContents.setWindowOpenHandler(({url})=>{shell.openExternal(url);return{action:'deny'}});
 win.webContents.on('will-navigate',(e,u)=>{if(!u.startsWith('file://'))e.preventDefault()});
}
app.on('second-instance',()=>{if(win){if(win.isMinimized())win.restore();win.focus()}});
app.whenReady().then(create);
app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit()});
app.on('activate',()=>{if(!BrowserWindow.getAllWindows().length)create()});
