// Agrega permisos de vibración y de pantalla activa al AndroidManifest (ejecutar tras "cap add android")
const fs=require('fs'),f='android/app/src/main/AndroidManifest.xml';
if(!fs.existsSync(f)){console.log('Primero ejecuta: npm run android:add');process.exit(1)}
let x=fs.readFileSync(f,'utf8');
['VIBRATE','WAKE_LOCK'].forEach(p=>{const t=`<uses-permission android:name="android.permission.${p}" />`;if(!x.includes(t))x=x.replace('</manifest>',`    ${t}\n</manifest>`)});
fs.writeFileSync(f,x);console.log('Permisos VIBRATE y WAKE_LOCK listos');
