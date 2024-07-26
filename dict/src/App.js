import './App.css';
import { useState } from 'react';
import axios from 'axios';
import Image from './Images/img.png';

function App() {
    const [word, setWord] = useState('');
    const [definition, setDefinition] = useState('');
    const [parts, setParts] = useState('');
    const [mean, setMean] = useState('');
    const [phonetics, setphonetics] = useState([]);
    const [notImg, setImg] = useState('');
    const [open, setOpen] = useState(false);
    const [load, setLoad] = useState(false);
    const [darkmode, setDarkMode] = useState(false);

    const styles = {
        backgroundColor: darkmode ? '#262626' : '#e6e6e6',
        color: darkmode ? '#ffffff' : '#000000', 
    };

    const wordSearch = () => {
        setLoad(true);
        setOpen(false);
        axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((res) => {
            setTimeout(() => {
                const data = res.data[0];
                setDefinition(data.meanings[0].definitions[0].definition);
                setParts(`Parts Of Speech : ${data.meanings[0].partOfSpeech}`);
                setMean(`Synonyms : ${data.meanings[0].synonyms[0]}`);
                setphonetics(data.phonetics);
                setLoad(false); 
            },2000)
            console.log(res);
        })
        .catch((e) => {
            setTimeout(() => {
                setDefinition("OOPS! Word not Found");
                setImg(Image);
                setOpen(true);
                setLoad(false);  
            }, 2000);
        })    
    }

    const playAudio = (audioUrl) => {
        const audio = new Audio(audioUrl);
        audio.play();
    }
    return ( 
        <div className="app" style={styles}>
            <div className="div">
                <div className="div1"><h2>DICTIONARY</h2></div>
                <div className="div2">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1" onClick={() =>{wordSearch();}} 
                            style={{color: darkmode ? 'white' : 'black', backgroundColor: darkmode ? 'black' : 'white'}}>
                            <i className="fa-solid fa-magnifying-glass"/>
                        </span>
                        <input 
                            type='text'
                            className="form-control"
                            placeholder='Enter a word' 
                            value={word} 
                            onChange={(e)=>setWord(e.target.value)}
                            onKeyDown={ (e) =>{
                                if (e.key === 'Enter') {
                                    wordSearch();  
                                }
                            }}
                            style={{color: darkmode ? 'white' : 'black'}}
                        />
                        <button type="button" className={darkmode ? "btn btn-outline-light" : "btn btn-outline-dark"} onClick={(e) => setDarkMode(prevState => !prevState)}>
                            {darkmode ? (
                                <i className="fa-solid fa-cloud-moon" />
                            ):(
                                <i className="fa-solid fa-cloud-sun" />
                            )}
                        </button>
                    </div>
                </div>
                <div className="div3">
                    {load ? (
                            <button className="btn" id='loader' type="button">
                                <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                <span role="status">Loading...</span>
                            </button>
                    ) : (
                        <>
                        {notImg !=='' && open ? (
                        <>
                            <p>{definition}</p>
                            <img className='img' src={notImg} alt="img" />
                        </>
                        ):(
                            <div>
                                <p>{definition}</p>
                                <p>{mean}</p>
                                <p>{parts}</p>
                                <div>
                                    {phonetics.map((value, index) => (
                                        value.text !== '' && value.audio !== '' ? (
                                            <div className="d-flex align-items-center my-2" key={index}>
                                                <p className="mb-0">{`Phonetic : ${value.text}`}</p>
                                                <button
                                                    className="btn p-0 ms-2"
                                                    onClick={() => playAudio(value.audio)}
                                                >
                                                    <i className="fa-solid fa-volume-high" />
                                                </button>
                                            </div>
                                        ) : null
                                    ))}
                                </div>
                            </div>
                        )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
