"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategoryLabel, formatDate } from "@/constants/blogData";
import { IoShareSocial } from "react-icons/io5";
import { FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const MAROON = "#7B1E2B";
const GOLD = "#C9A227";

const titleToSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export default function BlogCard({ post, featured = false }) {
  const [showShare, setShowShare] = useState(false);

  const blogSlug = `${post.id}-${titleToSlug(post.title)}`;
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/blogs/${blogSlug}` : "";
  const shareTitle = post.title;

  const handleShare = (platform) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(shareTitle);

    const shareLinks = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };

    if (shareLinks[platform]) {
      window.open(shareLinks[platform], "_blank", "width=600,height=400");
    }
    setShowShare(false);
  };

  return (
    <article
      className={`group relative overflow-hidden rounded-lg border border-[#EFDCD4] bg-white transition-shadow hover:shadow-md ${
        featured ? "sm:grid sm:grid-cols-2 sm:items-stretch" : ""
      }`}
    >
      <div
        className={`relative w-full bg-neutral-100 ${
          featured ? "aspect-[4/3] sm:h-full" : "aspect-square lg:aspect-[4/3]"
        }`}
      >
        <Image
          src={post.cover}
          alt=""
          fill
          sizes={
            featured
              ? "(max-width: 640px) 92vw, 46vw"
              : "(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
          }
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />

        <div className="absolute bottom-3 left-3 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowShare(!showShare);
            }}
            aria-label="Share article"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 transition-all hover:bg-white hover:scale-110 cursor-pointer"
            style={{ color: MAROON }}
          >
            <IoShareSocial className="h-4 w-4" />
          </button>

          {showShare && (
            <div className="absolute bottom-10 left-0 flex gap-2 bg-white rounded-lg p-2 shadow-lg">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare("facebook");
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 transition-all cursor-pointer"
                aria-label="Share on Facebook"
                title="Facebook"
              >
                <FaFacebook className="h-4 w-4" style={{ color: "#1877F2" }} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare("twitter");
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 transition-all cursor-pointer"
                aria-label="Share on Twitter"
                title="Twitter"
              >
                <FaTwitter className="h-4 w-4" style={{ color: "#1DA1F2" }} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare("whatsapp");
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 transition-all cursor-pointer"
                aria-label="Share on WhatsApp"
                title="WhatsApp"
              >
                <FaWhatsapp className="h-4 w-4" style={{ color: "#25D366" }} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare("linkedin");
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 transition-all cursor-pointer"
                aria-label="Share on LinkedIn"
                title="LinkedIn"
              >
                <FaLinkedin className="h-4 w-4" style={{ color: "#0A66C2" }} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        className={`flex flex-col justify-between p-4 ${featured ? "sm:justify-center" : ""}`}
      >
        <div>
          <p className="text-[10px] tracking-[0.14em] text-neutral-500 uppercase">
            {formatDate(post.date)}
          </p>

          <h3
            className={`mt-1.5 font-[family-name:var(--font-heading)] leading-snug ${
              featured
                ? "text-[24px] sm:text-[32px]"
                : "text-[16px] sm:text-[20px]"
            }`}
            style={{ color: MAROON }}
          >
            {post.title}
          </h3>

          <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-600">
            {post.excerpt}
          </p>
        </div>

        <div className="mt-4 flex justify-end">
          <div className="flex items-center justify-center h-8 w-8 rounded-full" style={{ backgroundColor: MAROON }}>
            <FiArrowRight className="h-4 w-4" style={{ color: "white" }} />
          </div>
        </div>
      </div>

      {/* Stretched link — the whole card is the target, and the heading stays
          the accessible name. */}
      <Link
        href={`/blogs/${blogSlug}`}
        className="absolute inset-0"
        aria-label={post.title}
      />
    </article>
  );
}
