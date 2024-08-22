import { useState } from "react";
import ReactJson from 'react-json-view';
// import { getGraphql } from '../lib/json-server';
import { graqhqlFetch } from '../lib/graqhql-client';


export default function GraphQLClientPage() {

  const [response, setResponse] = useState<unknown | undefined>(undefined);

  const handleResponse = (update: unknown) =>{
    setResponse (update);
  }

  return (
    <div className="flex border w-full h-screen">
      <Operation onResponse={handleResponse}/>
      <Response response={response}/>
    </div>
  )
}

const Response = ({
  response
}:{
  response: unknown
})=>{

  const jsonDisplay = (typeof response === 'object' && response != null) ?
    response : 
    {data: 'something wrong!'};

  return (
    <div className="block flex-1 p-2 border h-full bg-cyan-100 overflow-auto">
      <ReactJson src={jsonDisplay}/>
    </div>
  )
}

const Operation = ({
  onResponse
}: {
  onResponse: (json: unknown)=>void
}) => {
  
  const [endPoint, setEndPoint] = useState('');
  const [query, setQuery] = useState('');
  const [variables, setVariables] = useState('');

  const sendOperation = async() =>{
    if (!endPoint) {
      onResponse ({data: 'End Point is empty!'});
      return;
    }

    const variablesObj = JSON.parse (variables);
    
    const res = await graqhqlFetch ({endpoint: endPoint, query: query, variables: variablesObj});
    onResponse (res);
  }

  return (
    <div className="flex flex-col w-full flex-1 border border-gray-200 bg-gray-100 dark:bg-gray-700 dark:border-gray-600">
      <EndPoint 
        endPoint={endPoint} 
        onUpdateEndPoint={(update)=>setEndPoint(update)}/>
      <Query 
        query={query} 
        onUpdateQuery={(update)=>setQuery(update)} 
        sendOperation={sendOperation}/>
      <Variables
        variables={variables} 
        onUpdateVariables={(update)=>setVariables(update)}/>
    </div>
  )
}


const EndPoint = ({
  endPoint, 
  onUpdateEndPoint
}: {
  endPoint: string; 
  onUpdateEndPoint: (update: string)=> void
}) => {

  return (
    <div className="relative flex dark:bg-gray-800">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input 
        className="peer block w-full py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:border-blue-500  text-gray-800 bg-white dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 focus:outline-none  "
        placeholder="End Point"
        id="search"
        value={endPoint}
        onChange={(e)=>onUpdateEndPoint(e.target.value)}
      />
      <i className="fas fa-server absolute left-3 top-5 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-400 dark:peer-focus:text-gray-50"/>
    </div> 
  )
}


const Query = ({
  query, 
  onUpdateQuery,
  sendOperation
}: {
  query: string; 
  onUpdateQuery: (update: string)=> void;
  sendOperation: ()=>void;
}) => {
  return (
    <>
      <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
        <div className=" dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
          Query
        </div>
        <div className="flex items-center justify-end px-3 dark:border-gray-600">
          <button type="button" className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 20">
              <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"/>
            </svg>
            <span className="sr-only">Embed map</span>
          </button>
          <button 
            type="button" 
            className="flex items-center gap-2 p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:bg-indigo-400 dark:text-gray-50 dark:hover:text-white dark:hover:bg-gray-400"
            onClick={()=>sendOperation()}
          >
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
              <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
            </svg>
            <div>Run it</div>
            <span className="sr-only">Run it</span>
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col px-4 py-2 bg-white dark:bg-gray-800">
        <label htmlFor="Query" className="sr-only">Query</label>
        <textarea 
          id="Query" 
          className="grow block w-full px-0 text-sm text-gray-800 bg-white resize-none border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 focus:outline-none" 
          placeholder="Write Query ..." 
          value={query}
          onChange={(e)=>onUpdateQuery(e.target.value)}
        >
        </textarea>
      </div>
    </>
  )
}

const Variables = ({
  variables, 
  onUpdateVariables
}: {
  variables: string; 
  onUpdateVariables: (update: string)=> void;
}) => {
  return (
    <>
      <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
        <div className=" dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
          Variable
        </div>
        <div className="flex items-center  justify-end px-3 dark:border-gray-600">
          <button type="button" className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
            </svg>
            <span className="sr-only">Upload image</span>
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col px-4 py-2 bg-white dark:bg-gray-800">
        <label htmlFor="Variable" className="sr-only">Variable</label>
        <textarea 
          id="Variable" 
          className="block w-full grow px-0 text-sm text-gray-800 resize-none bg-white border-0 focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 " 
          placeholder="Write Variable ..." 
          value={variables}
          onChange={(e)=>{onUpdateVariables(e.target.value)}}
        >
        </textarea>
      </div>
    </>
  )
}