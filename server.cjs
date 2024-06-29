require("dotenv").config()

// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true })
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

// Fetch the publishable key to initialize Stripe.js
fastify.get("/publishable-key", () => {
    return { publishable_key: process.env.STRIPE_PUBLISHABLE_KEY }
})

// Create a payment intent and return its client secret
fastify.post("/create-payment-intent", async (req, res) => {
    let { name, email, amount, note } = req.body
    let customer

    const customers = await stripe.customers.search({
        query: `email: '${email}'`,
    })

    if (customers.data.length > 0) customer = customers.data.at(0)
    else customer = await stripe.customers.create({ name, email })

    const paymentIntent = await stripe.paymentIntents.create({
        customer: customer.id,
        receipt_email: email,
        amount: amount,
        metadata: {
            "Pesan/Catatan Donatur": note,
        },
        currency: "idr",
    })

    return { client_secret: paymentIntent.client_secret }
})


// Run the server
const start = async () => {
    try {
        await fastify.listen({ port: 5252 })
        console.log("Server listening ... ")
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()
