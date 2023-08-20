import { AuthProvider } from "@src/context/auth";
import { BrowserRouter } from "react-router-dom";
import "reset-css/reset.css";
import "./App.css";
import PageRoutes from "./router";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <PageRoutes />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
