import React from 'react';
import '../assets/styles/top-bar.css';
import logo from '../assets/images/logo.jpg';

const TopBar = () => (
  <div className="top-container">
    <div id="title-container">
      <img id="title-logo" src={logo} />
      <h1 id="title">PayMate</h1>
    </div>
    <h4 id="title-slogan">A PayStack's Lab Project</h4>
  </div>
)

export default TopBar;
