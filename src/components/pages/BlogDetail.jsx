import Image from "next/image";
import Link from "next/link";
import BlogCard from "@/components/pages/blogs/BlogCard";
import { GiSwirlString } from "react-icons/gi";
import {
  getCategoryLabel,
  getRelatedPosts,
  formatDate,
} from "@/constants/blogData";

const MAROON = "#7B1E2B";
const GOLD = "#C9A227";

function ContentSection({ section, index }) {
  const hasText = section.text?.trim();
  const hasImage = section.image;

  if (!hasText && !hasImage) {
    return null;
  }

  // Alternate: text first on even indexes, image first on odd
  const textFirst = index % 2 === 0;

  return (
    <div className="space-y-6">
      {section.heading && (
        <h2
          className="mt-8 font-[family-name:var(--font-heading)] text-[20px] leading-snug sm:text-[24px]"
          style={{ color: MAROON }}
        >
          {section.heading}
        </h2>
      )}

      {hasText && hasImage ? (
        <div className="flex flex-col gap-8">
          {textFirst ? (
            <>
              <div className="text-[16px] leading-relaxed text-neutral-700"
                dangerouslySetInnerHTML={{ __html: section.text }} />
              <img src={section.image} alt={section.heading || "Blog section"}
                className="w-full h-80 object-cover rounded-lg shadow-lg" />
            </>
          ) : (
            <>
              <img src={section.image} alt={section.heading || "Blog section"}
                className="w-full h-80 object-cover rounded-lg shadow-lg" />
              <div className="text-[16px] leading-relaxed text-neutral-700"
                dangerouslySetInnerHTML={{ __html: section.text }} />
            </>
          )}
        </div>
      ) : hasImage ? (
        <img src={section.image} alt={section.heading || "Blog section"}
          className="w-full h-80 object-cover rounded-lg shadow-lg" />
      ) : (
        <div className="text-[16px] leading-relaxed text-neutral-700"
          dangerouslySetInnerHTML={{ __html: section.text }} />
      )}
    </div>
  );
}

export default function BlogDetail({ post }) {
  return (
    <main>
      <article>
        {/* Header */}
        <header className="bg-[#FDF0F2] py-10">
          <div className="mx-auto w-full max-w-[820px] px-4 text-center sm:px-6">
            <h1
              className="mt-4 font-[family-name:var(--font-heading)] text-[26px] leading-tight sm:text-[32px] lg:text-[40px]"
              style={{ color: MAROON }}
            >
              {post.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[13px] text-neutral-600">
              <GiSwirlString
                className="h-4 w-4"
                style={{ color: GOLD }}
                aria-hidden="true"
              />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <GiSwirlString
                className="h-4 w-4 scale-x-[-1]"
                style={{ color: GOLD }}
                aria-hidden="true"
              />
            </div>
          </div>
        </header>

        {/* Cover */}
        <div className="mx-auto w-full max-w-[900px] px-4 sm:px-6">
          <div className="relative -mt-2 w-full overflow-hidden rounded-lg bg-neutral-100 ring-1 ring-[#EFDCD4]">
            <img
              src={post.cover}
              alt={post.title}
              className="w-full h-auto object-cover"
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
            <span
              className="text-[10px]"
              style={{ color: MAROON }}
              aria-hidden="true"
            >
              &#10050;
            </span>
            <span className="h-px flex-1 bg-[#E0CDBA]" />
          </div>

          <div className="space-y-12">
            {post.content && post.content.length > 0 ? (
              <>
                {console.log("Total sections:", post.content.length, post.content)}
                {post.content.map((section, i) => (
                  <ContentSection key={i} section={section} index={i} />
                ))}
              </>
            ) : (
              <p>No content sections</p>
            )}
          </div>
        </div>
      </article>
    </main>
  );
}
