import { Suspense } from "react";
import MobileRegistration from "@/components/pages/MobileRegistration";

export const metadata = {
  title: "Complete Registration — Sabaa Jewel Arts",
  description: "Complete your registration by verifying your mobile number",
};

export default function MobileRegistrationPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><p>Loading...</p></div>}>
      <MobileRegistration />
    </Suspense>
  );
}
