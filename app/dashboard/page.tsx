import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession();

  // If not logged in, send them to login
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#fdf6ee]">

      {/* Top bar */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-[#e8d5b7] bg-white">
        <span className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#8b4513]">
          Waltzify
        </span>
        <div className="flex items-center gap-6">
          <span className="text-[#6b4423] text-sm">
            Hello, {session.user?.name ?? session.user?.email} 👋
          </span>
          <Link
            href="/api/auth/signout"
            className="text-sm text-[#a08060] hover:text-[#8b4513] transition-colors"
          >
            Sign out
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-8 py-12">

        {/* Welcome */}
        <div className="mb-12">
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#2c1a0e] mb-2">
            Your Music Space
          </h1>
          <p className="text-[#6b4423] text-lg">
            What would you like to do today?
          </p>
        </div>

        {/* Action cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

          {[
            {
              icon: "🎹",
              title: "Play Piano",
              desc: "Open the virtual piano and start playing",
              href: "/piano",
              cta: "Open piano",
            },
            {
              icon: "🎼",
              title: "My Compositions",
              desc: "View and play back your saved melodies",
              href: "/compositions",
              cta: "View compositions",
            },
            {
              icon: "🎵",
              title: "Explore Songs",
              desc: "Discover and learn pre-made songs",
              href: "/explore",
              cta: "Explore",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-white border border-[#e8d5b7] rounded-2xl p-7 flex flex-col gap-4 hover:shadow-md transition-shadow"
            >
              <span className="text-4xl">{card.icon}</span>
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#2c1a0e] mb-1">
                  {card.title}
                </h2>
                <p className="text-[#6b4423] text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
              <Link
                href={card.href}
                className="mt-auto inline-block text-center bg-[#fdf6ee] border border-[#e8d5b7] text-[#8b4513] rounded-full px-5 py-2 text-sm hover:bg-[#8b4513] hover:text-white transition-colors"
              >
                {card.cta}
              </Link>
            </div>
          ))}

        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-6">
          {[
            { label: "Songs played", value: "0" },
            { label: "Compositions saved", value: "0" },
            { label: "Days active", value: "1" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-[#e8d5b7] rounded-2xl p-6 text-center"
            >
              <p className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#8b4513]">
                {stat.value}
              </p>
              <p className="text-[#a08060] text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}