import React from "react";
import { useThemeStore } from "./components/useThemeStore";

const App = () => {
  const { theme } = useThemeStore();

  return (
    <div data-theme={theme} className="h-screen bg-base-100">
      hello
    </div>
  );
};

export default App;
