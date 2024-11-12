import React, { useState } from 'react';
import axios from 'axios';

function TextToSpeechForm() {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const onClick = async () => {
    try {
      const response = await axios.post('', {
        text,
        engineId: 'neural',
        languageId: 'pt-BR',
        voiceId: 'Thiago'
      });

      setAudioUrl(response.data.audioUrl);
    } catch (error) {
      console.error("Erro na solicitação:", error);
    }
  };

  return (
    <div>
      <h2>Converta texto para áudio</h2>
      <textarea value={text} onChange={handleTextChange} placeholder="Digite o texto aqui" />
      <button onClick={onClick}>Converter</button>

      {audioUrl && (
        <div>
          <h3>Seu áudio está pronto:</h3>
          <audio controls src={audioUrl}></audio>
        </div>
      )}
    </div>
  );
}

export default TextToSpeechForm;
