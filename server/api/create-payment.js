import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51Q0CV3CulV1yOIAgRWt0R5hO7cyHXwzbXT828xW0iD76djxlD4qF38s1v6uPpE4P73UAV9mf5jzyWuaAeVB6O4T300rrdEYqb9');

export default defineEventHandler(async (event) => {
  const { method } = event.node.req;

  if (method === 'POST') {
    const { amount } = await readBody(event); 

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'brl',
      });

      return { clientSecret: paymentIntent.client_secret };
    } catch (error) {
      console.error('Erro ao criar PaymentIntent:', error);
      setResponseStatus(event, 500);
      return { error: 'Erro ao criar o pagamento' };
    }
  } else {
    setResponseStatus(event, 405);
    return { error: `Method ${method} Not Allowed` };
  }
});
