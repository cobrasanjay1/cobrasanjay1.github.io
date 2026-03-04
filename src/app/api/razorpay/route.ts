import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_1DP5mmOlF5G5ag", // Fake test key
    key_secret: process.env.RAZORPAY_KEY_SECRET || "fake_secret_key_12345",
});

export async function POST(req: Request) {
    try {
        const { amount } = await req.json();

        const options = {
            amount: amount * 100, // amount in the smallest currency unit (paise)
            currency: "INR",
            receipt: "receipt_order_hire_me",
        };

        const order = await instance.orders.create(options);
        return NextResponse.json(order);
    } catch (error) {
        console.error("Razorpay error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
