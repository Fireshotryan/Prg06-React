import {useState} from "react";
import "./App.css";

const URI_COLLECTION = "http://145.24.222.71:8000/autos"

export function NieuweAuto(props) {
    console.log(props);

    const [auto, setAuto] = useState({
        brand: "",
        model: "",
        year: "",
        color: "",
        price: ""
    })

    const saveAuto = (event) => {
        event.preventDefault()

        fetch(URI_COLLECTION, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(auto)
        })
            .then((response) => props.autosRefreshHandler())
    }

    const onChangeHandler = (event) => {
        setAuto({
            ...auto,
            [event.target.name]: event.target.value
        })
    }

    return <section>
        <h2>Nieuwe Auto</h2>
        <form>
            <input type="text" value={auto.brand} name="brand" onChange={onChangeHandler}/><br/>
            <input type="text" value={auto.model} name="model" onChange={onChangeHandler}/><br/>
            <input type="text" value={auto.year} name="year" onChange={onChangeHandler}/><br/>
            <input type="text" value={auto.color} name="color" onChange={onChangeHandler}/><br/>
            <input type="text" value={auto.price} name="price" onChange={onChangeHandler}/><br/>
            <button onClick={saveAuto}>SAVE</button>
        </form>
    </section>;
}