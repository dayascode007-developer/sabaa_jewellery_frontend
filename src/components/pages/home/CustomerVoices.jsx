"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CUSTOMER_VOICES } from "@/constants/homeData";

const MAROON = "#7B1E2B";
const WHATSAPP = "#25D366";
const INITIAL_COUNT = 4;

// A fixed pseudo-random waveform. Deterministic on purpose — Math.random() here
// would render different bars on the server than in the browser and trip a
// hydration mismatch.
const BARS = [
  8, 14, 20, 12, 26, 18, 30, 22, 14, 28, 34, 20, 12, 24, 32, 16, 26, 10, 22, 30,
  18, 12, 28, 20, 34, 24, 14, 26, 18, 30, 12, 22, 16, 28, 20, 10, 24, 32, 14, 26,
];

function MicIcon({ className }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Profile speaking into a mic, echoing the design's line-art mark */}
      <path d="M8 36c0-10 5-18 12-18 3.5 0 6 2.2 6 5.5 0 4.5-4.5 5.5-4.5 8.5 0 2 2 3 4.5 3" />
      <path d="M8 36c0 9 4.5 15.5 11 18" />
      <path d="M27 15c2-3 5.5-5 9-5" />
      <path d="M30 23c2-2 4.5-3 7-3" />
      <rect x="42" y="20" width="10" height="18" rx="5" />
      <path d="M38 34a9 9 0 0 0 18 0M47 43v8M41 51h12" />
    </svg>
  );
}

function WhatsAppMark({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill={WHATSAPP}
        d="M24 4C13 4 4 13 4 24c0 3.5.9 6.8 2.5 9.6L4 44l10.7-2.4A19.9 19.9 0 0 0 24 44c11 0 20-9 20-20S35 4 24 4Z"
      />
      <path
        fill="#fff"
        d="M33.4 28.5c-.5-.3-3-1.5-3.5-1.6-.5-.2-.8-.3-1.1.2s-1.3 1.6-1.6 1.9c-.3.3-.6.4-1.1.1a14 14 0 0 1-4.1-2.5 15.4 15.4 0 0 1-2.8-3.5c-.3-.5 0-.8.2-1 .2-.2.5-.6.7-.9.2-.3.3-.5.5-.9.2-.3 0-.6 0-.9l-1.5-3.6c-.4-.9-.8-.8-1.1-.8h-1c-.3 0-.9.1-1.3.6-.5.5-1.7 1.7-1.7 4.1s1.8 4.8 2 5.1c.3.3 3.5 5.4 8.6 7.5 3.2 1.4 4.4 1.5 6 1.2 1-.1 3-1.2 3.4-2.4.4-1.2.4-2.2.3-2.4-.1-.2-.4-.3-.9-.6Z"
      />
    </svg>
  );
}

function VoicePlayer({ voice }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0.35);
  const [error, setError] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () =>
      setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
    const onEnd = () => setPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  const toggle = () => {
    if (!voice.audio) {
      setError(true);
      return;
    }
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setError(true));
    }
  };

  const elapsed = () => {
    const [mins, secs] = voice.duration.split(":");
    const total = Number(mins) * 60 + Number(secs);
    const at = Math.floor(total * progress);
    return `${String(Math.floor(at / 60)).padStart(2, "0")}:${String(at % 60).padStart(2, "0")}`;
  };

  const playedBars = Math.round(BARS.length * progress);

  return (
    <div>
      <div
        className="flex items-center gap-2.5 rounded-md px-2.5 py-2"
        style={{ backgroundColor: WHATSAPP }}
      >
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? `Pause ${voice.name} message` : `Play ${voice.name} message`}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white transition-transform hover:scale-105"
          style={{ color: WHATSAPP }}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
              <path d="M8 5h3v14H8zM13 5h3v14h-3z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="ml-0.5 h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
              <path d="M8 5.5v13l11-6.5-11-6.5Z" />
            </svg>
          )}
        </button>

        {/* Bars before the playhead stay solid, the rest fade */}
        <div className="flex h-6 min-w-0 flex-1 items-center gap-[2px]" aria-hidden="true">
          {BARS.map((height, i) => (
            <span
              key={i}
              className="w-[2px] shrink-0 rounded-full transition-colors"
              style={{
                height: `${height}%`,
                minHeight: 3,
                backgroundColor: i < playedBars ? "#ffffff" : "rgba(255,255,255,0.45)",
              }}
            />
          ))}
        </div>

        <span className="shrink-0 text-[9px] tabular-nums text-white/90">{elapsed()}</span>
        <span className="shrink-0 text-[9px] tabular-nums text-white/90">{voice.duration}</span>

        {voice.audio ? <audio ref={audioRef} src={voice.audio} preload="none" /> : null}
      </div>

      {error ? (
        <p className="mt-1 text-[10px] text-neutral-500">
          No audio attached — set <code>audio</code> for {voice.id} in homeData.js.
        </p>
      ) : null}
    </div>
  );
}

function VoiceCard({ voice }) {
  return (
    <article className="flex gap-3 rounded-lg border border-neutral-200 bg-white p-4">
      <div className="flex w-16 shrink-0 flex-col items-center text-center">
        <div className="relative h-14 w-14 overflow-hidden rounded-full bg-neutral-100 ring-1 ring-neutral-200">
          {voice.avatar ? (
            <Image src={voice.avatar} alt="" fill sizes="56px" className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#EDE3D3] to-[#D8C6A8] text-sm font-medium text-[#8A6E45]">
              {voice.name.charAt(0)}
            </div>
          )}
        </div>
        <p className="mt-1.5 text-[12px] font-semibold" style={{ color: MAROON }}>
          {voice.name}
        </p>
        <p className="text-[10px] leading-tight text-neutral-500">{voice.city}</p>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-2">
          <svg viewBox="0 0 24 24" className="mt-0.5 h-3.5 w-3.5 shrink-0" fill={MAROON} aria-hidden="true">
            <path d="M9.5 6C6.5 7.4 5 9.7 5 12.9V18h5.4v-5.3H7.9c0-1.9.8-3.2 2.6-4L9.5 6Zm8.6 0c-3 1.4-4.5 3.7-4.5 6.9V18H19v-5.3h-2.5c0-1.9.8-3.2 2.6-4L18.1 6Z" />
          </svg>
          <h3 className="text-[13px] font-semibold text-neutral-800">{voice.title}</h3>
        </div>

        <div className="mt-1.5 space-y-0.5 text-[11px] leading-snug text-neutral-600">
          {voice.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div className="mt-2.5">
          <VoicePlayer voice={voice} />
        </div>
      </div>
    </article>
  );
}

// `voices` is a prop so API data can be passed in later; the constant is only
// the fallback while this section is static.
export default function CustomerVoices({ voices = CUSTOMER_VOICES }) {
  const [expanded, setExpanded] = useState(false);

  const visible = expanded ? voices : voices.slice(0, INITIAL_COUNT);
  const hasMore = voices.length > INITIAL_COUNT;

  return (
    <section className="w-full bg-gradient-to-b from-[#FDF1EC] via-[#FDF8F5] to-white py-10">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
        <div className="text-center">
          <p
            className="flex items-center justify-center gap-2 text-[11px] font-medium tracking-[0.18em] uppercase"
            style={{ color: MAROON }}
          >
            <span aria-hidden="true">&#10022;&mdash;</span>
            Real People, Real Stories
            <span aria-hidden="true">&mdash;&#10022;</span>
          </p>

          <div className="mt-1 flex items-center justify-center gap-3">
            <MicIcon className="hidden h-14 w-14 text-neutral-700 sm:block" />
            <h2
              className="font-[family-name:var(--font-heading)] text-[40px] leading-tight"
              style={{ color: MAROON }}
            >
              Customer Voices
            </h2>
            <WhatsAppMark className="hidden h-11 w-11 sm:block" />
          </div>

          <div className="mt-1 flex items-center justify-center gap-2">
            <span className="h-px w-14 bg-[#E7D2C4]" />
            <span className="text-[10px]" style={{ color: MAROON }} aria-hidden="true">
              &#10050;
            </span>
            <span className="h-px w-14 bg-[#E7D2C4]" />
          </div>

          <p className="mt-2 text-[13px] leading-relaxed text-neutral-600">
            Listen to genuine feedback from our happy customers
            <br />
            who love our rings and our service.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {visible.map((voice) => (
            <VoiceCard key={voice.id} voice={voice} />
          ))}
        </div>

        {hasMore ? (
          <div className="mt-7 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: MAROON }}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
                <rect x="2.5" y="13" width="4" height="6" rx="2" fill="currentColor" stroke="none" />
                <rect x="17.5" y="13" width="4" height="6" rx="2" fill="currentColor" stroke="none" />
                <path d="M20 19v.5a2.5 2.5 0 0 1-2.5 2.5H13" />
              </svg>
              {expanded
                ? "Show Fewer Voices"
                : `Hear More Customer Voices (${voices.length - INITIAL_COUNT})`}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
