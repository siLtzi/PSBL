This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Privacy notice and AI processing

The [contact form](components/ContactForm.tsx) links to the
[privacy notice](app/tietosuojaseloste/page.tsx). The form does not include a
separate AI-processing statement; the privacy notice describes the internal
application as in use and its administrator-selected Anthropic Claude API
extraction workflow. Retention and transfer details still need to be completed
with verified information. These text changes do not enable AI,
forward messages to the internal application, or collect AI consent.
The existing [contact endpoint](app/api/contact/route.ts) still sends email
through Resend.

Before using real customer messages in the internal application or AI service,
PSBL must approve the processing basis, processor agreements, international
transfer destinations and safeguards, retention/deletion rules, and data
minimization procedure. Publish the verified details in the privacy notice
and ensure customers receive appropriate information when processing goes live.
The internal application's deployment checklist is maintained separately
in the `psblapp` repository.

Direct email inquiries and previously received messages need an appropriate
notification workflow before new processing begins; updating this website
alone does not implement that workflow. Administrator approval in the app
is not customer consent. Do not add a mandatory AI-consent checkbox as a
substitute for determining a lawful processing basis.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
