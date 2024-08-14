
import { useEffect, useState, useRef } from "react";
import './drop-down.css';

const ChevronSvg = () => {
  return (
    <svg version="1.1" id="Layer_1" 
      xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
      viewBox="0 0 404.257 404.257" xmlSpace="preserve">
      <polygon points="386.257,114.331 202.128,252.427 18,114.331 0,138.331 202.128,289.927 404.257,138.331 "/>
    </svg>
  );
}

const Chevron = (<div className="chevron"><ChevronSvg/></div>);
const ChevronUp = (<div className="chevron-up"><ChevronSvg/></div>);

export type DropDownOption = {
  label: string; 
  value: string;
};

type DropDownProps = {
  currentOption: DropDownOption | null;
  options: Array<DropDownOption>;
  onChange: (option: DropDownOption) => void;
};

export default function DropDown({
  currentOption, 
  options, 
  onChange
}: DropDownProps){

  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef<HTMLDivElement>(null);

  useEffect (() => {
    const handler = (event: MouseEvent) => {
      if (!divEl.current) {
        return;
      }
      if (event.target instanceof Element){
        if (!divEl.current.contains(event.target)) {
          setIsOpen(false);
        }
      }else{
        setIsOpen(false);
      }
      
    };

    document.addEventListener ('click', handler, true);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);

  const handleClick = () => {
    setIsOpen (!isOpen);
  };

  const handleOptionClick = (option: DropDownOption) => {
    setIsOpen (false);
    onChange (option);
  };

  const renderedOptions = options.map((option: DropDownOption) => {
    return (
      <div
        className="dropdown-item"
        onClick={() => handleOptionClick(option)}
        key={option.value}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div ref={divEl} className="dropdown-container">
      <div
        className="dropdown-bar"
        onClick={handleClick}
      >
        {/* {value?.label || 'Any'} */}
        {currentOption?.label || 'Any'}
        {isOpen? ChevronUp : Chevron }
      </div>
      {isOpen && <div className="dropdown-options">{renderedOptions}</div>}
    </div>
  );
}

