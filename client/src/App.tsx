import React, { useState } from "react";
import {
  HiOutlineDotsHorizontal,
  HiChevronLeft,
  HiPlus,
  HiCheck,
  HiOutlineTrash,
} from "react-icons/hi";
import { ITodo, useAppStore } from "./utils/AppStore";
import { v4 } from "uuid";
import { observer } from "mobx-react-lite";

const App: React.FC = observer(() => {
  const [input, setInput] = useState<string>("");
  const appStore = useAppStore();
  const tasks = appStore.todos
    .filter((e) => !e.finished)
    .sort((a, b) => b.dateAdded - a.dateAdded);
  const compelted = appStore.todos
    .filter((e) => e.finished)
    .sort((a, b) => b.dateAdded - a.dateAdded);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!!input) {
      const todo: ITodo = {
        id: v4(),
        finished: false,
        title: input.trim(),
        dateAdded: new Date().getTime(),
      };
      appStore.addTodo(todo);
      setInput("");
    }
  };

  return (
    <div className="max-w-3xl px-4 mx-auto">
      <div className="flex items-center justify-between my-8">
        <div className="flex items-center space-x-4">
          <button className="p-2 bg-gray-800 rounded-2xl">
            <HiChevronLeft className="text-2xl" />
          </button>
          <h1 className="text-3xl font-bold">PERN Todo</h1>
        </div>

        <button>
          <HiOutlineDotsHorizontal />
        </button>
      </div>

      <form
        onSubmit={onSubmit}
        className="flex items-center p-2 my-8 space-x-4 border-2 border-gray-800 focus-within:border-blue-500 rounded-2xl "
      >
        <button
          type="submit"
          className="p-1 bg-[#FC76A1] rounded-xl hover:opacity-70 transition-opacity"
        >
          <HiPlus className="text-2xl text-gray-900" />
        </button>

        <input
          autoComplete="off"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 pr-2 font-semibold bg-transparent border-none outline-none text"
          placeholder="Add a task"
          type="text"
          name="todo-input"
          id="todo-input"
        />
      </form>

      {tasks.length > 0 && (
        <div>
          <h2>Tasks - {tasks.length}</h2>

          <div className="flex flex-col mt-4 space-y-3">
            {tasks.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      )}

      {compelted.length > 0 && (
        <div className="mt-5">
          <h2>Completed- {compelted.length}</h2>

          <div className="flex flex-col mt-4 space-y-3">
            {compelted.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

interface TodoItemProps {
  todo: ITodo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const og = todo.title;
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState(todo.title);
  const appStore = useAppStore();

  const handleToggle = () => {
    const copy = { ...todo };
    copy.finished = !copy.finished;
    appStore.updateTodo(todo.id, copy);
  };

  const handleEdit = () => {
    if (!!input.trim()) {
      const copy = { ...todo };
      copy.title = input.trim();
      appStore.updateTodo(todo.id, copy);
    } else {
      setInput(og);
    }
  };

  const handleDelete = () => {
    appStore.deleteTodo(todo.id);
  };

  return (
    <div className="flex items-center p-3 space-x-3 bg-gray-800 group rounded-xl focus-within:ring-2 focus-within:ring-blue-500">
      {todo.finished ? (
        <button
          onClick={handleToggle}
          className="relative w-5 h-5 rounded-lg bg-[#FC76A1] border-2 border-[#FC76A1]"
        >
          <HiCheck className="text-gray-900" />
        </button>
      ) : (
        <button
          onClick={handleToggle}
          className="relative w-5 h-5 rounded-lg border-2 border-[#FC76A1]"
        />
      )}

      {isEditing ? (
        <input
          autoFocus
          onBlur={() => {
            setIsEditing(false);
            handleEdit();
          }}
          className="flex-1 bg-transparent border-none outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          name="todo-input"
          id="todo-input"
          autoComplete="off"
        />
      ) : (
        <p
          className={`flex-1 ${todo.finished && "line-through"}`}
          onClick={() => setIsEditing(true)}
        >
          {todo.title}
        </p>
      )}

      <button
        onClick={handleDelete}
        className="transition-opacity duration-150 opacity-0 group-hover:opacity-100"
      >
        <HiOutlineTrash className="text-red-500" />
      </button>
    </div>
  );
};

export default App;
