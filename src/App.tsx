import Navbar from './components/navbar';
import Route from './components/router/route';
import PictureSearchPage from './pages/picture-search';
import BooksManagePage from './pages/books-manage';
import UITestPage from './pages/ui-test';
import TodosPage from './pages/todos';
import SpaceMissionPage from './pages/space-mission';
import GraphQLClientPage from './pages/graphql-client';

function App() {

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <Navbar/>
      </div>
      <div className="grow md:overflow-y-auto">
        <Route path="/">
          <PictureSearchPage/>
        </Route>
        <Route path="/ui-test">
          <UITestPage/>
        </Route>
        <Route path="/todos">
          <TodosPage/>
        </Route>
        <Route path="/bookmanage">
          <BooksManagePage/>
        </Route>
        <Route path="/space-mission">
          <SpaceMissionPage/>
        </Route>
        <Route path="/graphql">
          <GraphQLClientPage/>
        </Route>
      </div>
    </div>
  )
}

export default App;
