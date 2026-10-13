# Sitio · Dr. Andrés Felipe Osorio

Sitio estático de seis páginas. No necesita servidor, base de datos ni compilación.

## Archivos

```
site/
  index.html                        Portada
  medicina-integrativa.html
  medicina-estetica.html
  terapia-capilar.html
  blog.html                         Índice del blog (carrusel)
  blog-drips-vs-medicina-integrativa.html   Artículo: sueroterapia vs medicina integrativa
  blog-shampoo-anticaida.html               Artículo: shampoo anticaída
  blog-elegir-procedimiento-estetico.html   Artículo: cómo elegir un procedimiento estético
  assets/
    css/carousel.css                Carrusel del blog (index y blog)
    css/article.css                 Estilos de los artículos
    js/carousel.js                  Carrusel del blog
    img/                            Fotografía y logo
```

Cada página lleva sus estilos dentro, salvo el carrusel y los artículos.

**Páginas retiradas.** `sobre-mi.html` y `tratamientos-personalizados.html`
se quitaron porque seguían en el diseño anterior (verde) y no encajaban con
el nuevo. Siguen guardadas en el historial de Git: están completas en el
commit `7bbdfa2`. Para recuperarlas: `git show 7bbdfa2:sobre-mi.html`.
Mientras no existan, los botones «Agenda tu cita» de la franja final llaman
al teléfono y las tarjetas de «Tratamientos Personalizados» llevan a la
sección de contacto de su página.

`assets/css/site.css`, `assets/css/blog.css` y `assets/js/site.js` ya no los
usa ninguna página; son del diseño anterior y se conservan por si se
reconstruyen esas dos páginas.

## Animaciones

Entrada del hero (CSS puro) y aparición de bloques al hacer scroll
(IntersectionObserver). Botones y tarjetas con transiciones al pasar por
encima.

Está construido para no romper nunca la página:

- El estado oculto sólo existe bajo la clase `.anim`, que añade un script
  en el `<head>`. **Sin JavaScript no se oculta nada.**
- Si `site.js` no llegara a cargar, un temporizador retira `.anim` a los
  2,5 s y todo aparece.
- Si el observador fallara, a los 3,5 s se revela todo igualmente.
- Con `prefers-reduced-motion: reduce` no se anima nada.

## Cómo verlo

Abre `index.html` con doble clic. Para subirlo, copia la carpeta `site/`
completa a la raíz del hosting. Peso total: 2,2 MB.

## Al cambiar estilos: sube la versión

Los enlaces al CSS y al JS llevan un número de versión:

    <link rel="stylesheet" href="assets/css/site.css?v=2">
    <link rel="stylesheet" href="assets/css/blog.css?v=2">
    <script src="assets/js/site.js?v=2" defer></script>

Igual en index.html y blog.html con el carrusel del blog
(`assets/css/carousel.css?v=2` y `assets/js/carousel.js?v=2`). Las demás
páginas llevan sus estilos dentro y no necesitan versión.

Sin él, quien ya visitó el sitio sigue viendo la hoja de estilos vieja
guardada en su navegador, aunque el servidor tenga la nueva. El HTML sí
se actualiza, así que el resultado es una página nueva con estilos
viejos: descuadrada.

**Cada vez que se toque `site.css`, `blog.css` o `site.js`, sube el
número en las ocho páginas.** De `?v=2` a `?v=3`, y así. Para el
navegador es una dirección distinta, y no le queda más remedio que
traerla de nuevo. Las imágenes no lo necesitan: cuando cambian, se
suben con otro nombre.

En Git Bash, desde `site/`:

    sed -i 's/?v=2/?v=3/g' *.html

## Pendiente antes de publicar

1. **Revisión clínica.** Las descripciones de tratamientos de las tres
   páginas de servicio (terapia neural, sueroterapia, bioplasma, rellenos,
   neuromoduladores, HIFU, PRP, mesoterapia…) están redactadas a partir de
   definiciones generales. Deben revisarse una por una antes de publicarse.
2. **Correo electrónico real.** Aparece como «Pendiente» en el pie de las
   seis páginas. El sitio anterior tenía `info@example.com`.
3. **Registro médico.** Aparece como `RM ······` en las páginas de servicio
   y en «Sobre mí».
4. **(Al reconstruir «Sobre mí»)** **Formación académica.** El bloque «Formación y trayectoria» de
   `sobre-mi.html` tiene tres casillas marcadas en naranja.
5. **(Al reconstruir «Tratamientos Personalizados»)** **El formulario no envía.** La versión anterior tenía un
   formulario maquetado y validable, pero su `action` está vacío. Hay que
   conectarlo a un servicio de correo (Formspree, Basin, o el PHP del
   hosting) para que llegue algo.
6. **(Ídem)** **Plazo de respuesta.** La versión anterior prometía «menos de 48 horas hábiles».
   Es un compromiso medible: confírmalo o cámbialo.

## Logo

`assets/img/logo.png` es el original de Instagram (91 × 91 px) con el fondo
blanco eliminado y ampliado al doble. Se usa a 40 px, tamaño en el que se ve
bien. **No lo amplíes más de 60 px**: por encima se nota la falta de
resolución. Para usarlo grande (favicon, redes, impresión) hace falta el
archivo original vectorial (.ai, .eps, .pdf o .svg).

## Datos de contacto en uso

- Teléfono y WhatsApp: +57 301 511 4683
- Dirección: Cra. 12 #0, Armenia, Quindío

## Notas técnicas

- Tipografías: Syne, DM Sans y DM Mono, desde Google Fonts.
- Verificado sin desbordes horizontales a 390, 768 y 1440 px de ancho.
- Respeta `prefers-reduced-motion`.
- Cada página tiene enlace «Saltar al contenido» y foco visible.
