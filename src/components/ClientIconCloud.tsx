"use client";

import dynamic from "next/dynamic";

const IconCloud = dynamic(() => import("./magicui/IconCloud"), { ssr: false });

interface ClientIconCloudProps {
  iconSlugs: string[];
  width?: string;
  height?: string;
}

export default function ClientIconCloud({
  iconSlugs,
  width = "100%",
  height = "auto",
}: ClientIconCloudProps) {
  return <IconCloud iconSlugs={iconSlugs} width={width} height={height} />;
}
