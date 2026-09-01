import { notFound } from "next/navigation";
import SiteHeader from "@/components/layout/SiteHeader";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import Breadcrumb from "@/components/common/Breadcrumb";
import BlogDetail from "@/components/pages/BlogDetail";
import { BLOG_POSTS, getPostBySlug, getCategoryLabel } from "@/constants/blogData";

// Pre-renders every article at build time. Once posts come from an API this
// becomes a fetch, and the rest of the page is unchanged.
export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

// Every post is known at build time, so anything outside that list is a real
// 404. Without this, an unknown slug renders the not-found page with a 200
// status — a soft 404, which search engines index as a valid page. Flip this
// back to true when posts start coming from an API.
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article not found — Sabaa Jewel Arts" };

  return {
    title: `${post.title} — Sabaa Jewel Arts`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  // An unknown slug is a 404, not an empty article page.
  if (!post) notFound();

  return (
    <div className="min-h-screen w-full bg-white pb-16 lg:pb-0">
      <SiteHeader />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blogs", href: "/blogs" },
          { label: getCategoryLabel(post.category), href: `/blogs#${post.category}` },
          { label: post.title },
        ]}
      />

      <BlogDetail post={post} />

      <Footer />
      <BottomNav />
    </div>
  );
}
