# Sitio · Dr. Andrés Felipe Osorio

Sitio estático de seis páginas. No necesita servidor, base de datos ni compilación.

## Archivos

```
site/
  index.html                        Portada
  medicina-integrativa.html
  medicina-estetica.html
  terapia-capilar.html
  tratamientos-personalizados.html  Página breve, centrada en el formulario
  sobre-mi.html
  assets/
    css/site.css                    Hoja de estilos única de todo el sitio
    js/site.js                      Animaciones de entrada
    img/                            Fotografía y logo
```

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

## Pendiente antes de publicar

1. **Revisión clínica.** Las descripciones de tratamientos de las tres
   páginas de servicio (terapia neural, sueroterapia, bioplasma, rellenos,
   neuromoduladores, HIFU, PRP, mesoterapia…) están redactadas a partir de
   definiciones generales. Deben revisarse una por una antes de publicarse.
2. **Correo electrónico real.** Aparece como «Pendiente» en el pie de las
   seis páginas. El sitio anterior tenía `info@example.com`.
3. **Registro médico.** Aparece como `RM ······` en las páginas de servicio
   y en «Sobre mí».
4. **Formación académica.** El bloque «Formación y trayectoria» de
   `sobre-mi.html` tiene tres casillas marcadas en naranja.
5. **El formulario no envía.** `tratamientos-personalizados.html` tiene un
   formulario maquetado y validable, pero su `action` está vacío. Hay que
   conectarlo a un servicio de correo (Formspree, Basin, o el PHP del
   hosting) para que llegue algo.
6. **Plazo de respuesta.** La página promete «menos de 48 horas hábiles».
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
