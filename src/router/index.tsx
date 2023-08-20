import { set } from "lodash-es";
import { ComponentType, FC, Suspense, lazy } from "react";
import { useRoutes, RouteObject } from "react-router-dom";
import PageLoading from "@components/page-loading";

function wrapSuspense(importer: () => Promise<{ default: ComponentType }>) {
  if (!importer) {
    return undefined;
  }
  // 使用 React.lazy 包裹 () => import() 语法
  const Component = lazy(importer);
  // 结合 Suspense，这里可以自定义 loading 组件
  return (
    <Suspense fallback={<PageLoading message="正在加载中" />}>
      <Component />
    </Suspense>
  );
}

//遍历文件目录获取文件路径对象
function generateRoutePaths(): Record<string, any> {
  const modules = import.meta.glob([
    "/src/pages/**/*.{ts,tsx}",
    "!/src/pages/**/components**",
    "!/src/pages/error/**",
    "!/src/pages/login/**",
  ]);
  const routePaths = {};
  Object.keys(modules).forEach(filePath => {
    const routePath = filePath
      .replace("/src/pages/", "")
      .replace(/.tsx?/, "")
      .replace(/\[([\w-]+)]/, ":$1")
      .replace(/([\w-]+)/, "$1")
      .split("/");
    // 使用 lodash.set 合并为一个对象
    const filteredPath = routePath.filter(p => /^(_layout|[^._])/.test(p));
    set(routePaths, filteredPath, modules[filePath]);
  });
  return routePaths;
}

//将文件路径对象映射为React路由
function mapPathsToRoute(paths: Record<string, any>): RouteObject[] {
  // route 的子节点为数组
  return Object.entries(paths).map(([routePath, child]) => {
    // () => import() 语法判断
    if (typeof child === "function") {
      // 等于 index 则映射为当前根路由
      const isIndex = routePath === "index";
      return {
        index: isIndex,
        path: isIndex ? undefined : routePath,
        // 转换为组件
        element: wrapSuspense(child),
      };
    }
    // 否则为目录，则查找下一层级
    const { _layout, ...rest } = child;

    return {
      path: routePath,
      // layout 处理
      element: wrapSuspense(_layout),
      // 递归 children
      children: mapPathsToRoute(rest),
    };
  });
}

function generateMainRoutes(): RouteObject[] {
  const routePaths = generateRoutePaths();
  const mainLayout = () => import("@src/layout");
  return [
    {
      path: "/",
      element: wrapSuspense(mainLayout),
      children: mapPathsToRoute(routePaths),
    },
  ];
}

//生成主路由
export const mainRoutes = generateMainRoutes();

//声明公共路由
const publicRoutes: RouteObject[] = [
  {
    path: "login",
    element: wrapSuspense(() => import("@pages/login")),
  },
  {
    path: "/403",
    element: wrapSuspense(() => import("@pages/error/403")),
  },
  {
    path: "*",
    element: wrapSuspense(() => import("@pages/error/404")),
  },
];

const PageRoutes: FC = () => {
  return useRoutes([...mainRoutes, ...publicRoutes]);
};

export default PageRoutes;
