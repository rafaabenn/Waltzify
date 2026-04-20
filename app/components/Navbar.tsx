"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-[#e8d5b7]">

      <Link href="/" className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#8b4513]">
        Waltzify
      </Link>

      <div className="flex items-center gap-8 font-[family-name:var(--font-lato)]">
        <Link href="#features" className="text-[#6b4423] hover:text-[#8b4513] transition-colors">
          Features
        </Link>
        <Link href="#about" className="text-[#6b4423] hover:text-[#8b4513] transition-colors">
          About
        </Link>

        {session ? (
          // Logged in state
          <>
            <Link href="/dashboard" className="text-[#6b4423] hover:text-[#8b4513] transition-colors">
              Dashboard
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-[#8b4513] text-[#fdf6ee] px-5 py-2 rounded-full hover:bg-[#7a3b10] transition-colors"
            >
              Sign out
            </button>
          </>
        ) : (
          // Logged out state
          <>
            <Link href="/login" className="text-[#6b4423] hover:text-[#8b4513] transition-colors">
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-[#8b4513] text-[#fdf6ee] px-5 py-2 rounded-full hover:bg-[#7a3b10] transition-colors"
            >
              Get started
            </Link>
          </>
        )}
      </div>

    </nav>
  );
}