import { Suspense } from "react";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/layout/SiteHeader";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import Breadcrumb from "@/components/common/Breadcrumb";
import BlogDetail from "@/components/pages/BlogDetail";
import { BlogDetailShimmer } from "@/components/shimmer-loader/Shimmer-loader";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Allow dynamic params since we're fetching from API
export const dynamicParams = true;

async function fetchBlogById(id) {
  try {
    const response = await fetch(`${API_URL}/api/blogs/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Failed to fetch blog:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await fetchBlogById(slug);

  if (!blog) {
    return { title: "Article not found — Sabaa Jewel Arts" };
  }

  return {
    title: `${blog.title} — Sabaa Jewel Arts`,
    description: blog.description,
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = await fetchBlogById(slug);

  // An unknown slug is a 404, not an empty article page.
  if (!blog) notFound();

  // Transform API blog data to match BlogDetail component format
  const post = {
    id: blog.id,
    slug: blog.id.toString(),
    title: blog.title,
    excerpt: blog.description,
    cover: blog.main_image,
    date: blog.published_date,
    author: "Sabaa Team",
    category: "festival_guides",
    content: blog.content.map((section) => ({
      heading: section.heading,
      text: section.text,
      image: section.image,
    })),
  };

  return (
    <div className="min-h-screen w-full bg-white pb-16 lg:pb-0">
      <SiteHeader />

      <Suspense fallback={<BlogDetailShimmer />}>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blogs", href: "/blogs" },
            { label: post.title },
          ]}
        />

        <BlogDetail post={post} />
      </Suspense>

      <Footer />
      <BottomNav />
    </div>
  );
}
