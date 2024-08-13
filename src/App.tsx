import Navbar from './components/navbar';
import Route from './components/router/route';
import PictureSearchPage from './pages/picture-search';
import BooksManagePage from './pages/books-manage';

function App() {

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <Navbar/>
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        <Route path="/">
          <PictureSearchPage/>
        </Route>
        <Route path="/ui-test">
          This is UITestPage
        </Route>
        <Route path="/todos">
          This is TodosPage
        </Route>
        <Route path="/bookmanage">
          <BooksManagePage/>
        </Route>
      </div>
    </div>
  )
}

export default App;
