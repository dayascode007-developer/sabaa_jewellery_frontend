import Image from "next/image";
import Link from "next/link";
import { getCategoryLabel, formatDate } from "@/constants/blogData";

const MAROON = "#7B1E2B";
const GOLD = "#C9A227";

export default function BlogCard({ post, featured = false }) {
  return (
    <article
      className={`group relative overflow-hidden rounded-lg border border-[#EFDCD4] bg-white transition-shadow hover:shadow-md ${
        featured ? "sm:grid sm:grid-cols-2 sm:items-stretch" : ""
      }`}
    >
      <div className={`relative w-full bg-neutral-100 ${featured ? "aspect-[4/3] sm:h-full" : "aspect-[4/3]"}`}>
        <Image
          src={post.cover}
          alt=""
          fill
          sizes={featured ? "(max-width: 640px) 92vw, 46vw" : "(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <span
          className="absolute top-3 left-3 rounded-full px-2.5 py-1 text-[11px] font-medium text-white"
          style={{ backgroundColor: MAROON }}
        >
          {getCategoryLabel(post.category)}
        </span>
      </div>

      <div className={`flex flex-col p-5 ${featured ? "sm:justify-center" : ""}`}>
        <p className="text-[11px] tracking-[0.14em] text-neutral-500 uppercase">
          {formatDate(post.date)}
        </p>

        <h3
          className={`mt-2 font-[family-name:var(--font-heading)] leading-snug ${
            featured ? "text-[24px] sm:text-[32px]" : "text-[20px] sm:text-[24px]"
          }`}
          style={{ color: MAROON }}
        >
          {post.title}
        </h3>

        <p className="mt-2 text-[16px] leading-relaxed text-neutral-600">{post.excerpt}</p>

        <span
          className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium"
          style={{ color: MAROON }}
        >
          Read article
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>

      {/* Stretched link — the whole card is the target, and the heading stays
          the accessible name. */}
      <Link href={`/blogs/${post.slug}`} className="absolute inset-0" aria-label={post.title} />
    </article>
  );
}
