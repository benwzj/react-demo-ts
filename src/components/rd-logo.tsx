import { FaEarthOceania } from "react-icons/fa6";

export default function ReactDemoLogo() {
  return (
    <div
      className='flex flex-row items-center leading-none text-white'
    >
      <FaEarthOceania className="h-12 w-20 rotate-[15deg]" />
      <p className="text-[40px] font-serif font-black italic"> &nbsp;Demo</p>
    </div>
  );
}