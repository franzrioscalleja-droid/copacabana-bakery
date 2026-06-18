# Copacabana Bakery — Sitio Web

Sitio estático bilingüe (ES/EN) para Copacabana Bakery, Gaithersburg MD.  
Stack: HTML + CSS + React 18 via CDN + Babel standalone. Sin build step. Listo para Cloudflare Pages.

---

## Estructura de archivos

```
/
├── index.html            ← Página principal (React monta aquí)
├── menu.html             ← Página de menú completo
├── _headers              ← Cabeceras HTTP para Cloudflare Pages
├── assets/
│   ├── styles.css        ← Todo el CSS del sitio
│   ├── i18n.js           ← Textos ES/EN + horarios + CONTACT
│   ├── data.js           ← Datos del menú (MENU, CATEGORIES, NOVEDADES)
│   ├── helpers.jsx       ← Componentes reutilizables (Reveal, Wordmark, etc.)
│   ├── public.jsx        ← App principal (index.html)
│   └── menu.jsx          ← App del menú (menu.html)
├── assets/photos/        ← Fotos de productos
├── uploads/
│   └── qr-copacabana-bakery.png
├── images/pasteles-muestra/
│   └── pastel-1/2/3.jpeg ← Fotos de pasteles para la sección Novedades
├── pdf/
│   └── catalogo-pasteles.pdf  ← Catálogo (reemplazar con el PDF real)
└── content/products/     ← Datos JSON por categoría (para futura migración CMS)
    ├── pan-dulce.json
    ├── pan-tostado.json
    ├── pasteles.json
    ├── croissants.json
    ├── bebidas-frias.json
    ├── bebidas-calientes.json
    └── otros.json
```

---

## Cómo agregar un producto nuevo

1. Abre `assets/data.js`
2. En `window.MENU`, agrega un objeto al arreglo de la categoría correspondiente:
   ```js
   { id: "mi-producto",
     cat: "pan-dulce",       // ← ID de la categoría
     photo: "assets/photos/mi-foto.jpeg",  // o null si no hay foto
     es: { n: "Nombre ES", d: "Descripción en español." },
     en: { n: "English Name", d: "Description in English." } },
   ```
3. Si tiene foto, copia la imagen a `assets/photos/` con ese nombre.
4. Guarda y el sitio se actualiza al recargar.

---

## Cómo actualizar el catálogo PDF

1. Reemplaza `pdf/catalogo-pasteles.pdf` con el PDF nuevo.
2. El botón "Descargar catálogo" en la sección de pasteles apunta a ese archivo automáticamente.

---

## Cómo agregar las fotos de pasteles (Novedades)

Sube las fotos a:
- `images/pasteles-muestra/pastel-1.jpeg`
- `images/pasteles-muestra/pastel-2.jpeg`
- `images/pasteles-muestra/pastel-3.jpeg`

Para cambiar los títulos/descripciones, edita `window.NOVEDADES` en `assets/data.js`.

---

## Cómo agregar las reseñas de Google

1. Crea una cuenta en [Elfsight](https://elfsight.com) o [Trustindex](https://www.trustindex.io)
2. Conecta tu perfil de Google Business
3. Copia el código `<script>` que te dan
4. Pégalo en `assets/public.jsx` dentro del `<div id="google-reviews-widget">`
5. Actualiza la URL del botón "Ver más reseñas en Google" (busca `g.co/kgs/PLACEHOLDER` en `public.jsx`)

---

## Números de contacto

| Uso | Número |
|-----|--------|
| Teléfono tienda | (301) 869-9436 |
| WhatsApp Business | (240) 728-9508 |

Para actualizar cualquiera, edita `window.CONTACT` en `assets/i18n.js`.

---

## Vista previa local

Abre el proyecto en VS Code e instala la extensión **Live Server**.  
Clic derecho en `index.html` → **Open with Live Server**.

> No abras `index.html` como archivo directamente (`file://`) — Babel no carga scripts externos desde `file://`.

---

## Despliegue en Cloudflare Pages

1. Sube el repositorio a GitHub
2. En Cloudflare Pages → Create project → Connect to Git → selecciona el repo
3. Build settings:
   - **Build command**: *(dejar vacío)*
   - **Build output directory**: `/`
4. Deploy. El archivo `_headers` se aplica automáticamente.
