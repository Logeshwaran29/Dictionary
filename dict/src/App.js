import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
    const [word, setWord] = useState('');
    const [definition, setDefinition] = useState('');
    const [parts, setParts] = useState('');
    const [a, setA] = useState('');
    const [t, setT] = useState(true);
    const [mean, setMean] = useState('');
    const [syn, setSyn] = useState('');

    const wordEnter = (e) => {
        const a = e.target.value;
        setWord(a);
    }
    const change = () => {
        const a = document.querySelector("#body");
        const b = document.querySelector("#div");
        const c = document.querySelector("#b1");
        if (t) {
            a.style.backgroundColor = "black";
            b.style.backgroundColor = "grey";
            b.style.color = "black";
            c.style.color = "white";
            c.style.backgroundColor = "black";
            c.style.borderColor = "white";
            setT(false);
        } else {
            a.style.backgroundColor = "rgb(148, 146, 146)";
            b.style.backgroundColor = "black";
            b.style.color = "white";
            c.style.color = "black";
            c.style.backgroundColor = "white";
            c.style.borderColor = "black";
            setT(true);
        }
    }

    const enter = () => {
        axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then((res) => {
                const data = res.data[0];
                setDefinition(data.meanings[0].definitions[0].definition);
                setParts(data.meanings[0].partOfSpeech);
                setA("Parts Of Speech: ");
                setMean("Synonyms: ");
                setSyn(data.meanings[0].synonyms[0]);
                console.log(res);
            })
            .catch((error) => {
                setDefinition("OOPS! Word not Found");
                setParts('');
                setA('');
                setMean('');
                setSyn('');
            })
    }
    return ( <
        div className = "App" >
        <
        div > < button id = "b1"
        onClick = { change } > < i class = "fa-regular fa-sun" > < /i></button > < /div> <
        div id = "div" >
        <
        h1 > DICTIONARY < /h1> <
        input type = "text"
        id = "in"
        placeholder = 'Enter a word'
        value = { word }
        onChange = { wordEnter }
        required > < /input> <
        button id = "button"
        onClick = { enter } > < i class = "fa-solid fa-magnifying-glass" > < /i></button > < br / >
        <
        div id = "d1" > < h3 > { definition } < /h3> <
        h3 > { a } { parts } < /h3> <
        h3 > { mean } { syn } < /h3> <
        /div> <
        /div> <
        /div>
    );
}

export default App;