import { Suspense } from "react";
import SiteHeader from "@/components/layout/SiteHeader";
import BottomNav from "@/components/layout/BottomNav";
import AccountDashboard from "@/components/account/AccountDashboard";

export const metadata = {
  title: "My Account — Sabaa Jewel Arts",
  description: "Manage your account, orders, and preferences",
};

export default function AccountPage() {
  return (
    <>
      <SiteHeader />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <AccountDashboard />
      </Suspense>
      <BottomNav />
    </>
  );
}
