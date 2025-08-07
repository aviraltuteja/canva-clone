"use client";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

export default function ImageUploadButton({
  onUploadComplete,
}: {
  onUploadComplete: (url: string) => void;
}) {
  return (
    <div className=" bg-blackshade text-whiteshade w-96">
      <UploadButton<OurFileRouter, "imageUploader">
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res && res[0]?.url) {
            onUploadComplete(res[0].url);
          }
        }}
        onUploadError={(error: Error) => {
          alert(`Upload failed: ${error.message}`);
        }}
      />
    </div>
  );
}

export const UploadDefaultButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
