import Image from "next/image";
import Link from "next/link";
import BlogCard from "@/components/pages/blogs/BlogCard";
import {
  getCategoryLabel,
  getRelatedPosts,
  formatDate,
} from "@/constants/blogData";

const MAROON = "#7B1E2B";
const GOLD = "#C9A227";

// One renderer per block type. Adding a type to blogData means adding a case
// here and nowhere else.
function Block({ block }) {
  switch (block.type) {
    case "h":
      return (
        <h2
          className="mt-8 font-[family-name:var(--font-heading)] text-[20px] leading-snug sm:text-[24px]"
          style={{ color: MAROON }}
        >
          {block.text}
        </h2>
      );

    case "ul":
      return (
        <ul className="mt-3 space-y-2">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-[16px] leading-relaxed text-neutral-700">
              <span
                className="mt-[9px] h-1.5 w-1.5 shrink-0 rotate-45"
                style={{ backgroundColor: GOLD }}
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <blockquote
          className="mt-6 border-l-2 py-1 pl-4 text-[16px] leading-relaxed text-neutral-700 italic"
          style={{ borderColor: GOLD }}
        >
          {block.text}
        </blockquote>
      );

    case "note":
      return (
        <p className="mt-6 rounded-lg border border-[#EFDCD4] bg-[#FDF8F3] p-4 text-[16px] leading-relaxed text-neutral-700">
          {block.text}
        </p>
      );

    default:
      return (
        <p className="mt-4 text-[16px] leading-relaxed text-neutral-700">{block.text}</p>
      );
  }
}

export default function BlogDetail({ post }) {
  const related = getRelatedPosts(post);

  return (
    <main>
      <article>
        {/* Header */}
        <header className="bg-[#FDF0F2] py-10">
          <div className="mx-auto w-full max-w-[820px] px-4 text-center sm:px-6">
            <Link
              href={`/blogs#${post.category}`}
              className="inline-block rounded-full px-3 py-1 text-[11px] font-medium tracking-[0.14em] text-white uppercase transition-opacity hover:opacity-90"
              style={{ backgroundColor: MAROON }}
            >
              {getCategoryLabel(post.category)}
            </Link>

            <h1
              className="mt-4 font-[family-name:var(--font-heading)] text-[26px] leading-tight sm:text-[32px] lg:text-[40px]"
              style={{ color: MAROON }}
            >
              {post.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[13px] text-neutral-600">
              <span>{post.author}</span>
              <span aria-hidden="true" style={{ color: GOLD }}>
                &#10050;
              </span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
          </div>
        </header>

        {/* Cover */}
        <div className="mx-auto w-full max-w-[900px] px-4 sm:px-6">
          <div className="relative -mt-2 aspect-[16/9] w-full overflow-hidden rounded-lg bg-neutral-100 ring-1 ring-[#EFDCD4]">
            <Image
              src={post.cover}
              alt=""
              fill
              sizes="(max-width: 900px) 92vw, 900px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Body */}
        <div className="mx-auto w-full max-w-[760px] px-4 pt-8 pb-12 sm:px-6">
          <p className="text-[16px] leading-relaxed font-medium text-neutral-800">
            {post.excerpt}
          </p>

          <div className="mt-2 flex items-center gap-2">
            <span className="h-px w-14 bg-[#E0CDBA]" />
            <span className="text-[10px]" style={{ color: MAROON }} aria-hidden="true">
              &#10050;
            </span>
            <span className="h-px flex-1 bg-[#E0CDBA]" />
          </div>

          {post.content.map((block, i) => (
            <Block key={i} block={block} />
          ))}

          {/* Ask us — every article ends on a way to reach a person */}
          <div className="mt-10 rounded-lg border border-[#EFDCD4] bg-[#FDF8F3] p-5">
            <h2
              className="font-[family-name:var(--font-heading)] text-[20px] leading-snug sm:text-[24px]"
              style={{ color: MAROON }}
            >
              Still have a question?
            </h2>
            <p className="mt-1.5 text-[16px] leading-relaxed text-neutral-600">
              Message us and a person at the workshop will answer — not a script.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://wa.me/917871900140"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-4 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#25D366" }}
              >
                Ask on WhatsApp
              </a>
              <Link
                href="/about#contact"
                className="rounded-full border px-4 py-2 text-[13px] font-medium transition-colors hover:bg-[#FDF0F2]"
                style={{ borderColor: MAROON, color: MAROON }}
              >
                All contact options
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium transition-opacity hover:opacity-70"
              style={{ color: MAROON }}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 12H5M11 6l-6 6 6 6" />
              </svg>
              Back to all articles
            </Link>
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length ? (
        <section className="bg-[#FAF8F6] py-12">
          <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
            <div className="text-center">
              <h2
                className="font-[family-name:var(--font-heading)] text-[26px] leading-tight sm:text-[32px]"
                style={{ color: MAROON }}
              >
                Keep Reading
              </h2>
              <div className="mt-2 flex items-center justify-center gap-2">
                <span className="h-px w-14 bg-[#E0CDBA]" />
                <span className="text-[10px]" style={{ color: MAROON }} aria-hidden="true">
                  &#10050;
                </span>
                <span className="h-px w-14 bg-[#E0CDBA]" />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <BlogCard key={item.slug} post={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
