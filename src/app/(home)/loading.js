import FullScreenLoader from "@/components/common/SabaaLoader";

// Homedss pageS and footer links use the rotating Sabaa mark (Sabaa Loader).
// Each section declares its own loader rather than inheriting one from the
// root — an ancestor loading.js would flash first and then be replaced.
export default function Loading() {
  return <FullScreenLoader variant="mark" message="Crafting your page" />;
}
