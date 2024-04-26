import React from 'react'
import { FcTodoList } from "react-icons/fc";
import { ReactTyped } from 'react-typed';
const Navbar = () => {
  return (
    <div className="sm:w-full h-[100px] bg-black w-full   justify-center items-center flex">
        <div className="flex items-center w-full h-full text-3xl font-bold text-[#00df98]"><FcTodoList size={70} className="mx-4 border-4 border-[#00df98] rounded-2xl" />Task manager</div>
        <div className='flex text-[#00df98] font-bold w-full sm:min-w-[400px] min-h-[100px] items-center justify-center text-xl'><ReactTyped strings={['What','What you','What you will','What you will be', 'What you will be doing', 'What you will be doing today?']} typeSpeed={10} loop></ReactTyped></div>
    </div>
  )
}

export default Navbar;