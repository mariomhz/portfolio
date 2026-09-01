# Portfolio

My personal portfolio, the main project to showcase my work.

Built as a digital experience where minimalism meets my creativity in an elegant, polished and refined website.

I added a custom cursor with `mix-blend-mode: difference`, used Lenis to smooth the scroll, added GSAP parallax, and a horizontal projects gallery.

Live: [mariohdez.vercel.app](https://mariohdez.vercel.app)

## Stack

- Next.js 16 (App Router) + React 19
- Lenis
- GSAP + ScrollTrigger
- CSS Modules

## Notes

The modules of the website are its protagonists. The cursor, parallax, and horizontal-scroll choices are not just decoration but the main point of the site.

I built all of it to be switchable off. The custom cursor only shows up on
devices with a real pointer, the horizontal strip goes back to normal scrolling,
and the parallax stops if you have `prefers-reduced-motion` on. Underneath it is
all links and buttons, so it works on a keyboard and without JS.

### Media

Images go through `next/image` as AVIF or WebP. The portrait clip is AV1 with an
h.264 fallback and only loads once you scroll near it.

To encode a new clip:

```bash
node scripts/encode-video.mjs raw/clip.mov clipname --width 720
```

---

© José Mario Hernández
