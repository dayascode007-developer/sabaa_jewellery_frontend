"use client";

import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { fetchUnboxingVideos } from "@/store/slices/unboxingSlice";
import { YouTubeShimmer } from "@/components/shimmer-loader/Shimmer-loader";

const MAROON = "#7B1E2B";
const INITIAL_COUNT = 4;

function getYouTubeVideoId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube-nocookie\.com\/embed\/)([^&\n?#]+)/,
  ];
  for (let pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function YouTubeMark({ className }) {
  return (
    <svg viewBox="0 0 28 20" className={className} aria-hidden="true">
      <rect width="28" height="20" rx="5" fill="#FF0000" />
      <path d="M11 5.8v8.4L18.5 10 11 5.8Z" fill="#fff" />
    </svg>
  );
}

function VideoCard({ video, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(video)}
      aria-label={`Play: ${video.title}`}
      className="group relative block aspect-square w-full overflow-hidden rounded-lg bg-neutral-900 text-left"
    >
      {video.thumbnail ? (
        <Image
          src={video.thumbnail}
          alt=""
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 23vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#3B2A22] via-[#241713] to-[#4A2C24]" />
      )}

      {/* Keeps the overlaid text legible whatever the thumbnail looks like */}
      <span className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/10 to-black/70" />

      <span className="absolute inset-x-0 top-0 flex gap-2 p-2.5">
        <span
          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold text-white ring-1 ring-[#C9A227]"
          style={{ backgroundColor: MAROON }}
        >
          S
        </span>
        <span className="min-w-0">
          <span className="line-clamp-2 text-[11px] leading-snug font-medium text-white">
            {video.title}
          </span>
          <span className="mt-0.5 block text-[9px] text-neutral-300">{video.channel}</span>
        </span>
      </span>

      <span className="absolute inset-0 flex items-center justify-center">
        <span
          className="flex h-12 w-12 items-center justify-center rounded-full text-white ring-4 ring-white/25 transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: MAROON }}
        >
          <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d="M8 5.5v13l11-6.5-11-6.5Z" />
          </svg>
        </span>
      </span>

      <span className="absolute inset-x-0 bottom-0 flex items-center justify-between p-2.5">
        <span className="rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white">
          {video.duration}
        </span>
        <span className="flex items-center gap-1 rounded bg-white px-1.5 py-1 text-[9px] font-medium text-neutral-800">
          <span>Watch on</span>
          <YouTubeMark className="h-2.5 w-3.5" />
        </span>
      </span>
    </button>
  );
}

function VideoModal({ video, onClose }) {
  // Escape closes it, and the page behind stops scrolling while it is open.
  // The `!video` guard must be INSIDE the effect: hooks run unconditionally, so
  // without it this locks body scroll on page load and never restores it.
  useEffect(() => {
    if (!video) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [video, onClose]);

  if (!video) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl overflow-hidden rounded-lg bg-black"
      >
        <div className="flex items-center justify-between gap-3 bg-neutral-900 px-4 py-2.5">
          <p className="truncate text-sm text-white">{video.title}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="shrink-0 text-neutral-400 transition-colors hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {video.youtubeId ? (
          <div className="aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
        ) : (
          <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 px-6 text-center">
            <YouTubeMark className="h-6 w-9" />
            <p className="text-sm text-neutral-300">No video linked yet</p>
            <p className="max-w-sm text-xs text-neutral-500">
              Set <code className="text-neutral-400">youtubeId</code> for{" "}
              <span className="text-neutral-400">{video.id}</span> in homeData.js
              and it will play here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CustomerUnboxing() {
  const dispatch = useDispatch();
  const { videos, loading } = useSelector((state) => state.unboxing);
  const [expanded, setExpanded] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    dispatch(fetchUnboxingVideos({ limit: 50, offset: 0 }));
  }, [dispatch]);

  const closeModal = useCallback(() => setActiveVideo(null), []);

  // Transform API videos to match component format
  const transformedVideos = videos.map((video) => ({
    id: video.id,
    title: video.title,
    channel: "Sabaa Jewel Arts",
    youtubeId: getYouTubeVideoId(video.youtube_link),
    youtube_link: video.youtube_link,
    thumbnail: `https://img.youtube.com/vi/${getYouTubeVideoId(video.youtube_link)}/maxresdefault.jpg`,
    duration: "0:00",
  }));

  const displayVideos = loading ? [] : transformedVideos;
  const visible = expanded ? displayVideos : displayVideos.slice(0, INITIAL_COUNT);
  const hasMore = displayVideos.length > INITIAL_COUNT;

  return (
    <section className="w-full bg-[#FAF8F6] py-10">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
        <div className="text-center">
          <p
            className="flex items-center justify-center gap-2 text-[11px] tracking-[0.2em] uppercase"
            style={{ color: MAROON }}
          >
            <span aria-hidden="true">&#8226;</span>
            Real Moments, Real Smiles
            <span aria-hidden="true">&#8226;</span>
          </p>

          <h2
            className="mt-1 font-[family-name:var(--font-heading)] text-[26px] leading-tight sm:text-[32px] lg:text-[40px]"
            style={{ color: MAROON }}
          >
            Customer Unboxing
          </h2>

          <div className="mt-1 flex items-center justify-center gap-2">
            <span className="h-px w-14 bg-[#E0CDBA]" />
            <span className="text-[11px]" style={{ color: MAROON }} aria-hidden="true">
              &#10050;
            </span>
            <span className="h-px w-14 bg-[#E0CDBA]" />
          </div>

          <p className="mt-1.5 text-[16px] text-neutral-600">
            Watch our customers unbox their orders and share their joy!
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            <YouTubeShimmer count={8} />
          ) : (
            visible.map((video) => (
              <VideoCard key={video.id} video={video} onOpen={setActiveVideo} />
            ))
          )}
        </div>

        {!loading && hasMore ? (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: MAROON }}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M4 6.5A1.5 1.5 0 0 1 5.5 5h8A1.5 1.5 0 0 1 15 6.5v11A1.5 1.5 0 0 1 13.5 19h-8A1.5 1.5 0 0 1 4 17.5v-11ZM16.5 9.5l3.2-2.1a.8.8 0 0 1 1.3.7v7.8a.8.8 0 0 1-1.3.7l-3.2-2.1v-5Z" />
              </svg>
              {expanded
                ? "Show Fewer Videos"
                : `View More Unboxing Videos (${displayVideos.length - INITIAL_COUNT})`}
            </button>
          </div>
        ) : null}
      </div>

      <VideoModal video={activeVideo} onClose={closeModal} />
    </section>
  );
}
