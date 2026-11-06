# danieldeeconomia

Web de materiales de Economía y Emprendimiento para 4.º de ESO y Bachillerato.
Es una web estática: no necesita instalar nada ni ejecutar ningún programa.

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

## Publicar con GitHub Pages

En el repositorio: Settings, Pages, Source: Deploy from a branch, rama `main`, carpeta `/ (root)`.
La web queda en `https://danieldeeconomia.github.io/economiayemprendimiento/`.

## Qué funciona y qué no en los artefactos

Funcionan los artefactos autónomos (calculadoras, simuladores, tests, infografías).
Los que dependen de funciones propias de Claude (guardar datos, preguntar a Claude desde la página, leer datos conectados) no funcionan fuera de claude.ai.
No subas nunca datos de alumnado: la web es pública.

## Estructura

- `index.html`: portada con el simulador de oferta y demanda.
- `curso.html`: página de curso (se rellena según `?curso=`).
- `data/artefactos.js`: lista de cursos y materiales.
- `artefactos/`: los archivos `.html` de cada material.
- `assets/`: estilos, scripts y favicon.
