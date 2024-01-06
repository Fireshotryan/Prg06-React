import { Outlet, Link } from "react-router-dom";
import "./App.css";
import "./tailwind.css";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-500 text-white py-4 flex items-center justify-center">
        {/* Center content vertically and horizontally */}
        <Link to="/" className="text-white text-2xl font-bold hover:underline">
          Auto's
        </Link>
      </header>
      <nav className="bg-gray-200 p-4">
        <ul className="flex space-x-4 justify-center">
          <li className="mainLi">
            <Link to="/" className="text-blue-500 hover:underline">
              Alle Autos
            </Link>
          </li>
          <li>
            <Link to="create" className="text-blue-500 hover:underline">
              Nieuwe Auto
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex-1 flex flex-wrap justify-center p-4">
        <Outlet />
      </div>
    </div>
  );
}
