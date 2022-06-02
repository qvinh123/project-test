import './App.css';
import { Header } from './components/header/Header';
import { Routes, Route } from "react-router-dom"
import { Signup } from './pages/signup/Signup';
import { Signin } from './pages/signin/Signin';
import { CreateProject } from './pages/create-project/CreateProject';
import { ListProject } from './pages/list-project/ListProject';
import useAuth from './hooks/useAuth';
import PrivateRoutes from './routes/PrivateRoutes';
import PageNotFound from './pages/page-not-found/PageNotFound';

function App() {
  const { user } = useAuth()

  return (
    <div className="App">
      <Header />
      <div className="container-fluid">
        <Routes>
          <Route index element={user ? <ListProject /> : <Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/createProject" element={<CreateProject />} />
            <Route path="/getAllProject" element={<ListProject />} />
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
