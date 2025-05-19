import * as React from "react";
import "./App.css";
import AFrameScene from "./components/AFrameScene";

const App: React.FC = () => {
  const [showMenu, setShowMenu] = React.useState(false);
  
  // Handler for toggling the menu visibility
  const toggleMenu = () => {
    // This will also trigger the A-Frame menu toggle
    const menuPanel = document.getElementById('main-menu-panel');
    if (menuPanel) {
      const isVisible = menuPanel.getAttribute('visible') === 'true';
      menuPanel.setAttribute('visible', (!isVisible).toString());
      setShowMenu(!isVisible);
    } else {
      setShowMenu(!showMenu);
    }
  };
  
  return (
    <div className="vr-container">
      {/* Use the JSX component that contains all A-Frame elements */}
      <AFrameScene />
      
      {/* Optional: Fallback UI for non-VR mode */}
      <div className="flat-ui-overlay">
        <button className="enter-vr-button">Enter VR Mode</button>
        <button className="menu-button" onClick={toggleMenu}>
          {showMenu ? 'Close Menu' : 'Open Menu'}
        </button>
      </div>
    </div>
  );
};

export default App;
