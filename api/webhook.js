const Stripe = require('stripe');
const { Resend } = require('resend');

// ─── Fill in your Google Drive links for each beat ───────────────────────────
// Right-click any file in Drive → Share → "Anyone with the link" → copy URL
const DOWNLOAD_URLS = {
  s1: { // Devil Ray Bounce
    Personal:   'https://drive.google.com/file/d/REPLACE_ME/view',
    Commercial: 'https://drive.google.com/file/d/REPLACE_ME/view',
  },
  s2: { // Tropicana Keys
    Personal:   'https://drive.google.com/file/d/REPLACE_ME/view',
    Commercial: 'https://drive.google.com/file/d/REPLACE_ME/view',
  },
  s3: { // FL Studio Grime
    Personal:   'https://drive.google.com/file/d/REPLACE_ME/view',
    Commercial: 'https://drive.google.com/file/d/REPLACE_ME/view',
  },
  s4: { // 2017 Throwback
    Personal:   'https://drive.google.com/file/d/REPLACE_ME/view',
    Commercial: 'https://drive.google.com/file/d/REPLACE_ME/view',
  },
  p1: { // Mobile Money Vol. 1
    Personal:   'https://drive.google.com/file/d/REPLACE_ME/view',
    Commercial: 'https://drive.google.com/file/d/REPLACE_ME/view',
  },
  p2: { // Skimp Signature Sounds
    Personal:   'https://drive.google.com/file/d/REPLACE_ME/view',
    Commercial: 'https://drive.google.com/file/d/REPLACE_ME/view',
  },
};
// ─────────────────────────────────────────────────────────────────────────────

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const resend = new Resend(process.env.RESEND_API_KEY);

  let rawBody;
  try {
    rawBody = await readRawBody(req);
  } catch {
    return res.status(400).send('Could not read body');
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      req.headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const customerEmail = session.customer_details?.email;
    const items = JSON.parse(session.metadata?.items || '[]');

    const links = items.map(item => ({
      title: item.title,
      license: item.license,
      url: DOWNLOAD_URLS[item.beatId]?.[item.license] ?? null,
    }));

    if (customerEmail && links.length) {
      await resend.emails.send({
        from: 'Mobile Money Beats <onboarding@resend.dev>',
        to: customerEmail,
        subject: 'Your Mobile Money Beats — download links inside',
        html: buildEmail(links),
      });
      console.log(`Delivery email sent to ${customerEmail}`);
    }
  }

  res.status(200).json({ received: true });
}

handler.config = { api: { bodyParser: false } };
module.exports = handler;

function buildEmail(links) {
  const year = new Date().getFullYear();
  const rows = links.map(item => `
    <tr>
      <td style="padding:14px 18px;border-bottom:1px solid #222;">
        <strong style="color:#39FF14;font-size:15px;display:block;">${item.title}</strong>
        <span style="color:#777;font-size:11px;text-transform:uppercase;letter-spacing:1px;">${item.license} License</span>
      </td>
      <td style="padding:14px 18px;border-bottom:1px solid #222;text-align:right;vertical-align:middle;">
        ${item.url
          ? `<a href="${item.url}" style="background:#39FF14;color:#050505;padding:9px 20px;text-decoration:none;font-weight:900;font-size:11px;text-transform:uppercase;letter-spacing:1px;display:inline-block;">Download</a>`
          : `<span style="color:#555;font-size:12px;">Contact support</span>`}
      </td>
    </tr>`).join('');

  return `
    <div style="background:#050505;color:#F3F4F6;font-family:Arial,sans-serif;max-width:580px;margin:0 auto;padding:48px 24px;">
      <div style="text-align:center;margin-bottom:40px;">
        <div style="display:inline-block;background:#39FF14;color:#050505;width:54px;height:54px;line-height:54px;font-size:30px;font-weight:900;margin-bottom:18px;">$</div>
        <h1 style="margin:0;font-size:26px;font-weight:900;text-transform:uppercase;letter-spacing:-1px;color:#F3F4F6;">Mobile Money Beats</h1>
        <p style="color:#39FF14;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:4px;margin:8px 0 0;">By Skimp</p>
      </div>

      <p style="font-size:16px;margin:0 0 6px;color:#F3F4F6;">Your files are ready.</p>
      <p style="color:#777;font-size:13px;margin:0 0 32px;">Click the download button next to each track. Save these links — they're yours permanently.</p>

      <table style="width:100%;background:#111;border-collapse:collapse;border:2px solid #0B2B16;">
        ${rows}
      </table>

      <div style="margin-top:40px;padding-top:28px;border-top:1px solid #1a1a1a;text-align:center;">
        <p style="color:#444;font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:0;line-height:2;">
          Questions? Reply to this email.<br>
          &copy; ${year} Mobile Money Beats by Skimp
        </p>
      </div>
    </div>`;
}
