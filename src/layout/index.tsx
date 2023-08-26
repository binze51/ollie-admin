import  { Suspense } from "react";
import { Layout } from "@douyinfe/semi-ui";
import Header from "@src/layout/header";
import Sider from "@src/layout/sider";
import Footer from "@src/layout/footer";
import { Outlet } from "react-router-dom";
import PageLoading from "@components/page-loading";
import { RequireAuth } from "@src/context/auth";

const { Content } = Layout;

export default function mainLayout() {
  return (
    <RequireAuth>
      <Layout className="layout-page h-screen">
        <Sider />
        <Layout>
          <Header />
          <Content className="layout-content">
            <Suspense fallback={<PageLoading />}>
              <Outlet />
            </Suspense>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </RequireAuth>
  );
}
