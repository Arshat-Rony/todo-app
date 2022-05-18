import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
import RequireAuth from './Pages/RequireAuth';
import Login from './Pages/Shared/Login/Login';
import Signup from './Pages/Shared/Login/Signup';
const queryClient = new QueryClient()
function App() {
  return (
    <div data-theme="dark" className="font-poppins">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='/' element={
            <RequireAuth>
              <Home></Home>
            </RequireAuth>
          }></Route>
          <Route path='/home' element={
            <RequireAuth>
              <Home></Home>
            </RequireAuth>

          }></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path="/signup" element={<Signup></Signup>} />
        </Routes>

        <ToastContainer />
      </QueryClientProvider>

    </div>
  );
}

export default App;
