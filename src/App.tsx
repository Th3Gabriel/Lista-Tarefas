import { useEffect, useState } from 'react';
import { useTheme } from './ThemeContext';
import './App.css';

interface TodoItem {
  id: string;
  texto: string;
  completado: boolean;
}

function App() {
  const chaveTarefasMemorias = 'Tarefas';

  const { theme, toggleTheme } = useTheme();
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [estaCarregado, setEstaCarregado] = useState<boolean>(false);

  const adicionarTarefa = (): void => {
    if (newTodo.trim() !== '') {
      const newId = crypto.randomUUID();
      const newTodoItem: TodoItem = {
        id: newId,
        texto: newTodo,
        completado: false,
      };

      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  const removerTarefa = (id: string): void => {
    const tarefasAtualizadas = todos.filter((todo) => todo.id !== id);
    setTodos(tarefasAtualizadas);
  };

  const marcarCompleto = (id: string): void => {
    const todosAtualizados = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completado: !todo.completado };
      }
      return todo;
    });
    setTodos(todosAtualizados);
  };

  const obterTarefasCompletas = (): TodoItem[] => {
    return todos.filter((todo) => todo.completado);
  };

  useEffect(() => {
    if (estaCarregado) {
      localStorage.setItem(chaveTarefasMemorias, JSON.stringify(todos));
    }
  }, [todos, estaCarregado]);

  useEffect(() => {
    const tarefasdaMemoria = localStorage.getItem(chaveTarefasMemorias);
    if (tarefasdaMemoria) {
      setTodos(JSON.parse(tarefasdaMemoria));
    }
    setEstaCarregado(true);
  }, []);

  return (
    <div className={`app ${theme}`}>
      <div className="container">
        <h1>Lista de Tarefas</h1>
        <div className="input-container">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Digite uma tarefa"
          />
          <button onClick={adicionarTarefa}>Adicionar Tarefa</button>
        </div>
        <ol>
          {obterTarefasCompletas().length} / {todos.length}
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
              <button onClick={() => removerTarefa(todo.id)}>X</button>
            </li>
          ))}
        </ol>
        <button onClick={toggleTheme}>
          Alterar Tema {theme === 'light' ? 'Escuro' : 'Claro'}
        </button>
      </div>
    </div>
  );
}

export default App;
