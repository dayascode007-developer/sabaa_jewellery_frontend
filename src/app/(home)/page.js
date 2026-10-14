import Home from "@/components/pages/Home";
import { loaderDelay } from "@/lib/loaderDelay";

export default async function Page() {
  // No-op unless NEXT_PUBLIC_LOADER_DELAY is set; see lib/loaderDelay.
  await loaderDelay();

  return <Home />;
}
