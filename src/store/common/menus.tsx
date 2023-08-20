import { IconActivity, IconSemiLogo, IconSetting, IconUser } from "@douyinfe/semi-icons";
import { NavHeaderProps, NavItems } from "@douyinfe/semi-ui/lib/es/navigation";
import { create } from "zustand";

interface Menus {
  header: React.ReactNode | NavHeaderProps;
  menuList: NavItems;
}

export const useMenusStore = create<Menus>(_ => ({
  header: {
    logo: <IconSemiLogo style={{ height: "36px", fontSize: 36 }} />,
    text: "Semi 运营后台",
  },
  menuList: [
    {
      itemKey: "/dashboard",
      text: "Dashboard",
      icon: <IconActivity />,
    },
    {
      itemKey: "/user",
      text: "用户管理",
      icon: <IconUser />,
    },
    {
      itemKey: "/setting",
      text: "系统设置",
      icon: <IconSetting />,
    },
  ],
}));
