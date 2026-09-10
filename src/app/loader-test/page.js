"use client";

/* ===========================================================================
 * TEMPORARY — a page for checking the two loaders on demand.
 *
 * Open  /loader-test  and press either button. The loader covers the screen
 * for four seconds, or until you click it.
 *
 *   mark  — rings assembling into the Sabaa mark.
 *           Used by: home page, and the footer-link pages (about, policy, blogs)
 *   strip — the jewellery line-art strip.
 *           Used by: nav links, category listings and product pages
 *
 * TO REMOVE: delete this one file. Nothing else in the project refers to it,
 * and no existing file was changed to add it.
 * ======================================================================== */

import { useEffect, useState } from "react";
import Link from "next/link";
import FullScreenLoader from "@/components/common/SabaaLoader";

const MAROON = "#7B1E2B";

const TESTS = [
  {
    variant: "mark",
    title: "Mark loader",
    where: "Home page, and the footer links — About, Policy, Blogs",
    message: "Crafting your page",
  },
  {
    variant: "strip",
    title: "Strip loader",
    where: "Nav links, category pages and product pages",
    message: "Opening the piece",
  },
];

export default function LoaderTestPage() {
  const [active, setActive] = useState(null);

  // Closes itself, so a forgotten test cannot leave the screen covered.
  useEffect(() => {
    if (!active) return;
    const timer = setTimeout(() => setActive(null), 4000);
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <main className="mx-auto w-full max-w-[720px] px-6 py-16">
      <p className="text-[11px] tracking-[0.2em] uppercase" style={{ color: MAROON }}>
        Temporary test page
      </p>
      <h1
        className="mt-2 font-[family-name:var(--font-heading)] text-[30px] leading-tight"
        style={{ color: MAROON }}
      >
        Loader preview
      </h1>
      <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">
        Press a button to play that loader full screen for four seconds. Click
        anywhere on it to close it sooner.
      </p>

      <div className="mt-8 space-y-4">
        {TESTS.map((t) => (
          <div
            key={t.variant}
            className="rounded-lg border border-[#EFDCD4] bg-white p-4 sm:flex sm:items-center sm:gap-4"
          >
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-medium text-neutral-900">{t.title}</p>
              <p className="mt-0.5 text-[13px] leading-snug text-neutral-500">
                {t.where}
              </p>
              <p className="mt-1 text-[12px] text-neutral-400">
                variant=&quot;{t.variant}&quot; · {t.message}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setActive(t)}
              className="mt-3 w-full shrink-0 rounded-md px-6 py-2.5 text-[14px] font-medium text-white transition-opacity hover:opacity-90 sm:mt-0 sm:w-auto"
              style={{ backgroundColor: MAROON }}
            >
              Play
            </button>
          </div>
        ))}
      </div>

      <Link
        href="/"
        className="mt-8 inline-block text-[14px] underline underline-offset-2"
        style={{ color: MAROON }}
      >
        Back to the shop
      </Link>

      {active ? (
        <div onClick={() => setActive(null)} className="fixed inset-0 z-[100]">
          <FullScreenLoader variant={active.variant} message={active.message} />
        </div>
      ) : null}
    </main>
  );
}
