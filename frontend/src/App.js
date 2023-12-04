import React from "react"; 
import Navbar from "./components/Navbar/Navbar";
import Poll from "./components/Poll/Poll";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Poll/>
      <Footer/>
    </div>
  );
}

export default App;
