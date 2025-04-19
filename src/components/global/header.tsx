export function Header() {
  return (
    <nav className="center bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <ul className="menu">
          <li>Home</li>
          <li>Sobre</li>
          <li>Publicações</li>
        </ul>
      </div>
    </nav>
  );
}