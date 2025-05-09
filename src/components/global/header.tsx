import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

export function Header() {
  const auth = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    auth.handleLogout();
    navigate("/", { replace: true, viewTransition: true });
  };

  const bindLinks = () => {
    const commonLinks =
      <>
        <li>
          <Button variant="secondary" onClick={() => navigate("/")}>Home</Button>
        </li>
        <li>
          <Button variant="secondary" onClick={() => navigate("/about")}>Sobre</Button>
        </li>
      </>
    
    if (auth.signed) {
      return <>
        { commonLinks }
        <li>
          <Button variant="secondary" onClick={() => navigate("/profile")}>Minhas Publicações</Button>
        </li>
        <li className="place-content-end">
          <Button variant="destructive" onClick={handleLogout}>Sair</Button>
        </li>
      </>
    } else {
      return <>
        { commonLinks }
        <li className="place-content-end">
          <Button variant="secondary" onClick={() => navigate('/auth')}>Login</Button>
        </li>
      </>
    }
  }

  return (
    <nav className="center bg-gray-100 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <ul className="menu">
          { bindLinks() }
        </ul>
      </div>
    </nav>
  );
}