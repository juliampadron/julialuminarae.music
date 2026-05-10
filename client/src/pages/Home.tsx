/*
Design philosophy for this file: Brutalist VHS Neo-Noir.
Every layout decision should reinforce a damaged-broadcast artist world: asymmetric sections, scan-line texture,
fractured poster typography, neon interference, waveform details, and readable high-contrast hierarchy.
*/
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Download, Headphones, Play, Pause, Radio, Sparkles, Youtube, Zap } from "lucide-react";

const heroVisual = "https://d2xsxph8kpxj0f.cloudfront.net/310519663446952378/C8Dcxoh57rojk5rBL66Xe7/jlr_vhs_neo_noir_hero-HsyYdwbxBawQ5vcFtJV5ko.webp";
const textureVisual = "https://d2xsxph8kpxj0f.cloudfront.net/310519663446952378/C8Dcxoh57rojk5rBL66Xe7/jlr_static_waveform_texture-LqDU8QsR7btCUMfx9S2T5m.webp";
const supportVisual = "https://d2xsxph8kpxj0f.cloudfront.net/310519663446952378/C8Dcxoh57rojk5rBL66Xe7/jlr_support_signal_oracle-kM223dKBXge5QjfpkJ9F9L.webp";

const tracks = [
  {
    id: "un-hypnotized",
    title: "Un-Hypnotized",
    image: "/manus-storage/Untitled-February22,202616.07.27_049c5100.jpg",
    audio: "/manus-storage/un-hypnotized_cc39ca47.mp3",
    themes: ["Becoming the Storm", "Pressure Rising", "Signal Lost"],
    genre: "Experimental electronic, alt-rock",
    code: "CHANNEL 01 // CONTAINMENT FAILED",
    lyric: "Pressure turns into weather. Signal breaks, and the self walks out of the trance.",
    bars: [18, 42, 65, 34, 76, 88, 51, 28, 90, 72, 44, 61, 33, 82, 57, 24, 69, 91],
  },
  {
    id: "orange-juice-spill",
    title: "Orange Juice Spill",
    image: "/manus-storage/orange-juice-spill-thumbnail-v2_49a0a0f0.png",
    audio: "/manus-storage/orange-juice-spill-(remastered)(3)_e4cf2baf.mp3",
    themes: ["Gentle Chaos", "Hudson Valley Warmth"],
    genre: "Indie pop, dream folk",
    code: "CHANNEL 02 // CITRUS MEMORY BLEED",
    lyric: "Golden hour gets on everything. Even the accident starts glowing.",
    bars: [22, 35, 49, 63, 58, 41, 77, 69, 52, 36, 84, 73, 46, 31, 64, 80, 55, 28],
  },
  {
    id: "ash-wednesday",
    title: "On Ash Wednesday We Sit Still",
    image: "/manus-storage/68603066-C89F-4C4A-A6D9-256F1AE5CEB4_1027b413.png",
    audio: "/manus-storage/still.-(still-still-still)(1)_d5e9492a.mp3",
    themes: ["Ritual & Reflection", "15 Years in the Making"],
    genre: "Psychedelic trance house, literary",
    code: "CHANNEL 03 // HISTORICAL COLLISION",
    lyric: "A song returns after fifteen years, carrying smoke, testimony, and a still point.",
    bars: [12, 26, 55, 75, 89, 64, 41, 38, 52, 86, 94, 71, 48, 30, 59, 81, 67, 43],
  },
  {
    id: "malsueno",
    title: "Malsueño",
    image: "/manus-storage/IMG_7869_0623e489.PNG",
    audio: "/manus-storage/malesueño(1)_baa46175.mp3",
    themes: ["Dreamwork", "Liminal Spaces"],
    genre: "Atmospheric, ambient trap",
    code: "CHANNEL 04 // AQUARIUM SMOKE ROOM",
    lyric: "The room breathes through the television. The dream stays awake longer than the dreamer.",
    bars: [31, 22, 44, 68, 57, 40, 79, 91, 76, 53, 39, 61, 85, 70, 46, 28, 64, 88],
  },
  {
    id: "ija",
    title: "IJA",
    image: "/manus-storage/6233AF75-C37D-4646-A233-6882DECCC505_f0d75ae2.png",
    audio: "/manus-storage/ija(1)_91765832.mp3",
    themes: ["Origin Story", "Coastal Mysticism"],
    genre: "World fusion, experimental",
    code: "CHANNEL 05 // COASTAL SIGIL",
    lyric: "An initial becomes a coastline. The sunrise writes the origin story in salt and gold.",
    bars: [35, 49, 62, 71, 54, 43, 67, 82, 74, 58, 39, 47, 69, 93, 81, 60, 42, 27],
  },
];

const projects = [
  "The Lumina Method newsletter",
  "The Cartography of Kinship",
  "Supercritical Ghost Theory",
  "@thegeminatrix",
  "@hudsonvalleymedium",
  "@healingcottagecraft",
  "Dutchess County Barter and Trade",
];

const tiers = [
  { amount: "0.10", label: "Solidarity", detail: "A dime through the static." },
  { amount: "1", label: "Supporter", detail: "Keep the signal warm." },
  { amount: "5", label: "Believer", detail: "Unlock the ritual table." },
  { amount: "10", label: "Patron", detail: "Fund the next transmission." },
];

type Track = (typeof tracks)[number];

export default function Home() {
  const [activeTrack, setActiveTrack] = useState<Track>(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState("5");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("jlr_downloads_unlocked") === "true";
    setUnlocked(stored);
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.src = activeTrack.audio;
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [activeTrack, isPlaying]);

  const cashUrl = useMemo(() => `https://cash.app/$feedthegemini/${selectedAmount}`, [selectedAmount]);

  const handlePlay = (track: Track) => {
    if (activeTrack.id !== track.id) {
      setActiveTrack(track);
      setIsPlaying(true);
      return;
    }
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const unlockDownloads = () => {
    window.localStorage.setItem("jlr_downloads_unlocked", "true");
    setUnlocked(true);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#090909] text-zinc-100 selection:bg-[#ff006e] selection:text-white">
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} preload="metadata" />
      <div className="fixed inset-0 pointer-events-none z-50 mix-blend-screen opacity-[0.14] scanline-overlay" />
      <div className="fixed inset-0 pointer-events-none z-40 opacity-[0.08] grain-overlay" />

      <section className="relative min-h-screen border-b border-white/10 bg-black">
        <img src={heroVisual} alt="Abstract VHS neo-noir glitch field" className="absolute inset-0 h-full w-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_46%,rgba(255,0,110,0.18),transparent_32%),linear-gradient(90deg,rgba(0,0,0,0.92),rgba(0,0,0,0.62)_42%,rgba(0,0,0,0.32))]" />
        <nav className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <a href="#top" className="font-mono text-xs uppercase tracking-[0.35em] text-[#06ffa5]">JLR.Signal</a>
          <div className="hidden items-center gap-7 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-300 md:flex">
            <a href="#singles" className="hover:text-[#ff006e] transition-colors">Singles</a>
            <a href="#about" className="hover:text-[#ff006e] transition-colors">About</a>
            <a href="#support" className="hover:text-[#ff006e] transition-colors">Support</a>
            <a href="https://youtube.com/@julialuminarae?si=nUA28NMgm2a3tVeo" target="_blank" rel="noreferrer" className="hover:text-[#ff006e] transition-colors">YouTube</a>
          </div>
        </nav>

        <div id="top" className="relative z-10 grid min-h-[calc(100vh-76px)] items-end px-5 pb-10 sm:px-8 lg:grid-cols-[1.12fr_0.88fr] lg:px-12 lg:pb-16">
          <div className="max-w-5xl">
            <p className="mb-5 inline-flex items-center gap-3 border border-[#00b4d8]/40 bg-black/50 px-3 py-2 font-mono text-xs uppercase tracking-[0.28em] text-[#00b4d8] backdrop-blur-sm">
              <Radio size={15} /> Hudson Valley Underground
            </p>
            <h1 className="glitch-title font-display text-[18vw] uppercase leading-[0.78] tracking-[-0.05em] text-white sm:text-[15vw] lg:text-[10.8rem]" data-text="Julia Lumina Rae">
              Julia<br />Lumina<br />Rae
            </h1>
            <div className="mt-7 max-w-3xl border-l-4 border-[#ff006e] bg-black/45 p-5 backdrop-blur-sm">
              <p className="font-mono text-sm uppercase tracking-[0.24em] text-[#ffd60a]">Sugar, Smoke, and Static</p>
              <p className="mt-3 text-xl leading-relaxed text-zinc-200 sm:text-2xl">
                Gentle chaos meets graceful truth — multidisciplinary creative, psychic medium, outlaw poet.
              </p>
            </div>
          </div>

          <aside className="mt-10 border border-white/15 bg-black/55 p-5 shadow-[0_0_60px_rgba(255,0,110,0.12)] backdrop-blur-md lg:ml-auto lg:max-w-md">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#b388eb]">Now Transmitting</p>
            <h2 className="mt-3 font-display text-5xl uppercase leading-none text-white">{activeTrack.title}</h2>
            <p className="mt-4 text-sm leading-6 text-zinc-300">{activeTrack.lyric}</p>
            <Waveform bars={activeTrack.bars} active={isPlaying} />
            <button onClick={() => handlePlay(activeTrack)} className="group mt-6 inline-flex w-full items-center justify-center gap-3 bg-white px-5 py-4 font-mono text-xs uppercase tracking-[0.22em] text-black transition hover:bg-[#ff006e] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#00b4d8]">
              {isPlaying ? <Pause size={17} /> : <Play size={17} />} {isPlaying ? "Pause Signal" : "Play Preview"}
            </button>
          </aside>
        </div>
      </section>

      <section id="singles" className="relative px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <img src={textureVisual} alt="Dark waveform static texture" className="absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-[#090909]/84" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#06ffa5]">Featured Singles Grid</p>
              <h2 className="mt-4 font-display text-6xl uppercase leading-[0.85] text-white sm:text-8xl">Five<br />Signal<br />Leaks</h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-zinc-300 lg:justify-self-end">
              Each track is treated like a recovered broadcast artifact: album image, genre coordinates, theme tags, waveform preview, and an honor-system download path for listeners who support the work.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-5">
            {tracks.map((track, index) => (
              <article key={track.id} className={`group relative overflow-hidden border border-white/12 bg-black/70 transition duration-300 hover:-translate-y-2 hover:border-[#ff006e]/70 ${index % 2 === 1 ? "lg:mt-12" : ""}`}>
                <div className="relative aspect-[4/5] overflow-hidden bg-zinc-950">
                  <img src={track.image} alt={`${track.title} album art`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:contrast-125" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                  <p className="absolute left-3 top-3 border border-white/20 bg-black/70 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#00b4d8]">0{index + 1}</p>
                </div>
                <div className="p-4">
                  <p className="min-h-10 font-mono text-[10px] uppercase tracking-[0.16em] text-[#ffd60a]">{track.code}</p>
                  <h3 className="mt-3 font-display text-4xl uppercase leading-none text-white">{track.title}</h3>
                  <p className="mt-3 text-sm text-zinc-400">{track.genre}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {track.themes.map((theme) => (
                      <span key={theme} className="border border-[#b388eb]/40 bg-[#b388eb]/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#d9c3ff]">{theme}</span>
                    ))}
                  </div>
                  <Waveform bars={track.bars.slice(0, 12)} active={activeTrack.id === track.id && isPlaying} compact />
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <button onClick={() => handlePlay(track)} className="inline-flex items-center justify-center gap-2 bg-[#ff006e] px-3 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-[#00b4d8]">
                      {activeTrack.id === track.id && isPlaying ? <Pause size={14} /> : <Play size={14} />} Preview
                    </button>
                    <a href={unlocked ? track.audio : "#support"} download={unlocked ? `${track.title}.mp3` : undefined} className="inline-flex items-center justify-center gap-2 border border-white/20 px-3 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-white transition hover:border-[#06ffa5] hover:text-[#06ffa5]">
                      <Download size={14} /> {unlocked ? "Download" : "Unlock"}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="relative border-y border-white/10 bg-[#101010] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="absolute left-0 top-0 h-full w-1/3 bg-[linear-gradient(180deg,rgba(255,0,110,0.12),transparent,rgba(0,180,216,0.1))]" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="border border-white/12 bg-black p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#ff006e]">About Julia Lumina Rae</p>
            <h2 className="mt-4 font-display text-6xl uppercase leading-[0.85] text-white sm:text-8xl">Double-<br />Dipped<br />Gemini</h2>
            <blockquote className="mt-8 border-l-4 border-[#ffd60a] pl-5 font-mono text-sm leading-7 text-zinc-300">
              “Fortress mind, shattered identity — navigating Poughkeepsie with smoke as an exit sign.”
            </blockquote>
          </div>
          <div className="space-y-7 text-zinc-300">
            <p className="text-xl leading-9">
              Julia Lumina Rae works in genre-defying experimentation: no templates, no sealed categories. Her sound identity is <strong className="text-white">sugar-dusted static</strong>, where soft glitter sits beside gritty existential themes, ritual imagery, predatory power dynamics, and phoenix-like resilience.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["48 Laws of Flex", "Strategic power, shadow dominance, silent execution."],
                ["Sovereign of Ashes", "Phoenix resilience; an empire built from ruins."],
                ["Sugar Married to Flame", "Cotton candy sweetness paired with gasoline destruction."],
                ["Smoke Sessions", "Ritual, altered states, Ash Wednesday goddesses, holy lace."],
              ].map(([title, copy]) => (
                <div key={title} className="border border-white/10 bg-black/60 p-5">
                  <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-[#06ffa5]">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{copy}</p>
                </div>
              ))}
            </div>
            <p className="leading-8">
              A multi-instrumentalist — drummer by trade, pianist by birth — Julia self-produces highly textured arrangements that move between experimental electronics, dream folk warmth, trance-house ritual, ambient trap, and coastal mysticism.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="border border-[#00b4d8]/25 bg-[#00b4d8]/5 p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#00b4d8]">Creative Projects</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {projects.map((project) => (
                <div key={project} className="flex items-center gap-3 border border-white/10 bg-black px-4 py-4 font-mono text-xs uppercase tracking-[0.13em] text-zinc-300">
                  <Zap size={15} className="shrink-0 text-[#ff006e]" /> {project}
                </div>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden border border-white/12 bg-black p-6 sm:p-8">
            <Youtube className="text-[#ff006e]" size={38} />
            <h2 className="mt-8 font-display text-6xl uppercase leading-none text-white">Watch on YouTube</h2>
            <p className="mt-5 leading-8 text-zinc-300">Music videos, behind-the-scenes ritual sessions, lyric breakdowns, and experimental visuals.</p>
            <a href="https://youtube.com/@julialuminarae?si=nUA28NMgm2a3tVeo" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-3 bg-white px-5 py-4 font-mono text-xs uppercase tracking-[0.22em] text-black transition hover:bg-[#ff006e] hover:text-white">
              Open Channel <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section id="support" className="relative border-t border-white/10 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
          <div className="relative min-h-[520px] overflow-hidden border border-white/12 bg-black">
            <img src={supportVisual} alt="CRT ritual support altar" className="absolute inset-0 h-full w-full object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
            <p className="absolute bottom-6 left-6 right-6 font-mono text-xs uppercase tracking-[0.25em] text-[#ffd60a]">Built with support from listeners like you</p>
          </div>
          <div className="border border-white/12 bg-black p-6 sm:p-9">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#06ffa5]">Cash App: $feedthegemini</p>
            <h2 className="mt-4 font-display text-7xl uppercase leading-[0.85] text-white sm:text-8xl">Support<br />Independent<br />Art</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              100% of donations fund Hudson Valley creative projects and community-building. Pay what you want to unlock high-quality downloads.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-4">
              {tiers.map((tier) => (
                <button key={tier.amount} onClick={() => setSelectedAmount(tier.amount)} className={`border p-4 text-left transition ${selectedAmount === tier.amount ? "border-[#ff006e] bg-[#ff006e]/18" : "border-white/12 bg-zinc-950 hover:border-[#00b4d8]"}`}>
                  <span className="font-display text-4xl uppercase text-white">${tier.amount}</span>
                  <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-[#ffd60a]">{tier.label}</span>
                  <span className="mt-2 block text-xs leading-5 text-zinc-500">{tier.detail}</span>
                </button>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={cashUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 bg-[#06ffa5] px-5 py-4 font-mono text-xs uppercase tracking-[0.18em] text-black transition hover:bg-white">
                Send via Cash App <ArrowUpRight size={16} />
              </a>
              <button onClick={unlockDownloads} className="inline-flex items-center justify-center gap-3 border border-white/20 px-5 py-4 font-mono text-xs uppercase tracking-[0.18em] text-white transition hover:border-[#ffd60a] hover:text-[#ffd60a]">
                <Sparkles size={16} /> Honor Unlock
              </button>
            </div>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-500">
              Post-donation flow: honor system unlock → instant download. Status: {unlocked ? "downloads unlocked" : "locked until support / honor unlock"}.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-display text-4xl uppercase leading-none text-white">In Julia We Trust</p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">Cash App: $feedthegemini</p>
          </div>
          <div className="flex flex-wrap gap-4 font-mono text-xs uppercase tracking-[0.16em] text-zinc-400">
            <a href="https://www.instagram.com/thegeminatrix" target="_blank" rel="noreferrer" className="hover:text-[#ff006e]">@thegeminatrix</a>
            <a href="https://www.instagram.com/hudsonvalleymedium" target="_blank" rel="noreferrer" className="hover:text-[#ff006e]">@hudsonvalleymedium</a>
            <a href="https://www.instagram.com/healingcottagecraft" target="_blank" rel="noreferrer" className="hover:text-[#ff006e]">@healingcottagecraft</a>
            <a href="https://youtube.com/@julialuminarae?si=nUA28NMgm2a3tVeo" target="_blank" rel="noreferrer" className="hover:text-[#ff006e]">YouTube</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Waveform({ bars, active, compact = false }: { bars: number[]; active: boolean; compact?: boolean }) {
  return (
    <div className={`mt-5 flex items-end gap-1 ${compact ? "h-10" : "h-16"}`} aria-hidden="true">
      {bars.map((bar, index) => (
        <span
          key={`${bar}-${index}`}
          className={`w-full bg-gradient-to-t from-[#00b4d8] via-[#ff006e] to-[#ffd60a] transition-all duration-300 ${active ? "waveform-live" : "opacity-45"}`}
          style={{ height: `${bar}%`, animationDelay: `${index * 70}ms` }}
        />
      ))}
    </div>
  );
}
