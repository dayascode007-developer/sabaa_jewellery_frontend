"use client";

// Meta (Facebook) Pixel.
//
// Meta's own snippet assumes a full page load per view. The App Router
// navigates on the client, so that snippet reports PageView once — whatever
// page the visitor landed on — and never again. Every later page is invisible,
// which makes retargeting and funnel reporting wrong rather than merely
// incomplete. The effect below re-fires PageView on each route change.
//
// Nothing renders until NEXT_PUBLIC_META_PIXEL_ID is set, so local development
// and preview builds never write into the production dataset.

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export default function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // The inline script below already fires PageView for the first render, so the
  // first effect run would double-count it.
  const firstRun = useRef(true);

  useEffect(() => {
    if (!PIXEL_ID) return;

    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    // fbq is defined by the snippet. It can legitimately be missing when an ad
    // blocker drops the request, so this never assumes it exists.
    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [pathname, searchParams]);

  if (!PIXEL_ID) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>

      {/* Fallback for browsers with JavaScript disabled. Meta's console warns
          about a missing noscript tag without it. */}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
