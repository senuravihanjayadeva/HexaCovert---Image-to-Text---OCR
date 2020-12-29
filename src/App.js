import HomeComponent from "./components/HomeComponent/HomeComponent";
import NavbarComponent from "./components/NavBarComponent/navbar.component";

import "./HomeComponent.css";

function App() {
  return (
    <div className="AppComponent">
      <NavbarComponent />
      <HomeComponent />
    </div>
  );
}

export default App;
