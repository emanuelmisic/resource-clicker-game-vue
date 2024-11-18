import { ICONS } from "./constants";

function getIcon(key: string): string | null {
  if (key in ICONS) return ICONS[key];
  return null;
}

function getLevel(item: string): number {
  const arr = item.split(":");
  return parseInt(arr[arr.length - 1]);
}

export { getIcon, getLevel };
