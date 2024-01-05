import {Outlet} from "react-router";
import {Link} from "react-router-dom";
import "./App.css";

export function Layout() {

    return <div>
        <header class="header">
            <h1>Auto's</h1>
        </header>
        <nav class="mainNav">
            <ul>
                <li class="mainLi"><Link to="/">Alle Autos</Link></li>
                <li><Link to="create">Nieuwe Auto</Link></li>
            </ul>
        </nav>
        <div>
            <Outlet/>
        </div>
    </div>
}