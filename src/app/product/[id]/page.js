import { loaderDelay } from "@/lib/loaderDelay";
import ProductPageClient from "./ProductPageClient";

// See the note in category/[slug]/page.js — same split, same reason. The
// client body reads its own params via useParams, so nothing is passed down.
export default async function ProductPage() {
  // No-op unless NEXT_PUBLIC_LOADER_DELAY is set; see lib/loaderDelay.
  await loaderDelay();

  return <ProductPageClient />;
}
