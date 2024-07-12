// App.jsx
import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { AuthContextProvider } from "./context/AuthContext";
import { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <AuthContextProvider>
       <Toaster />
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
};

export default App;
