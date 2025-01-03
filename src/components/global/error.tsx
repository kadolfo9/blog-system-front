import { useNavigate } from "react-router";

function Error() {
  const navigate = useNavigate();

  return (
    <>
      <div className="grid place-content-center bg-white px-3">
        <div className="text-center">
          <h1 className="text-8xl font-black text-gray-200">404</h1>

          <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Oops!</p>

          <p className="mt-4 text-gray-500">Essa página não foi encontrada.</p>

          <a
            href="#"
            className="mt-6 inline-block rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
            onClick={() => navigate("/", { replace: true })}
          >
              Voltar
          </a>
        </div>
      </div>
    </>
  );
}

export { Error };