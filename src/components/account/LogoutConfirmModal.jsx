"use client";

const MAROON = "#430121";

export default function LogoutConfirmModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4"
      style={{ zIndex: 10000, backgroundColor: "transparent" }}
    >
      <div className="bg-white rounded-xl shadow-lg max-w-sm w-full">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            Confirm Logout
          </h2>
        </div>

        {/* Modal Content */}
        <div className="px-6 py-5">
          <p className="text-sm md:text-base text-gray-600">
            Are you sure you want to logout?
          </p>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-5 border-t border-gray-200 flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-5 md:px-6 py-2.5 md:py-3 text-sm md:text-base border-2 rounded-3xl font-semibold transition-all hover:opacity-85"
            style={{
              borderColor: MAROON,
              color: MAROON,
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 md:px-6 py-2.5 md:py-3 text-sm md:text-base rounded-3xl font-semibold text-white transition-all hover:opacity-90 shadow-md"
            style={{ backgroundColor: "#DC2626" }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
