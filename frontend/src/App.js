import { useState, useEffect } from "react";
import "./App.css";
import Table from "./components/Table";
import TodoForm from "./components/TodoForm";
import Navbar from "./components/Navbar";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState("");
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/todo");
      setTodos(response.data);
      setisLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sm:min-h-[110vh] min-h-[100vh] min-w-[70vh] bg-gradient-to-br sm:w-full from-gray-700 from-20% to-black pb-8">
      <Navbar/>
      <TodoForm setTodos={setTodos} fetchData={fetchData} />
      <Table todos={todos} isLoading={isLoading} setTodos={setTodos} />
    </div>
  );
}

export default App;
