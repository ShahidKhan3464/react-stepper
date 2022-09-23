import React from "react";
import Stepper from "./components/stepper/Stepper";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  return (
    <div className="App">
      <Container>
        <Stepper />
      </Container>
    </div>
  );
}

export default App;