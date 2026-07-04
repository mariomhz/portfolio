# Portfolio

The personal site of José Mario Hernández — frontend and fullstack developer, polyglot, based in Spain.

Built as a place to think about smooth motion, tactile scroll, and the feeling of a page reacting to you. Custom cursor with `mix-blend-mode: difference`, Lenis-driven smooth scroll, GSAP parallax, and a horizontal projects gallery.

Live: [mariohdez.vercel.app](https://mariohdez.vercel.app)

## Stack

- Next.js 16 (App Router) + React 19
- Lenis — smooth scroll
- GSAP — parallax and motion
- `@cursorify/react` — custom cursor
- CSS Modules (no design system dependency, on purpose)

## Run locally

```bash
git clone https://github.com/mariomhz/portfolio.git
cd portfolio
npm install
npm run dev
```

Then open [localhost:3000](http://localhost:3000).

## Notes

CSS Modules over a component library on purpose — the visual language should come from me, not from Tailwind or shadcn defaults. The cursor, parallax, and horizontal-scroll choices are the point of the site, not decoration.

---

© José Mario Hernández
