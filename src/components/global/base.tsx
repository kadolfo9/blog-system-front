import { Outlet } from "react-router";
import { Header } from "./header";

import "../../assets/css/index.css";

export default function BaseElement() {
  return (
    <div className="min-h-screen">
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  )
}