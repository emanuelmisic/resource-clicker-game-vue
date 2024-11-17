import { ICONS } from "./constants";

function getIcon(key: string): string | null {
  if (key in ICONS) return ICONS[key];
  return null;
}

export default {
  install(app: any) {
    app.config.globalProperties.$getIcon = getIcon;
  },
};
