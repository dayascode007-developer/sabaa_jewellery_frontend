"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "@/components/pages/blogs/BlogCard";
import { fetchBlogs } from "@/store/slices/blogsSlice";
import { BlogCardShimmer } from "@/components/shimmer-loader/Shimmer-loader";

const MAROON = "#7B1E2B";
const GOLD = "#C9A227";

// The same ornament lockup the home, About and Policy sections use.
function SectionHead({ eyebrow, title, children }) {
  return (
    <div className="text-center">
      {eyebrow ? (
        <p
          className="flex items-center justify-center gap-2 text-[11px] font-medium tracking-[0.2em] uppercase"
          style={{ color: MAROON }}
        >
          <span aria-hidden="true">&#10022;&mdash;</span>
          {eyebrow}
          <span aria-hidden="true">&mdash;&#10022;</span>
        </p>
      ) : null}

      <h2
        className="mt-2 font-[family-name:var(--font-heading)] text-[26px] leading-tight sm:text-[32px] lg:text-[40px]"
        style={{ color: MAROON }}
      >
        {title}
      </h2>

      <div className="mt-2 flex items-center justify-center gap-2">
        <span className="h-px w-14 bg-[#E0CDBA]" />
        <span className="text-[10px]" style={{ color: MAROON }} aria-hidden="true">
          &#10050;
        </span>
        <span className="h-px w-14 bg-[#E0CDBA]" />
      </div>

      {children ? (
        <p className="mx-auto mt-3 max-w-[720px] text-[16px] leading-relaxed text-neutral-600">
          {children}
        </p>
      ) : null}
    </div>
  );
}

const CATEGORY_ICONS = {
  ring: (
    <>
      <circle cx="12" cy="14" r="6" />
      <path d="m9 7 3-4 3 4" />
    </>
  ),
  lotus: (
    <>
      <path d="M12 20c-4.5 0-8-2.8-8-6.2 1.6-.9 3.3-.7 4.8.3M12 20c4.5 0 8-2.8 8-6.2-1.6-.9-3.3-.7-4.8.3" />
      <path d="M12 20c-2.6 0-4.7-3.3-4.7-7.4 0-3.2 2-6.4 4.7-8.6 2.7 2.2 4.7 5.4 4.7 8.6C16.7 16.7 14.6 20 12 20Z" />
    </>
  ),
  gift: (
    <>
      <rect x="3.5" y="9" width="17" height="11" rx="1.5" />
      <path d="M2.5 9h19M12 9v11" />
      <path d="M12 9c-1.7-3.2-3.2-4.3-4.7-3.6C6 6 6.5 8.5 12 9Zm0 0c1.7-3.2 3.2-4.3 4.7-3.6C18 6 17.5 8.5 12 9Z" />
    </>
  ),
  lamp: (
    <>
      <path d="M12 4.5c1.4 1.6 1.4 3 0 4.5-1.4-1.5-1.4-2.9 0-4.5Z" />
      <path d="M4.5 13.5h15c-.7 3.3-3.7 5.5-7.5 5.5s-6.8-2.2-7.5-5.5Z" />
      <path d="M9 13.5c0-1.7 1.3-3 3-3s3 1.3 3 3" />
    </>
  ),
  // A struck seal with a tick — assurance, not decoration.
  seal: (
    <>
      <path d="M12 3.2 14 5l2.6-.4 1 2.4 2.4 1-.4 2.6 1.8 2-1.8 2 .4 2.6-2.4 1-1 2.4L14 22.4l-2 1.8" />
      <path d="M12 3.2 10 5l-2.6-.4-1 2.4-2.4 1 .4 2.6L2.6 12.6l1.8 2-.4 2.6 2.4 1 1 2.4 2.6-.4 2 1.8" />
      <path d="M9 12.4 11.2 14.6 15.4 10.2" />
    </>
  ),
  // A hand under a ring — the piece is held, not machined.
  hand: (
    <>
      <circle cx="12" cy="6.5" r="3.2" />
      <path d="M4.5 20.5c0-1.6.9-3 2.4-3.6l2.4-1c.4-.2.9-.3 1.4-.3h6.4a1.6 1.6 0 0 1 0 3.2h-3.3" />
      <path d="M4.5 20.5h15" />
    </>
  ),
};

function CategoryIcon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {CATEGORY_ICONS[name]}
    </svg>
  );
}

export default function Blogs() {
  const dispatch = useDispatch();
  const { blogs, loading } = useSelector((state) => state.blogs);

  useEffect(() => {
    // Refetch blogs when pathname changes or component mounts
    // This ensures fresh data when user navigates back from admin/blog details
    dispatch(fetchBlogs({ limit: 50, offset: 0 }));
  }, [dispatch]);

  const transformedBlogs = blogs.map((blog) => ({
    id: blog.id,
    slug: blog.id.toString(),
    title: blog.title,
    excerpt: blog.description,
    cover: blog.main_image,
    date: blog.published_date,
    category: "festival_guides",
  }));

  return (
    <main className="bg-[#FDF0F2]">
      <section className="py-12">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
          <SectionHead eyebrow="From the workshop" title="Sabaa Journal">
            Notes on the craft, the metal and the traditions behind it — written by
            the people at the bench, not by a marketing team.
          </SectionHead>

          <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:max-w-5xl xl:mx-auto">
            {loading ? (
              <BlogCardShimmer count={6} />
            ) : (
              transformedBlogs.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
