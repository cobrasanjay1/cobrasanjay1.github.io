import { NextResponse } from "next/server";
import Razorpay from "razorpay";

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

        // Pass the key_id back securely so the frontend doesn't need NEXT_PUBLIC variants
        return NextResponse.json({ ...order, key_id });
    } catch (error) {
        console.error("Razorpay error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
