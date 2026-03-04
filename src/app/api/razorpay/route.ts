import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*", // Allow Vercel frontend to call this Render backend
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handle Preflight requests for CORS
export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
    try {
        const key_id = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_1DP5mmOlF5G5ag";
        const key_secret = process.env.RAZORPAY_KEY_SECRET || "fake_secret_key_12345";

        const instance = new Razorpay({ key_id, key_secret });
        const { amount } = await req.json();

        const options = {
            amount: amount * 100, // amount in the smallest currency unit (paise)
            currency: "INR",
            receipt: "receipt_order_hire_me",
        };

        const order = await instance.orders.create(options);

        // Pass the key_id back securely
        return NextResponse.json({ ...order, key_id }, { headers: corsHeaders });
    } catch (error: any) {
        console.error("Razorpay error:", error);
        return NextResponse.json({
            error: "Something went wrong",
            details: error?.message || error?.description || JSON.stringify(error)
        }, { status: 500, headers: corsHeaders });
    }
}
