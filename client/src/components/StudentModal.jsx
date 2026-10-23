import React, { useState, useEffect } from 'react';

const DEPARTMENTS = [
  'Computer Science & Engineering',
  'Information Technology',
  'Electronics & Telecommunication',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Artificial Intelligence & Data Science',
];

const YEARS = ['First Year', 'Second Year', 'Third Year', 'Final Year'];

const StudentModal = ({ isOpen, onClose, onSave, student = null, isSubmitting = false }) => {
  const isEditing = Boolean(student);

  const [formData, setFormData] = useState({
    fullName: '',
    rollNumber: '',
    email: '',
    department: DEPARTMENTS[0],
    year: YEARS[0],
    phone: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student) {
      setFormData({
        fullName: student.fullName || '',
        rollNumber: student.rollNumber || '',
        email: student.email || '',
        department: student.department || DEPARTMENTS[0],
        year: student.year || YEARS[0],
        phone: student.phone || '',
      });
    } else {
      setFormData({
        fullName: '',
        rollNumber: '',
        email: '',
        department: DEPARTMENTS[0],
        year: YEARS[0],
        phone: '',
      });
    }
    setErrors({});
  }, [student, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required';
    } else if (formData.fullName.trim().length < 2) {
      errs.fullName = 'Full Name must be at least 2 characters';
    }

    if (!formData.rollNumber.trim()) {
      errs.rollNumber = 'Roll Number is required';
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.trim())) {
      errs.phone = 'Phone must be 10 to 15 digits';
    }

    if (!formData.department) {
      errs.department = 'Department is required';
    }

    if (!formData.year) {
      errs.year = 'Year of study is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{isEditing ? 'Edit Student Details' : 'Add New Student'}</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* Full Name */}
            <div className="form-group">
              <label className="form-label">
                Full Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                className={`form-input ${errors.fullName ? 'error' : ''}`}
                placeholder="e.g. Rahul Sharma"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && <div className="error-message">⚠️ {errors.fullName}</div>}
            </div>

            {/* Roll Number & Email */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">
                  Roll Number <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="rollNumber"
                  className={`form-input ${errors.rollNumber ? 'error' : ''}`}
                  placeholder="e.g. CS2024001"
                  value={formData.rollNumber}
                  onChange={handleChange}
                />
                {errors.rollNumber && <div className="error-message">⚠️ {errors.rollNumber}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Email Address <span className="required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="e.g. rahul@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="error-message">⚠️ {errors.email}</div>}
              </div>
            </div>

            {/* Department & Year */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">
                  Department <span className="required">*</span>
                </label>
                <select
                  name="department"
                  className={`form-select ${errors.department ? 'error' : ''}`}
                  value={formData.department}
                  onChange={handleChange}
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                {errors.department && <div className="error-message">⚠️ {errors.department}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Year of Study <span className="required">*</span>
                </label>
                <select
                  name="year"
                  className={`form-select ${errors.year ? 'error' : ''}`}
                  value={formData.year}
                  onChange={handleChange}
                >
                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                {errors.year && <div className="error-message">⚠️ {errors.year}</div>}
              </div>
            </div>

            {/* Phone Number */}
            <div className="form-group">
              <label className="form-label">
                Phone Number <span className="required">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                className={`form-input ${errors.phone ? 'error' : ''}`}
                placeholder="e.g. +91 9876543210"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <div className="error-message">⚠️ {errors.phone}</div>}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="spinner"></span> Saving...
                </>
              ) : isEditing ? (
                'Save Changes'
              ) : (
                'Add Student'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;
