"use client";

import { useEffect, useRef, useState } from "react";

export default function PhotoRingPreview({ ringImageUrl, customerPhoto }) {
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!canvasRef.current || !ringImageUrl) {
      setIsLoading(false);
      return;
    }

    if (!customerPhoto) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Load ring image
    const ringImg = new Image();
    ringImg.crossOrigin = "anonymous";

    ringImg.onload = () => {
      // Set canvas size to match ring image aspect ratio
      canvas.width = ringImg.width;
      canvas.height = ringImg.height;

      // Draw ring background
      ctx.drawImage(ringImg, 0, 0);

      // Load customer photo
      const photoImg = new Image();

      photoImg.onload = () => {
        // Calculate center position and size for the photo frame
        // Most photo rings have the photo frame in the center, roughly 30-40% of the ring size
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const photoFrameSize = Math.min(canvas.width, canvas.height) * 0.38;

        // Save canvas state for clipping
        ctx.save();

        // Create circular clipping path for the photo (most rings have circular photo frames)
        ctx.beginPath();
        ctx.arc(centerX, centerY, photoFrameSize / 2, 0, Math.PI * 2);
        ctx.clip();

        // Calculate photo dimensions to fill the circular frame while maintaining aspect ratio
        const photoAspect = photoImg.width / photoImg.height;
        let photoWidth = photoFrameSize;
        let photoHeight = photoFrameSize / photoAspect;

        // If photo is taller than wide, adjust
        if (photoHeight > photoFrameSize) {
          photoHeight = photoFrameSize;
          photoWidth = photoFrameSize * photoAspect;
        }

        // Center the photo within the frame
        const photoX = centerX - photoWidth / 2;
        const photoY = centerY - photoHeight / 2;

        // Draw the customer photo
        ctx.drawImage(photoImg, photoX, photoY, photoWidth, photoHeight);

        // Restore canvas state
        ctx.restore();

        setIsLoading(false);
      };

      photoImg.onerror = () => {
        setIsLoading(false);
      };

      // Convert File to URL for preview
      const photoUrl =
        customerPhoto instanceof File
          ? URL.createObjectURL(customerPhoto)
          : customerPhoto;

      photoImg.src = photoUrl;

      // Cleanup URL when component unmounts or photo changes
      return () => {
        if (customerPhoto instanceof File) {
          URL.revokeObjectURL(photoUrl);
        }
      };
    };

    ringImg.onerror = () => {
      setIsLoading(false);
    };

    ringImg.src = ringImageUrl;
  }, [ringImageUrl, customerPhoto]);

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        className="rounded-lg border border-[#EFDCD4] overflow-hidden bg-[#FFFDFB]"
        style={{ maxHeight: "300px", maxWidth: "100%", minHeight: "200px" }}
      />
      {isLoading && (
        <p className="text-center text-[12px] text-gray-400 mt-2">
          Updating preview...
        </p>
      )}
    </div>
  );
}
