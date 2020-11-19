import logo from './logo.svg';
import './App.css';
import { SignUp, SignIn, Home } from './components'
import { useState } from 'react'
import { authenticateUser, registerUser } from './logic'


function App() {
  const [view, setView] = useState('sign-in')


  const handleSignUp = (fullname, email, password) => {

    registerUser(fullname, email, password, (error) => {

      if (error) return alert(error.message)

      setView('sign-in')
    })

  }

  const handleGoToSignIn = () => {
    setView('sign-in')
  }

  const handleSignIn = (email, password) => {
    try {
      authenticateUser(email, password, (error, token) => {
        if (error) return alert(error.message)

        sessionStorage.token = token

        setView('home')
      })
   } catch (error) {
      alert(error.message)
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello, Marta!</h1>

        {view === 'sign-up' && <SignUp onSignUp={handleSignUp} goToSignIn={handleGoToSignIn} />}
        {view === 'sign-in' && <SignIn onSignIn={handleSignIn} />}
        {view === 'home' && <Home></Home>}

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
