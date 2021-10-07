import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth'
import { useState } from 'react';
import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';

initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

function App() {

  const [user, setUser] = useState({});

  const auth = getAuth();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(loggedInUser);
      })
      .catch((error) => {
        // // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error.message)
      });
  }

  // Github Signin Handle function
  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const user = result.user;
        console.log(user)
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(loggedInUser);
      })
      .catch((error) => {
        console.log(error.message)
      });
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
  };

  return (
    <div className="App">
      {!user.name ? <div>
        <button onClick={handleGoogleSignIn}>Google Sign In</button>
        <button onClick={handleGithubSignIn}>Github Sign In</button>
      </div> :
        <button onClick={handleSignOut}>Sign Out</button>}
      <br />
      {
        user.name && <div>
          <h2>Welcome {user.name}</h2>
          <p>I know your email address:  {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
