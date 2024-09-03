import { useEffect, useState } from 'react';
import Accordion from '../components/accordion';
import Dropdown from '../components/drop-down';
import { LuListTodo } from "react-icons/lu";
import { AiOutlinePicture } from "react-icons/ai";
import { GiSecretBook } from "react-icons/gi";
import { GrTest } from "react-icons/gr";
import { DropDownOption } from '../components/drop-down';
import { 
  getDarkMode,
  updateDarkMode
} from '../lib/json-server';
import mountainImage from '../assets/mountain.avif';

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
    <div className="p-6 md:p-10">
      <DarkMode />
      <ObjectFit />
      <PseudoClass />
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
          <i className="fas fa-hippo" />
          <i className="fas fa-spider" />
          <i className="fas fa-water"/>
          <i className="fas fa-skull"/>
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

function DarkMode (){

  const [darkMode, setDarkMode] = useState('System');

  useEffect (()=>{
    async function fetchDarkModeFromJsonServer (){
      const res = await getDarkMode();
      if (res){
        setupDarkMode (res)
      }
    }
    fetchDarkModeFromJsonServer ();
  },[]);

  const setupDarkMode = (mode: string) =>{
    if (mode === 'Light'){ 
      setDarkMode ('Light');
      updateDarkMode ('Light')
      document.documentElement.classList.remove('dark')
    }else if(mode === 'Dark'){
      setDarkMode ('Dark');
      updateDarkMode ('Dark')
      document.documentElement.classList.add('dark')
    }else {
      setDarkMode ('System');
      updateDarkMode ('System');
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark')
      }else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

  const handleClick = ()=> {
    if (darkMode === 'System'){ 
      setupDarkMode ('Light')
    }else if(darkMode === 'Light'){
      setupDarkMode ('Dark')
    }else{
      setupDarkMode ('System')
    }
  }

  return (
    <div className="border border-orange-500 p-2 m-2">
      <div>
        Tailwind Dark Mode: 
        <button 
          onClick={handleClick}
          className='h-6 w-20 px-1 m-1 rounded-lg font-bold bg-red-300'
        >
          {darkMode}
        </button>
      </div>
      <div className="w-1/2 bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
        <div>
          <span className="inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg">
            <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">...</svg>
          </span>
        </div>
        <h3 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">Writes Upside-Down</h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
          The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
        </p>
      </div>
    </div>
  )
}

function ObjectFit () {
  return (
    <>
      <div className="border border-orange-500 p-2 m-2">
        <div>Tailwind object-fit: </div>
        <div className='flex gap-1 overflow-x-auto'>
          <div className='relative flex-none'>
            <img className="object-cover h-48 w-96 border border-green-500" src={mountainImage}/>
            <div className='absolute top-4 left-4 w-44'>object-cover</div>
          </div>
          <div className='relative flex-none'>
            <img className="object-fill h-48 w-96 border border-green-500" src={mountainImage}/>
            <div className='absolute top-4 left-4 w-44'>object-fill</div>
          </div>
          <div className='relative flex-none'>
            <img className="object-contain h-48 w-96 border border-green-500" src={mountainImage}/>
            <div className='absolute top-4 left-4 w-44'>object-contain</div>
          </div>
          <div className='relative flex-none'>
            <img className="object-none h-48 w-96 border border-green-500" src={mountainImage}/>
            <div className='absolute top-4 left-4 w-44'>object-none</div>
          </div>
        </div>
      </div>
    </>
  )
}

function PseudoClass() {
  return (
    <>
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
            <input type="email" className="peer border border-cyan-400 rounded-md px-2 focus:outline-none"/>
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
    </>
  )
}

