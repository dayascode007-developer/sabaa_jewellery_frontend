import SignUp from "@/components/pages/SignUp";

export const metadata = {
  title: "Sign Up — Sabaa Jewel Arts",
  description:
    "Create a Sabaa Jewel Arts account for coupons, offers and order updates on customized Panchalogam jewellery.",
};

// No SiteHeader/Footer here on purpose — this is a standalone card, the same
// way the reference lays it out. The logo in the card links back home.
export default function SignUpPage() {
  return <SignUp />;
}
