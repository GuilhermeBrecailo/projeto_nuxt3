
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51Q0CV3CulV1yOIAgRWt0R5hO7cyHXwzbXT828xW0iD76djxlD4qF38s1v6uPpE4P73UAV9mf5jzyWuaAeVB6O4T300rrdEYqb9'); 
console.log('Endpoint /api/create-payment acessado');


export default async (req, res) => {
  if (req.method === 'POST') {
    const { amount } = req.body;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'brl', 
      });

      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error('Erro ao criar PaymentIntent:', error);
      res.status(500).json({ error: 'Erro ao criar o pagamento' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};



