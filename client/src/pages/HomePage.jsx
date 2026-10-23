import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <h1 className="hero-title">
                Student <span className="hero-highlight">Management</span> System
              </h1>
              <p className="hero-description">
                A modern, responsive, and secure MERN Stack web application designed to manage student profiles, academic enrollments, roll numbers, and department directories with end-to-end REST API integration.
              </p>
              <div className="hero-actions">
                {isAuthenticated ? (
                  <Link to="/dashboard" className="btn btn-primary btn-lg">
                    <span>Go to Dashboard</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                ) : (
                  <>
                    <Link to="/register" className="btn btn-primary btn-lg">
                      <span>Get Started Free</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Link>
                    <Link to="/login" className="btn btn-secondary btn-lg">
                      <span>Account Login</span>
                    </Link>
                  </>
                )}
                <Link to="/dashboard" className="btn btn-secondary btn-lg">
                  View Students
                </Link>
              </div>
            </div>

            {/* Visual Hero Dashboard Card Preview */}
            <div className="hero-card-preview">
              <div className="preview-header">
                <div className="preview-dots">
                  <div className="preview-dot red"></div>
                  <div className="preview-dot yellow"></div>
                  <div className="preview-dot green"></div>
                </div>
                <span className="preview-badge-status">
                  Live Admin Dashboard
                </span>
              </div>

              <div className="preview-stat-grid">
                <div className="preview-stat-item">
                  <div className="preview-stat-num">100%</div>
                  <div className="preview-stat-lbl">MERN Architecture</div>
                </div>
                <div className="preview-stat-item">
                  <div className="preview-stat-num">JWT</div>
                  <div className="preview-stat-lbl">Encrypted Sessions</div>
                </div>
                <div className="preview-stat-item">
                  <div className="preview-stat-num">CRUD</div>
                  <div className="preview-stat-lbl">Instant DB Updates</div>
                </div>
                <div className="preview-stat-item">
                  <div className="preview-stat-num">REST</div>
                  <div className="preview-stat-lbl">Express.js API Endpoints</div>
                </div>
              </div>

              <div className="preview-recent-record">
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Recent Roll: CS2026-042</span>
                <span style={{ color: 'var(--primary)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#205A40', display: 'inline-block' }}></span>
                  Active Record
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Core Capabilities</span>
            <h2 className="section-heading">Designed for Complete Student Administration</h2>
            <p className="section-subtitle">
              Fully compliant with the requirements of college Term Work-2 practical evaluation and viva demonstration.
            </p>
          </div>

          <div className="features-grid">
            {/* Feature 1 */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                🔒
              </div>
              <h3 className="feature-title">JWT & Bcrypt Authentication</h3>
              <p className="feature-text">
                Secure user registration and login workflows with 10-salt bcrypt password hashing and tamper-proof JSON Web Token authorization.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                ⚡
              </div>
              <h3 className="feature-title">Full CRUD Management</h3>
              <p className="feature-text">
                Create, read, update, and delete student records in real time with dynamic modal interfaces and confirmation dialogs.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                🔍
              </div>
              <h3 className="feature-title">Live Search & Department Filters</h3>
              <p className="feature-text">
                Instantly search students by full name, roll number, or email address. Filter records dynamically across academic engineering branches.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                🍃
              </div>
              <h3 className="feature-title">MongoDB Atlas Cloud Database</h3>
              <p className="feature-text">
                Structured Mongoose schemas for Users and Students with strict validation rules, unique roll number constraints, and index optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Showcase */}
      <section className="architecture-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Viva & Technical Overview</span>
            <h2 className="section-heading">MERN Stack Architecture</h2>
            <p className="section-subtitle">
              How the frontend, backend, database, and authentication modules interact.
            </p>
          </div>

          <div className="arch-grid">
            <div className="arch-card">
              <div className="arch-icon">⚛️</div>
              <h4>React.js Frontend</h4>
              <p>
                Single Page Application (SPA) built with Vite, React Router v6, functional components, and hooks.
              </p>
            </div>

            <div className="arch-card">
              <div className="arch-icon">🟢</div>
              <h4>Node.js & Express</h4>
              <p>
                Asynchronous RESTful API backend handling routing, token validation, and controller business logic.
              </p>
            </div>

            <div className="arch-card">
              <div className="arch-icon">🍃</div>
              <h4>MongoDB Database</h4>
              <p>
                NoSQL document storage storing Users and Students collections with Mongoose validation models.
              </p>
            </div>

            <div className="arch-card">
              <div className="arch-icon">🔑</div>
              <h4>JWT Security</h4>
              <p>
                Stateless token-based authorization guaranteeing only authenticated college staff can access records.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
