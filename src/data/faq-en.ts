// ============================================================================
// FREQUENTLY ASKED QUESTIONS — ENGLISH
//
// Translation of `faq.ts`. Same source-of-truth principle: this feeds both the
// visible FAQ page and the FAQPage structured data, so the two cannot differ.
//
// 🔴 The honesty rules apply here as much as in the Indonesian original:
//    no business-outcome promises, no testimonials or user counts, never
//    "affordable", and the "you probably don't need this yet" answer stays
//    just as blunt as it is in Indonesian.
//
// Prices stay in Rupiah — readers are in Indonesia.
// ============================================================================
import type { ItemFaq } from '../components/Faq.astro';
import { PAKET } from '../config';

// 🔴 Harga dibaca dari config.ts — jangan menulis angka di FAQ.
const HARGA_STANDAR = PAKET.find((p) => p.kunci === 'standar')!.harga;

export const FAQ_UMUM_EN: ItemFaq[] = [
  {
    tanya: 'Is ERP Studio a monthly subscription?',
    jawab:
      '<p>No. ERP Studio uses a pay-once licence starting at ' + HARGA_STANDAR + ' — you are buying it, not renting it. The first year of maintenance is included. After that, renewing maintenance is optional, and <strong>the software keeps running even if you decide not to renew</strong>.</p>',
  },
  {
    tanya: 'Where is my business data stored?',
    jawab:
      '<p>In your own Google Drive, not on our servers. Every sales, stock, and finance record is stored as a spreadsheet in your business Drive — you can open it, back it up, or move it any time without asking us. That includes the day you decide to stop working with us.</p>',
  },
  {
    tanya: 'Can several staff use it at the same time?',
    jawab:
      '<p>Yes. ERP Studio supports multiple users with <strong>role-based permissions</strong>: the cashier, the warehouse admin, and the owner each see the menus that match their responsibilities. So staff do not have to see data that is none of their business, and you still see the whole picture.</p>',
  },
  {
    tanya: 'Does it suit a service business like a repair shop or a salon?',
    jawab:
      '<p>It does — as long as the work is already shared between several people. ERP Studio handles the service order queue from intake to completion, calculates technician or therapist commissions, and runs payroll in the same system. Service businesses with staff are exactly where commissions and queues are still most often worked out by hand every month-end.</p>',
  },
  {
    tanya: 'I still run my business on my own. Is it right for me?',
    jawab:
      '<p>Plainly: most likely not yet. If you handle everything yourself and there is nothing to reconcile between people, what you need is a simple record — and a free bookkeeping app already does that well. ERP Studio starts being useful when <strong>at least three people are involved</strong> and there is something to reconcile: stock, orders, commissions, or receivables.</p>',
  },
  {
    tanya: 'My old data is still in Excel. Will I lose it?',
    jawab:
      '<p>No. Records from Excel or old notebooks can be moved into the system, so you are not starting from zero. There is a paid data migration service if you would like help getting everything genuinely ready to use — we tell you the cost up front, not halfway through.</p>',
  },
  {
    tanya: 'I am not good with computers. Can I learn it?',
    jawab:
      '<p>You can, and that is part of our job. ERP Studio runs on Google Workspace, which already looks familiar, and you join a WhatsApp support group from day one. Our principle: <strong>teach you, not make you dependent</strong> — if a year from now you still have to ask us about the basics, then we have not finished our work.</p>',
  },
  {
    tanya: 'What happens to my system if Bedah Data one day shuts down?',
    jawab:
      '<p>A fair question, and one that is rarely answered openly. Because the system runs in your own Google Workspace account and the data sits in your Drive, you can carry on using it — there is no switch on our side that could turn it off. What would stop is the maintenance and development work from us.</p>',
  },
  {
    tanya: 'Why does Google show a warning when I install it?',
    jawab:
      '<p>That is normal. This ERP is built by us and runs in your own Google account, so Google does not &ldquo;know&rdquo; it yet and shows the <em>Google hasn&rsquo;t verified this app</em> screen. Click <strong>Advanced</strong>, then <strong>Go to</strong>, then allow the access requested. Your data stays in your own Google Drive.</p>',
  },
  {
    tanya: 'What are the limits of this ERP?',
    jawab:
      '<p>This ERP runs on Google Apps Script, which has daily quota and memory limits. For a small business with ordinary daily transactions you will rarely notice them. If your business has outgrown them, we discuss a sturdier system through the Custom route.</p>',
  },
];
