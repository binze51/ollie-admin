import { IconBell, IconHelpCircle } from "@douyinfe/semi-icons";
import { Avatar, Badge, Button, Dropdown, Layout, Nav } from "@douyinfe/semi-ui";
import { useAuth } from "@src/context/auth";
import { FC } from "react";

const { Header } = Layout;

const Index: FC = () => {
  const question = () => {
    window.open("https://www.baidu.com");
  };

  const auth = useAuth();
  return (
    <Header className="layout-header">
      <Nav
        mode="horizontal"
        // header={<Breadcrumb />}
        footer={
          <>
            <Button
              theme="borderless"
              icon={<IconHelpCircle size="large" />}
              style={{
                color: "var(--semi-color-text-2)",
                marginRight: "12px",
              }}
              onClick={question}
            />
            <Badge count={5} type="danger">
              <Button
                theme="borderless"
                icon={<IconBell />}
                style={{
                  color: "var(--semi-color-text-2)",
                  marginRight: "12px",
                }}
              />
            </Badge>

            <Dropdown
              render={
                <Dropdown.Menu>
                  <Dropdown.Item>个人中心</Dropdown.Item>
                  <Dropdown.Item>个人设置</Dropdown.Item>
                  <Dropdown.Item onClick={() => auth.signout()}>退出登录</Dropdown.Item>
                </Dropdown.Menu>
              }
            >
              <Avatar color="orange" size="small">
                semi
              </Avatar>
            </Dropdown>
          </>
        }
      ></Nav>
    </Header>
  );
};

export default Index;
