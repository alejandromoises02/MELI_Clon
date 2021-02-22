import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./scss/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProductsProvider } from "./context/ProductsContext";
import { BreadcrumbProvider } from "./context/BreadcrumbContext";
import Buscador from "./components/Buscador";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Items from "./components/Items";

function App() {
  //Rutas para el Front(Caja de busqueda, vista de items, detalle de producto), Context para datas y vistas principales
  return (
    <div className="ban">
      <main>
        <ProductsProvider>
          <BreadcrumbProvider>
            <BrowserRouter>
              <Buscador />

              <Switch>
                <Route exact path="/"></Route>

                <Route exact path="/items">
                  <Items />
                </Route>

                <Route exact path="/items/:id">
                  <ItemDetailContainer />
                </Route>
              </Switch>
            </BrowserRouter>
          </BreadcrumbProvider>
        </ProductsProvider>
      </main>
    </div>
  );
}

export default App;
