import axios from "axios";
import React, { useState } from "react";
import "./table.css";
import {
  MdOutlineDeleteOutline,
  MdEditNote,
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { MdOutlineDoneOutline } from "react-icons/md";
import { MdOutlineDisabledByDefault } from "react-icons/md";

const Table = ({ todos, isLoading, setTodos }) => {
  const [editedTodo, setEditedTodo] = useState({
    body: "",
    content: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`);
      const newList = todos.filter((todo) => todo.id !== id);
      setTodos(newList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleContent = async () => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/todo/${editedTodo.id}/`,
        { 
          body: editedTodo.body, 
          content: editedTodo.content 
        }
      );
      const newTodos = todos.map((todo) =>
        todo.id === editedTodo.id ? response.data : todo
      );
      setTodos(newTodos);
      setEditedTodo({
        content: "",
        body: ""
      });
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckbox = async (id, completed) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/todo/${id}/`,
        { completed: !completed }
      );
      const newTodos = todos.map((todo) =>
        todo.id === id ? response.data : todo
      );
      setTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (todoItem) => {
    setEditedTodo({
      ...todoItem,
      body: todoItem.body,
      content: todoItem.content
    });
    setIsEditing(true);
  };

  return (
    <div>
      <div className="flex items-center justify-center rounded-2xl sm:max-w-[1200px] mx-auto bg-black font-bold text-2xl">
        <table className="table w-11/12 max-w-xl wf sm:max-w-4xl sm:w-11/12">
        {isDetail ? (
        <div className=" items-center justify-center text-center bg-zinc-800/100 mx-auto left-0 right-0  max-w-[800px] rounded-2xl border absolute">
        <div className="max-w-[400px] min-h-[100px] mt-4 outline-none rounded-xl p-1 px-2 bg-white mb-8 mx-auto overflow-y-auto">
            <textarea readOnly className="w-full h-[100px] resize-none outline-none">{editedTodo.content}</textarea>
        </div>
        <div>
          <div 
            className="bg-[#00df98] rounded-lg btn btn-primary p-2 font-bold mx-auto max-w-[400px] mb-4 cursor-pointer"
            onClick={() => setIsDetail(false)}
          >
            Cancel
          </div>
        </div>
      </div>
      ) : null}
      {isEditing ? (
          <div className="justify-center text-center bg-zinc-800/100  max-w-[800px] mx-auto rounded-2xl border absolute left-0 right-0">
            <h1 className="text-[#00df98] font-bold">Title</h1>
            <textarea
              className="min-w-[400px] min-h-[100px] mt-4 outline-none rounded-xl p-1 px-2 resize-none"
              value={editedTodo.body}
              onChange={(e) => setEditedTodo({...editedTodo, body: e.target.value})}
            />
            <h1 className="text-[#00df98] font-bold">Description</h1>
            <textarea
              className="min-w-[400px] min-h-[100px] mt-4 outline-none rounded-xl p-1 px-2 resize-none"
              value={editedTodo.content}
              onChange={(e) => setEditedTodo({...editedTodo, content: e.target.value})}
            />
            <div>
              <div
                className="bg-[#00df98] rounded-lg btn btn-primary p-2 font-bold mx-auto max-w-[400px] mb-4 mt-4 cursor-pointer active:bg-[#02a873]"
                onClick={() => {
                  handleContent();
                }}
              >
                Submit
              </div>
              <div 
                className="bg-[#00df98] rounded-lg btn btn-primary p-2 font-bold mx-auto max-w-[400px] mb-4 cursor-pointer"
                onClick={() => {
                  setIsEditing(false);
                  setEditedTodo({
                    body: "",
                    content: ""
                  });
                }}>
                Cancel
              </div>
            </div>
          </div>
        ) : null}
          <tbody className="block w-full sm:table-row-group">
            {isLoading ? (
              <div>Is Loading </div>
            ) : (
              <>
              {todos.map((todoItem) => (
  <>
    <tr className="invisible sm:visible" key={todoItem.id}>
      <td className="p-3 text-[#00df98]">
        <span
          onClick={() =>
            !isDetail ? handleCheckbox(todoItem.id, todoItem.completed) : undefined
          }
          className="inline-block cursor-pointer text-[#00df98]"
        >
          {todoItem.completed ? (
            <MdOutlineCheckBox />
          ) : (
            <MdOutlineCheckBoxOutlineBlank />
          )}
        </span>
      </td>
      <td className="p-3 text-sm text-[#00df98]" title={todoItem.id}>
        {todoItem.body}
      </td>
      <td className="p-3 text-sm text-center text-[#00df98]">
        <span className={` ${todoItem.completed ? "text-green-800 flex justify-center" : "flex justify-center text-red-800"}`}>
          {todoItem.completed ? <MdOutlineDoneOutline size={30}/> : <MdOutlineDisabledByDefault size={30}/>}
        </span>
      </td>
      <td className="p-3 text-sm font-medium text-[#00df98] justify-center text-center">
        <button className="ml-2 bg-[#00df98] rounded-lg btn btn-primary p-2 font-bold text-black" 
          onClick={() => {
            setIsDetail(true);
            setEditedTodo({
              ...todoItem,
              content: todoItem.content
            });
          }}
        >
          Details
        </button>
      </td>
      <td className="p-3 text-sm font-medium text-[#00df98] justify-center text-center">
        {new Date(todoItem.created).toLocaleString()}
      </td>
      <td className="grid items-center grid-flow-col p-3 text-sm font-medium text-[#00df98] mt-2 m-4">
        <span>
          <label htmlFor="my-modal">
            <MdEditNote
              onClick={!isDetail ? () => handleEdit(todoItem) : undefined}
              className="text-xl cursor-pointer text-[#00df98]"
            />
          </label>
        </span>
        <span className="text-xl cursor-pointer text-[#00df98]">
          <MdOutlineDeleteOutline
            onClick={() => !isDetail ? handleDelete(todoItem.id) : undefined}
          />
        </span>
      </td>
    </tr>
    
    {/* dla małej */}
    <tr className="flex justify-between sm:hidden">
      <td className=" text-[#00df98] justify-center items-center flex w-full">
        <span
          onClick={() => !isDetail ? handleCheckbox(todoItem.id, todoItem.completed) : undefined}
          className="inline-block cursor-pointer text-[#00df98]"
        >
          {todoItem.completed ? (
            <MdOutlineCheckBox />
          ) : (
            <MdOutlineCheckBoxOutlineBlank />
          )}
        </span>
      </td>
      <td className="p-3 text-sm text-[#00df98] w-full text-center" title={todoItem.id}>
        {todoItem.body}
      </td>
      <td className="p-3 text-sm text-center text-[#00df98] w-full">
        <span className={` ${todoItem.completed ? "text-green-800 flex justify-center" : "flex justify-center text-red-800"}`}>
          {todoItem.completed ? <MdOutlineDoneOutline size={30}/> : <MdOutlineDisabledByDefault size={30}/>}
        </span>
      </td>
      <td className="p-3 text-sm font-medium text-[#00df98] w-full flex items-center justify-center">
        <button className="ml-2 bg-[#00df98] rounded-lg btn btn-primary p-2 font-bold text-black" 
          onClick={() => {
            setIsDetail(true);
            setEditedTodo({
              ...todoItem,
              content: todoItem.content
            });
          }}
        >
          Details
        </button>
      </td>
    </tr>
    
    

    
    <tr className="flex justify-between sm:hidden">
      <td className="p-3 text-sm font-medium text-[#00df98] justify-center items-center text-center w-full flex max-h-[50px]">
          <span>
            {new Date(todoItem.created).toLocaleString()}
          </span>
      </td>
      <td className="px-8 text-sm font-medium text-[#00df98] items-center text-center w-full flex max-h-[50px] justify-between">
          <span className="ml-2">
            <label htmlFor="my-modal">
              <MdEditNote
                onClick={!isDetail ? () => handleEdit(todoItem) : undefined}
                className="text-xl cursor-pointer text-[#00df98]"
              />
            </label>
          </span>
          <span className="text-xl cursor-pointer text-[#00df98]">
            <MdOutlineDeleteOutline
              onClick={() => !isDetail ? handleDelete(todoItem.id) : undefined}
            />
          </span>
        </td>
    </tr>
  </>
))}

              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
