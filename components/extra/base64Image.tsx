"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Base64ImageProps } from "@/app/features/message-type";

const Base64Image = ({
  base64,
  mimeType,
  alt = "",
  className,
  width,
  height,
}: Base64ImageProps) => {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const byteString = atob(base64);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeType });
    const url = URL.createObjectURL(blob);
    setSrc(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [base64, mimeType]);

  if (!src) return null;

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default Base64Image;
