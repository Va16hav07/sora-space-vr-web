import * as React from "react";
import "./App.css";
// Import the JSX component instead of using A-Frame tags directly
import AFrameScene from "./components/AFrameScene";

const App: React.FC = () => {
  return (
    <div className="vr-container">
      {/* Use the JSX component that contains all A-Frame elements */}
      <AFrameScene />
      
      {/* Optional: Fallback UI for non-VR mode */}
      <div className="flat-ui-overlay">
        <button className="enter-vr-button">Enter VR Mode</button>
      </div>
    </div>
  );
};

export default App;
