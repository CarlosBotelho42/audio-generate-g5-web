import { Axios } from 'axios';
import React, { useState } from 'react';

function TextToSpeechForm() {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleConvertText = async () => {
    try {
      const response = await Axios('https://zfckzj4mz0.execute-api.us-east-1.amazonaws.com/dev/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          voiceId: 'Thiago' // ou outro ID de voz que queira usar
        })
      });
      const data = await response.json();
      if (response.ok) {
        setAudioUrl(data.audioUrl);
      } else {
        console.error('Erro ao converter o texto:', data.message);
      }
    } catch (error) {
      console.error('Erro na solicitação:', error);
    }
  };

  return (
    <div>
      <h2>Conversor de Texto para Áudio</h2>
      <textarea
        rows="4"
        cols="50"
        placeholder="Digite o texto para converter em áudio"
        value={text}
        onChange={handleTextChange}
      />
      <br />
      <button onClick={handleConvertText}>Converter Texto em Áudio</button>
      {audioUrl && (
        <div>
          <h3>Áudio gerado:</h3>
          <audio controls src={audioUrl}></audio>
        </div>
      )}
    </div>
  );
}

export default TextToSpeechForm;
