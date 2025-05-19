import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Manual from "./pages/Manual.jsx";
import ProfileCompletion from "./pages/ProfileCompletion/ProfileCompletion.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import AnimatedPage from "./components/animator/AnimatedPage.jsx";

function AnimatedLayout() {
  return (
    <div style={{ position: "relative" }}>
      <AnimatePresence mode="wait" initial={false}>
        <AnimatedOutlet />
      </AnimatePresence>
    </div>
  );
}
function AnimatedOutlet() {
  const location = useLocation();
  return (
    <AnimatedPage key={location.pathname}>
      <Outlet />
    </AnimatedPage>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AnimatedLayout />,
    children: [
      { index: true, element: <App /> },
      { path: "manual", element: <Manual /> },
      { path: "complete-profile", element: <ProfileCompletion /> },
      { path: "unknown", element: <NotFound /> },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
