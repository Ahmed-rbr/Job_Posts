import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {}
      </main>
      <ToastContainer
        position="top-center"
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        newestOnTop
        toastStyle={{
          textAlign: "center",
          fontSize: "1.2rem",
        }}
      />{" "}
    </>
  );
};

export default MainLayout;
