import FullScreenLoader from "@/components/common/SabaaLoader";

// Nav-bar links, category tiles and product cards all land in this segment,
// so it uses the jewellery strip (Sabaa loader V-2).
// Each section declares its own loader rather than inheriting one from the
// root — an ancestor loading.js would flash first and then be replaced.
export default function Loading() {
  return <FullScreenLoader variant="strip" message="Opening the piece" />;
}
