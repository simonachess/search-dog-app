import React, { useState } from "react";

function GetApi() {

    const [response, setResponse] = useState({
        data: '',
        type: ''
    });
    const [isPending, setIsPending] = useState(false)
    const [input, setInput] = useState('');

    const handleClick = async () => {
        setIsPending(true);

        try {
            // let response = await fetch("https://dog.ceo/api/breeds/list/all");
            let response = await fetch(`https://dog.ceo/api/breed/${input.toLowerCase()}/images/random`);

            let data = await response.json();
            setResponse({ data: data.message, type: data.status });
            console.log('data', data)
            setIsPending(false);
        }
        catch (error) {
            console.log(error);
            setIsPending(false);
            setResponse({
                data: 'Something went wrong...',
                type: 'error'
            });
        }
    }
    const handleChange = (e) => {
        setInput(e.target.value)
    }

    return (
        <div className="container">
            <header>
                <h1>Šunų nuotraukų paieška</h1>
            </header>
            <section>
                <input type='text' value={input} onChange={handleChange}></input>
                {!isPending && <button id="btn-get" onClick={handleClick}>Ieškoti</button>}
                {isPending && <button id="btn-get" disabled>Ieškoma...</button>}
                {response.type === 'error' && <div className="nothing"><p>Nieko nerasta... </p><p>Bandykite įvesti kitą veislę</p></div>}
                {response.type === 'success' &&
                    <div>
                        <img src={response.data} alt='dog'></img>
                    </div>
                }
            </section>
        </div>
    );
}

export default GetApi;
