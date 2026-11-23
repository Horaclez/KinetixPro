# KINETIX PRO — Paquete PWA · Electron · Capacitor

App 100 % offline (HTML + CSS + JS en un solo archivo, sin CDN ni librerías externas).
Los datos se guardan en el almacenamiento local del dispositivo (`localStorage`). Usa **Perfil → Exportar respaldo** para guardar una copia.

```
kinetix-pro/
├─ www/                 ← la app (PWA): index.html, manifest, sw.js, iconos
├─ electron/main.js     ← escritorio (Windows / macOS / Linux)
├─ capacitor.config.json← Android (APK)
├─ assets/              ← iconos fuente para Android
├─ scripts/patch-android.js
└─ package.json
```

Requisito general: **Node.js 18 o superior** (nodejs.org). Primero, en esta carpeta:

```
npm install
```

---
## 0) Compilar en GitHub (sin instalar nada en tu PC)
1. Crea un repositorio en GitHub y sube **todo** el contenido de esta carpeta.
2. Crea a mano el archivo `.github/workflows/build.yml` (los archivos que empiezan con punto no viajan bien en un zip) y el archivo `.gitignore`.
3. Al subir los cambios a `main`, ve a la pestaña **Actions** → espera ~10 min.
4. Entra a la ejecución terminada y baja de **Artifacts**: `KINETIX-PRO-Android-APK` y `KINETIX-PRO-Windows`.
5. Para publicar una *Release* con ambos archivos: crea una etiqueta `v1.0.0` (Releases → Draft new release).

---
## 1) PWA (instalable, funciona sin internet)
Una PWA necesita servirse por **HTTPS** (o `localhost`) para instalarse. Opciones:
- **Probar en tu PC:** `npm run serve` → abre http://localhost:8080 y pulsa *Instalar* en la barra del navegador.
- **Publicar gratis:** sube la carpeta `www/` a Netlify, Vercel, GitHub Pages o Cloudflare Pages. Abre la URL en el celular y elige *Instalar app / Añadir a pantalla de inicio*.
- La primera visita guarda todo en caché; después abre sin conexión. Si actualizas la app, cambia `V='kinetix-v1'` por `v2` en `www/sw.js`.

## 2) Electron (escritorio)
- Probar: `npm start`
- Instalador Windows: `npm run dist:win` · macOS: `npm run dist:mac` (hay que compilar en un Mac) · Linux: `npm run dist:linux`
- Los instaladores quedan en `dist/`.

## 3) Capacitor (APK Android)
Requisitos: **Android Studio** (incluye el SDK) y **JDK 17**.
1. `npm install`
2. `npm run android:setup`  → crea la carpeta `android/`, agrega los permisos de vibración y pantalla activa, genera los iconos y sincroniza.
3. Abre en Android Studio: `npm run android:open` y pulsa ▶ para probar en tu teléfono o emulador,
   o genera el APK por consola: `npm run android:apk`
   → `android/app/build/outputs/apk/debug/app-debug.apk` (cópialo al celular e instálalo).
4. Para publicar en Play Store: en Android Studio, *Build → Generate Signed Bundle / APK*.

Cada vez que cambies `www/`: `npm run android:sync`.

## Notas
- **Sin internet:** no hay recursos externos. La tipografía usa la fuente del sistema (si quieres Plus Jakarta Sans, descarga el `.woff2` y agrégalo con `@font-face` en `www/`).
- **Respaldo en Android:** el botón Exportar abre el menú *Compartir* (guárdalo en Drive, WhatsApp, archivos…). Importar funciona con el selector de archivos.
- **Vibración y pantalla activa** requieren los permisos que agrega `npm run android:perms`.
- Las versiones de las dependencias en `package.json` no pude probarlas aquí (sin acceso a npm); si `npm install` se queja, actualiza los números a las últimas versiones.
