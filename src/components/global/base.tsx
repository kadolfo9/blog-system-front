import { Outlet } from "react-router";
import { Header } from "./header";

import "@/assets/css/index.css";

export function BaseElement() {
  return (
    <>
      <div>
        <Header />
        <Outlet />
      </div>
    </>
  )
}