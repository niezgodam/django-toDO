import React, { useEffect, useState } from "react";
import axios from "axios";

const TodoForm = ({ setTodos, fetchData }) => {
  const [newTodo, setNewTodo] = useState({
    body: "",
  });

  const handleChange = (e) => {
    setNewTodo((prev) => ({
      ...prev,
      body: e.target.value,
    }));
  };

  const postTodo = async () => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/todo/`, newTodo);
      setNewTodo({ body: "" });
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto flex justify-center py-4">
      <input
        type="text"
        placeholder="Add Todo"
        value={newTodo.body}
        className="w-full max-w-xs pl-2 rounded outline-none input input-bordered input-info"
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            postTodo();
          }
        }}
      />
      <button onClick={postTodo} className="ml-2 bg-[#00df98] rounded-lg btn btn-primary p-2 font-bold">
        Add todo
      </button>
    </div>
  );
};

export default TodoForm;
