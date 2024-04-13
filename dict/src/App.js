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
                <div className='input-div'>
                    <button className="button" onClick={() =>{wordSearch();}} style={{color: darkmode ? 'white' : 'black'}}><i className="fa-solid fa-magnifying-glass"/></button><br/>
                    <input  
                        className="input"
                        type="text" 
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
                </div>
                <div className='mode' onClick={(e) => setDarkMode(prevState => !prevState)}>
                    {darkmode ? (
                        <i className="fa-solid fa-cloud-moon" />
                    ):(
                        <i className="fa-solid fa-cloud-sun" />
                    )}
                </div>
            </div>
            <div className="div3">
                {load ? (
                    <>
                        <div className='loading'>
                          <div className="dot"></div>
                          <div className="dot"></div>
                          <div className="dot"></div>
                          <div className="dot"></div>
                        </div>
                    </>
                ) : (
                    <>
                    {notImg !=='' && open ? (
                    <>
                        <p>{definition}</p>
                        <img className='img' src={notImg} alt="img" />
                    </>
                    ):(
                        <>
                            <p>{definition}</p>
                            <p>{mean}</p>
                            <p>{parts}</p>
                            <div className='phonetic'>
                            {phonetics.map((value, index) => (
                                value.text !== '' && value.audio !== '' ? (
                                    <>
                                    <div className='ph-div' key={index}>
                                        <p>{`Phonetic : ${value.text}`}</p>
                                        <i className="fa-solid fa-volume-high" onClick={(e) => playAudio(value.audio)}/>
                                    </div>
                                    </>
                                ):(
                                    <></>
                                )
                            ))}
                            </div>
                        </>
                    )}
                    </>
                )}
            </div>
          </div>
        </div>
    );
}

export default App;
