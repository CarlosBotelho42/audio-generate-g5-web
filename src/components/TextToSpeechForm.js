import React, { useState } from 'react';

function TextToSpeechForm() {
  const [text, setText] = useState('');
  const [voiceId, setVoiceId] = useState('Camila'); // Voz brasileira padrão
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [downloadUrl, setDownloadUrl] = useState(''); // URL do áudio gerado

  const onClickGenerate = async () => {
    setSuccessMessage('');
    setErrorMessage('');
    setDownloadUrl('');

    try {
      const response = await fetch('https://zfckzj4mz0.execute-api.us-east-1.amazonaws.com/dev/synthesize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          voiceId: voiceId,
          engine: 'neural',
          languageCode: 'pt-BR',
        }),
      });

      if (!response.ok) {
        throw new Error('Erro na solicitação');
      }

      const data = await response.json();
      console.log('Resposta da API:', data);
      setDownloadUrl(data.presignedUrl); // A URL Presignada deve vir na resposta
      setSuccessMessage('Texto convertido com sucesso! Clique no botão para baixar.');
    } catch (error) {
      setErrorMessage('Erro na solicitação: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Conversor de Texto para Fala!</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Digite o texto para converter em áudio"
        rows="6"
        cols="50"
      />
      <br />
      <label>
        Escolha uma voz em português brasileiro:
        <select value={voiceId} onChange={(e) => setVoiceId(e.target.value)}>
          <option value="Camila">Camila (feminina)</option>
          <option value="Thiago">Ricardo (masculina)</option>
          <option value="Vitória">Vitória (feminina)</option>
        </select>
      </label>
      <br />
      <button onClick={onClickGenerate}>Converter para Áudio</button>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {downloadUrl && (
        <div>
          <a href={downloadUrl} download="audio.mp3">
            <button>Baixar Áudio</button>
          </a>
        </div>
      )}
    </div>
  );
}

export default TextToSpeechForm;
