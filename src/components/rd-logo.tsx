import { FaEarthOceania } from "react-icons/fa6";
import ConnectedLogo from '../assets/green-y.png';
import NotConnectedLogo from '../assets/red-x.svg';

export function ReactDemoLogo() {
  return (
    <div
      className='flex flex-row items-center leading-none text-white'
    >
      <FaEarthOceania className="h-12 w-20 rotate-[15deg]" />
      <p className="text-[40px] font-serif font-black italic"> &nbsp;Demo</p>
    </div>
  );
}

export function ConnectionBar({connected, text} : {connected: boolean; text?: string}) {
  const logo = connected? ConnectedLogo : NotConnectedLogo;
  return (
    <div
      className='flex flex-row items-center gap-2 leading-none'
    >
      <img 
        className="h-[26px]" 
        src={logo} 
      />
      <p>{text}</p>
    </div>
  );
}