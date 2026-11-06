# danieldeeconomia

Web de materiales y noticias de Economía y Emprendimiento para 4.º de ESO y Bachillerato.
GitHub Pages la construye sola cada vez que subes un cambio: no hay que instalar nada.

## Cómo añadir un material nuevo

1. Guarda el archivo `.html` del artefacto en la carpeta `artefactos/`.
2. Abre `data/artefactos.js` y copia una de las entradas de `ARTEFACTOS`. Cambia sus datos:
   - `titulo` y `descripcion`: lo que verá el alumnado.
   - `curso`: `4eso` o `bachillerato` (el `id` de uno de los cursos de la lista `CURSOS`).
   - `tema`: la unidad o bloque. Los materiales del mismo tema se agrupan en la página del curso.
   - `tipo`: por ejemplo Calculadora, Simulador, Ficha, Test.
   - `fecha`: en formato `AAAA-MM-DD`.
   - `archivo`: el nombre exacto del `.html` que guardaste en `artefactos/`.
3. Sube los cambios. La portada y la página del curso se actualizan solas.

## Cómo añadir un curso

En `data/artefactos.js`, añade una línea a `CURSOS` con un `id` sin espacios, el `nombre` y la `materia`.

## Cómo publicar una noticia

1. En GitHub, entra en la carpeta `_posts`, pulsa *Add file* y *Create new file*.
2. El nombre del archivo lleva la fecha y termina en `.md`: `2026-11-20-visita-a-una-empresa.md`.
3. Empieza el archivo con estas líneas (la cabecera) y escribe debajo el texto:

   ```
   ---
   title: "Título de la noticia"
   date: 2026-11-20
   resumen: "Una frase que aparece en el listado."
   ---
   Aquí empieza el texto.
   ```

4. Pulsa *Commit changes*. En uno o dos minutos aparece en la portada y en `noticias/`.

Se escribe en Markdown: `## Título` para un apartado, `**negrita**`, `- ` para listas, `[texto](dirección)` para enlaces.
Las imágenes se suben a una carpeta (por ejemplo `imagenes/`) y se enlazan con `![descripción]({{ '/imagenes/foto.jpg' | relative_url }})`.
No publiques nombres, fotos ni datos de alumnado sin autorización: la web es pública.

## Publicar con GitHub Pages

En el repositorio: Settings, Pages, Source: Deploy from a branch, rama `main`, carpeta `/ (root)`.
La web queda en `https://danieldeeconomia.github.io/economiayemprendimiento/`.
Si algún día usas un dominio propio, pon `baseurl: ""` en `_config.yml`.

## Qué funciona y qué no en los artefactos

Funcionan los artefactos autónomos (calculadoras, simuladores, tests, infografías).
Los que dependen de funciones propias de Claude (guardar datos, preguntar a Claude desde la página, leer datos conectados) no funcionan fuera de claude.ai.

## Estructura

- `index.html`: portada con el simulador de oferta y demanda.
- `curso.html`: página de curso (se rellena según `?curso=`).
- `noticias/index.html`: listado de noticias.
- `_posts/`: una noticia por archivo, en Markdown.
- `_layouts/` y `_includes/`: plantillas comunes (cabecera, pie, diseño de una noticia).
- `_config.yml`: configuración de la web.
- `data/artefactos.js`: lista de cursos y materiales.
- `artefactos/`: los archivos `.html` de cada material.
- `assets/`: estilos, scripts y favicon.
