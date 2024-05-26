import Header from "./components/Header"
import TimeSliderContainer from "./components/TimeSlider/TimeSliderContainer";

import "./App.scss";
import "nouislider/distribute/nouislider.css";


function App() {

  return (
    <>
      <main className="main">
        <h1 className="heading">Time Converter</h1>
        <Header />

        <TimeSliderContainer />

      </main>
    </>
  )
}

export default App
