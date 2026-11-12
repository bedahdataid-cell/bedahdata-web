// ============================================================================
// ENGLISH DATA FOR ALL FREE TOOLS (calculators)
// ----------------------------------------------------------------------------
// Straight translation of ./alat.ts. Same engine, same shapes.
//
// 🔴 THREE RULES THAT MUST NOT BE BROKEN (spec §0):
//    1. Calculators stay OPEN — no gate form. Basic results show right away.
//       What WhatsApp gives is only the BONUS.
//    2. Never calculate savings / profit projections. Every formula here is
//       plain ARITHMETIC on numbers the user typed in themselves.
//    3. Third-party numbers (marketplace fees) MUST carry a date and a source.
//
// 🔴 STRUCTURAL RULES: slug, kunci, kelompok, jenis, format, opsi[].nilai and
//    every hitung/tampilBila/bila function are IDENTICAL to the Indonesian
//    file. Only user-visible text is translated.
// ============================================================================

import type { Alat, Isian, Hasil, Peringatan, Faq } from './alat';

// --- Group names -------------------------------------------------------------

export const KELOMPOK_EN = {
  karyawan: {
    nama: 'Staff & Pay',
    ringkas: 'Commission, overtime, and holiday bonus — the sums that make you second-guess yourself every month.',
  },
  'jualan-online': {
    nama: 'Selling Online',
    ringkas: 'Marketplace fees, margin, and shipping costs that quietly eat your profit.',
  },
  dokumen: {
    nama: 'Business Documents',
    ringkas: 'Tidy receipts and letters without paying for an app.',
  },
} as const;

// --- Helpers (copied verbatim from ./alat.ts) --------------------------------

const ang = (v: number | string): number => {
  const n = typeof v === 'number' ? v : parseFloat(String(v));
  return Number.isFinite(n) ? n : 0;
};

/** Official monthly wage = base salary + fixed allowances. */
const upahSebulan = (n: Record<string, number | string>) =>
  ang(n.gajipokok) + ang(n.tunjangan);

// ============================================================================
// GROUP 1 — STAFF
// ============================================================================

interface VarianKomisi {
  slug: string;
  judul: string;
  judulPendek: string;
  judulSeo: string;
  ringkas: string;
  deskripsi: string;
  /** What the worker is called: "mechanic", "stylist", "salesperson". */
  peran: string;
  /** What the work is called: "service job", "treatment", "sale". */
  kerja: string;
  penjelasan: string;
  faq: Faq[];
  contohOmzet: number;
  contohPersen: number;
}

function buatKomisi(v: VarianKomisi): Alat {
  return {
    slug: v.slug,
    kelompok: 'karyawan',
    judul: v.judul,
    judulPendek: v.judulPendek,
    judulSeo: v.judulSeo,
    ringkas: v.ringkas,
    deskripsi: v.deskripsi,
    bonusWa: `Want a tally sheet for every ${v.peran} at once, plus the Google Sheets file? Tap WhatsApp and I'll send it over.`,
    pesanWa: `Hello Bedah Data, I just used the ${v.peran} commission calculator. Could I get the template to tally all ${v.peran}s plus the Google Sheets file?`,
    isian: [
      {
        kunci: 'nama',
        label: `${v.peran.charAt(0).toUpperCase() + v.peran.slice(1)} name`,
        bantuan: 'You can leave this blank — it just makes the result easier to read.',
        jenis: 'teks',
        opsional: true,
      },
      {
        kunci: 'skema',
        label: 'Commission scheme',
        jenis: 'pilihan',
        awal: 'persen',
        opsi: [
          { nilai: 'persen', label: `Percentage of ${v.kerja} revenue` },
          { nilai: 'nominal', label: `Flat amount per ${v.kerja}` },
          { nilai: 'tingkat', label: 'Tiered (with a target)' },
        ],
      },

      // --- Scheme 1: percentage of revenue ---
      {
        kunci: 'omzet',
        label: `${v.kerja.charAt(0).toUpperCase() + v.kerja.slice(1)} revenue this month (Rp)`,
        jenis: 'rupiah',
        awal: v.contohOmzet,
        tampilBila: { kunci: 'skema', nilai: ['persen', 'tingkat'] },
      },
      {
        kunci: 'persen',
        label: 'Commission percentage (%)',
        jenis: 'persen',
        awal: v.contohPersen,
        tampilBila: { kunci: 'skema', nilai: ['persen'] },
      },

      // --- Scheme 2: flat amount per job ---
      {
        kunci: 'jumlahorder',
        label: `Number of ${v.kerja}s this month`,
        jenis: 'angka',
        awal: 40,
        tampilBila: { kunci: 'skema', nilai: ['nominal'] },
      },
      {
        kunci: 'nominal',
        label: `Commission per ${v.kerja} (Rp)`,
        jenis: 'rupiah',
        awal: 25000,
        tampilBila: { kunci: 'skema', nilai: ['nominal'] },
      },

      // --- Scheme 3: tiered ---
      {
        kunci: 'target',
        label: 'Revenue target (Rp)',
        bantuan: 'The line where the higher percentage kicks in.',
        jenis: 'rupiah',
        awal: v.contohOmzet,
        tampilBila: { kunci: 'skema', nilai: ['tingkat'] },
      },
      {
        kunci: 'persenbawah',
        label: 'Percentage below target (%)',
        jenis: 'persen',
        awal: v.contohPersen,
        tampilBila: { kunci: 'skema', nilai: ['tingkat'] },
      },
      {
        kunci: 'persenatas',
        label: 'Percentage on the amount above target (%)',
        jenis: 'persen',
        awal: v.contohPersen + 2,
        tampilBila: { kunci: 'skema', nilai: ['tingkat'] },
      },

      {
        kunci: 'gajipokok',
        label: 'Base salary (Rp)',
        bantuan: 'Leave blank if you only want to see the commission itself.',
        jenis: 'rupiah',
        awal: 0,
        opsional: true,
      },
    ],
    hasil: [
      {
        label: 'Commission this month',
        format: 'rupiah',
        utama: true,
        hitung: (n) => {
          const skema = String(n.skema);
          if (skema === 'nominal') return ang(n.jumlahorder) * ang(n.nominal);
          if (skema === 'tingkat') {
            const omzet = ang(n.omzet);
            const target = ang(n.target);
            const bawah = Math.min(omzet, target) * (ang(n.persenbawah) / 100);
            const atas = Math.max(0, omzet - target) * (ang(n.persenatas) / 100);
            return bawah + atas;
          }
          return ang(n.omzet) * (ang(n.persen) / 100);
        },
      },
      {
        label: 'Commission on revenue up to target',
        format: 'rupiah',
        tampilBila: (n) => String(n.skema) === 'tingkat',
        hitung: (n) =>
          Math.min(ang(n.omzet), ang(n.target)) * (ang(n.persenbawah) / 100),
      },
      {
        label: 'Commission on the amount above target',
        format: 'rupiah',
        tampilBila: (n) => String(n.skema) === 'tingkat',
        hitung: (n) =>
          Math.max(0, ang(n.omzet) - ang(n.target)) * (ang(n.persenatas) / 100),
      },
      {
        label: 'Base salary',
        format: 'rupiah',
        tampilBila: (n) => ang(n.gajipokok) > 0,
        hitung: (n) => ang(n.gajipokok),
      },
      {
        label: 'Total to pay (base salary + commission)',
        format: 'rupiah',
        utama: true,
        tampilBila: (n) => ang(n.gajipokok) > 0,
        hitung: (n) => {
          const skema = String(n.skema);
          let komisi: number;
          if (skema === 'nominal') komisi = ang(n.jumlahorder) * ang(n.nominal);
          else if (skema === 'tingkat') {
            const omzet = ang(n.omzet);
            const target = ang(n.target);
            komisi =
              Math.min(omzet, target) * (ang(n.persenbawah) / 100) +
              Math.max(0, omzet - target) * (ang(n.persenatas) / 100);
          } else komisi = ang(n.omzet) * (ang(n.persen) / 100);
          return ang(n.gajipokok) + komisi;
        },
      },
    ],
    penjelasan: v.penjelasan,
    faq: v.faq,
  };
}

const komisiBengkel = buatKomisi({
  slug: 'komisi-teknisi-bengkel',
  judul: 'Workshop Mechanic Commission Calculator',
  judulPendek: 'Mechanic Commission',
  judulSeo: 'Workshop Mechanic Commission Calculator — Work It Out Instantly | Bedah Data',
  ringkas:
    'Work out a mechanic’s commission from service revenue, a flat amount per job, or a tiered scheme. Use it right away, no sign-up.',
  deskripsi:
    'Workshop mechanic commission calculator: work out commission from a percentage of service revenue, a flat amount per job, or a tiered scheme with a target. Free, no sign-up.',
  peran: 'mechanic',
  kerja: 'service job',
  contohOmzet: 24000000,
  contohPersen: 10,
  penjelasan: `
<h2>How to work out a workshop mechanic's commission</h2>
<p>In a workshop, commission is usually taken from <strong>service revenue</strong> —
not from the whole invoice. The reason is simple: spare parts are goods you buy and
resell, so the margin is already thin and it already belongs to the workshop. What
the mechanic actually does is the labour.</p>

<p>There are three schemes people use most, and all three can be worked out with the
calculator above.</p>

<h3>1. Percentage of service revenue</h3>
<p>The most common one. The mechanic gets a fixed percentage of the labour value he
handled that month. The formula:</p>
<p><code>Commission = service revenue × percentage</code></p>
<p>An example calculation: say a mechanic brought in Rp 24,000,000 in service
revenue for the month and his commission is 10% — that comes to Rp 2,400,000. These
are example figures; put your own workshop's numbers into the fields above.</p>

<h3>2. Flat amount per service job</h3>
<p>Used when the work is fairly uniform, for instance a workshop that mostly does
routine servicing. The mechanic gets a fixed amount per unit finished, whatever the
invoice says.</p>
<p><code>Commission = number of jobs × amount per job</code></p>
<p>The upside: easy to work out and easy to explain to your mechanics. The downside:
heavy jobs and light jobs are paid the same, so once the workshop gets busy you
usually need different rates per type of work.</p>

<h3>3. Tiered (with a target)</h3>
<p>A smaller percentage up to the target, then a bigger one on whatever goes above
it. The thing to watch: <strong>the bigger percentage only applies to the amount
above the target</strong>, not to the whole revenue. This calculator splits the two
so you can see it plainly.</p>

<h3>What actually causes arguments at month end</h3>
<p>Not the formula — the formula is usually already agreed. What causes trouble is
<strong>the record-keeping</strong>: which invoice belongs to which mechanic, how a
job done by two people gets split, and whether rework counts. Settle those three
things up front, write them down, then stick to them.</p>

<p>One more thing that often gets missed: <strong>decide when a commission is
"earned"</strong> — when the work is finished, or when the customer actually pays.
For a workshop serving companies on payment terms, those two dates can be a month
apart.</p>
`,
  faq: [
    {
      tanya: 'What is a reasonable commission percentage for a workshop mechanic?',
      jawab:
        '<p>There is no official figure — this is an agreement between the workshop and the mechanic, and it varies depending on whether the mechanic also gets a base salary, who pays for the tools, and how busy the workshop is. What matters: decide the basis (service revenue, not the whole invoice), write the agreement down, and apply it the same way every month.</p>',
    },
    {
      tanya: 'Is commission taken from the whole invoice or from labour only?',
      jawab:
        '<p>Usually from <strong>labour only</strong>. Spare parts are goods the workshop buys and resells — the margin is already thin and the risk (dead stock, wrong order) sits with the workshop. If commission came off the whole invoice, a mechanic who happened to work on a car with expensive parts would earn far more without working any harder.</p>',
    },
    {
      tanya: 'What if two mechanics work on the same job?',
      jawab:
        '<p>Agree the split up front — an even share, say, or 70:30 for whoever led the job. What matters is that the rule is written down before the work starts, not decided while the commission is being handed out. In this calculator, just enter each mechanic’s share of the revenue separately.</p>',
    },
    {
      tanya: 'What happens to the commission if a job has to be redone?',
      jawab:
        '<p>This one needs to be agreed in writing, because it is the most common source of disputes. A common practice: rework caused by a mistake in the workmanship does not count as new revenue. But whatever rule you pick, what really matters is that it was clear from the start.</p>',
    },
    {
      tanya: 'Is commission counted when the job is finished or when the customer pays?',
      jawab:
        '<p>Both are used in practice. If your workshop serves a lot of customers on payment terms (companies, insurers), counting commission when the money arrives is safer for your cash flow. If most people pay cash on the spot, counting it on completion is simpler. Pick one, then stay consistent.</p>',
    },
    {
      tanya: 'Can I save the result from this calculator?',
      jawab:
        '<p>This page works out one mechanic in one go and saves nothing — no data is sent to us. If you need a tally of all your mechanics on one sheet you can reuse every month, message us on WhatsApp and we’ll send you the Google Sheets template.</p>',
    },
  ],
});

const komisiSalon = buatKomisi({
  slug: 'komisi-kapster-salon',
  judul: 'Salon Stylist & Therapist Commission Calculator',
  judulPendek: 'Salon Stylist Commission',
  judulSeo: 'Salon Stylist & Clinic Therapist Commission Calculator | Bedah Data',
  ringkas:
    'Work out a stylist or therapist’s commission from treatment revenue, a flat amount per treatment, or a tiered scheme. Use it right away, no sign-up.',
  deskripsi:
    'Salon stylist and clinic therapist commission calculator: work it out from a percentage of treatment revenue, a flat amount per treatment, or a tiered scheme. Free, no sign-up.',
  peran: 'stylist',
  kerja: 'treatment',
  contohOmzet: 15000000,
  contohPersen: 15,
  penjelasan: `
<h2>How to work out stylist and therapist commission</h2>
<p>In salons and beauty clinics, commission is usually taken from the <strong>treatment
revenue</strong> the person handled themselves. Products sold separately (shampoo,
serum, skincare to take home) normally have their own scheme, because that is
selling goods rather than the work of someone's hands.</p>

<p>The figures that circulate in salon practice sit around <strong>15–20% of
treatment revenue</strong>. That is not an official rule, just what the market tends
to do — and it depends heavily on whether the stylist also gets a base salary, who
supplies the materials, and whether the stylist brings their own clients.</p>

<h3>1. Percentage of treatment revenue</h3>
<p><code>Commission = treatment revenue × percentage</code></p>
<p>An example calculation: say a stylist brought in Rp 15,000,000 in treatment
revenue for the month at 15% — that comes to Rp 2,250,000. Swap those for your own
salon's numbers in the fields above.</p>

<h3>2. Flat amount per treatment</h3>
<p>A good fit for salons whose service list is fairly uniform in price. Every
finished treatment is worth a set amount, whatever the invoice says.</p>
<p><code>Commission = number of treatments × amount per treatment</code></p>

<h3>3. Tiered (with a target)</h3>
<p>The percentage goes up once the revenue target is met. Keep in mind: the higher
percentage only applies to the <strong>amount above the target</strong>, not to the
whole revenue — this calculator separates the two so it is clear.</p>

<h3>Three things to agree on from the start</h3>
<p><strong>Who covers the materials.</strong> Treatments that use expensive materials
(colouring, care products) sometimes have the material cost taken out before
commission is worked out. If that is your rule, write it down and explain how it is
calculated.</p>

<p><strong>Walk-in clients versus clients the stylist brings.</strong> Some salons pay
a different percentage for people who simply walk in compared with people who came
looking for a particular stylist.</p>

<p><strong>Treatments done by two people.</strong> For long treatments with an
assistant, set the split up front — don't divide it afterwards once the numbers are
already on the table.</p>

<h3>When is a commission "earned"</h3>
<p>For salons where most clients pay cash on the spot, this is rarely an issue — the
treatment finishes, the money comes in, the commission counts. What does need
clarifying is <strong>care packages paid for up front covering several
visits</strong>. The money arrives once, but the work is spread over several weeks,
and sometimes done by different stylists.</p>
<p>The approach that causes the fewest arguments: count the commission
<strong>each time a treatment is actually performed</strong>, not when the package is
bought. That way whoever does the work gets paid for it, and if a client stops
halfway through the package there is no commission to claw back.</p>

<h3>What makes this tiring every month</h3>
<p>Not the formula. What tires you out is gathering the data: matching invoices to
whoever did the work, separating treatments from product sales, then adding it up
per person. For a salon with three stylists, a notebook still handles it. Once the
number grows, keeping tidy records as each transaction happens is far lighter than
piecing everything together at month end.</p>
`,
  faq: [
    {
      tanya: 'What percentage do salon stylists usually get?',
      jawab:
        '<p>Common practice in salons sits around <strong>15–20% of treatment revenue</strong>. That is a market habit, not an official rule. How big it is depends on whether there is a base salary, who supplies the materials, and whether the stylist brings their own clients.</p>',
    },
    {
      tanya: 'Do product sales earn commission too?',
      jawab:
        '<p>They are usually kept separate, with their own smaller percentage, because selling a product is different from performing a treatment. If you want to work it out, run this calculator twice — once for treatments, once for product sales — then add the two together.</p>',
    },
    {
      tanya: 'Should material costs come out before commission or not?',
      jawab:
        '<p>Both are done in practice. If your salon takes materials out first, enter the <strong>treatment revenue after material costs</strong> in the revenue field. What matters is that the method is explained to the stylist from the start, not sprung on them on payday.</p>',
    },
    {
      tanya: 'How do I work out commission for a therapist in a beauty clinic?',
      jawab:
        '<p>Exactly the same way as for a salon stylist — only the wording differs (procedure/treatment), and the value per procedure is usually higher. This calculator works for both.</p>',
    },
    {
      tanya: 'What about commission when a stylist is off or on leave?',
      jawab:
        '<p>Commission follows work actually performed, so days off simply produce no commission. What needs to be agreed separately is the base salary — that falls under employment rules, not the commission scheme.</p>',
    },
    {
      tanya: 'Can I work out all my stylists at once?',
      jawab:
        '<p>This page works out one person in one go and saves nothing. If you need every stylist on one sheet you can reuse each month, message us on WhatsApp — we’ll send you the Google Sheets template.</p>',
    },
  ],
});

const komisiSales = buatKomisi({
  slug: 'komisi-sales',
  judul: 'Sales Commission Calculator',
  judulPendek: 'Sales Commission',
  judulSeo: 'Sales Commission Calculator — Percentage, Flat Rate & Tiered | Bedah Data',
  ringkas:
    'Work out sales commission from a percentage of revenue, a flat amount per sale, or a tiered scheme with a target. Use it right away, no sign-up.',
  deskripsi:
    'Sales commission calculator: work out commission from a percentage of revenue, a flat amount per sale, or a tiered scheme with a target. Free and ready to use.',
  peran: 'salesperson',
  kerja: 'sale',
  contohOmzet: 30000000,
  contohPersen: 5,
  penjelasan: `
<h2>How to work out sales commission</h2>
<p>Sales commission is a share of the sale given to the person who brought that sale
in. The basic formula is simple, but what really decides things is <strong>which
number the commission comes off</strong>.</p>

<h3>1. Percentage of revenue</h3>
<p><code>Commission = revenue × percentage</code></p>
<p>An example calculation: Rp 30,000,000 in revenue at 5% gives a commission of
Rp 1,500,000. These are example figures — put your own business's numbers into the
fields above.</p>

<h3>2. Flat amount per sale</h3>
<p>Every transaction is worth the same, whatever its value. A good fit for products
priced fairly uniformly, or when you want to encourage the <em>number</em> of
transactions rather than their size.</p>
<p><code>Commission = number of sales × amount per sale</code></p>

<h3>3. Tiered (with a target)</h3>
<p>This is the one most sales teams use: a base percentage up to the target, then a
higher one on whatever goes above it. What gets calculated wrongly most often:
<strong>the higher percentage applies only to the amount above the target</strong>,
it does not reach back over the whole revenue. This calculator breaks it into two
lines so you can see it.</p>

<h3>From revenue or from gross profit?</h3>
<p>Working from revenue is the easiest to explain and the easiest for the
salesperson to check themselves. The downside: they have no reason to hold the
price — giving a big discount still earns commission as long as the value is big.</p>
<p>Working from gross profit closes that gap, but it needs a tidy, consistent cost
of goods for every product. If your costing isn't tidy yet, start with revenue and
put a separate limit on discount authority.</p>

<h3>When is a commission "earned"</h3>
<p>This is where trouble shows up most often, especially with sales on payment
terms. Three points are commonly used: when the order comes in, when the goods ship,
or when the money actually lands. <strong>For a small business, counting it when
payment is received is far safer for cash flow</strong> — you are not paying
commission on money that hasn't arrived. Whichever you pick, write it down up
front.</p>

<h3>Cap the discount, don't just tune the commission</h3>
<p>If commission comes off revenue, a discount costs the salesperson nothing — you
carry it. So a commission scheme should sit alongside a <strong>limit on discount
authority</strong>: up to what percentage they can decide alone, and above what they
must ask. Without that limit, raising the commission percentage can actually push
prices down.</p>

<h3>Returns and cancellations</h3>
<p>This is the one that damages good working relationships most when it isn't
discussed early. Agree in writing that commission on a cancelled or returned
transaction is cancelled too, and set out how it is recovered — usually deducted
from the next month's commission. A rule like this is far easier to accept
<strong>before</strong> it happens than after.</p>

<h3>The hard part isn't the arithmetic</h3>
<p>Working out one person's commission for one month is just multiplication. What
takes time is making sure the revenue figure is right: which transaction belongs to
whom, which ones are paid, and which have been returned. If those records are tidy
as each transaction happens, the commission run is done in minutes.</p>
`,
  faq: [
    {
      tanya: 'What is a reasonable sales commission percentage?',
      jawab:
        '<p>There is no standard figure — it depends heavily on your product margin and on whether the salesperson also gets a base salary. One thing to hold on to: the commission has to fit inside your margin. Work out the gross profit per sale first, then decide how much of it you can give away without the sale losing money.</p>',
    },
    {
      tanya: 'Should commission come off revenue or off profit?',
      jawab:
        '<p>Revenue is easier to explain and to check, but it gives no reason to protect the price. Gross profit is fairer to the business, but needs tidy cost-of-goods records. If your costing isn’t tidy yet, use revenue for now and set a separate discount limit.</p>',
    },
    {
      tanya: 'Is commission paid at closing or when the customer pays?',
      jawab:
        '<p>For a small business, paying commission <strong>when the money actually arrives</strong> is safer — you don’t hand out commission on a sale that turns out to be cancelled or never paid. For long payment terms, some businesses pay part at closing and the rest on settlement.</p>',
    },
    {
      tanya: 'What if the customer cancels or returns the goods?',
      jawab:
        '<p>Agree from the start that commission on a cancelled or returned transaction is cancelled too, and how it gets recovered — usually deducted from the next month’s commission. This rule is much easier to accept when it is written down before it happens.</p>',
    },
    {
      tanya: 'How is a tiered scheme calculated correctly?',
      jawab:
        '<p>The higher percentage applies only to the <strong>amount above the target</strong>. For example: a target of Rp 30 million at 5%, then 7% on the excess. If revenue is Rp 40 million, the sum is 5% of Rp 30 million plus 7% of Rp 10 million — not 7% of Rp 40 million. This calculator already separates the two.</p>',
    },
    {
      tanya: 'Can I work out the whole sales team at once?',
      jawab:
        '<p>This page works out one person in one go and saves nothing. For the whole team on one sheet you can reuse every month, message us on WhatsApp — we’ll send you the Google Sheets template.</p>',
    },
  ],
});

// --- Overtime ----------------------------------------------------------------
// 🟢 Official formula: hourly overtime pay = 1/173 × monthly wage.
//    Official limits: max 4 hours/day and 18 hours/week.

const lembur: Alat = {
  slug: 'lembur',
  kelompok: 'karyawan',
  judul: 'Overtime Pay Calculator',
  judulPendek: 'Overtime Pay',
  judulSeo: 'Overtime Pay Calculator — Official 1/173 Formula | Bedah Data',
  ringkas:
    'Work out overtime pay using the official 1/173 × monthly wage formula, with warnings for the 4-hour daily and 18-hour weekly limits.',
  deskripsi:
    'Overtime pay calculator using the official 1/173 × monthly wage formula. Covers working days and rest days, plus warnings for the 4 hours/day and 18 hours/week limits.',
  bonusWa:
    'Want every employee’s overtime on one sheet, plus the Google Sheets file? Tap WhatsApp and I’ll send it over.',
  pesanWa:
    'Hello Bedah Data, I just used the overtime calculator. Could I get the template to tally overtime for all employees plus the Google Sheets file?',
  isian: [
    {
      kunci: 'gajipokok',
      label: 'Monthly base salary (Rp)',
      jenis: 'rupiah',
      awal: 3500000,
    },
    {
      kunci: 'tunjangan',
      label: 'Fixed monthly allowance (Rp)',
      bantuan:
        'Fixed allowances only — the ones that are the same every month and don’t depend on attendance.',
      jenis: 'rupiah',
      awal: 500000,
      opsional: true,
    },
    {
      kunci: 'harilembur',
      label: 'Overtime worked on',
      jenis: 'pilihan',
      awal: 'kerja',
      opsi: [
        { nilai: 'kerja', label: 'An ordinary working day' },
        { nilai: 'libur', label: 'A holiday or weekly rest day' },
      ],
    },
    {
      kunci: 'jam',
      label: 'Number of overtime hours',
      bantuan: 'Enter the overtime hours for a single day.',
      jenis: 'angka',
      awal: 3,
    },
    {
      kunci: 'hari',
      label: 'How many days like this?',
      bantuan: 'To work out the monthly total. Enter 1 if it was only one day.',
      jenis: 'angka',
      awal: 1,
    },
  ],
  hasil: [
    {
      label: 'Monthly wage used as the basis',
      format: 'rupiah',
      hitung: (n) => upahSebulan(n),
    },
    {
      label: 'Overtime pay per hour (1/173 × monthly wage)',
      format: 'rupiah',
      hitung: (n) => upahSebulan(n) / 173,
    },
    {
      label: 'Overtime pay for one day',
      format: 'rupiah',
      utama: true,
      hitung: (n) => hitungLemburSehari(n),
    },
    {
      label: 'Total overtime pay',
      format: 'rupiah',
      utama: true,
      tampilBila: (n) => ang(n.hari) > 1,
      hitung: (n) => hitungLemburSehari(n) * ang(n.hari),
    },
    {
      label: 'Total overtime hours',
      format: 'angka',
      tampilBila: (n) => ang(n.hari) > 1,
      hitung: (n) => ang(n.jam) * ang(n.hari),
    },
  ],
  peringatan: [
    {
      bila: (n) => ang(n.jam) > 4 && String(n.harilembur) === 'kerja',
      nada: 'awas',
      teks:
        'Overtime on a working day is capped at <strong>4 hours a day</strong>. The number of hours you entered goes past that limit. The calculation still shows, but the work schedule is what needs reviewing.',
    },
    {
      bila: (n) => ang(n.jam) * ang(n.hari) > 18,
      nada: 'awas',
      teks:
        'Total overtime goes past <strong>18 hours in a week</strong>. If these hours fall within the same week, the schedule is over the official limit.',
    },
    {
      bila: (n) => upahSebulan(n) > 0 && ang(n.jam) > 0 && ang(n.jam) <= 4,
      nada: 'info',
      teks:
        'The 173 in the formula is the average monthly working hours used as the official basis for hourly pay — not a number we made up.',
    },
  ],
  penjelasan: `
<h2>How to work out overtime pay</h2>
<p>Overtime pay has an official formula that you don't get to invent yourself. It
rests on a single number: <strong>the monthly wage divided by 173</strong>.</p>

<p><code>Overtime pay per hour = 1/173 × monthly wage</code></p>

<p>That 173 isn't random. It is the average number of working hours in a month, used
as a standard divisor so every business works from the same basis.</p>

<h3>What counts as "monthly wage"</h3>
<p>What goes in is <strong>base salary plus fixed allowances</strong>. A fixed
allowance is one that is the same every month and doesn't depend on attendance or
performance — a position allowance, for example.</p>
<p>What does <em>not</em> go in: daily meal and transport money (because those depend
on attendance), bonuses, and other non-fixed allowances.</p>

<h3>The multiplier differs between working days and rest days</h3>
<p>Once you have the hourly rate, the overtime hours are multiplied by a rate that
depends on when the overtime happened:</p>
<ul>
<li><strong>An ordinary working day</strong> — the first hour is × 1.5. Following
hours are × 2.</li>
<li><strong>A holiday or weekly rest day</strong> — the multipliers are larger and
tiered, starting at 2 for the early hours and rising after that.</li>
</ul>
<p>The calculator above already applies these tiers — you only pick working day or
rest day.</p>

<h3>Limits worth watching</h3>
<p>Overtime is capped at <strong>4 hours in a day</strong> and <strong>18 hours in a
week</strong>. If the hours you enter go past that, the calculator shows a warning.
The sum still appears — but it is the work schedule that needs reviewing, not the
arithmetic.</p>

<p>Keep in mind too that overtime needs the employee's agreement and is best
recorded in writing. An overtime instruction that was never written down is the
easiest kind of dispute to avoid.</p>

<h3>Overtime pay is not overtime meal money</h3>
<p>These two get mixed up a lot. Some businesses give extra meal and transport money
to people working overtime — that is <strong>on top of overtime pay</strong>, not a
replacement for it. Handing out meal money and treating the overtime obligation as
settled is a fairly common slip, and it usually only surfaces when an employee asks
about it.</p>

<h3>Why tidy records from the start help</h3>
<p>Working out one person's overtime for one day is easy. What wears you down is
tallying a dozen employees over a month, with a mix of working days and rest days,
then matching it against attendance. That is where mistakes normally appear — not in
the formula.</p>
<p>Record three things every time overtime happens: <strong>who, how many hours, and
what kind of day</strong>. Those three columns are enough to recalculate at any
point, and they are far easier to go through together with an employee if the
numbers ever get questioned. The one most often missing is whether it was a working
day or a rest day — and that is exactly what changes the multiplier.</p>
`,
  faq: [
    {
      tanya: 'Why is overtime pay divided by 173?',
      jawab:
        '<p>173 is the average number of working hours in a month, used as the standard basis for calculating an hourly rate. With the same divisor for everyone, hourly overtime pay can be worked out the same way everywhere and checked by anyone.</p>',
    },
    {
      tanya: 'Do meal and transport money count?',
      jawab:
        '<p>No. Only <strong>base salary and fixed allowances</strong> go in — the ones that are the same every month. Daily meal and transport money depends on attendance, so it counts as a non-fixed allowance and isn’t part of the overtime basis.</p>',
    },
    {
      tanya: 'What is the maximum overtime an employee may work?',
      jawab:
        '<p><strong>A maximum of 4 hours in a day and 18 hours in a week.</strong> These limits exist to protect health and safety at work. The calculator above warns you automatically if the numbers you enter go past them.</p>',
    },
    {
      tanya: 'Is every employee entitled to overtime pay?',
      jawab:
        '<p>Not everyone. Employees whose role is to think, plan, run, or control the business — whose working time can’t be bounded by the clock — are generally excluded, with higher compensation instead. For operational staff, the entitlement applies.</p>',
    },
    {
      tanya: 'Is overtime on a holiday calculated differently?',
      jawab:
        '<p>Yes, the multipliers are larger and tiered. Overtime on an ordinary working day starts at 1.5 for the first hour; on a holiday it starts at 2 and rises for later hours. Just pick the type of day in the calculator — the difference is already applied.</p>',
    },
    {
      tanya: 'How do I tally overtime for a lot of employees?',
      jawab:
        '<p>This page works out one employee in one go. For every employee on one sheet you can reuse each month, message us on WhatsApp — we’ll send you the Google Sheets template.</p>',
    },
  ],
};

/** One day of overtime pay, following the official multiplier tiers. */
function hitungLemburSehari(n: Record<string, number | string>): number {
  const perJam = upahSebulan(n) / 173;
  const jam = ang(n.jam);
  if (jam <= 0 || perJam <= 0) return 0;

  if (String(n.harilembur) === 'libur') {
    // Rest day: first 8 hours ×2, 9th hour ×3, 10th hour onwards ×4.
    const j1 = Math.min(jam, 8);
    const j2 = Math.min(Math.max(jam - 8, 0), 1);
    const j3 = Math.max(jam - 9, 0);
    return perJam * (j1 * 2 + j2 * 3 + j3 * 4);
  }

  // Working day: first hour ×1.5, following hours ×2.
  const j1 = Math.min(jam, 1);
  const j2 = Math.max(jam - 1, 0);
  return perJam * (j1 * 1.5 + j2 * 2);
}

// --- Religious holiday allowance (THR) ---------------------------------------

const thr: Alat = {
  slug: 'thr',
  kelompok: 'karyawan',
  judul: 'THR (Holiday Allowance) Calculator',
  judulPendek: 'Employee THR',
  judulSeo: 'THR Calculator — Pro-Rated by Length of Service | Bedah Data',
  ringkas:
    'Work out THR using the official formula, including the pro-rated amount for employees who haven’t reached a year yet. Plus the total for everyone at once.',
  deskripsi:
    'Employee THR calculator following the official formula: one month’s wage for 12 months’ service or more, pro-rated for 1–11 months. Also totals what you need to set aside.',
  bonusWa:
    'Want THR for every employee on one sheet, plus the Google Sheets file? Tap WhatsApp and I’ll send it over.',
  pesanWa:
    'Hello Bedah Data, I just used the THR calculator. Could I get the template to tally THR for all employees plus the Google Sheets file?',
  isian: [
    {
      kunci: 'gajipokok',
      label: 'Monthly base salary (Rp)',
      jenis: 'rupiah',
      awal: 3500000,
    },
    {
      kunci: 'tunjangan',
      label: 'Fixed monthly allowance (Rp)',
      bantuan:
        'Fixed allowances only — the ones that are the same every month and don’t depend on attendance.',
      jenis: 'rupiah',
      awal: 500000,
      opsional: true,
    },
    {
      kunci: 'masakerja',
      label: 'Length of service (months)',
      bantuan: 'Enter 12 or more if they have completed a full year.',
      jenis: 'angka',
      awal: 12,
    },
    {
      kunci: 'jumlahkaryawan',
      label: 'Number of employees in the same situation',
      bantuan: 'To see the total you need to set aside. Enter 1 for a single person.',
      jenis: 'angka',
      awal: 1,
    },
  ],
  hasil: [
    {
      label: 'Monthly wage used as the basis',
      format: 'rupiah',
      hitung: (n) => upahSebulan(n),
    },
    {
      label: 'Portion of service counted',
      format: 'teks',
      tampilBila: (n) => ang(n.masakerja) < 12,
      hitung: (n) => `${ang(n.masakerja)} ÷ 12 months`,
    },
    {
      label: 'THR per employee',
      format: 'rupiah',
      utama: true,
      hitung: (n) => hitungThr(n),
    },
    {
      label: 'Total THR to set aside',
      format: 'rupiah',
      utama: true,
      tampilBila: (n) => ang(n.jumlahkaryawan) > 1,
      hitung: (n) => hitungThr(n) * ang(n.jumlahkaryawan),
    },
  ],
  peringatan: [
    {
      bila: (n) => ang(n.masakerja) > 0 && ang(n.masakerja) < 1,
      nada: 'info',
      teks:
        'Less than one full month of service generally does not create a THR entitlement yet. Double-check the start date.',
    },
    {
      bila: (n) => ang(n.masakerja) >= 1 && ang(n.masakerja) < 12,
      nada: 'info',
      teks:
        'Service is under a full year, so THR is worked out <strong>pro-rata</strong> — in proportion to time worked, not a full month’s wage.',
    },
  ],
  penjelasan: `
<h2>How to work out employee THR</h2>
<p>THR has an official formula that is fairly simple, and only one thing changes the
answer: <strong>whether the employee has completed 12 months or not</strong>.</p>

<h3>12 months of service or more</h3>
<p><code>THR = 1 month's wage</code></p>
<p>An employee who has worked a full year or longer receives one month's wage as
THR. It does not grow with years of service — unless your business chooses to give
more, which is allowed.</p>

<h3>1 to 11 months of service</h3>
<p><code>THR = (months of service ÷ 12) × 1 month's wage</code></p>
<p>An employee who hasn't reached a full year is still entitled to THR, worked out
<strong>pro-rata</strong> — in proportion to time worked. An example calculation:
6 months of service on a wage of Rp 4,000,000 gives (6 ÷ 12) × Rp 4,000,000 =
Rp 2,000,000.</p>

<h3>What "wage" means here</h3>
<p>The same as with overtime: <strong>base salary plus fixed allowances</strong>. A
fixed allowance is one that is the same every month and doesn't depend on
attendance. Daily meal and transport money is not included.</p>

<h3>When THR has to be paid</h3>
<p>THR must be paid <strong>at the latest 7 days before the religious holiday</strong>,
and paid in full — it can't be spread out in instalments. This is what catches small
businesses out: the obligation lands for everyone at once, in a month that usually
has plenty of other spending too.</p>

<h3>Why it pays to work this out early</h3>
<p>The hard part isn't the formula — the formula is two lines. The hard part is
<strong>having the money ready</strong>. If you have 10 employees on an average wage
of Rp 4 million, the THR obligation is around Rp 40 million going out at once inside
one week.</p>
<p>That's why this calculator has a field for the number of employees: so you can
see the total now, rather than a week before the holiday. If your employees are on
different wages, run the calculator once per wage group and add the totals.</p>

<h3>Setting a little aside each month is far lighter</h3>
<p>Once you know your total THR obligation, dividing it across twelve months turns
one big payment into a small figure you barely feel. This is plain arithmetic —
total divided by 12 — but the difference to cash flow is real: setting aside from
the start of the year asks nothing of your cash in the holiday month, which is
usually the busiest month with the most other spending.</p>

<h3>What changes as headcount grows</h3>
<p>For three employees on the same wage, this is a one-minute job. What makes it
harder is when everyone's length of service differs — some past a year, some who
joined five months ago — so each person has their own pro-rata figure. At that point
what you need isn't a cleverer calculator but <strong>tidy records of start
dates</strong>. Without those, the pro-rata number is only a guess.</p>
`,
  faq: [
    {
      tanya: 'Does an employee with only 3 months of service get THR?',
      jawab:
        '<p>Yes. Employees with <strong>one full month of service or more</strong> are already entitled, worked out pro-rata: (months of service ÷ 12) × one month’s wage. For 3 months of service, that means 3/12, or a quarter of one month’s wage.</p>',
    },
    {
      tanya: 'Is THR based on base salary alone or does it include allowances?',
      jawab:
        '<p>On <strong>base salary plus fixed allowances</strong>. A fixed allowance is one that is the same every month regardless of attendance, such as a position allowance. Daily meal and transport money isn’t counted, because it depends on attendance.</p>',
    },
    {
      tanya: 'What is the deadline for paying THR?',
      jawab:
        '<p><strong>At the latest 7 days before the religious holiday</strong>, and it must be paid in full — no instalments. Because the obligation lands all at once, it is worth working out the total well ahead so funding it isn’t a last-minute scramble.</p>',
    },
    {
      tanya: 'Do contract and daily workers get THR too?',
      jawab:
        '<p>The THR entitlement applies to permanent and contract employees alike, as long as service has reached one full month. Only the amount differs, because it follows each person’s service and wage.</p>',
    },
    {
      tanya: 'What if an employee resigns before the holiday?',
      jawab:
        '<p>For employees whose employment ends within a certain window before the holiday, the rules vary depending on the type of employment relationship and why it ended. This is best checked against the applicable regulations or with your local labour office, because the cases vary.</p>',
    },
    {
      tanya: 'How do I work out THR when everyone is on a different wage?',
      jawab:
        '<p>Run this calculator once per wage group, then add the totals. If you want everyone worked out on one sheet in one go, message us on WhatsApp — we’ll send you the Google Sheets template.</p>',
    },
  ],
};

function hitungThr(n: Record<string, number | string>): number {
  const upah = upahSebulan(n);
  const masa = ang(n.masakerja);
  if (upah <= 0 || masa < 1) return 0;
  if (masa >= 12) return upah;
  return (masa / 12) * upah;
}

// ============================================================================
// GROUP 2 — SELLING ONLINE
// ============================================================================

// 🔴 MARKETPLACE FEES — MUST CARRY A DATE AND A SOURCE (spec §4a).
//    These numbers CHANGE. Review every 3 months; stale fees = wrong information.
export const TARIF_DITINJAU_EN = 'August 2026';

const KATEGORI_BIAYA: { nilai: string; label: string }[] = [
  { nilai: '10', label: 'Fashion, FMCG & lifestyle (10%)' },
  { nilai: '9.5', label: 'Electronics & home goods (9.5%)' },
  { nilai: '6.75', label: 'Hobbies, sports & automotive (6.75%)' },
  { nilai: '5.25', label: 'Bulky & specialist goods (5.25%)' },
  { nilai: '4.25', label: 'Low-fee categories (4.25%)' },
  { nilai: '2.5', label: 'Special categories (2.5%)' },
];

const hargaMarketplace: Alat = {
  slug: 'harga-jual-marketplace',
  kelompok: 'jualan-online',
  judul: 'Marketplace Selling Price Calculator',
  judulPendek: 'Marketplace Selling Price',
  judulSeo:
    'Marketplace Admin Fee Calculator — Shopee, Tokopedia & TikTok Shop | Bedah Data',
  ringkas:
    'Work out the marketplace admin fee and how much money actually reaches you from one sale.',
  deskripsi:
    'Marketplace admin fee calculator: work out Shopee, Tokopedia, and TikTok Shop deductions, then see what actually lands in your account from one sale.',
  sumber: `Fees checked in ${TARIF_DITINJAU_EN}. 🔴 Marketplace admin fees change over time and differ by category — check the current rates in each platform's seller help centre before you set your prices.`,
  bonusWa:
    'Want all 3 platforms compared side by side on one sheet, plus the Google Sheets file? Tap WhatsApp and I’ll send it over.',
  pesanWa:
    'Hello Bedah Data, I just used the marketplace selling price calculator. Could I get the 3-platform comparison plus the Google Sheets file?',
  isian: [
    {
      kunci: 'platform',
      label: 'Platform',
      jenis: 'pilihan',
      awal: 'shopee',
      opsi: [
        { nilai: 'shopee', label: 'Shopee' },
        { nilai: 'tokopedia', label: 'Tokopedia / TikTok Shop' },
      ],
    },
    {
      kunci: 'kategori',
      label: 'Product category',
      bantuan: 'Pick the closest match — the percentage differs by category.',
      jenis: 'pilihan',
      awal: '10',
      opsi: KATEGORI_BIAYA,
    },
    {
      kunci: 'harga',
      label: 'Listed selling price (Rp)',
      jenis: 'rupiah',
      awal: 150000,
    },
    {
      kunci: 'hpp',
      label: 'Cost per item (Rp)',
      bantuan: 'What one item costs you to buy or to make.',
      jenis: 'rupiah',
      awal: 90000,
    },
    {
      kunci: 'ongkir',
      label: 'Shipping you cover (Rp)',
      bantuan: 'Enter 0 if the buyer pays the shipping in full.',
      jenis: 'rupiah',
      awal: 0,
      opsional: true,
    },
    {
      kunci: 'iklan',
      label: 'Ad cost per sale (Rp)',
      bantuan: 'If you use in-platform ads. You can leave this blank.',
      jenis: 'rupiah',
      awal: 0,
      opsional: true,
    },
  ],
  hasil: [
    {
      label: 'Platform admin fee',
      format: 'rupiah',
      hitung: (n) => biayaAdmin(n),
    },
    {
      label: 'Admin fee as a percentage of the selling price',
      format: 'persen',
      hitung: (n) => {
        const h = ang(n.harga);
        return h > 0 ? (biayaAdmin(n) / h) * 100 : 0;
      },
    },
    {
      label: 'Total deductions (admin + shipping + ads)',
      format: 'rupiah',
      hitung: (n) => biayaAdmin(n) + ang(n.ongkir) + ang(n.iklan),
    },
    {
      label: 'Money that actually reaches you',
      format: 'rupiah',
      utama: true,
      hitung: (n) =>
        ang(n.harga) - biayaAdmin(n) - ang(n.ongkir) - ang(n.iklan),
    },
    {
      label: 'What is left after cost of goods',
      format: 'rupiah',
      utama: true,
      hitung: (n) =>
        ang(n.harga) - biayaAdmin(n) - ang(n.ongkir) - ang(n.iklan) - ang(n.hpp),
    },
    {
      label: 'That amount as a percentage of the selling price',
      format: 'persen',
      hitung: (n) => {
        const h = ang(n.harga);
        if (h <= 0) return 0;
        return (
          ((h - biayaAdmin(n) - ang(n.ongkir) - ang(n.iklan) - ang(n.hpp)) / h) * 100
        );
      },
    },
  ],
  peringatan: [
    {
      bila: (n) =>
        ang(n.harga) > 0 &&
        ang(n.harga) - biayaAdmin(n) - ang(n.ongkir) - ang(n.iklan) - ang(n.hpp) < 0,
      nada: 'awas',
      teks:
        'With the numbers you entered, the result is <strong>negative</strong> — the money you receive is less than what the item cost you. Check the selling price, the cost per item, and the shipping you cover.',
    },
    {
      bila: (n) => biayaAdminMentah(n) > 650000,
      nada: 'info',
      teks:
        'At this value the admin fee percentage has passed the maximum deduction per item, so the cap is what applies. 🔴 That cap changes over time — confirm it in the platform’s seller help centre.',
    },
  ],
  penjelasan: `
<h2>How to work out marketplace admin fees</h2>
<p>The price on your listing is not the money that lands in your account. The
marketplace takes an admin fee from every sale, and how big it is depends on the
product category.</p>

<p><code>Money received = selling price − admin fee − shipping you cover − ad cost</code></p>

<h3>Admin fees differ by category</h3>
<p>This is what trips sellers up: the admin fee isn't one number for everything.
Categories like fashion and FMCG carry the highest percentages, while certain
categories are far lower. The gap between the highest and lowest category can be
more than double.</p>
<p>Which means <strong>one margin can't cover all your products</strong> if they sit
in different categories.</p>

<h3>There is a maximum deduction per item</h3>
<p>The admin fee doesn't rise forever with the price. There is a maximum per item,
and once the percentage passes that value, the cap is what applies.</p>
<p><strong>This matters for expensive goods.</strong> That cap has been raised
considerably in the past, and the increase hit high-priced items directly —
deductions that used to stop at a small figure can now be much larger. If you sell
expensive goods and haven't recalculated since that change, your old margin figures
are probably out of date.</p>

<h3>What people forget to include</h3>
<p><strong>Shipping you cover.</strong> Free-shipping programmes look like they lift
sales, but part of the shipping is often carried by the seller. Put the number in;
don't wave it away.</p>
<p><strong>In-platform ad spend.</strong> If you run ads, divide your total ad spend
by the number of sales it produced, then enter the result as the cost per sale.</p>
<p><strong>Packaging and packing labour.</strong> This calculator has no field for
it, but you can fold it into the cost per item so it gets counted.</p>

<h3>Fees change — don't use old numbers</h3>
<p>Marketplace admin fees get reviewed and changed by the platforms from time to
time. The numbers in this calculator were checked in ${TARIF_DITINJAU_EN}, and
<strong>you still need to check them yourself</strong> in each platform's seller
help centre before setting your prices. This calculator works from the numbers you
put in — it is exactly as accurate as they are.</p>
`,
  faq: [
    {
      tanya: 'What are Shopee and Tokopedia admin fees right now?',
      jawab: `<p>They differ by product category, from around 2.5% for special categories up to around 10% for categories like fashion and FMCG. The figures this calculator uses were checked in ${TARIF_DITINJAU_EN}. <strong>These fees change over time</strong> — always check the platform's seller help centre before setting your prices.</p>`,
    },
    {
      tanya: 'Why is the money I receive smaller than the selling price?',
      jawab:
        '<p>Because several deductions happen at once: the platform admin fee, the shipping you cover if you join a free-shipping programme, and ad costs if your product is advertised. The calculator above splits all three so you can see which one eats the most.</p>',
    },
    {
      tanya: 'Is there a maximum admin fee per item?',
      jawab:
        '<p>Yes. The deduction doesn’t keep rising with the price — there is a maximum per item, and once the percentage passes it, the cap is what applies. This matters most for expensive goods, and the cap has been raised considerably in the past. If you sell high-priced items, recalculate your margins.</p>',
    },
    {
      tanya: 'How do I set a selling price that doesn’t lose money?',
      jawab:
        '<p>Start from your cost per item, then add every deduction that will happen: the admin fee, the shipping you cover, and ad costs. Only then add the share you want to keep. The calculator above works from the other direction — you enter a selling price and see what is left. Try a few prices until what remains makes sense to you.</p>',
    },
    {
      tanya: 'How do I enter the ad cost?',
      jawab:
        '<p>Divide your total ad spend by the number of sales those ads produced, then enter the result as the ad cost per sale. For example, Rp 500,000 of ad spend that produced 25 sales works out to Rp 20,000 per sale.</p>',
    },
    {
      tanya: 'Can I compare several platforms at once?',
      jawab:
        '<p>This page works out one platform in one go — you can switch and run it again. If you want several platforms side by side on one sheet, message us on WhatsApp and we’ll send you the Google Sheets template.</p>',
    },
  ],
};

/** Admin fee before the maximum cap is applied. */
function biayaAdminMentah(n: Record<string, number | string>): number {
  return ang(n.harga) * (ang(n.kategori) / 100);
}

/**
 * Admin fee after taking the per-item maximum into account.
 * 🔴 This cap changes over time — see the source note on the page.
 */
const BATAS_ADMIN = 650000;
function biayaAdmin(n: Record<string, number | string>): number {
  return Math.min(biayaAdminMentah(n), BATAS_ADMIN);
}

// --- Margin ------------------------------------------------------------------

const margin: Alat = {
  slug: 'margin',
  kelompok: 'jualan-online',
  judul: 'Margin & Markup Calculator',
  judulPendek: 'Margin & Markup',
  judulSeo: 'Margin and Markup Calculator — Works Both Ways | Bedah Data',
  ringkas:
    'Work out margin and markup from your cost and selling price — or the other way round, set the selling price from the margin you want.',
  deskripsi:
    'Margin and markup calculator: work out margin from cost and selling price, or set a selling price from a target margin. Includes a plain explanation of margin vs markup.',
  bonusWa:
    'Want the margin on every product worked out at once, plus the Google Sheets file? Tap WhatsApp and I’ll send it over.',
  pesanWa:
    'Hello Bedah Data, I just used the margin calculator. Could I get the template that works out margin for all my products plus the Google Sheets file?',
  isian: [
    {
      kunci: 'arah',
      label: 'What you want to work out',
      jenis: 'pilihan',
      awal: 'darihargajual',
      opsi: [
        { nilai: 'darihargajual', label: 'I know the selling price → find the margin' },
        { nilai: 'darimargin', label: 'I know the margin I want → find the selling price' },
      ],
    },
    {
      kunci: 'hpp',
      label: 'Cost per item (Rp)',
      bantuan: 'What one item costs you to buy or make, packaging included.',
      jenis: 'rupiah',
      awal: 60000,
    },
    {
      kunci: 'hargajual',
      label: 'Selling price (Rp)',
      jenis: 'rupiah',
      awal: 100000,
      tampilBila: { kunci: 'arah', nilai: ['darihargajual'] },
    },
    {
      kunci: 'marginTarget',
      label: 'Margin you want (%)',
      bantuan: 'What percentage of the selling price you want to keep.',
      jenis: 'persen',
      awal: 40,
      tampilBila: { kunci: 'arah', nilai: ['darimargin'] },
    },
  ],
  hasil: [
    {
      label: 'Selling price',
      format: 'rupiah',
      utama: true,
      tampilBila: (n) => String(n.arah) === 'darimargin',
      hitung: (n) => {
        const m = ang(n.marginTarget);
        if (m >= 100) return 0;
        return ang(n.hpp) / (1 - m / 100);
      },
    },
    {
      label: 'Gross profit per item',
      format: 'rupiah',
      utama: true,
      hitung: (n) => hargaJualMargin(n) - ang(n.hpp),
    },
    {
      label: 'Margin (of the selling price)',
      format: 'persen',
      utama: true,
      hitung: (n) => {
        const h = hargaJualMargin(n);
        return h > 0 ? ((h - ang(n.hpp)) / h) * 100 : 0;
      },
    },
    {
      label: 'Markup (of the cost)',
      format: 'persen',
      hitung: (n) => {
        const hpp = ang(n.hpp);
        return hpp > 0 ? ((hargaJualMargin(n) - hpp) / hpp) * 100 : 0;
      },
    },
  ],
  peringatan: [
    {
      bila: (n) => hargaJualMargin(n) > 0 && hargaJualMargin(n) < ang(n.hpp),
      nada: 'awas',
      teks:
        'The selling price is below the cost per item — with these numbers, every item sold adds to the loss. Check the figures again.',
    },
    {
      bila: (n) => String(n.arah) === 'darimargin' && ang(n.marginTarget) >= 100,
      nada: 'awas',
      teks:
        'Margin can’t be 100% or more. Margin is a share of the selling price, so it is always below 100%. If what you mean is multiplying your cost, that is <strong>markup</strong> — see the explanation below.',
    },
  ],
  penjelasan: `
<h2>The difference between margin and markup</h2>
<p>These two get mixed up a lot, and mixing them up is expensive. Both measure the
same difference, but they <strong>divide it by different numbers</strong>.</p>

<p><code>Margin = (selling price − cost) ÷ selling price</code><br>
<code>Markup = (selling price − cost) ÷ cost</code></p>

<p>An example calculation to make it plain. Cost Rp 60,000, sold for Rp 100,000. The
difference is Rp 40,000.</p>
<ul>
<li><strong>Margin</strong> = 40,000 ÷ 100,000 = <strong>40%</strong></li>
<li><strong>Markup</strong> = 40,000 ÷ 60,000 = <strong>67%</strong></li>
</ul>

<p>Same item, same difference — but the number is 40% or 67% depending on how you
divide it. You can check that arithmetic yourself from those figures.</p>

<h3>The mistake people make most</h3>
<p>Someone wants a 40% margin, so they raise the price 40% above cost. Rp 60,000
plus 40% is Rp 84,000. But the actual margin at that price is
(84,000 − 60,000) ÷ 84,000 = <strong>28.6%</strong>, not 40%.</p>
<p>To genuinely get a 40% margin, the price has to be Rp 100,000. That is what the
second option in the calculator above is for: enter the margin you want, and the
selling price is worked out for you.</p>

<h3>Margin or markup — which should you use?</h3>
<p><strong>Margin</strong> is more useful for reading the health of the business,
because it sits on the selling price — the same number that shows up in your
revenue. If your average margin is 30%, then out of every Rp 100,000 of sales,
Rp 30,000 is left before operating costs.</p>
<p><strong>Markup</strong> is more practical when you're setting prices on the shop
floor, because you work forward from a cost you already know.</p>
<p>This calculator shows both at once so you don't have to choose.</p>

<h3>What belongs in your cost per item</h3>
<p>Not just the purchase price. Include packaging, inbound shipping from your
supplier, and any other cost that attaches directly to that item. A cost figure
that is too low makes the margin look healthy when it isn't.</p>
<p>What does <em>not</em> belong: rent, fixed salaries, electricity, and other
operating costs that go out whether or not anything sells. Those get subtracted
later from gross profit, not from each item.</p>

<h3>Margin per item is not the margin of your business</h3>
<p>This is the most misleading part. A 40% margin per item sounds healthy, but that
figure is <strong>before operating costs</strong>. If gross profit for the month is
Rp 12 million while rent, wages, and electricity take Rp 10 million, what is really
left is Rp 2 million — however good the per-item margin looks.</p>
<p>So after you know the margin per product, work out one more thing:
<strong>how much gross profit you need to gather in a month</strong> to cover all
your fixed costs. From there you can see how many items have to sell — and whether
the margin is genuinely enough.</p>

<h3>The item that sells best isn't always the one carrying you</h3>
<p>A thin-margin item can sell the most and still contribute little, while a
slow-moving item with a fat margin contributes more. What decides it isn't units
sold but <strong>gross profit per item multiplied by how many sold</strong>. Working
out margins one at a time, as on this page, is the first step to seeing that.</p>
`,
  faq: [
    {
      tanya: 'What is the difference between margin and markup?',
      jawab:
        '<p>Same difference, different divisor. <strong>Margin</strong> is divided by the selling price, <strong>markup</strong> by the cost. A Rp 60,000 item sold for Rp 100,000 gives a 40% margin but a 67% markup — one number read two ways. The calculator above shows both at once.</p>',
    },
    {
      tanya: 'Why can’t margin be 100%?',
      jawab:
        '<p>Because margin is a share of the selling price. A 100% margin would mean the entire selling price is profit and the item cost nothing — impossible as long as the item costs you something. If you want a selling price at double your cost, that is a 100% markup, which equals a 50% margin.</p>',
    },
    {
      tanya: 'What goes into the cost per item?',
      jawab:
        '<p>Every cost that attaches directly to one item: the purchase price, packaging, and inbound shipping from your supplier. What does <strong>not</strong> go in is anything that goes out whether or not you sell — rent, fixed wages, electricity. Those come off gross profit, not off each item.</p>',
    },
    {
      tanya: 'What is a healthy margin for a small business?',
      jawab:
        '<p>It varies enormously between types of business — a wholesale shop running on volume reasonably works far thinner than a service business. More useful than comparing yourself to someone else’s number: make sure your gross profit covers all your monthly operating costs. If it doesn’t, the margin is too thin for your own business, whatever the figure says.</p>',
    },
    {
      tanya: 'How do I work out a selling price from the margin I want?',
      jawab:
        '<p>Pick the second option in the calculator ("I know the margin I want"), enter your cost and target margin, and the selling price appears. The formula: <code>selling price = cost ÷ (1 − margin)</code>. 🔴 Don’t just raise the cost by the margin percentage — you’ll land short.</p>',
    },
    {
      tanya: 'Can I work out a lot of products at once?',
      jawab:
        '<p>This page works out one product in one go and saves nothing. To run your whole product list on one sheet, message us on WhatsApp — we’ll send you the Google Sheets template.</p>',
    },
  ],
};

function hargaJualMargin(n: Record<string, number | string>): number {
  if (String(n.arah) === 'darimargin') {
    const m = ang(n.marginTarget);
    if (m >= 100) return 0;
    return ang(n.hpp) / (1 - m / 100);
  }
  return ang(n.hargajual);
}

// --- Free shipping threshold -------------------------------------------------

const ambangOngkir: Alat = {
  slug: 'ambang-gratis-ongkir',
  kelompok: 'jualan-online',
  judul: 'Free Shipping Threshold Calculator',
  judulPendek: 'Free Shipping Threshold',
  judulSeo:
    'Free Shipping Minimum Order Calculator — Where Is the Safe Line | Bedah Data',
  ringkas:
    'Work out the minimum order value you need so the shipping you cover is still covered by your gross profit.',
  deskripsi:
    'Free shipping threshold calculator: work out the minimum order so the shipping you cover is still covered by gross profit. Plain arithmetic on your own numbers.',
  bonusWa:
    'Want several free-shipping scenarios worked out at once, plus the Google Sheets file? Tap WhatsApp and I’ll send it over.',
  pesanWa:
    'Hello Bedah Data, I just used the free shipping threshold calculator. Could I get the template for it plus the Google Sheets file?',
  isian: [
    {
      kunci: 'ongkir',
      label: 'Shipping you cover per order (Rp)',
      jenis: 'rupiah',
      awal: 20000,
    },
    {
      kunci: 'margin',
      label: 'Your average margin (%)',
      bantuan:
        'What percentage of the order value is left as gross profit. Not sure? Work it out in the margin calculator first.',
      jenis: 'persen',
      awal: 30,
    },
    {
      kunci: 'sisamargin',
      label: 'Margin you want to keep (%)',
      bantuan:
        'The share you want left after covering the shipping. Enter 0 if you just want the break-even point.',
      jenis: 'persen',
      awal: 15,
      opsional: true,
    },
    {
      kunci: 'aov',
      label: 'Your current average order value (Rp)',
      bantuan: 'For comparison. You can leave this blank.',
      jenis: 'rupiah',
      awal: 0,
      opsional: true,
    },
  ],
  hasil: [
    {
      label: 'Minimum order threshold',
      format: 'rupiah',
      utama: true,
      hitung: (n) => ambangMinimum(n),
    },
    {
      label: 'Break-even — shipping exactly covered by gross profit',
      format: 'rupiah',
      hitung: (n) => {
        const m = ang(n.margin);
        return m > 0 ? ang(n.ongkir) / (m / 100) : 0;
      },
    },
    {
      label: 'Gross profit at that threshold',
      format: 'rupiah',
      hitung: (n) => ambangMinimum(n) * (ang(n.margin) / 100),
    },
    {
      label: 'What is left after covering shipping',
      format: 'rupiah',
      hitung: (n) => ambangMinimum(n) * (ang(n.margin) / 100) - ang(n.ongkir),
    },
    {
      label: 'Gap from your current average order',
      format: 'rupiah',
      tampilBila: (n) => ang(n.aov) > 0,
      hitung: (n) => ambangMinimum(n) - ang(n.aov),
    },
  ],
  peringatan: [
    {
      bila: (n) => ang(n.sisamargin) >= ang(n.margin) && ang(n.margin) > 0,
      nada: 'awas',
      teks:
        'The margin you want to keep is the same as or larger than your own margin — with those numbers the threshold can’t be worked out. Lower the margin you want to keep.',
    },
    {
      bila: (n) => ang(n.aov) > 0 && ambangMinimum(n) > ang(n.aov) * 2,
      nada: 'info',
      teks:
        'The threshold works out to more than double your current average order. The arithmetic is right, but a threshold far above what buyers usually spend tends to be reached rarely.',
    },
  ],
  penjelasan: `
<h2>How to work out a free shipping threshold</h2>
<p>Free shipping isn't actually free — the shipping still gets paid, it just moves
onto you. What decides whether that makes sense is one question: <strong>is the
gross profit on that order still enough to cover the shipping you're
carrying?</strong></p>

<h3>The break-even point</h3>
<p>The order value where gross profit exactly equals the shipping:</p>
<p><code>Break-even = shipping ÷ margin</code></p>
<p>An example calculation: Rp 20,000 shipping at a 30% margin gives a break-even of
20,000 ÷ 0.30 = Rp 66,667. At that value, all your gross profit goes on shipping —
no loss, but nothing left either.</p>

<h3>The threshold you actually need</h3>
<p>Which is why break-even alone isn't enough. You need to decide what share you
still want left after covering the shipping:</p>
<p><code>Threshold = shipping ÷ (margin − margin you want to keep)</code></p>
<p>Continuing the example: with a 30% margin and wanting to keep 15%, the threshold
becomes 20,000 ÷ (0.30 − 0.15) = Rp 133,333. So a minimum order of around
Rp 133,000 and up.</p>

<h3>Why not just copy another shop's minimum</h3>
<p>The minimum order another shop uses was worked out from <em>their</em> margin and
<em>their</em> shipping. If your margin is thinner or your shipping costs more
because of where you are, the same number can make every order eat into your
profit.</p>

<h3>What to check before you set it</h3>
<p><strong>Compare it with what your buyers actually do.</strong> A threshold far
above the order values that normally occur tends to be reached rarely. That is why
this calculator has a field for your current average order — so the gap is
visible.</p>

<p><strong>Your shipping isn't one number.</strong> Sending within the city and
sending across islands cost very different amounts. If you set one threshold for
every destination, use a weighted average, or the destination you ship to most —
not the cheapest one.</p>

<p><strong>Margins differ per product.</strong> The margin figure you enter here
should be your average margin, not the margin on your best product. If you don't
know it yet, work it out first in the <a href="/alat/jualan-online/margin/">margin
calculator</a>.</p>

<p>This calculator only does arithmetic on the numbers you enter yourself. What
happens to your sales after you set a threshold depends on plenty of things outside
this sum — so set the number, then watch what happens for yourself.</p>
`,
  faq: [
    {
      tanya: 'What is the right minimum order for free shipping?',
      jawab:
        '<p>There is no figure that fits every shop, because it depends on your own margin and shipping cost. The formula: <code>shipping ÷ (margin − margin you want to keep)</code>. Don’t copy another shop’s number — their margin and shipping are different from yours.</p>',
    },
    {
      tanya: 'What is the free shipping break-even point?',
      jawab:
        '<p>The order value where gross profit is exactly used up covering the shipping — no loss, but nothing left either. The formula is <code>shipping ÷ margin</code>. Setting your threshold right at that point means every free-shipping order gives you nothing, so the threshold is usually placed above it.</p>',
    },
    {
      tanya: 'Which margin should I enter?',
      jawab:
        '<p>Your <strong>average</strong> margin, not the margin on your most profitable product. Using your best margin makes the threshold look lower than what is actually safe. Don’t know the figure? Work it out first in the <a href="/alat/jualan-online/margin/">margin calculator</a>.</p>',
    },
    {
      tanya: 'My shipping cost varies by destination — what then?',
      jawab:
        '<p>Use the destination you ship to <strong>most often</strong>, or a weighted average — not the cheapest. If the gap between destinations is very wide, some shops set different thresholds per region instead of one number for everywhere.</p>',
    },
    {
      tanya: 'Does free shipping always lift sales?',
      jawab:
        '<p>This calculator can’t answer that, and we won’t guess. The only thing it works out is one thing: at what order value the shipping you cover is still covered by gross profit. What happens to the number of orders afterwards depends on your products, your prices, and your buyers — watch the numbers once it is running.</p>',
    },
    {
      tanya: 'What if the result feels too high?',
      jawab:
        '<p>Then your shipping is large relative to your margin. Three options: lower the share you want to keep, cover only part of the shipping rather than all of it, or fix the margin first. Setting a threshold below the calculated figure means you are knowingly carrying the difference — which is fine, as long as it is deliberate.</p>',
    },
  ],
};

function ambangMinimum(n: Record<string, number | string>): number {
  const m = ang(n.margin) / 100;
  const sisa = ang(n.sisamargin) / 100;
  const beda = m - sisa;
  if (beda <= 0) return 0;
  return ang(n.ongkir) / beda;
}

// ============================================================================
// GROUP 3 — DOCUMENTS
// ============================================================================
// 🔵 The receipt generator does NOT use the calculator engine — it has a
//    different shape (item list + print). Its page stands alone, but it is
//    still listed here so it appears in the /alat/ index.

export const NOTA_EN: Pick<
  Alat,
  'slug' | 'kelompok' | 'judul' | 'judulPendek' | 'judulSeo' | 'ringkas' | 'deskripsi' | 'faq' | 'penjelasan' | 'bonusWa' | 'pesanWa'
> = {
  slug: 'nota',
  kelompok: 'dokumen',
  judul: 'Receipt & Invoice Generator',
  judulPendek: 'Receipt Generator',
  judulSeo: 'Free Receipt & Invoice Generator — Print Straight to PDF | Bedah Data',
  ringkas:
    'Fill in the details, the receipt comes out tidy, then save it as a PDF. No sign-up, and your data isn’t sent anywhere.',
  deskripsi:
    'Free receipt and invoice generator: fill in your shop details and item list, then save it as a PDF. Works on phone and computer, no sign-up needed.',
  bonusWa:
    'Want receipt numbers that run in sequence on their own, with the history kept tidy? Tap WhatsApp and I’ll walk you through it.',
  pesanWa:
    'Hello Bedah Data, I just used the receipt generator. Could I ask about receipts that number themselves in sequence and keep a history?',
  penjelasan: `
<h2>How to make a proper receipt</h2>
<p>A receipt isn't just a note of what is owed. It is proof of a transaction — and if
it's missing things, you are the one who deals with the trouble when there is a
discrepancy or a complaint.</p>

<h3>What a receipt must have</h3>
<ul>
<li><strong>Your business details</strong> — name, address, and a number people can
reach you on. Without these, your customer can't use the receipt as proof.</li>
<li><strong>A receipt number</strong> — so it can be found again. This is the one
most often skipped, and the one that causes the most trouble later.</li>
<li><strong>The transaction date</strong> — it matters for warranties and
returns.</li>
<li><strong>Item or service details</strong> — name, quantity, unit price, and line
total. Clear detail prevents arguments afterwards.</li>
<li><strong>The total due</strong> — after any discount and tax.</li>
</ul>

<h3>Why numbering matters</h3>
<p>The receipt number is the only way to find one transaction among hundreds of
others. Without numbers that run in sequence, matching payments to sales turns into
digging through a pile of paper.</p>
<p>Use a simple, consistent pattern — year-month-sequence, for instance. What
matters is that <strong>no number is duplicated</strong> and none is skipped without
a reason.</p>

<h3>Discounts and tax</h3>
<p>Write a discount as its own line rather than quietly lowering the unit price. The
customer needs to see the original price, and you need to know how much discount you
have actually given this month.</p>
<p>If your business collects tax, show it separately from the value of the goods.
Rolling the two together makes your own records hard to pull apart later.</p>

<h3>Keep a copy</h3>
<p>A receipt handed to a customer is no use to you if there is no copy. Keep the PDF
in one tidy folder — it is far easier to search than a receipt book, and it can't
get soaked or slipped behind something.</p>

<h3>When this approach stops being enough</h3>
<p>Making receipts one at a time, like on this page, is fine for a handful of
transactions a day. What changes as transactions grow: the numbers need to run by
themselves, stock needs to come down as goods sell, and customer credit needs to be
recorded without being worked out by hand. At that point a receipt maker on its own
isn't enough — what you need is a system that connects receipts to stock and to your
books.</p>
`,
  faq: [
    {
      tanya: 'Is what I type saved or sent to Bedah Data?',
      jawab:
        '<p><strong>No.</strong> The whole thing runs inside your own browser. Nothing is sent to our servers — we can’t see your shop name, your customer names, or any figure you type. If you close or refresh the page, the contents are gone entirely.</p>',
    },
    {
      tanya: 'How do I save it as a PDF?',
      jawab:
        '<p>Press the "Save / Print PDF" button. Your browser’s print window opens — choose <strong>"Save as PDF"</strong> as the destination (not a printer name), then save. On a phone, that option usually appears as "Save as PDF" in the print menu.</p>',
    },
    {
      tanya: 'Does it work on a phone?',
      jawab:
        '<p>It does. The fields and the receipt preview adapt to a phone screen, and saving to PDF uses the browser’s built-in print feature. Filling it in on a wider screen is more comfortable for the tidiest result — but both produce the same PDF.</p>',
    },
    {
      tanya: 'Can I add my shop logo?',
      jawab:
        '<p>Yes. Click the logo field and pick an image file from your device. The image is only loaded inside your browser to show on the receipt — like everything else, it isn’t sent anywhere.</p>',
    },
    {
      tanya: 'Do receipt numbers run in sequence automatically?',
      jawab:
        '<p>Not yet. This page makes one receipt at a time and keeps no history, so you fill in the number yourself. Automatic sequential numbering needs a system that stores data — if your business has reached that point, get in touch on WhatsApp.</p>',
    },
    {
      tanya: 'Is a receipt from here valid to use?',
      jawab:
        '<p>This receipt carries the elements normally found on proof of a transaction: business details, a number, a date, item details, and a total. For ordinary buying and selling, that is adequate. If your business has particular tax obligations, there are documents with a specific format governed separately — for that, check the applicable rules directly.</p>',
    },
  ],
};

// --- All tools ---------------------------------------------------------------

export const ALAT_EN: Alat[] = [
  komisiBengkel,
  komisiSalon,
  komisiSales,
  lembur,
  thr,
  hargaMarketplace,
  margin,
  ambangOngkir,
];

/** Every tool including the one that doesn't use the calculator engine. */
export const SEMUA_ALAT_EN = [
  ...ALAT_EN.map((a) => ({
    slug: a.slug,
    kelompok: a.kelompok,
    judulPendek: a.judulPendek,
    ringkas: a.ringkas,
    href: `/alat/${a.kelompok}/${a.slug}/`,
  })),
  {
    slug: NOTA_EN.slug,
    kelompok: NOTA_EN.kelompok,
    judulPendek: NOTA_EN.judulPendek,
    ringkas: NOTA_EN.ringkas,
    href: `/alat/${NOTA_EN.kelompok}/${NOTA_EN.slug}/`,
  },
];
