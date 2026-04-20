import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen font-[family-name:var(--font-lato)]">
      
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-28 gap-6">
        
        <p className="text-[#a0522d] text-sm tracking-widest uppercase">
          Your musical playground
        </p>

        <h1 className="font-[family-name:var(--font-playfair)] text-6xl font-bold text-[#2c1a0e] max-w-3xl leading-tight">
          Play, Compose & Explore Music
        </h1>

        <p className="text-[#6b4423] text-xl max-w-xl leading-relaxed">
          Waltzify brings music to life in your browser. No instrument needed —
          just creativity and curiosity.
        </p>

        <div className="flex gap-4 mt-4">
          
          <a  href="/signup"
            className="bg-[#8b4513] text-[#fdf6ee] px-8 py-3 rounded-full text-lg hover:bg-[#7a3b10] transition-colors"
          >
            Start playing free
          </a>
          
          <a
            href="#features"
            className="border border-[#8b4513] text-[#8b4513] px-8 py-3 rounded-full text-lg hover:bg-[#8b4513] hover:text-[#fdf6ee] transition-colors"
          >
            See how it works
          </a>
        </div>

      </section>

      {/* Features Section */}
      <section id="features" className="px-8 py-20 max-w-5xl mx-auto">
        
        <h2 className="font-[family-name:var(--font-playfair)] text-4xl text-center text-[#2c1a0e] mb-14">
          Everything you need to make music
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {[
            { icon: "🎹", title: "Virtual Piano", desc: "Play a real piano in your browser with your keyboard or by clicking the keys." },
            { icon: "🎼", title: "Compose", desc: "Record your melodies and save them to your personal library." },
            { icon: "🎵", title: "Explore", desc: "Discover pre-made songs and learn to play them note by note." },
          ].map((f) => (
            <div key={f.title} className="bg-[#fff8f0] border border-[#e8d5b7] rounded-2xl p-8 flex flex-col gap-4">
              <span className="text-4xl">{f.icon}</span>
              <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#2c1a0e]">
                {f.title}
              </h3>
              <p className="text-[#6b4423] leading-relaxed">{f.desc}</p>
            </div>
          ))}

        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-10 text-[#a08060] text-sm border-t border-[#e8d5b7]">
        © 2026 Waltzify · Made with 🎵
      </footer>

    </main>
  );
}