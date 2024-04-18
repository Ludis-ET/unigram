import { useState } from "react";
import { ALLRoutes } from "./routes/ALLRoutes";
import { Header } from "./components";
import { AuthProvider, MessageProvider } from "./context";

function App() {
  return (
    <MessageProvider>
      <AuthProvider>
        <div className="dark:bg-gray-800 min-h-screen">
          <Header />
          <ALLRoutes />
          {/* <Footer/> */}
        </div>
      </AuthProvider>
    </MessageProvider>
  );
}

export default App;
