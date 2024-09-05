import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import App from "./App.tsx";
import "./index.css";
import { ThirdwebProvider } from "thirdweb/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThirdwebProvider>
      <App />
    </ThirdwebProvider>
  </Provider>
);
