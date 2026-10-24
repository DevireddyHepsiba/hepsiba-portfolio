# Hepsiba Devireddy portfolio

A Next.js, React, TypeScript, and SCSS portfolio built around an editorial portrait, proof of work, and a clear invitation to connect.

## Run locally

```powershell
cd "C:\Users\hepsi\Documents\Codex\2026-10-24\x20\outputs\portfolio"
npm install
npm run dev
```

Open http://localhost:3000. For a production build, run `npm run build`; use `npm start` to serve it. `npm run typecheck` checks TypeScript.

## Structure

- `app/page.tsx` — portfolio content and interactions
- `app/portfolio.module.scss` — responsive editorial styling
- `app/globals.scss` — base styles, reveal motion, and reduced-motion support
- `app/layout.tsx` — metadata and Person structured data
- `app/robots.ts` — crawl policy
- `public/images/` — the two supplied portraits
- `public/fonts/` — self-hosted Inter and Space Grotesk variable fonts
- `public/resume.pdf` — supplied résumé download
- `public/llms.txt`, `public/llms-full.txt` — machine-readable portfolio summaries

## Art direction

The supplied screen recording informed the high-contrast black-and-ivory palette, centered grayscale portrait, oversized serif name, pill navigation, quiet section markers, and editorial project rows. [Razorpay’s AI Builders page](https://razorpay.com/ai-builders/) informed the proof-first story: explain the work quickly and make the next step clear. The site uses its own layout and identity.

Story order: portrait-led introduction → focus areas → about → education and experience → selected projects → recognition → toolkit → developing creative practice → contact.

Motion stays restrained: CSS section reveals with IntersectionObserver, a small expandable project detail interaction, and reduced-motion handling. Essential content remains visible if JavaScript is unavailable. There is no artificial loader or scroll hijack.

## Content and verification notes

- AI Learning Platform details come from its [public repository README](https://github.com/DevireddyHepsiba/AI-learning-Platform); the live demo is linked, but this portfolio does not guarantee the demo’s current health or independently verify every feature.
- Code Bridge is described as exploratory because repository text documents the idea, while implementation maturity and working features remain unverified.
- Education, internship, achievements, certifications, skills, and direct contact details were added from the supplied résumé.
- The supplied résumé is linked as a download at /resume.pdf. Its LinkedIn hyperlink points to a placeholder (linkedin.com/in/yourprofile); the portfolio uses the existing profile URL. Replace the PDF with a corrected copy before sharing it externally.
- The Store project summary comes from the résumé; its linked repository and demo are provided for direct review.
- The AI Learning Platform description follows the public repository README. OAuth and numeric feature-count claims in the résumé were omitted because they do not match the repository description.
- A production domain is not known, so no canonical URL or sitemap domain is invented.

## Design tokens and assets

Obsidian `#080809`, soft ivory `#F1EFE9`, muted stone, and restrained warm accents keep the page close to the supplied reference. The full-body transparent portrait leads the hero; the desk portrait anchors About. Inter and Space Grotesk are self-hosted for body and interface text, with an editorial serif system stack for display typography.

Responsive layouts, Next Image sizing, local fonts, semantic navigation, keyboard focus states, metadata, `robots.txt`, JSON-LD, and `/llms.txt` support accessibility, performance, and discoverability.
