import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import "./App.css";

const URI_COLLECTION = "http://145.24.222.71:8000/autos"

export function AutoDetail() {
    const params = useParams()

    const [auto, setAutos] = useState(null);

    const loadJson = () => {
        fetch(URI_COLLECTION + "/" + params.id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((result) => setAutos(result))
    }

    useEffect(() => {
        loadJson()
    }, [])

    return <section>
        <h1>{auto && auto.brand}</h1>
        <p>{auto && auto.model}</p>
        <p>{auto && auto.year}</p>
        <p>{auto && auto.color}</p>
        <p>{auto && auto.price}</p>
    </section>
}