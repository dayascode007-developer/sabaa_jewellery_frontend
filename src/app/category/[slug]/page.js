import { loaderDelay } from "@/lib/loaderDelay";
import CategoryPageClient from "./CategoryPageClient";

// The page body is a client component (redux, hooks), and a client component
// cannot be async — so the delay cannot live inside it. This thin server
// wrapper does the awaiting instead: Next suspends the segment while it runs
// and shows category/loading.js, which is the strip loader being tested.
export default async function CategoryPage({ params }) {
  // No-op unless NEXT_PUBLIC_LOADER_DELAY is set; see lib/loaderDelay.
  await loaderDelay();

  return <CategoryPageClient params={params} />;
}
