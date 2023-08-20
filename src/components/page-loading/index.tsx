type Props = {
  message: string;
  description?: string;
};

function PageLoading({ message }: Props) {
  return <div className="flex justify-center">{message}</div>;
}

PageLoading.defaultProps = {
  message: "正在加载中~",
};

export default PageLoading;
