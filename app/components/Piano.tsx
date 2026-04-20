"use client";

import { useEffect, useRef, useState } from "react";

const ALL_NOTES = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];

const KEY_MAP: Record<string, string> = {
  // Lower octave — white keys
  a:"C4", s:"D4", d:"E4", f:"F4", g:"G4", h:"A4", j:"B4",
  // Lower octave — black keys
  w:"C#4", e:"D#4", t:"F#4", y:"G#4", u:"A#4",
  // Upper octave — white keys
  z:"C5", x:"D5", c:"E5", v:"F5", b:"G5", n:"A5", m:"B5",
  // Upper octave — black keys
  "2":"C#5", "3":"D#5", "5":"F#5", "6":"G#5", "7":"A#5",
};
const NOTE_LABEL: Record<string, string> = {};
for (const [k, v] of Object.entries(KEY_MAP)) NOTE_LABEL[v] = k.toUpperCase();

type Key = { note: string; isBlack: boolean; left: number };

function buildKeys(): Key[] {
  const keys: Key[] = [];
  const W = 56;
  let wi = 0;
  for (const oct of [4, 5]) {
    for (const n of ALL_NOTES) {
      const note = n + oct;
      if (n.includes("#")) {
        keys.push({ note, isBlack: true, left: wi * W - 20 });
      } else {
        keys.push({ note, isBlack: false, left: wi * W });
        wi++;
      }
    }
  }
  return keys;
}

const KEYS = buildKeys();
const WHITE_KEYS = KEYS.filter(k => !k.isBlack);

export default function Piano() {
  const [active, setActive] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);
  const [volume, setVolume] = useState(-6);
  const synthRef = useRef<any>(null);
  const held = useRef<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;
    import("tone").then((Tone) => {
      if (cancelled) return;
      const reverb = new Tone.Reverb({ decay: 2.5, wet: 0.25 });
      reverb.toDestination();
      reverb.generate().then(() => {
        const synth = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: "triangle8" },
          envelope: { attack: 0.015, decay: 1.2, sustain: 0.1, release: 1.8 },
          volume,
        });
        synth.connect(reverb);
        synthRef.current = synth;
        setLoaded(true);
      });
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (synthRef.current) synthRef.current.volume.value = volume;
  }, [volume]);

  const play = async (note: string) => {
    const Tone = await import("tone");
    await Tone.start();
    if (!synthRef.current) return;
    synthRef.current.triggerAttack(note);
    setActive(p => new Set([...p, note]));
  };

  const stop = (note: string) => {
    if (!synthRef.current) return;
    synthRef.current.triggerRelease(note);
    setActive(p => { const n = new Set(p); n.delete(note); return n; });
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const note = KEY_MAP[e.key.toLowerCase()] || KEY_MAP[e.key];
      if (note && !held.current.has(note)) {
        e.preventDefault();
        held.current.add(note);
        play(note);
      }
    };
    const up = (e: KeyboardEvent) => {
      const note = KEY_MAP[e.key.toLowerCase()];
      if (note) { held.current.delete(note); stop(note); }
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [loaded]);

  return (
    <div className="flex flex-col items-center gap-8">

      {/* Volume control */}
      <div className="flex items-center gap-4">
        <span className="text-[#6b4423] text-sm">Volume</span>
        <input
          type="range" min={-30} max={0} value={volume}
          onChange={e => setVolume(Number(e.target.value))}
          className="w-32 accent-[#8b4513]"
        />
        <span className="text-[#a08060] text-sm w-8">{volume} dB</span>
      </div>

      {/* Piano housing */}
      <div
        className="rounded-xl shadow-2xl overflow-x-auto"
        style={{
          background: "linear-gradient(180deg, #1a1a1a 0%, #2a2a2a 100%)",
          padding: "20px 24px 28px",
          border: "2px solid #111",
        }}
      >
        <p className="text-center text-[#666] text-xs tracking-widest uppercase mb-5 font-light">
          ✦ Grand Piano ✦
        </p>

        {/* Keys */}
        <div
          className="relative"
          style={{ width: WHITE_KEYS.length * 56, height: 200 }}
        >

          {/* White keys */}
          {KEYS.filter(k => !k.isBlack).map(({ note, left }) => {
            const on = active.has(note);
            return (
              <div
                key={note}
                onMouseDown={() => play(note)}
                onMouseUp={() => stop(note)}
                onMouseLeave={() => active.has(note) && stop(note)}
                onTouchStart={e => { e.preventDefault(); play(note); }}
                onTouchEnd={e => { e.preventDefault(); stop(note); }}
                style={{
                  position: "absolute",
                  left,
                  width: 54,
                  height: 200,
                  background: on
                    ? "#e0e0e0"
                    : "linear-gradient(180deg, #ffffff 0%, #f5f5f5 100%)",
                  border: "1px solid #bbb",
                  borderTop: "1px solid #ddd",
                  borderRadius: "0 0 6px 6px",
                  boxShadow: on
                    ? "inset 0 -2px 4px rgba(0,0,0,0.15)"
                    : "inset 0 -4px 6px rgba(0,0,0,0.08), 2px 4px 8px rgba(0,0,0,0.4)",
                  cursor: "pointer",
                  userSelect: "none",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  paddingBottom: 10,
                  zIndex: 1,
                  transform: on ? "translateY(2px)" : "none",
                  transition: "transform 0.06s, background 0.06s",
                }}
              >
                {NOTE_LABEL[note] && (
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    fontFamily: "monospace",
                    color: on ? "#555" : "#222",
                    letterSpacing: 1,
                  }}>
                    {NOTE_LABEL[note]}
                  </span>
                )}
              </div>
            );
          })}

          {/* Black keys */}
          {KEYS.filter(k => k.isBlack).map(({ note, left }) => {
            const on = active.has(note);
            return (
              <div
                key={note}
                onMouseDown={e => { e.stopPropagation(); play(note); }}
                onMouseUp={() => stop(note)}
                onMouseLeave={() => active.has(note) && stop(note)}
                onTouchStart={e => { e.preventDefault(); e.stopPropagation(); play(note); }}
                onTouchEnd={e => { e.preventDefault(); stop(note); }}
                style={{
                  position: "absolute",
                  left,
                  width: 38,
                  height: 124,
                  background: on
                    ? "#444"
                    : "linear-gradient(180deg, #222 0%, #111 100%)",
                  borderRadius: "0 0 5px 5px",
                  border: "1px solid #000",
                  boxShadow: on
                    ? "inset 0 -1px 4px rgba(255,255,255,0.05)"
                    : "inset 0 -3px 5px rgba(255,255,255,0.07), 2px 6px 10px rgba(0,0,0,0.7)",
                  cursor: "pointer",
                  userSelect: "none",
                  zIndex: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  paddingBottom: 8,
                  transform: on ? "translateY(2px)" : "none",
                  transition: "transform 0.06s, background 0.06s",
                }}
              >
                {NOTE_LABEL[note] && (
                  <span style={{
                    fontSize: 10,
                    fontWeight: 700,
                    fontFamily: "monospace",
                    color: on ? "#aaa" : "#fff",
                    letterSpacing: 1,
                  }}>
                    {NOTE_LABEL[note]}
                  </span>
                )}
              </div>
            );
          })}

        </div>
      </div>

      {!loaded && (
        <p className="text-[#a08060] text-sm animate-pulse">Loading audio engine...</p>
      )}

      <p className="text-[#a08060] text-xs tracking-wide text-center">
        Lower: A S D F G H J &nbsp;|&nbsp; Sharps: W E T Y U
        <br/>
        Upper: Z X C V B N M &nbsp;|&nbsp; Sharps: 2 3 5 6 7
        </p>

    </div>
  );
}