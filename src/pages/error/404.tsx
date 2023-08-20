import { IllustrationNotFound, IllustrationNotFoundDark } from "@douyinfe/semi-illustrations";
import { Button, Empty } from "@douyinfe/semi-ui";
import { useNavigate } from "react-router-dom";

export default function notFound() {
  const navigate = useNavigate();
  return (
    <Empty
      image={<IllustrationNotFound style={{ width: 150, height: 150 }} />}
      darkModeImage={<IllustrationNotFoundDark style={{ width: 150, height: 150 }} />}
      title="找不到咯"
      description="这里什么也没有~"
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
        onClick={() => navigate(`/`, { replace: true })}
      >
        回到首页
      </Button>
    </Empty>
  );
}
