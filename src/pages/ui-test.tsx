import { useState } from 'react';
import Accordion from '../components/accordion';
import Dropdown from '../components/drop-down';
import { LuListTodo } from "react-icons/lu";
import { AiOutlinePicture } from "react-icons/ai";
import { GiSecretBook } from "react-icons/gi";
import { GrTest } from "react-icons/gr";
import { DropDownOption } from '../components/drop-down';

const items = [
  {
    id: 'l2kj5',
    label: 'Can I use React on a project?',
    content:
      'You can use React on any project you want. You can use React on any project you want. You can use React on any project you want. You can use React on any project you want.',
  },
  {
    id: 'lk2j35lkj',
    label: 'Can I use Javascript on a project?',
    content:
      'You can use React on any project you want. You can use React on any project you want. You can use React on any project you want. You can use React on any project you want.',
  },
  {
    id: 'l1kj2i0g',
    label: 'Can I use CSS on a project?',
    content:
      'You can use React on any project you want. You can use React on any project you want. You can use React on any project you want. You can use React on any project you want.',
  },
];

const options = [
  { label: 'Red', value: 'red' },
  { label: 'Green', value: 'green' },
  { label: 'Blue', value: 'blue' },
];


export default function UITestPage() {
  
  const [selection, setSelection] = useState<DropDownOption | null>(null);

  const handleSelect = (option: DropDownOption) => {
    setSelection (option);
  };

  return (
    <div>
      <div className="border border-orange-500 p-2 m-2">
        <div>Tailwind pseudo-class: </div>
        <div className='flex flex-wrap justify-start'>
          <div className='p-1'>
            <button
              className='h-10 px-1 m-1 rounded-full font-bold text-white bg-violet-500 hover:bg-violet-600 active:bg-green-600 focus:outline-none focus:ring focus:ring-violet-300'  
            >
              Button Demo
            </button>
          </div>
          <div className="group block w-44 rounded-lg p-2 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500">
            <h3 className="text-slate-900 group-hover:text-white text-sm font-semibold">
              Styling based on parent state 
            </h3>
            <p className="text-slate-500 group-hover:text-white text-sm">
              Mark the parent with the group class, and use group-* modifiers
            </p>
          </div>
          <div className='block w-56 h-32 rounded-lg p-2 mx-1 bg-white ring-1  ring-slate-900/5 shadow-lg' >
            <h3 className="mb-3 text-slate-900 group-hover:text-white text-sm font-semibold">
              Styling based on sibling state
            </h3>
            <span className="m-1 block text-sm font-medium text-slate-700">Email</span>
            <input type="email" className="peer border border-cyan-400 rounded-md px-2"/>
            <p className="mt-2 mb-0 invisible peer-invalid:visible text-pink-600 text-sm">
              Provide a valid email address.
            </p>
          </div>
          <div className='block w-56   h-32 rounded-lg p-2 mx-1 ring-1  ring-slate-900/5 shadow-lg' >
            <h3 className="mb-3 text-slate-900 group-hover:text-white text-sm font-semibold">
              Styling direct children - fail
            </h3>
            <ul className="direct-child flex gap-1 *:rounded-full *:text-sky-300 *:border *:border-sky-500 *:bg-sky-50 *:px-2 *:py-0.5">
              <li>Sales</li>
              <li>Marketing</li>
              <li>SEO</li>
            </ul>
          </div>
          <div className='block w-64 h-32 rounded-lg p-2 mx-1 ring-1  ring-slate-900/5 shadow-lg' >
            <h3 className="mb-3 text-slate-900 group-hover:text-white text-sm font-semibold">
              Styling based on descendants 
            </h3>
            <label className="block mb-1 has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200">
              Google Pay
              <input type="radio" className=" checked:border-indigo-500" />
            </label>
            <label className="block mb-1 has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200">
              Apple Pay
              <input type="radio" className="checked:border-indigo-500" />
            </label>
            <label className="block mb-1 has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200">
              Visa Credit
              <input type="radio" className="checked:border-indigo-500" />
            </label>
          </div>
          
        </div>
      </div>
      <div className='border border-orange-500 p-4 m-2'>
        <div>Accordion:</div>
        <Accordion items={items} />
      </div>
      <div className="flex flex-col border border-orange-500 p-4 m-2">
        <div>Dropdown: </div>
        <Dropdown options={options} currentOption={selection} onChange={handleSelect} />
      </div>

      <div className='border border-orange-500 p-4 m-2'>
        <div>Font Awesome Icons: </div>
        <div className='flex gap-2'>
          <i className="fas fa-trash" />
          <i className="fas fa-pen" />
          <i className="fas fa-fire" />
          <i className="fas fa-home" />
          <i className="fas fa-rocket" />
        </div>
      </div>
      <div className='border border-orange-500 p-4 m-2'>
        <div>React Icons: </div>
        <div className='flex gap-2'>
          <LuListTodo />
          <AiOutlinePicture />
          <GiSecretBook />
          <GrTest />
        </div>
      </div>
    </div>
  );
}

