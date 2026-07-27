# portafolio-nathanholender

Portafolio personal de **Nathan Holender** — Production & Operations Manager en
Prime Video International (Amazon). Ingeniero Industrial y de Sistemas por el
Tec de Monterrey.

Construido sobre la misma arquitectura que
[`portafolio-ian`](https://github.com/IanHolen/portafolio-ian), adaptado a un
perfil de operaciones: sin sección de productos, con Logros e impacto y
Educación.

## Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [Resend](https://resend.com/) para el formulario de contacto

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # pega tu RESEND_API_KEY
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

| Script          | Descripción                    |
| --------------- | ------------------------------ |
| `npm run dev`   | Servidor de desarrollo con HMR |
| `npm run build` | Build de producción            |
| `npm start`     | Sirve el build de producción   |
| `npm run lint`  | Linter de Next                 |

## Cómo editar el contenido

Todo el contenido vive en dos archivos. **No hay CMS ni base de datos.**

| Archivo               | Qué contiene                                                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------ |
| `lib/data.ts`         | Lo *estructural* e idioma-agnóstico: logos, competencias, tags, años, colores de acento.           |
| `lib/translations.ts` | Todo el *texto visible*, en español e inglés (`{ es, en }`).                                       |

> **Importante:** ambos archivos se cruzan **por índice**. Si reordenas
> `experience[]` en `data.ts`, reordena también `experience.items` en
> `translations.ts` — si no, los logos quedarán en la tarjeta equivocada.

### Añadir una experiencia nueva

1. Agrega una entrada a `experience[]` en `lib/data.ts` (logos + competencias).
2. Agrega la entrada correspondiente **en la misma posición** en
   `experience.items` de `lib/translations.ts`, tanto en `es` como en `en`.
3. Si es una empresa nueva, pon el logo en `public/companies/` y añádela a
   `companies[]` para que aparezca en el strip del Hero.

## Secciones

`Hero → Sobre mí → Experiencia → Logros e impacto → Skills → Educación →
Extracurriculares → Contacto`

- **i18n:** ES/EN con un Context propio + `localStorage` (botón EN/ES en el
  navbar). Arranca siempre en `es` para evitar errores de hidratación.
- **⌘K / Ctrl+K:** paleta de comandos para saltar a cualquier sección, copiar
  el email, abrir LinkedIn o descargar el CV.
- **Accesibilidad:** skip link, focus rings, `prefers-reduced-motion`, estilos
  de impresión.

## Assets

```
public/
├── companies/     amazon · primevideo · coppel · shoplogix
├── education/     itesm · ipag
├── nathan-portrait.png
└── cv-nathan-holender.pdf
```

## Formulario de contacto

`POST /api/contact` valida los campos, aplica honeypot y rate-limit (3/hora por
IP) y envía el correo con Resend a **nathanholender@gmail.com**. Si no hay
`RESEND_API_KEY`, responde 503 y el frontend cae elegantemente a un `mailto:`.

> El remitente por defecto es el sandbox de Resend (`onboarding@resend.dev`),
> que solo entrega al correo verificado de la cuenta. Para producción, verifica
> un dominio en Resend y define `RESEND_FROM`.
>
> El rate-limit vive en memoria: en serverless cada instancia tiene el suyo y se
> pierde en cold start. Suficiente contra spam casual, no contra un ataque real.

## Despliegue

Optimizado para [Vercel](https://vercel.com). Conecta el repo, define
`RESEND_API_KEY` y `NEXT_PUBLIC_SITE_URL` en Environment Variables, y el deploy
es automático en cada push a `main`.

## Contacto

- Email: nathanholender@gmail.com
- LinkedIn: [Nathan Holender](https://www.linkedin.com/in/nathan-holender/)
