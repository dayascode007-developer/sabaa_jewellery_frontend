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
      <AccountDashboard />
      <BottomNav />
    </>
  );
}
