import { useAuth } from "@/hooks/use-auth";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export function Header() {
  const auth = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    auth.handleLogout();
    navigate("/", { replace: true, viewTransition: true });
  };

  useEffect(() => {}, [navigate]);

  const bindLinks = () => {
    const commonLinks =
      <>
        <li>
          <Link to="/">
            <Button variant="secondary">Home</Button>
          </Link>
        </li>
        <li>
          <Link to="/about">
            <Button variant="secondary">Sobre</Button>
          </Link>
        </li>
      </>
    
    if (auth.signed) {
      return <>
        { commonLinks }
        <li>
          <Link to="/profile">
            <Button variant="secondary">Minhas Publicações</Button>
          </Link>
        </li>
        <li className="place-content-end p-1">
          <Button variant="destructive" onClick={handleLogout}>Sair</Button>
        </li>
      </>
    } else {
      return <>
        { commonLinks }
        <li className="place-content-end">
          <Link to="/auth">
            <Button variant="secondary">Login</Button>
          </Link>
        </li>
      </>
    }
  }

  return (
    <nav className="center bg-gray-100 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
        <ul className="menu">
          { bindLinks() }
        </ul>
      </div>
    </nav>
  );
}