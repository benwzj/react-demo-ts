import ReactJson from 'react-json-view';

export default function RestClientPage() {

  return (
    <div className="flex border w-full h-screen">
      <div className="flex flex-col w-full flex-1 border border-gray-200 bg-gray-100 dark:bg-gray-700 dark:border-gray-600">
        <EndPoint 
        />
        <Headers
        />
        <Body 
        />
      </div>
      <Response />
    </div>
  )
}

const EndPoint = () => {

  return (
    <div className="relative flex dark:bg-gray-800">
      <label htmlFor="endpoint" className="sr-only">
        Search
      </label>
      <input 
        className="peer block w-full py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:border-blue-500  text-gray-800 bg-white dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 focus:outline-none  "
        placeholder="End Point"
        id="endpoint"
      />
      <i className="fas fa-server absolute left-3 top-5 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-gray-400 dark:peer-focus:text-gray-50"/>
    </div> 
  )
}

const Headers = () =>{
  return (      
    <div className="flex-1 flex flex-col px-4 py-2 bg-white dark:bg-gray-800">
      <label htmlFor="Headers" className="sr-only">Headers</label>
      <textarea 
        id="Headers" 
        className="block w-full grow px-0 text-sm text-gray-800 resize-none bg-white border-0 focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 " 
        placeholder="Write Headers ..." 
      >
      </textarea>
    </div>
  )
}

const Body = () =>{
  return (      
    <div className="flex-1 flex flex-col px-4 py-2 bg-white dark:bg-gray-800">
      <label htmlFor="Body" className="sr-only">Body</label>
      <textarea 
        id="Body" 
        className="block w-full grow px-0 text-sm text-gray-800 resize-none bg-white border-0 focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 " 
        placeholder="Write Body ..." 
      >
      </textarea>
    </div>
  )
}

const Response = ({
  response = ''
}:{
  response?: unknown
})=>{

  const jsonDisplay = (typeof response === 'object' && response != null) ?
    response : {data: 'something wrong!'};

  return (
    <div className="block flex-1 p-2 border h-full bg-neutral-400 overflow-auto">
      <ReactJson src={jsonDisplay}/>
    </div>
  )
}