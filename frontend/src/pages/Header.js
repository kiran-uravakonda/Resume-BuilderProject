import { Link } from 'react-router-dom';
import { useState } from 'react';

function Header() {
 
  const [collapsed, setCollapsed] = useState(true);


  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-body">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          ResumeBuilder
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar} 
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${collapsed ? '' : 'show'}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
