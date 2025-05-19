import * as React from "react";
import "./App.css";
import logo from "./assets/logo.png";
import 'aframe';

const App: React.FC = () => {
  return (
    <div className="vr-container">
      <a-scene>
        {/* 360-degree background - replace with your own equirectangular image */}
        <a-sky src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg" rotation="0 -90 0"></a-sky>
        
        {/* Camera with controls */}
        <a-entity position="0 1.6 0">
          <a-camera look-controls wasd-controls>
            {/* VR UI elements positioned in front of the camera */}
            <a-entity position="0 0 -2" scale="0.5 0.5 0.5">
              <a-image src={logo} position="0 0.5 0" width="2" height="2"></a-image>
              <a-text value="Sora Space" position="0 -0.5 0" color="#FFF" align="center" width="6"></a-text>
            </a-entity>
          </a-camera>
        </a-entity>
        
        {/* Add interactive elements */}
        <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9" 
               animation="property: rotation; to: 0 405 0; loop: true; dur: 10000; easing: linear"></a-box>
        <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
        <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
        
        {/* Ground */}
        <a-plane position="0 0 -4" rotation="-90 0 0" width="10" height="10" color="#7BC8A4"></a-plane>
      </a-scene>
      
      {/* Optional: Fallback UI for non-VR mode */}
      <div className="flat-ui-overlay">
        <button className="enter-vr-button">Enter VR Mode</button>
      </div>
    </div>
  );
}

export default App;
