import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import Values from "values.js";
import { ToastContainer, toast } from "react-toastify";

import "./App.css";
import SingleColour from "./SingleColour";

function App() {
  // State variables
  const [colour, setColour] = useState("#472945");
  const [error, setError] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [list, setList] = useState(new Values("#472945").all(5));

  // Set the colour pallet using the selected colour (Generate button)
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      let colours = new Values(colour).all(5);
      setList(colours);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  // Used by colour picker to set the selected colour
  const handleColourChange = (newColor) => {
    setColour(newColor);
  };

  // Toggole visibility of colour picker
  const togglePicker = () => {
    setShowPicker((prevShowPicker) => !prevShowPicker);
  };

  // Callback function passed to colour objects, allows the toasttify.js notification to appear
  const showToast = () => {
    if (toast.isActive("myToast")) {
      toast.dismiss("myToast");

      // Notification needs delay to allow reactivation after dismissal
      setTimeout(() => {
        toast.success("Copied to clipboard!", { toastId: "myToast" });
      }, 900);
    } else {
      toast.success("Copied to clipboard!", { toastId: "myToast" });
    }
  };

  return (
    <>
      {/* Header section */}
      <section className="container">
        {/* Title */}
        <h3>Colour Generator</h3>
        <div>
          {/* Selected colour display and selector to open colour picker */}
          <div
            onClick={togglePicker}
            style={{
              backgroundColor: colour,
              width: "40px",
              height: "40px",
              cursor: "pointer",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />

          {/* Colour picker */}
          {showPicker && (
            <div style={{ position: "absolute", marginTop: "8px", zIndex: 2 }}>
              <HexColorPicker color={colour} onChange={handleColourChange} />
              <button onClick={togglePicker} style={{ marginTop: "8px" }}>
                Close
              </button>
            </div>
          )}
        </div>

        {/* Input box and submit button */}
        <form onSubmit={handleSubmit}>
          <input
            className={`${error ? "error" : null}`}
            type="text"
            value={colour}
            placeholder="#472945"
            onChange={(e) => setColour(e.target.value)}
          />
          <button className="btn" type="submit">
            Generate
          </button>
        </form>
      </section>

      {/* Colour patch section */}
      <section className="colors">
        {list.map((colour, index) => {
          return (
            <SingleColour
              key={index}
              {...colour}
              index={index}
              hexColour={colour.hex}
              activateToast={showToast}
            />
          );
        })}
      </section>

      {/* Toastify notification */}
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
}

export default App;
