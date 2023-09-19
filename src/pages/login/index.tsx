import { Space, Card ,Tag,} from "@douyinfe/semi-ui";
import { useEffect, useLayoutEffect, useRef} from "react";
import { createAccountClient} from "@pb_gen/account";
import { Toast } from "@douyinfe/semi-ui";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@src/context/auth";
import { generalHttpHandler } from "@utils/http";

const appId ="cli_a441f47133ba500c";
const redirect_uri = `${window.location.origin}/`;

export default function loginPage() {
  const QRLoginObj=useRef(null);
  const gotoUrl =useRef("");
  const qrDiv =useRef("feishu_qr");

  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener('message', handleEventMessage, false);
    return ()=>{
      window.removeEventListener('message', handleEventMessage, false);
    }
  },[]);

  useLayoutEffect(()=>{
    // 从飞书那边获取内嵌QR
    gotoUrl.current = `https://passport.feishu.cn/suite/passport/oauth/authorize?client_id=${appId}&redirect_uri=${encodeURI(redirect_uri)}&response_type=code&state=success_login`;
    // @ts-ignore
    QRLoginObj.current = window.QRLogin({
      id: qrDiv.current,
      goto: gotoUrl.current,
      style: "width: 270px; height: 270px; margin: 0; border: 0; background-size: cover",
    });
  },[]);

  // 页面校验和监听QR扫描事件
 const handleEventMessage = function (event:any) {
      const origin = event.origin;
      // @ts-ignore
      if (QRLoginObj?.current?.matchOrigin(origin)
        && window.location.href.indexOf('/') > -1
      ) {
        if (window.location.search.indexOf('code') !== -1) return;
        const loginTmpCode = event.data;
        window.location.href = `${gotoUrl.current}&tmp_code=${loginTmpCode}`;
      }
    };

  useEffect(() => {
    if (window.location.search.indexOf('code') !== -1){
      //获取code+redirect_uri后发起后端接口调用，获取后端token和用户信息TODO
      const queryParams = new URLSearchParams(window.location.search);
      const fetchData=async () => {
        const {info,status } = await createAccountClient(generalHttpHandler).LoginQR({redirectUrl:redirect_uri,code:queryParams.get("code") as string});
        if (status?.code === 0) {
          auth.signin(info);
          Toast.success("登录成功！");
          navigate("/");
        } else {
          Toast.error("登录拒绝");
        }
      };
      //执行
      fetchData();
    }
  },[]);


  return (
    <div className="flex justify-center items-center h-screen">
      <Card shadows="always" style={{ cursor: 'auto'}}   
            footerLine={ true }
            footerStyle={{ display: 'flex', justifyContent: 'center' }}
            footer={
                <Space>
                  <Tag color="blue" type="ghost">请使用飞书app扫码登录系统</Tag>
                </Space>
            }>
      <div id={qrDiv.current}></div> 
      </Card>
    </div>
  );
};