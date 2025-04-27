import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router";

export function Header() {
  const auth = useAuth();

  const navigate = useNavigate();

  const bindLinks = () => {
    const commonLinks =
      <>
        <li>
          <a onClick={() => navigate("/")}>Home</a>
        </li>
        <li>
          <a onClick={() => navigate("/about")}>Sobre</a>
        </li>
      </>
    
    if (auth.signed) {
      return <>
        { commonLinks }
        <li>
          <a onClick={() => navigate("/profile")}>Minhas Publicações</a>
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