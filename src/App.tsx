import { useState } from 'react';
import './App.css';

interface TodoItem {
  id: string;
  texto: string;
  completado: boolean;
}

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  const adicionarTarefa = () => {
    if (newTodo.trim() !== "") { // Verifica se o texto não está vazio
      const newId = crypto.randomUUID();
      const newTodoItem: TodoItem = {
        id: newId,
        texto: newTodo,
        completado: false,
      };

      setTodos([...todos, newTodoItem]);
      setNewTodo(""); // Limpa o campo de entrada
    }
  };

  const marcarCompleto = (id: string) => {
    const todosAtualizados = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completado: !todo.completado };
      }
      return todo;
    });
    setTodos(todosAtualizados);
  };

  return (
    <>
      <div className="app">
        <div className="container">
          <h1>Lista de Tarefas</h1>
          <div className="input-container">
            <input
              type="text"
              value={newTodo} // Valor controlado pelo estado
              onChange={(e) => setNewTodo(e.target.value)} // Atualiza o estado
              placeholder="Digite uma tarefa"
            />
            <button onClick={adicionarTarefa}>Adicionar Tarefa</button>
          </div>
          <ol>
            {todos.map((todo) => (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.completado}
                  onChange={() => marcarCompleto(todo.id)}
                />
                <span style={{ textDecoration: todo.completado ? 'line-through' : 'none' }}>
                  {todo.texto}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}

export default App;
