import './space-header.css';
//import {ReactComponent as Chevron} from '../down-chevron.svg';

const Chevron = () => {
  return (
    <svg version="1.1" id="Layer_1" 
      xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
      viewBox="0 0 404.257 404.257" xmlSpace="preserve">
      <polygon points="386.257,114.331 202.128,252.427 18,114.331 0,138.331 202.128,289.927 404.257,138.331 "/>
    </svg>
  );
}

export default function SpaceHeader() {
  return (
    <header className="header-container">
      <div className='header-title1'>
        <h3>SPACE SAVVY</h3>
      </div>
      <div className='header-title2'>
        <h1>Discover Space Missions</h1>
      </div>
      <div className='header-footer'>
        <a href='#mission-container'><div className='chevron'><Chevron/></div></a>
      </div>
    </header>
  )
}