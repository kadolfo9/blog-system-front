import { Outlet } from "react-router";
import Header from "./header";

function BaseElement() {
  return (
    <>
      <Header />
      <div style={{ marginTop: '35px' }}>
        <Outlet />
      </div>
    </>
  );
}

export { BaseElement };