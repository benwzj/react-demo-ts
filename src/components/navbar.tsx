import { useEffect, useState } from "react";
import Link from './router/link';
import { ReactDemoLogo, ConnectionBar } from './rd-logo';
import { getConnection } from '../lib/json-server';


const noConnectionHint = 'No Server Connection!';

function Sidebar() {

  const [connectServer, setConnectServer] = useState(noConnectionHint);
  const [connected, setConnected] = useState(false);

  useEffect (()=>{
    const testConnection = async() => {
      console.log("testConnection");
      try {
        const connection = await getConnection();
        if (connection){
          setConnectServer (connection);   
          setConnected (true);
        }
        else{
          setConnectServer (noConnectionHint);  
          setConnected (false);
        }
      }catch (e){
        console.log(e);
        setConnectServer (noConnectionHint);  
        setConnected (false);
      }
    }

    const repeatServerConnectionTest = async() => {
      await testConnection();
      setTimeout ( () => {
        repeatServerConnectionTest();
      }, 10000);
    }

    repeatServerConnectionTest();
  }, []); 

  const links = [
    { label: 'Picture Search', path: '/' ,icon: "fas fa-image"},
    { label: 'Manage Books', path: '/bookmanage', icon: "fas fa-book"},
    { label: 'UI Test', path: '/ui-test', icon: "fas fa-water"},
    { label: 'Todos', path: '/todos', icon: "fas fa-list"}
  ];

  const renderedLinks = links.map((link) => {
    return (
      <Link
        key={link.label}
        to={link.path}
        className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        activeClassName="bg-sky-100 text-blue-600"
      >
        <i className={link.icon} />
        <p className="hidden md:block">{link.label}</p>
      </Link>
    );
  });

  return (
    // <div className="sticky flex flex-col justify-between top-0 h-screen p-1 pb-6">
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
      >
        <div className="w-32 text-white md:w-40">
          <ReactDemoLogo />
        </div>
      </div>
      <div className="flex flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        {renderedLinks}
      </div>
      <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block md:mt-2"></div>
      <div 
        className="flex h-[48px] items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3"
      >
        <ConnectionBar connected={connected} text={connectServer}/>
      </div>
    </div>
  );
}

export default Sidebar;
