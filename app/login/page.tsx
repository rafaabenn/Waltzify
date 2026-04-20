"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf6ee] flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#8b4513]">
            Waltzify
          </Link>
          <p className="text-[#6b4423] mt-2">Welcome back</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#e8d5b7] rounded-2xl p-8 shadow-sm">

          {/* Google button */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-3 border border-[#e8d5b7] rounded-full py-3 text-[#2c1a0e] hover:bg-[#fdf6ee] transition-colors mb-6"
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-[#e8d5b7]"/>
            <span className="text-[#a08060] text-sm">or</span>
            <div className="flex-1 h-px bg-[#e8d5b7]"/>
          </div>

          {/* Email form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div className="flex flex-col gap-1">
              <label className="text-sm text-[#6b4423]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="border border-[#e8d5b7] rounded-xl px-4 py-3 text-[#2c1a0e] placeholder:text-[#c8a880] focus:outline-none focus:border-[#8b4513] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-[#6b4423]">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="border border-[#e8d5b7] rounded-xl px-4 py-3 text-[#2c1a0e] placeholder:text-[#c8a880] focus:outline-none focus:border-[#8b4513] transition-colors"
              />
            </div>

            <button
              type="submit"
              className="bg-[#8b4513] text-[#fdf6ee] rounded-full py-3 hover:bg-[#7a3b10] transition-colors mt-2"
            >
              Log in
            </button>

          </form>
        </div>

        <p className="text-center text-[#6b4423] mt-6 text-sm">
          No account?{" "}
          <Link href="/signup" className="text-[#8b4513] font-bold hover:underline">
            Sign up free
          </Link>
        </p>

      </div>
    </div>
  );
}