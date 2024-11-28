import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { AuthContext } from './contexts/authContext';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Chat from './components/Chat';
import IndividualChat from './components/IndividualChat';
import { SocketContext } from './contexts/SocketContext';
function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/chat",
      element: <Chat />,
    },
    {
      path: "/individualchat",
      element: <IndividualChat />,
    }
  ]);
  return (
    <>
        <AuthContext>
          <SocketContext>
            <RouterProvider router={router} />
          </SocketContext>
        </AuthContext>
    </>
  );
}

export default App;
