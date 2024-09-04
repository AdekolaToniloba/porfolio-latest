"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import {
  Cloud,
  fetchSimpleIcons,
  ICloud,
  renderSimpleIcon,
  SimpleIcon,
} from "react-icon-cloud";

const DynamicCloud = dynamic(
  () => import("react-icon-cloud").then((mod) => mod.Cloud),
  { ssr: false }
);

const createCloudProps = (
  width: string,
  height: string
): Omit<ICloud, "children"> => ({
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: width,
      height: height,
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
  },
});

const renderCustomIcon = (icon: SimpleIcon, theme: string) => {
  const bgHex = theme === "light" ? "#f3f2ef" : "#080510";
  const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff";
  const minContrastRatio = theme === "dark" ? 2 : 1.2;
  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: any) => e.preventDefault(),
    },
  });
};

export type IconCloudProps = {
  iconSlugs: string[];
  width?: string;
  height?: string;
};

export default function ClientIconCloud({
  iconSlugs,
  width = "70%",
  height = "70%",
}: IconCloudProps) {
  const [data, setData] = useState<Record<string, SimpleIcon> | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    fetchSimpleIcons({ slugs: iconSlugs }).then((result) =>
      setData(result.simpleIcons)
    );
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data) return null;
    return Object.values(data).map((icon) =>
      renderCustomIcon(icon, theme || "light")
    );
  }, [data, theme]);
  const cloudProps = createCloudProps(width, height);

  if (!renderedIcons) return null;

  return <DynamicCloud {...cloudProps}>{renderedIcons}</DynamicCloud>;
}
