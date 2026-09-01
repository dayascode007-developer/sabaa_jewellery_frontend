import Login from "@/components/pages/Login";

export const metadata = {
  title: "Login — Sabaa Jewel Arts",
  description:
    "Log in to your Sabaa Jewel Arts account to see your coupons, offers and order updates.",
};

// No SiteHeader/Footer here on purpose — this is a standalone card, the same
// way the reference lays it out. The logo in the card links back home.
export default function LoginPage() {
  return <Login />;
}
