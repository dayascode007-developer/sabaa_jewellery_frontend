"use client";

import {
  HiArrowsPointingOut,
  HiSparkles,
  HiOutlinePaintBrush,
  HiUser,
  HiCalendarDays,
  HiScale,
} from "react-icons/hi2";
import { GiGoldBar } from "react-icons/gi";
import { MdOutlineTempleHindu } from "react-icons/md";
import { GiGlobeRing } from "react-icons/gi";
import { IoDiamondOutline } from "react-icons/io5";
import { GoShieldCheck } from "react-icons/go";
import { TbAward } from "react-icons/tb";
import { LiaHandHoldingHeartSolid } from "react-icons/lia";

const ICON_COLOR = "#C4A47A";
const MAROON = "#7B1E2B";

export default function SpecificationSection({ product }) {
  const specs = [
    { label: "Material Composition", value: "Aimbon Panchaloga", icon: GiGoldBar },
    { label: "Dimensions", value: "Top 20mm", icon: HiArrowsPointingOut },
    { label: "Finish Details", value: "Antique", icon: HiSparkles },
    { label: "Manufacturing Method", value: "Handmade", icon: LiaHandHoldingHeartSolid },
    { label: "Metal", value: "Aimbon Panchaloga", icon: IoDiamondOutline },
    { label: "Purity", value: "Panchaloga", icon: TbAward },
    { label: "Finish", value: "Antique", icon: HiOutlinePaintBrush },
    { label: "Gender", value: "Unisex", icon: HiUser },
    { label: "Occasion", value: "Temple", icon: HiCalendarDays },
    { label: "Religion", value: "Hindu", icon: MdOutlineTempleHindu },
    { label: "Weight (g)", value: "18g-25g based on size varies", icon: HiScale },
    { label: "Adjustable", value: "No", icon: GiGlobeRing },
    { label: "Usage", value: "Daily wear", icon: GoShieldCheck },
  ];

  return (
    <div className="mt-8 pt-4 md:pt-6 border-t border-neutral-200 bg-white rounded-lg p-4 md:p-6">
      <h3
        className="mb-4 md:mb-6 font-[family-name:var(--font-category)] text-[14px] md:text-[16px] font-medium"
        style={{ color: MAROON }}
      >
        Specification
      </h3>
      <div className="space-y-3 md:space-y-4">
        {specs.map((spec, index) => {
          const IconComponent = spec.icon;
          return (
            <div key={index} className="flex gap-2 md:gap-4">
              <div className="flex-shrink-0 pt-0.5" style={{ color: ICON_COLOR }}>
                <IconComponent size={20} />
              </div>
              <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between min-w-0">
                <p className="text-[12px] md:text-[14px] text-neutral-700">
                  {spec.label}
                </p>
                <p className="text-[12px] md:text-[14px] font-medium text-neutral-900 md:text-right">
                  {spec.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
