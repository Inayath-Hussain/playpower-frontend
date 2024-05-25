import Header from "./components/Header"
import "./App.scss";
import TimeSliderContainer from "./components/TimeSlider/TimeSliderContainer";

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
