import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Menu from './componentes/Menu'
import Home from './componentes/telas/Home'
import Sobre from "./componentes/telas/Sobre";
import PrivateRoutes from './componentes/PrivateRoutes'
import Login from "./componentes/telas/usuario/Login";
import Registro from "./componentes/telas/usuario/Registro";
import Objetivo from './componentes/telas/objetivo/Objetivo'
import EntradaDetalhes from "./componentes/telas/entrada/EntradaDetalhes";
import Entrada from "./componentes/telas/entrada/Entrada";
import { AuthProvider } from "./contexts/AuthContext";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />,
    children: [
      { index: true, element: <Home /> },
      { path: "/sobre", element: <Sobre /> },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Registro />
      },
      {
        path: "/objetivos",
        element: (
          <PrivateRoutes>
            <Objetivo />
          </PrivateRoutes>
        )
      },
      {
        path: "/entradas",
        element: (
          <PrivateRoutes>
            <Entrada />
          </PrivateRoutes>
        )
      },
      {
        path: "/entradas/:id",
        element: (
          <PrivateRoutes>
            <EntradaDetalhes />
          </PrivateRoutes>
        )
      }
    ]
  }
]);

function App() {
  return (
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
);
}

export default App;
