import React from "react";

export default function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}): React.ReactElement {
  return (
    <button
      className="p-2 bg-whiteshade text-blackshade hover:bg-gray-300 cursor-pointer rounded-sm"
      onClick={onClick}>
      {children}
    </button>
  );
}
