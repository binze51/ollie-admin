import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode> StrictMode模式导致useEffect多次执行
    <App />
  // </React.StrictMode>
);
