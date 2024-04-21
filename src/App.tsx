import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";
function App() {
  const state = useSelector((state: any) => state?.userCheck);
  // if (state?.isLoggedIn === true) {
  //   location.href = `${window.location.origin}/login`;
  // }
  return (
    <div className="App">
      <RouterProvider router={router} /> 
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerClassName="toast-container-custom"
        toastOptions={{
          success: {
            style: {
              backgroundColor: "#009049",
              color: "#fff",
              fontSize: "16px",
            },
          },
          error: {
            style: {
              backgroundColor: "red",
              color: "#fff",
              fontSize: "16px",
            },
          },
        }}
      />
    </div>
  );
}

export default App;