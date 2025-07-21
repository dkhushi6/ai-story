import Image from "next/image";
import LoginForm from "@/components/extra/login-form";
import bgImg from "@/public/mountain.jpeg"; // Use your uploaded image

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <Image
        src={bgImg}
        alt="Background"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay for dim effect */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Login Form */}
      <div className="relative z-20 p-4">
        <LoginForm />
      </div>
    </div>
  );
}
