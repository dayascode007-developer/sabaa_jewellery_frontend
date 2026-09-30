import os from "os";

// Next blocks cross-origin requests to /_next dev resources by default, so
// opening the site on a LAN address serves the HTML but never the JS chunks —
// the page renders and nothing is interactive. Detecting the addresses here
// keeps this working after DHCP hands out a different IP.
const lanAddresses = Object.values(os.networkInterfaces())
  .flat()
  .filter((net) => net && net.family === "IPv4" && !net.internal)
  .map((net) => net.address);

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [...new Set(lanAddresses), "*.loca.lt"],
  images: {
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
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
