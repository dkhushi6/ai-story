"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  return (
    <form className="backdrop-blur-xl bg-white/10 border border-white/30 p-8 rounded-3xl shadow-xl w-[320px] space-y-6 text-white text-center">
      <h1 className="text-2xl font-bold">Login</h1>

      <Button
        type="button"
        variant="outline"
        onClick={() => {
          signIn("google", { callbackUrl: "/" });
        }}
        className="w-full bg-white text-black font-semibold rounded-full flex items-center justify-center gap-3 hover:bg-gray-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 262"
          className="h-5 w-5"
        >
          <path
            fill="#4285F4"
            d="M255.7 133.5c0-8.4-.8-16.4-2.4-24.2H130.1v45.8h71.4c-3 16-12.2 29.6-25.9 38.6v32.1h41.9c24.5-22.6 38.2-55.8 38.2-92.3z"
          />
          <path
            fill="#34A853"
            d="M130.1 261.8c34.7 0 63.8-11.5 85-31.4l-41.9-32.1c-11.6 7.8-26.5 12.5-43.1 12.5-33 0-60.9-22.2-70.9-52.1H15.8v32.7c21.1 41.8 64.7 70.4 114.3 70.4z"
          />
          <path
            fill="#FBBC05"
            d="M59.2 158.7c-2.7-7.9-4.2-16.3-4.2-25s1.5-17.1 4.2-25v-32.7H15.8c-8.3 16.6-13.1 35.2-13.1 57.7s4.8 41.1 13.1 57.7l43.4-32.7z"
          />
          <path
            fill="#EA4335"
            d="M130.1 51.1c18.9 0 35.7 6.5 49.1 19.3l36.8-36.8C193.8 11.5 164.7 0 130.1 0 80.4 0 36.9 28.6 15.8 70.4l43.4 32.7c10-29.9 37.9-52 70.9-52z"
          />
        </svg>
        <span>Login with Google</span>
      </Button>
    </form>
  );
}
