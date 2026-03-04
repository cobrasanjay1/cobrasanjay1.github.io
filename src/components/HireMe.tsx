'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle2, Loader2 } from 'lucide-react';

export default function HireMe() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handlePayment = async () => {
        setLoading(true);
        try {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
            const res = await fetch(`${backendUrl}/api/razorpay`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: 1000 }), // e.g. 5000 INR retainer
            });
            const order = await res.json();

            if (order.error) {
                alert(`Payment initialization failed: ${order.details || 'Check server logs.'}`);
                setLoading(false);
                return;
            }

            const options = {
                key: order.key_id, // Fetching securely from our API route instead of hardcoding NEXT_PUBLIC
                amount: order.amount,
                currency: order.currency,
                name: "Sanjay Vinod",
                description: "Freelance / Hire Retainer",
                order_id: order.id,
                handler: function (response: any) {
                    setSuccess(true);
                },
                prefill: {
                    name: "Client Name",
                    email: "client@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#8b5cf6",
                },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.on('payment.failed', function (response: any) {
                alert("Payment Failed: " + response.error.description);
            });
            rzp.open();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-card p-8 flex flex-col items-center justify-center text-center max-w-sm mx-auto"
            >
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
                <p className="text-gray-400 text-sm">Thank you for your interest. I will reach out to you shortly to discuss the details.</p>
            </motion.div>
        );
    }

    return (
        <div className="glass-card p-8 flex flex-col items-center justify-center text-center max-w-sm mx-auto group">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <CreditCard className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Hire Me Directly</h3>
            <p className="text-gray-400 text-sm mb-6">
                Secure a freelance retainer or consultation block effortlessly using Razorpay secure checkout.
            </p>
            <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold tracking-wide hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all flex justify-center items-center gap-2"
            >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Pay ₹5,000 to Proceed'}
            </button>
        </div>
    );
}
