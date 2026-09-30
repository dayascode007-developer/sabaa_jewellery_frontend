import os from "os";

// Next blocks cross-origin requests to /_next dev resources by default, so
// opening the site on a LAN address serves the HTML but never the JS chunks —
// the page renders and nothing is interactive. Detecting the addresses here
// keeps this working after DHCP hands out a different IP.
const lanAddresses = Object.values(os.networkInterfaces())
  .flat()
  .filter((net) => net && net.family === "IPv4" && !net.internal)
  .map((net) => net.address);

// The API base URL is baked into the browser bundle, so "localhost" would mean
// the *visitor's* machine — every request from a phone or a second laptop is
// refused. Defaulting to this machine's LAN address makes the same build work
// from here and from any device on the wifi, and it follows the IP when DHCP
// changes it.
//
// Setting NEXT_PUBLIC_API_URL in .env (or .env.production) still wins, which is
// how the deployed site points at its real domain.
const apiPort = process.env.API_PORT || "5000";
const apiUrl =
  process.env.NEXT_PUBLIC_API_URL || `http://${lanAddresses[0] ?? "localhost"}:${apiPort}`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { NEXT_PUBLIC_API_URL: apiUrl },
  allowedDevOrigins: [...new Set(lanAddresses), "*.loca.lt"],
  images: {
    // NOT unoptimized: HeroBanner builds its <picture> art direction from
    // getImageProps, asking for a 2400x900 desktop srcSet and a 736x736 mobile
    // one. With optimization off both collapse to the original file and the
    // banner renders cropped.
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      // The API serves product and banner images over plain HTTP in
      // development. Its address is DHCP-assigned, so it is detected the same
      // way allowedDevOrigins is above — a hostname pinned here goes stale the
      // next time the router hands out a different IP, and every image from the
      // API silently stops loading.
      ...["localhost", "127.0.0.1", ...new Set(lanAddresses)].map((hostname) => ({
        protocol: "http",
        hostname,
      })),
      {
        protocol: "http",
        hostname: "192.168.29.163",
      },
      {
        protocol: "https",
        hostname: "*.loca.lt",
      },
    ],
  },
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
};

export default nextConfig;
