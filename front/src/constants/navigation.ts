import { Rocket } from "lucide-react";
import { EXAMPLE_PATH } from "./router";
import { LayoutDashboard } from "lucide-react";
import { MAIN_PATH } from "./router";

export const NAV_ITEMS: NavItem[] = [
    {
      path: MAIN_PATH,
      icon: LayoutDashboard,
      label: 'Dashboard'
    },
    {
      path: EXAMPLE_PATH,
      icon: Rocket,
      label: 'Example'
    }
  ];