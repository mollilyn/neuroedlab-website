# NeuroEd Lab Website

Official website for NeuroEd Lab, a personalised learning studio in Bangkok founded by Molly.

Built with:

- [Next.js](https://nextjs.org)
- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)

---

## Development

Install dependencies and start the development server:

```bash
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000).

---

## Content Editing

Non-technical content can be edited without touching the codebase. The following directories are safe to modify:

| Directory        | Purpose                        |
| ---------------- | ------------------------------ |
| `/content`       | Text content and copy          |
| `/theme`         | Colours, fonts, and brand settings |
| `/public/images` | Images and media assets        |

---

## Deployment

The project deploys automatically via the following pipeline:

**GitHub → Vercel**

Pushing to the main branch triggers a production deployment on Vercel.
