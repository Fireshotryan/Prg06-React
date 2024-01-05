import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import "./App.css";
import "./tailwind.css";

export function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-blue-500 text-white py-4 flex items-center justify-center"> {/* Center content vertically and horizontally */}
        <h1 className="text-2xl font-bold">Auto's</h1>
      </header>
            <nav className="bg-gray-200 p-4">
                <ul className="flex space-x-4 flex items-center justify-center">
                    <li className="mainLi">
                        <Link to="/" className="text-blue-500 hover:underline">Alle Autos</Link>
                    </li>
                    <li>
                        <Link to="create" className="text-blue-500 hover:underline">Nieuwe Auto</Link>
                    </li>
                </ul>
            </nav>
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
}
