import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />

          <div className="container my-3">
            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/about" Component={About} />
              <Route path="/login" Component={Login} />
              <Route path="/signup" Component={SignUp} />
            </Routes>
          </div>

        </Router>
      </NoteState >
    </>
  );
}

export default App;
