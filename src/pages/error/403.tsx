import { IllustrationNoAccess, IllustrationNoAccessDark } from "@douyinfe/semi-illustrations";
import { Button, Empty } from "@douyinfe/semi-ui";
import { useNavigate } from "react-router-dom";

export default function forbidden() {
  const navigate = useNavigate();
  return (
    <Empty
      image={<IllustrationNoAccess style={{ width: 150, height: 150 }} />}
      darkModeImage={<IllustrationNoAccessDark style={{ width: 150, height: 150 }} />}
      title="访问禁止"
      description="权限不足！"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        style={{ padding: "6px 24px", width: " 180px" }}
        theme="solid"
        type="primary"
        onClick={() => navigate(-1)}
      >
        返回上一页
      </Button>
    </Empty>
  );
}
