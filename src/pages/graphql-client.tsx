import { useState, useEffect } from "react";
import ReactJson from 'react-json-view';
import { 
  getGraphqlEndpoint,
  getGraphqlOperations, 
  updateGraphqlOperation,
  deleteGraphqlOperation,
  addGraphqlOperation 
} from '../lib/json-server';
import { graqhqlFetch } from '../lib/graqhql-client';
import { GraphqlOperation } from '../lib/types';
import { FaXmark } from "react-icons/fa6";
import classNames from 'classnames';

const NEW_OPERATION_ID = 'NEW_OPERATION_ID';

export default function GraphQLClientPage() {

  const [response, setResponse] = useState<unknown | undefined>(undefined);
  const [endPoint, setEndPoint] = useState('');
  const [operations, setOperations] = useState <Array<GraphqlOperation>> ([]);
  const [
    currentOperation, 
    setCurrentOperation
  ] = useState <GraphqlOperation | undefined> (undefined);

  useEffect ( ()=>{ 
    async function fetchGraphqlParameter() {
      const res = await getGraphqlOperations();
      if (res) {
        setOperations (res);
        setCurrentOperation ({...res[0]});
      }
      const res2 = await getGraphqlEndpoint();
      if (res2){
        setEndPoint (res2);
      }
    }
    fetchGraphqlParameter();
  }, []);

  const addOperation = async ()=>{
    const newOperation = {
      id: NEW_OPERATION_ID + Date.now().toString(36),
      name: 'Unnamed', 
      query:'', 
      variables: {}, 
      headers: {}
    };
    setOperations ([...operations, newOperation]);
    setCurrentOperation ({...newOperation});
  }

  const updateOperation = async (operation: GraphqlOperation) =>{
    const {id, name, query, variables, headers} = operation;
    let res;
    if (id.includes(NEW_OPERATION_ID)) {
      res = await addGraphqlOperation ({name, query, variables, headers});
      if (res){
        const newOperations = operations.filter ( o => o.id !== id);
        setOperations ([...newOperations, res]);
        setCurrentOperation ({...res});
      }
    }else{
      res = await updateGraphqlOperation (operation);
      if (res){
        const found = operations.find ( o => o.id === id);
        if (found){
          found.query = query;
          found.variables = variables;
        }
        setCurrentOperation ({...res});
      }
    }
  }

  const deleteOperation = async (id: string) =>{
    if (!id.includes(NEW_OPERATION_ID)){
      deleteGraphqlOperation (id);
    }
    setOperations ((bs)=>{
      return bs.filter ((b)=> b.id !== id)
    })
    if (currentOperation?.id === id && operations[0])
      setCurrentOperation ({...operations[0]});
  }

  const handleResponse = (update: unknown) =>{
    setResponse (update);
  }

  return (
    <div className="flex border w-full h-screen">
      <div className="flex flex-col w-full flex-1 border border-gray-200 bg-gray-100 dark:bg-gray-700 dark:border-gray-600">
        <EndPoint 
          endPoint={endPoint} 
          onUpdateEndPoint={(update)=>setEndPoint(update)}
        />
        <OperationList 
          operations={operations} 
          currentOne={currentOperation}
          onSelect={setCurrentOperation}
          onAdd={addOperation}
          onDelete={deleteOperation}
        />
        <Operation 
          endPoint={endPoint}
          operation={currentOperation}
          onUpdateOperation={updateOperation}
          onResponse={handleResponse}
        />
      </div>
      <Response response={response}/>
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

const OperationList = ({
  operations,
  currentOne,
  onSelect,
  onAdd,
  onDelete
}: {
  operations: Array<GraphqlOperation>;
  currentOne: GraphqlOperation | undefined;
  onSelect: (update: GraphqlOperation)=>void;
  onAdd: ()=>void;
  onDelete: (id: string)=>void;
}) => {

  const deleteButtonClick = (e: React.MouseEvent<HTMLButtonElement>, id: string) =>{
    e.stopPropagation();
    onDelete(id);
  }

  const OperationButtons = operations.map ((operation)=>{
    return (
      <div 
        className={classNames("flex items-center my-1 p-2 text-gray-700 cursor-pointer hover:text-gray-900 hover:bg-gray-300 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600",
          currentOne?.id===operation.id && "bg-gray-300 dark:bg-gray-600"
        )}
        onClick={()=>onSelect({...operation})}
        key={operation.id}
      >
        {operation.name}
        <button onClick={(e)=>deleteButtonClick(e, operation.id)}>
          <FaXmark className="text-rose-700"/>
        </button>
      </div>
    )
  });

  return (
    <div className="flex dark:bg-gray-800">
      {OperationButtons}
      <button 
        className="my-1 p-2 text-gray-700 cursor-pointer hover:text-gray-900 hover:bg-gray-300 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
        onClick={()=>onAdd()}
      >
        <i className="fas fa-plus text-green-700"/>
      </button>
    </div> 
  )

}

const Operation = ({
  endPoint,
  operation,
  onUpdateOperation,
  onResponse
}: {
  endPoint: string;
  operation: GraphqlOperation | undefined;
  onUpdateOperation: (operation: GraphqlOperation)=>void;
  onResponse: (json: unknown)=>void;
}) => {
  
  const [variablesString, setVariablesString] = useState ('');
  const [headersString, setHeadersString] = useState ('');
  const [varHeadTab, setVarHeadTab] = useState<'Variables' | 'Headers'> ('Variables');
  const [query, setQuery] = useState ('')
  
  useEffect (()=>{
    setVariablesString ((
        operation && 
        operation.variables && 
        Object.keys(operation.variables).length > 0
      ) ? 
      JSON.stringify(operation.variables, null, ' ') : ''
    );
    setHeadersString ((
        operation && 
        operation.headers && 
        Object.keys(operation.headers).length > 0
      ) ? 
      JSON.stringify(operation.headers, null, ' ') : ''
    );
    setVarHeadTab ('Variables');
    setQuery (operation ? operation.query : '');
  },[operation]);

  const sendOperation = async() =>{
    if (!endPoint) {
      onResponse ({data: 'End Point is empty!'});
      return;
    }
    if (!operation) {
      onResponse ({data: 'Current Operation object empty!'});
      return;
    }
    let variablesObj;
    if (variablesString !== ''){
      try{
        variablesObj = JSON.parse(variablesString);
      }catch(e){
        console.log(e);
        onResponse ({data: 'Something wrong with variables!'});
        return;
      }
    }
    let headersObj;
    if (headersString !== ''){
      try{
        headersObj = JSON.parse(headersString);
      }catch(e){
        console.log(e);
        onResponse ({data: 'Something wrong with headers!'});
        return;
      }
    }
    
    const res = await graqhqlFetch ({
      endpoint: endPoint, 
      query: query, 
      variables: variablesObj,
      headers: headersObj
    });

    if (res){
      onResponse (res);
      const name = abstractName (query);
      onUpdateOperation ({
        id: operation.id, 
        query, 
        variables: variablesObj, 
        headers: headersObj,
        name}); /** update db until the operation is sent **/
    }
  }

  const abstractName = (queryString: string): string => {
    const noLineBreakString = queryString.replace ('\n', ' ');
    const findBraceString = noLineBreakString.replace ('{', ' {');
    const findParenthesesString = findBraceString.replace ('(', ' (');
    const wordArray = findParenthesesString.split (' ');
    const noEmptyWordArray = wordArray.filter (a => a.length>0);
    if (noEmptyWordArray[0] === 'query'
      || noEmptyWordArray[0] === 'mutation' 
      && noEmptyWordArray[1])
    {
      return noEmptyWordArray[1];
    }
    return '';
  }

  return (
    <>
      <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
        <div className=" dark:text-gray-400">
          Operation
        </div>
        <div className="flex items-center justify-end px-3 dark:border-gray-600">
          <button 
            type="submit" 
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
      <Query 
        query={query} 
        onUpdateQuery={(update)=>setQuery(update)}
      />
      <VariablesHeaders
        variables={variablesString} 
        headers={headersString} 
        tab={varHeadTab}
        onUpdateVariables={(update)=>setVariablesString(update)}
        onUpdateHeaders={(update)=>setHeadersString(update)}
        onUpdateTab={(update)=>setVarHeadTab(update)}
      />
    </>
  )
}

const Query = ({
  query, 
  onUpdateQuery
}: {
  query: string;
  onUpdateQuery: (update: string)=>void;
}) => {

  return (
    <>
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

const VariablesHeaders = ({
  variables, 
  headers,
  tab,
  onUpdateVariables,
  onUpdateHeaders,
  onUpdateTab
}: {
  variables: string; 
  headers: string; 
  tab: string;
  onUpdateVariables: (update: string)=> void;
  onUpdateHeaders: (update: string)=> void;
  onUpdateTab: (update: 'Variables' | 'Headers')=> void;
}) => {

  const displayedTexteara = (tab === 'Variables') ? (<>
      <label htmlFor="Variables" className="sr-only">Variables</label>
      <textarea 
        id="Variables" 
        className="block w-full grow px-0 text-sm text-gray-800 resize-none bg-white border-0 focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 " 
        placeholder="Write Variables ..." 
        value={variables}
        onChange={(e)=>onUpdateVariables(e.target.value)}
      >
      </textarea>
    </>) : (<>
      <label htmlFor="Headers" className="sr-only">Headers</label>
      <textarea 
        id="Headers" 
        className="block w-full grow px-0 text-sm text-gray-800 resize-none bg-white border-0 focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 " 
        placeholder="Write Headers ..." 
        value={headers}
        onChange={(e)=>onUpdateHeaders(e.target.value)}
      >
      </textarea>
    </>)
      
  return (
    <>
      <div 
        className="flex items-center justify-normal px-3 py-2 border-t bg-white dark:border-gray-600 dark:bg-gray-800 dark:text-white"
      >
        <div 
          className={classNames(
            "my-1 p-2 text-gray-700 cursor-pointer hover:text-gray-900 hover:bg-gray-400 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700",
            tab === "Variables" && "bg-gray-300 dark:bg-gray-600"
          )}
          onClick={()=>onUpdateTab("Variables")}
        >
          Variables
        </div>
        <div 
          className={classNames(
            "my-1 p-2 text-gray-700 cursor-pointer hover:text-gray-900 hover:bg-gray-400 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700",
            tab === "Headers" && "bg-gray-300 dark:bg-gray-600"
          )}
          onClick={()=>onUpdateTab("Headers")}
        >
          Headers
        </div>
      </div>
      <div className="flex-1 flex flex-col px-4 py-2 bg-white dark:bg-gray-800">
        {displayedTexteara}
      </div>
    </>
  )
}

const Response = ({
  response
}:{
  response: unknown
})=>{

  const jsonDisplay = (typeof response === 'object' && response != null) ?
    response : {data: 'something wrong!'};

  return (
    <div className="block flex-1 p-2 border h-full bg-neutral-400 overflow-auto">
      <ReactJson src={jsonDisplay}/>
    </div>
  )
}

