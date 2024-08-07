import Navbar from './components/navbar';
import Route from './components/router/route';

function App() {

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <Navbar/>
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        <Route path="/">
          <div>this is Root</div>
        </Route>
        <Route path="/ui-test">
          This is UITestPage
        </Route>
        <Route path="/todos">
          This is TodosPage
        </Route>
        <Route path="/bookmanage">
          This is BooksManagePage
        </Route>
      </div>
    </div>
  )
}

export default App;
