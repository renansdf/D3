import React, { useState, useEffect } from "react";
import api from 'services/api';

import "./styles.css";


function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  },[]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `new repo ${Date.now()}`,
      url: 'https://github.com/renansdf/D3',
      techs: ['axios', 'reactjs','babel','webpack']
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    //const repositoryIndex = repositories.findIndex(repo => repo.id === id);
    // setRepositories([repositories.splice(repositoryIndex, 1)]);
    // setRepositories(repositories);
    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(project => (
          <li key={project.id}>
            {project.title}

            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
