const Stripe = require('stripe');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { items } = req.body;

  if (!items?.length) return res.status(400).json({ error: 'Cart is empty' });

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:5173';

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${item.beatTitle} — ${item.licenseType} License`,
            description: item.licenseDescription,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: 1,
      })),
      mode: 'payment',
      success_url: `${baseUrl}/#/`,
      cancel_url: `${baseUrl}/#/`,
      metadata: {
        items: JSON.stringify(
          items.map(i => ({ beatId: i.beatId, title: i.beatTitle, license: i.licenseType }))
        ),
      },
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    res.status(500).json({ error: err.message });
  }
};
