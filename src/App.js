import {useEffect, useState} from "react";
import {Auto} from "./Auto";
import {NieuweAuto} from "./NieuweAuto";
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import {Layout} from "./Layout";
import {Error} from "./Error";
import {AutoDetail} from "./AutoDetail";
import "./App.css";

const URI_COLLECTION = "http://145.24.222.71:8000/autos"

export function App() {
    const [autos, setAutos] = useState([]);

    const loadJson = () => {
        fetch(URI_COLLECTION, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((result) => setAutos(result.items))
    }

    const showAutos = autos.map((value, key) =>
        <Auto key={value.id} auto={value} autosRefreshHandler={loadJson}/>)

    useEffect(loadJson, [])

    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={showAutos}/>
                <Route path="create" element={<NieuweAuto autosRefreshHandler={loadJson}/>}/>
                <Route path="autos/:id" element={<AutoDetail/>}/>
                <Route path="*" element={<Error/>}/>
            </Route>
        </Routes>
    </BrowserRouter>;
}