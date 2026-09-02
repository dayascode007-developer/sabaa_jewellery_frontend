"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa6";
import { PiNotepad, PiShoppingCartLight } from "react-icons/pi";
import { AiOutlineLogout } from "react-icons/ai";
import { logout } from "@/store/slices/authSlice";
import PersonalInformation from "./PersonalInformation";
import LogoutConfirmModal from "./LogoutConfirmModal";

const MAROON = "#430121";

const CONTAINER_CLASS = "mx-auto max-w-[1400px] px-4 sm:px-6";

// Tab navigation items (3 tabs - Overview removed)
const tabItems = [
  { id: "personal", label: "Personal Information", icon: PiNotepad },
  { id: "wishlist", label: "Wishlist", icon: FaRegHeart },
  { id: "orders", label: "Order History", icon: PiShoppingCartLight },
];

// Logout is separate - not a tab
const logoutItem = { id: "logout", label: "Logout", icon: AiOutlineLogout, isLogout: true };

export default function AccountDashboard() {
  const [activeSection, setActiveSection] = useState("personal");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { customer, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    dispatch(logout(token));
    router.push("/");
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-[family-name:var(--font-category)]">
      {/* Breadcrumb - full-width background, but content uses same container as header */}
      <div className="bg-white border-b border-gray-200">
        <div className={`${CONTAINER_CLASS} py-4 sm:py-5`}>
          <div className="flex items-center gap-2 text-sm flex-wrap">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/account" className="text-gray-600 hover:text-gray-900">
              My Account
            </Link>
            <span className="text-gray-400">|</span>
            <span style={{ color: MAROON }} className="font-medium">
              {activeSection === "personal" && "Personal Information"}
              {activeSection === "gold" && "Tanishq Digital Gold"}
              {activeSection === "payments" && "Saved Payments Method"}
              {activeSection === "address" && "Address Book"}
              {activeSection === "wishlist" && "Wishlist"}
              {activeSection === "orders" && "Order History"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content - same container as header */}
      <div className={CONTAINER_CLASS}>
        <div className="py-6 md:py-8 pb-24 lg:pb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">My Account</h1>

          {/* Mobile: Horizontal Tab Navigation */}
          <div className="lg:hidden mb-6 overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6 border-0">
            <div className="flex gap-2 whitespace-nowrap py-2">
              {tabItems.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium transition-all rounded-full cursor-pointer ${
                    activeSection === tab.id
                      ? "text-white"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                  style={
                    activeSection === tab.id
                      ? {
                          backgroundColor: MAROON,
                          color: "#FFFFFF",
                        }
                      : {}
                  }
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop & Mobile Layout Container */}
          <div className="flex gap-6 lg:gap-8">
            {/* Desktop: Left Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white border border-gray-200 rounded overflow-hidden sticky top-24">
                <nav className="py-2">
                  <ul>
                    {tabItems.map((tab) => (
                      <li key={tab.id} className="border-b border-gray-100 last:border-b-0">
                        <button
                          onClick={() => setActiveSection(tab.id)}
                          className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-all ${
                            activeSection === tab.id
                              ? "text-white font-medium"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                          style={
                            activeSection === tab.id
                              ? { backgroundColor: MAROON }
                              : {}
                          }
                        >
                          <tab.icon className="text-lg shrink-0" />
                          <span>{tab.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Desktop Logout Section */}
                <div className="border-t border-gray-200 p-0">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 flex items-center gap-3 text-red-600 hover:bg-red-50 transition-all"
                  >
                    <logoutItem.icon className="text-lg shrink-0" />
                    <span className="font-medium">{logoutItem.label}</span>
                  </button>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0">
              {activeSection === "personal" && (
                <PersonalInformation customer={customer} />
              )}

              {activeSection === "gold" && (
                <div className="bg-white border border-gray-200 rounded p-8">
                  <h2 className="text-2xl font-bold mb-6">
                    Tanishq Digital Gold
                  </h2>
                  <p className="text-gray-600">Coming soon...</p>
                </div>
              )}

              {activeSection === "payments" && (
                <div className="bg-white border border-gray-200 rounded p-8">
                  <h2 className="text-2xl font-bold mb-6">
                    Saved Payments Method
                  </h2>
                  <p className="text-gray-600">Coming soon...</p>
                </div>
              )}

              {activeSection === "address" && (
                <div className="bg-white border border-gray-200 rounded p-8">
                  <h2 className="text-2xl font-bold mb-6">Address Book</h2>
                  <p className="text-gray-600">Coming soon...</p>
                </div>
              )}

              {activeSection === "wishlist" && (
                <div className="bg-white border border-gray-200 rounded p-8">
                  <h2 className="text-2xl font-bold mb-6">Wishlist</h2>
                  <p className="text-gray-600">Coming soon...</p>
                </div>
              )}

              {activeSection === "orders" && (
                <div className="bg-white border border-gray-200 rounded p-8">
                  <h2 className="text-2xl font-bold mb-6">Order History</h2>
                  <p className="text-gray-600">Coming soon...</p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onConfirm={handleConfirmLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
    </div>
  );
}
