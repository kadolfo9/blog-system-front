import { Outlet } from "react-router";

export function BaseElement() {
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  )
}