// ============================================================================
// SEGMENT PAGE CONTENT — ENGLISH (bengkel, salon, percetakan, toko-bangunan)
//
// Translation of `segmen.ts`. Structure and slugs are identical — only the
// prose is in English. URLs are NOT translated.
//
// 🔴 HONESTY RULES binding on this whole file (same as the Indonesian source):
//    - No testimonials / client names / business-result numbers
//    - No promises of business outcomes ("revenue will rise") — only the
//      quality of the information you decide with
//    - Never call it "affordable" / "cheap"
//    - Never promise automatic marketplace integration (this feature DOES NOT
//      EXIST — orders are still entered by hand)
//    - `cocok` / `belumCocok` are honest fit criteria meant to screen people
//      out. Do not soften them into sales language.
// ============================================================================
import type { IsiSegmen } from './segmen';

export const SEGMEN_ISI_EN: IsiSegmen[] = [
  // ==========================================================================
  {
    slug: 'bengkel',
    nama: 'Auto Repair Shops',
    title: 'Mechanic Commission & Service Queue App | Bedah Data',
    description:
      'Still working out mechanic commissions by hand every month-end? ERP Studio calculates commissions from your service records, tracks the job queue, and handles payroll in one system. Pay once.',
    h1: 'Still working out mechanic commissions by hand every month-end?',
    intro:
      'If every month-end you are still opening service notes one by one to work out each mechanic\'s share, the problem is not how careful you are. The problem is that service records, parts, and wages all live in different places — so there is no single place that can just answer the question.',
    keluhan: [
      {
        judul: 'Month-end turns into a late night',
        isi: 'You gather the service notes, match each one to whoever did the work, then add it all up. You finish around midnight, and the next day someone still complains that a job was left out.',
      },
      {
        judul: 'Parts leave the shelf unrecorded',
        isi: 'Something is taken off the shelf for one job, partly used, and the rest goes back — or does not. Come stock count, the numbers never quite line up.',
      },
      {
        judul: '"Is Pak Andi\'s bike done yet?"',
        isi: 'To answer that one question you have to ask three people first. Meanwhile the customer is waiting on the phone.',
      },
      {
        judul: 'Mechanics feel the maths is not open',
        isi: 'When the commission calculation only lives in your head and your notebook, trust wobbles easily — not because anyone is cheating, but because there is nothing you can check together.',
      },
    ],
    penanganan: [
      {
        judul: 'Commissions come out of the service records',
        isi: 'Every service job records who did the work. Because commissions are calculated from the same records you use to bill the customer, there is no separate month-end recap any more — and you can show the working to a mechanic who asks.',
      },
      {
        judul: 'The service queue, from drop-off to pick-up',
        isi: 'Every vehicle that comes in has a status you can see: being worked on, waiting on parts, or ready for collection. "Is it done yet?" can be answered by opening one screen.',
      },
      {
        judul: 'Parts come off the stock automatically',
        isi: 'A part used on a job reduces stock straight away and goes onto the customer\'s invoice. So anything that leaves the shelf always has its match in the records.',
      },
      {
        judul: 'Wages and commissions in one place',
        isi: 'Attendance, base pay, and commissions are calculated in the same system. Payday no longer means opening three different files.',
      },
    ],
    cocok: [
      'At least 3 people involved (e.g. owner, cashier/admin, and a few mechanics)',
      'There are commissions or per-job wages that have to be calculated',
      'You sell parts, not just labour',
      'The service queue is busy enough that you can no longer keep it in your head',
    ],
    belumCocok:
      'If you still run the shop on your own or with one other person and there are no commissions to work out, you do not need this system yet. What you need is a simple record, and a free bookkeeping app already does that well. We will say exactly the same thing during a demo.',
    faq: [
      {
        tanya: 'My mechanic commissions are not calculated in a standard way. Can it adapt?',
        jawab:
          '<p>Commission calculations can follow the way you already do it — a percentage of the labour charge, a fixed amount per type of job, or a mix of the two. What we need to understand during the demo is how your shop works, not the other way round with you adapting to the system.</p>',
      },
      {
        tanya: 'My mechanics are not used to computers. How does that work?',
        jawab:
          '<p>In most shops it is not the mechanics who do the data entry but the admin or cashier — the mechanic is simply recorded as the person who did the job. If you do want mechanics to have access, the system supports <strong>role-based permissions</strong>, so they only see the jobs they are responsible for, not the whole shop\'s data.</p>',
      },
      {
        tanya: 'Can labour and parts go on the same invoice?',
        jawab:
          '<p>Yes. One service invoice can carry both the labour and the parts used. The parts automatically reduce stock, while it is the labour portion that forms the basis for the mechanic\'s commission.</p>',
      },
    ],
    pesanWa: 'Hello Bedah Data, I run an auto repair shop and would like to ask about mechanic commission calculation',
  },

  // ==========================================================================
  {
    slug: 'salon',
    nama: 'Salons & Clinics',
    title: 'Therapist Commission App for Salons & Clinics | Bedah Data',
    description:
      'Therapist commissions, customer schedules, product stock, and payroll in one system. ERP Studio calculates commissions from your service records — pay once, not a monthly subscription.',
    h1: 'Still working out therapist commissions from a notebook every month-end?',
    intro:
      'In salons and clinics almost everything that matters depends on who did the work: therapist commissions, customers who ask for a particular person, right down to the products used during a treatment. When all three are recorded in separate places, month-end always ends in cross-checking.',
    keluhan: [
      {
        judul: 'Commissions worked out by hand, therapist by therapist',
        isi: 'You open the service book, tally who did what, then multiply by the percentage. It takes hours, and one missed line means somebody feels short-changed.',
      },
      {
        judul: 'Treatment products run out without warning',
        isi: 'Creams, hair colour, and treatment supplies get used a little at a time with every service. Because usage is not recorded, you only notice when the item is genuinely gone.',
      },
      {
        judul: 'Regular customers are not tracked',
        isi: 'Who last came in three months ago, who normally books a treatment every month — it all rests on the cashier\'s memory rather than a record.',
      },
      {
        judul: 'A therapist queries the maths and you start again from scratch',
        isi: 'Because the calculation is not stored neatly, one question means reopening the entire month\'s records.',
      },
    ],
    penanganan: [
      {
        judul: 'Commissions calculated from the service records',
        isi: 'Every service records the therapist who carried it out. Commissions are calculated from the same records you use to bill the customer, so the working can be opened up again any time it is questioned.',
      },
      {
        judul: 'Products come off stock as the service is recorded',
        isi: 'Supplies used on a treatment reduce stock immediately. You can see which products are running low before they run out in the middle of a busy afternoon.',
      },
      {
        judul: 'Customer history is kept',
        isi: 'Who has had which treatment and when they last came in is recorded properly — so getting back in touch with a past customer no longer depends on one person remembering.',
      },
      {
        judul: 'Payroll and commissions become one process',
        isi: 'Attendance, base pay, and therapist commissions are calculated in the same system, so payday stops being the most exhausting day of the month.',
      },
    ],
    cocok: [
      'At least 3 people involved (owner, cashier/admin, and a few therapists)',
      'There are per-service commissions or targets that have to be calculated',
      'You use products or supplies whose stock needs watching',
      'You have repeat customers whose history you want to track',
    ],
    belumCocok:
      'If you still run the salon yourself with no other therapists, there are no commissions to reconcile between people — and this system will feel like overkill. A simple record is enough, and we will tell you that plainly.',
    faq: [
      {
        tanya: 'My therapists have different commissions for different services. Is that possible?',
        jawab:
          '<p>Yes. The commission percentage or amount can differ by type of service, and it can also differ between therapists if that is how your place works. What matters is that we set the rules once at the start — after that the calculation simply follows the service records.</p>',
      },
      {
        tanya: 'Can it record treatment packages paid for up front?',
        jawab:
          '<p>It can be recorded as a sale drawn down over time, so the customer\'s remaining visits stay visible. Because every salon has different package rules, bring an example of yours to the demo so we can show you exactly how it would be handled — and be honest if any part of it needs adjusting.</p>',
      },
      {
        tanya: 'Is there online booking for customers?',
        jawab:
          '<p>Plainly: <strong>there is no booking page customers can use themselves yet</strong>. What exists is schedule and queue recording from the salon admin\'s side. If online booking is your main requirement, let\'s talk about it before you decide to buy.</p>',
      },
    ],
    pesanWa: 'Hello Bedah Data, I run a salon/clinic and would like to ask about therapist commission calculation',
  },

  // ==========================================================================
  {
    slug: 'percetakan',
    nama: 'Print Shops & Studios',
    title: 'Order Tracking for Print Shops & Photo Studios | Bedah Data',
    description:
      'Print orders tracked from intake to completion, plus customer receivables you have not chased yet. ERP Studio was used first in our own print business.',
    h1: 'Have you ever missed an order because the note went astray?',
    intro:
      'Print orders rarely finish in one touch. One is waiting on a revision, one is waiting on materials, one is finished but not collected — and one has been collected but not paid for. All of that runs at the same time, and a notebook cannot show you all of it at once.',
    keluhan: [
      {
        judul: 'You cannot see the live orders in one view',
        isi: 'How many jobs are running right now? To answer that you have to ask the design team, then production, then check the notes on the cashier\'s desk.',
      },
      {
        judul: 'Receivables only surface at recap time',
        isi: 'Regular customers take the work first and pay later. If nobody records it properly, an invoice you forgot to chase only comes to light months afterwards.',
      },
      {
        judul: '"How many reams of A3 do we have left?"',
        isi: '"I think there\'s still some" is an expensive answer — because you find out the truth only after the job has been accepted and it is due tomorrow.',
      },
      {
        judul: 'Revisions are not recorded as work',
        isi: 'Repeated revisions eat working hours, but because they are not recorded, you never see what one order actually costs to produce.',
      },
    ],
    penanganan: [
      {
        judul: 'A board of live orders',
        isi: 'Every order has visible stages — received, in progress, waiting on confirmation, done. One screen answers "what is running right now".',
      },
      {
        judul: 'Receivables recorded from the moment goods leave',
        isi: 'Orders collected but not paid for are recorded as open invoices, complete with how old the invoice is. So you know which one to chase first.',
      },
      {
        judul: 'Materials go down as they are used',
        isi: 'Paper, ink, and other materials used on an order reduce stock immediately — so "how much is left" can be answered without walking to the store room.',
      },
      {
        judul: 'Used first in our own business',
        isi: 'The order flow in ERP Studio grew out of the photo editing and printing business we run ourselves. Designed around daily work, not around a feature list.',
      },
    ],
    cocok: [
      'At least 3 people involved (admin, designer/operator, production)',
      'Orders pass through several stages before they are finished',
      'You have regular customers who pay later (receivables)',
      'You use materials whose stock needs watching',
    ],
    belumCocok:
      'If you handle every order yourself from design through to printing, and payment is always settled on the spot, there is nothing to reconcile between people. In that situation this system will not help you much.',
    faq: [
      {
        tanya: 'Can one order have several stages of work?',
        jawab:
          '<p>Yes. One order can be broken into several steps, each with its own status, so you can see where a job is stuck. This is what separates recording a service order from simply recording the sale of an item.</p>',
      },
      {
        tanya: 'What about customers who pay in instalments?',
        jawab:
          '<p>Instalments and deposits can be recorded, and the remaining balance stays visible as an open receivable. The invoice list can also be sorted by age, so the longest outstanding one does not slip through.</p>',
      },
      {
        tanya: 'Can it work out the cost per order so I know the margin?',
        jawab:
          '<p>The materials used on each order are recorded, so you can compare the value of an order against the materials it consumed. We should say this plainly: <strong>how accurate it is depends on the discipline of recording material usage</strong>. The system cannot guess at materials that were never recorded.</p>',
      },
    ],
    pesanWa: 'Hello Bedah Data, I run a print shop/studio and would like to ask about order tracking',
  },

  // ==========================================================================
  {
    slug: 'toko-bangunan',
    nama: 'Building Supply & Wholesale',
    title: 'Stock App for Building Supply & Wholesale Stores | Bedah Data',
    description:
      'Stock in the books does not match stock in the warehouse? ERP Studio records stock movements, sales, and purchases in one system. Pay once.',
    h1: 'The book says 40, the warehouse says 33. Where did the other 7 go?',
    intro:
      'In building supply and wholesale, a stock discrepancy is rarely caused by one big thing. It is usually a pile of small ones: an unrecorded return, something broken, the wrong unit entered, or an item taken as a sample and never put back. Each one is small — but they stack up until the number can no longer be trusted.',
    keluhan: [
      {
        judul: 'The stock count never balances',
        isi: 'Every time you count again, something is off. Because you do not know where the difference came from, all you can do is adjust the number — and the same thing happens again next month.',
      },
      {
        judul: 'Goods sit in more than one place',
        isi: 'Some in the shop, some in the back store, some in another warehouse. When a customer asks, the answer depends on who you ask.',
      },
      {
        judul: 'The selling unit differs from the buying unit',
        isi: 'Bought by the box, sold by the length. As long as the conversion is done in your head, a miscalculation is only a matter of time.',
      },
      {
        judul: 'Special prices for regulars only exist in someone\'s head',
        isi: 'Certain customers have their own prices. If the person who usually serves them is off that day, everyone else is just guessing.',
      },
    ],
    penanganan: [
      {
        judul: 'A stock card you can trace',
        isi: 'Every movement is recorded: in from purchases, out from sales, returns, or adjustments. When there is a discrepancy you can trace its history — not just adjust the closing number.',
      },
      {
        judul: 'Discrepancies show up before they pile up',
        isi: 'A stock count is recorded as an adjustment with a note attached, rather than quietly overwriting the old figure. So you know how much went missing and when — not only that the number no longer matches.',
      },
      {
        judul: 'Purchases and sales connect to stock',
        isi: 'Goods coming in from purchases and going out through sales change the stock automatically, without being recorded twice in two different places.',
      },
      {
        judul: 'Customer details and their prices are stored',
        isi: 'Special per-customer prices live in the system rather than in one person\'s memory — so whoever serves them quotes the same price.',
      },
    ],
    cocok: [
      'At least 3 people involved (cashier, warehouse, owner)',
      'Enough product lines that you can no longer keep them in your head',
      'Goods move in and out daily, so records fall behind easily',
      'You have repeat customers on special pricing',
    ],
    belumCocok:
      'If you still mind the shop yourself and carry few product lines, a stock discrepancy is usually still something you can remember and correct on the spot. In that situation an 8-module system will feel like overkill.',
    faq: [
      {
        tanya: 'Can it handle a buying unit that differs from the selling unit?',
        jawab:
          '<p>Yes. Unit conversion (buying by the box, selling by the length, for example) is set up once in the item record, and the calculations then follow that rule. This is one of the most common causes of stock discrepancies we come across, and usually one of the quickest to show an improvement.</p>',
      },
      {
        tanya: 'What about goods that are damaged or lost — how do I record those?',
        jawab:
          '<p>They are recorded as a stock adjustment with a note. This matters: it means the discrepancy does not simply vanish from the records, but is logged as an event whose pattern you can watch over time.</p>',
      },
      {
        tanya: 'Can it pull orders straight from marketplaces?',
        jawab:
          '<p>Not yet, and we will say so plainly: <strong>there is no automatic marketplace integration</strong>. Orders from Shopee or Tokopedia are still entered by hand. If most of your sales come from marketplaces at high daily volume, tell us at the outset so we can give you an honest view on whether this system helps you or simply adds work.</p>',
      },
    ],
    pesanWa: 'Hello Bedah Data, I run a building supply/wholesale store and would like to ask about stock tracking',
  },
];
