import React, { useState, useEffect } from 'react';
import 'aframe';
import logo from '../assets/logo.png';

// Register custom components when the component mounts
const registerComponents = () => {
  if (typeof window !== 'undefined' && window.AFRAME) {
    // Menu toggle component
    if (!AFRAME.components['menu-toggle']) {
      AFRAME.registerComponent('menu-toggle', {
        init: function() {
          const el = this.el;
          const menuPanel = document.getElementById('main-menu-panel');
          
          el.addEventListener('click', function() {
            const isVisible = menuPanel.getAttribute('visible') === 'true';
            menuPanel.setAttribute('visible', !isVisible);
            // Dispatch event for React state
            document.dispatchEvent(new CustomEvent('menu-toggle', { 
              detail: { isVisible: !isVisible }
            }));
          });
        }
      });
    }
    
    // Navigation button component
    if (!AFRAME.components['nav-button']) {
      AFRAME.registerComponent('nav-button', {
        schema: {
          destination: {type: 'string', default: ''}
        },
        
        init: function() {
          const el = this.el;
          const destination = this.data.destination;
          
          el.addEventListener('click', function() {
            console.log(`Navigating to: ${destination}`);
            
            document.dispatchEvent(new CustomEvent('navigate', {
              detail: { destination: destination }
            }));
            
            document.getElementById('main-menu-panel').setAttribute('visible', 'false');
          });
        }
      });
    }
  }
};

const AFrameScene = () => {
  // State for menu visibility
  const [menuVisible, setMenuVisible] = useState(false);
  // State for current location
  const [currentLocation, setCurrentLocation] = useState('home');
  
  useEffect(() => {
    // Register A-Frame components
    registerComponents();
    
    // Listen for menu toggle events
    const handleMenuToggle = (event) => {
      setMenuVisible(event.detail.isVisible);
    };
    
    // Listen for navigation events
    const handleNavigate = (event) => {
      setCurrentLocation(event.detail.destination);
    };
    
    document.addEventListener('menu-toggle', handleMenuToggle);
    document.addEventListener('navigate', handleNavigate);
    
    return () => {
      document.removeEventListener('menu-toggle', handleMenuToggle);
      document.removeEventListener('navigate', handleNavigate);
    };
  }, []);

  // Update mobile UI
  useEffect(() => {
    const mobileFeedback = document.querySelector('.current-location');
    if (mobileFeedback) {
      mobileFeedback.textContent = `Current Page: ${currentLocation}`;
    }
  }, [currentLocation]);

  return (
    <>
      <a-scene cursor="rayOrigin: mouse" raycaster="objects: .clickable">
        {/* 360-degree background */}
        <a-sky src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg" rotation="0 -90 0"></a-sky>
        
        {/* Camera with controls */}
        <a-entity position="0 1.6 0">
          <a-camera look-controls wasd-controls>
            {/* Fixed menu button follows camera */}
            <a-entity position="0.4 -0.3 -1">
              <a-circle 
                radius="0.05" 
                color="#4CC3D9" 
                menu-toggle 
                class="clickable"
                animation__mouseenter="property: scale; to: 1.2 1.2 1.2; startEvents: mouseenter; dur: 200"
                animation__mouseleave="property: scale; to: 1 1 1; startEvents: mouseleave; dur: 200">
                <a-text value="MENU" align="center" color="#FFF" position="0 0 0.01" scale="0.5 0.5 0.5"></a-text>
              </a-circle>
            </a-entity>
            
            {/* Main menu panel - hidden by default */}
            <a-entity id="main-menu-panel" position="0 0 -1" visible={menuVisible.toString()}>
              <a-plane color="#333" opacity="0.9" width="1" height="0.8" position="0 0 0">
                <a-text value="NAVIGATION MENU" align="center" color="#FFF" position="0 0.3 0.01" width="0.9"></a-text>
                
                {/* Navigation buttons */}
                <a-entity position="0 0.15 0.01">
                  <a-plane 
                    color="#4CC3D9" 
                    width="0.8" 
                    height="0.1" 
                    position="0 0 0" 
                    nav-button="destination: home" 
                    class="clickable"
                    animation__mouseenter="property: scale; to: 1.05 1.05 1.05; startEvents: mouseenter; dur: 200"
                    animation__mouseleave="property: scale; to: 1 1 1; startEvents: mouseleave; dur: 200">
                    <a-text value="Home" align="center" color="#FFF" position="0 0 0.01" width="0.8"></a-text>
                  </a-plane>
                </a-entity>
                
                <a-entity position="0 0 0.01">
                  <a-plane 
                    color="#4CC3D9" 
                    width="0.8" 
                    height="0.1" 
                    position="0 0 0" 
                    nav-button="destination: gallery" 
                    class="clickable"
                    animation__mouseenter="property: scale; to: 1.05 1.05 1.05; startEvents: mouseenter; dur: 200"
                    animation__mouseleave="property: scale; to: 1 1 1; startEvents: mouseleave; dur: 200">
                    <a-text value="Gallery" align="center" color="#FFF" position="0 0 0.01" width="0.8"></a-text>
                  </a-plane>
                </a-entity>
                
                <a-entity position="0 -0.15 0.01">
                  <a-plane 
                    color="#4CC3D9" 
                    width="0.8" 
                    height="0.1" 
                    position="0 0 0" 
                    nav-button="destination: about" 
                    class="clickable"
                    animation__mouseenter="property: scale; to: 1.05 1.05 1.05; startEvents: mouseenter; dur: 200"
                    animation__mouseleave="property: scale; to: 1 1 1; startEvents: mouseleave; dur: 200">
                    <a-text value="About" align="center" color="#FFF" position="0 0 0.01" width="0.8"></a-text>
                  </a-plane>
                </a-entity>
                
                <a-entity position="0 -0.3 0.01">
                  <a-plane 
                    color="#EF2D5E" 
                    width="0.8" 
                    height="0.1" 
                    position="0 0 0" 
                    class="clickable"
                    menu-toggle
                    animation__mouseenter="property: scale; to: 1.05 1.05 1.05; startEvents: mouseenter; dur: 200"
                    animation__mouseleave="property: scale; to: 1 1 1; startEvents: mouseleave; dur: 200">
                    <a-text value="Close Menu" align="center" color="#FFF" position="0 0 0.01" width="0.8"></a-text>
                  </a-plane>
                </a-entity>
              </a-plane>
            </a-entity>
            
            {/* VR UI elements positioned in front of the camera */}
            <a-entity position="0 0 -2" scale="0.5 0.5 0.5">
              <a-image src={logo} position="0 0.5 0" width="2" height="2"></a-image>
              <a-text value="Sora Space" position="0 -0.5 0" color="#FFF" align="center" width="6"></a-text>
              <a-text value={`Current Page: ${currentLocation}`} position="0 -0.7 0" color="#FFF" align="center" width="6"></a-text>
            </a-entity>
          </a-camera>
        </a-entity>
        
        {/* Add interactive elements */}
        <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9" 
               animation="property: rotation; to: 0 405 0; loop: true; dur: 10000; easing: linear"
               class="clickable"></a-box>
        <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E" class="clickable"></a-sphere>
        <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D" class="clickable"></a-cylinder>
        
        {/* Ground */}
        <a-plane position="0 0 -4" rotation="-90 0 0" width="10" height="10" color="#7BC8A4"></a-plane>
      </a-scene>
      
      {/* Mobile menu UI */}
      {menuVisible && (
        <div className="mobile-menu">
          <h3>Navigation</h3>
          <div className="menu-buttons">
            <button onClick={() => {
              setCurrentLocation('home');
              document.getElementById('main-menu-panel').setAttribute('visible', 'false');
              setMenuVisible(false);
            }}>Home</button>
            <button onClick={() => {
              setCurrentLocation('gallery');
              document.getElementById('main-menu-panel').setAttribute('visible', 'false');
              setMenuVisible(false);
            }}>Gallery</button>
            <button onClick={() => {
              setCurrentLocation('about');
              document.getElementById('main-menu-panel').setAttribute('visible', 'false');
              setMenuVisible(false);
            }}>About</button>
          </div>
          <button className="close-menu-btn" onClick={() => {
            document.getElementById('main-menu-panel').setAttribute('visible', 'false');
            setMenuVisible(false);
          }}>Close Menu</button>
        </div>
      )}
      <div className="current-location">Current Page: {currentLocation}</div>
    </>
  );
};

export default AFrameScene;
