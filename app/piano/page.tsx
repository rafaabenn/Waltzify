import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Piano from "../components/Piano";

export default async function PianoPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#fdf6ee]">

      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-[#e8d5b7] bg-white">
        <Link
          href="/dashboard"
          className="text-[#a08060] hover:text-[#8b4513] text-sm transition-colors"
        >
          ← Back to dashboard
        </Link>
        <span className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#8b4513]">
          Virtual Piano
        </span>
        <span className="text-[#6b4423] text-sm">
          {session.user?.name ?? session.user?.email}
        </span>
      </header>

      {/* Main */}
      <main className="flex flex-col items-center justify-center px-6 py-16 gap-6">

        <div className="text-center mb-4">
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#2c1a0e] mb-2">
            Play
          </h1>
          <p className="text-[#6b4423]">
            Use your keyboard or click the keys
          </p>
        </div>

        <Piano />

      </main>
    </div>
  );
}