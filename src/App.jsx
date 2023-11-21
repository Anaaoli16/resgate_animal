import React, { useState } from 'react';
import './App.css';

function App() {
  const [animais, setAnimais] = useState([]);
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState(''); // 'perdido' ou 'resgatado'
  const [raca, setRaca] = useState('');
  const [local, setLocal] = useState('');
  const [foto, setFoto] = useState('');

  const cadastrarAnimal = () => {
    if (nome && tipo && raca && local) {
      const novoAnimal = {
        id: new Date().getTime(),
        nome,
        tipo,
        raca,
        local,
        foto,
      };

      setAnimais([...animais, novoAnimal]);
      limparFormulario();
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  };

  const limparFormulario = () => {
    setNome('');
    setTipo('');
    setRaca('');
    setLocal('');
    setFoto('');
  };

  const concluir = (animalId) => {
    const animaisAtualizados = animais.map((animal) =>
      animal.id === animalId ? { ...animal, concluido: true } : animal
    );
    setAnimais(animaisAtualizados);
  };

  const remover = (animalId) => {
    const animaisAtualizados = animais.filter((animal) => animal.id !== animalId);
    setAnimais(animaisAtualizados);
  };

  return (
    <div className="App">
      <div className="faixa">
        <h1> ENCONTRE SEU ANIMAL!</h1>
      </div>
      <div className="formulario">
        <label>
          Nome do Animal:
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </label>
        <label>
          Tipo:
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="">Selecione o Tipo</option>
            <option value="perdido">Perdido</option>
            <option value="resgatado">Resgatado</option>
          </select>
        </label>
        <label>
          Raça:
          <input type="text" value={raca} onChange={(e) => setRaca(e.target.value)} />
        </label>
        <label>
          Local Encontrado/Perdido:
          <input type="text" value={local} onChange={(e) => setLocal(e.target.value)} />
        </label>
        <label>
          Foto (URL):
          <input type="text" value={foto} onChange={(e) => setFoto(e.target.value)} />
        </label>
        <button onClick={cadastrarAnimal}>Cadastrar</button>
      </div>
      <div className="animais-cadastrados">
        <h2>Animais Cadastrados</h2>
        <ul>
          {animais.map((animal) => (
            <li key={animal.id}>
              <div className="info">
                <p>
                  Nome: {animal.nome}
                  <br />
                  Tipo: {animal.tipo}
                  <br />
                  Raça: {animal.raca}
                  <br />
                  Local: {animal.local}
                  <br />
                  {animal.concluido ? 'Status: Concluído' : 'Status: Pendente'}
                </p>
              </div>
              <div className="acoes">
                <button className="botaoConcluir" onClick={() => concluir(animal.id)}>
                  Concluir
                </button>
                <button className="botaoRemover" onClick={() => remover(animal.id)}>
                  Remover
                </button>
              </div>
              {animal.foto && <img src={animal.foto} alt={animal.nome} />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
