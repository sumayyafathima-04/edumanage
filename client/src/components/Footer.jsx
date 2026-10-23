import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand & Project Info */}
          <div className="footer-brand">
            <h4>EduManage System</h4>
            <p>
              A modern, full-stack MERN (MongoDB, Express.js, React.js, Node.js) Student Management System designed for college academic administration and student record lifecycle tracking.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h5>Navigation</h5>
            <ul className="footer-links">
              <li><Link to="/">Home Landing</Link></li>
              <li><Link to="/dashboard">Student Records</Link></li>
              <li><Link to="/login">Account Login</Link></li>
              <li><Link to="/register">Create Account</Link></li>
            </ul>
          </div>

          {/* Tech Stack Info */}
          <div className="footer-col">
            <h5>Technology Stack</h5>
            <ul className="footer-links">
              <li>MongoDB & Mongoose</li>
              <li>Express.js REST APIs</li>
              <li>React.js (Vite + Hooks)</li>
              <li>Node.js Runtime & JWT Auth</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Student Management System — College Term Work-2 Micro Project. Built with MERN Stack.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
