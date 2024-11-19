import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";

import rgbToHsl from "./Utils";

SingleColour.propTypes = {
  rgb: PropTypes.array.isRequired,
  hexColour: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  activateToast: PropTypes.func.isRequired,
};

// Component - rectangle to display patch of single colour
export default function SingleColour({
  rgb,
  hexColour,
  weight,
  index,
  activateToast,
}) {
  const bcg = rgb.join(",");
  const hexValue = `#${hexColour}`;

  // Copies clicked value to clipboard and calls passed function to activate toast pop-up
  const copyToClipboard = () => {
    navigator.clipboard.writeText(hexValue);
    activateToast();
  };

  return (
    // Rectangle displaying colour patch with text conditionally dark or light to aid visibility
    <article
      className={`color ${index > 20 && "color-light"}`}
      style={{ backgroundColor: `rgb(${bcg})` }}
      onClick={() => copyToClipboard()}
    >
      {/* Show tint/shade percent and conditionally display "tint" or "shade" for values above or below chosen value */}
      <p className="percent-value">
        {weight}% {index === 20 ? "" : index < 20 ? "tint" : "shade"}
      </p>

      {/* Display converted colour values */}
      <p className="color-value">{hexValue}</p>
      <p className="color-value">{rgbToHsl(rgb[0], rgb[1], rgb[2])}</p>
    </article>
  );
}
