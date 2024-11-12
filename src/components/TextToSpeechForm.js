import React, { useState } from 'react';

function TextToSpeechForm() {
  const [text, setText] = useState('');
  const [voiceId, setVoiceId] = useState('Camila'); // Voz brasileira padrão
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onClick = async () => {
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: text,
          voiceId: voiceId,
          engine: 'neural',      
          languageCode: 'pt-BR'
        })
      });

      if (!response.ok) {
        throw new Error('Erro na solicitação');
      }

      setSuccessMessage('Texto convertido com sucesso!');
    } catch (error) {
      setErrorMessage('Erro na solicitação: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Conversor de Texto para Fala</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Digite o texto para converter em áudio"
        rows="4"
        cols="50"
      />
      <br />
      <label>
        Escolha uma voz em português brasileiro:
        <select value={voiceId} onChange={(e) => setVoiceId(e.target.value)}>
          {/* Opções de vozes em pt-BR */}
          <option value="Camila">Camila (feminina)</option>
          <option value="Thiago">Ricardo (masculina)</option>
          <option value="Vitória">Vitória (feminina)</option>
        </select>
      </label>
      <br />
      <button onClick={onClick}>Converter para Áudio</button>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default TextToSpeechForm;
