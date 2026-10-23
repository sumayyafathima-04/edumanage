import React from 'react';

const ViewStudentModal = ({ isOpen, onClose, student, onEditClick }) => {
  if (!isOpen || !student) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Student Profile Details</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.75rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-light)' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))',
                color: '#fff',
                fontSize: '1.75rem',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-primary)',
                border: '3px solid var(--accent-lavender)',
              }}
            >
              {student.fullName ? student.fullName.charAt(0).toUpperCase() : 'S'}
            </div>
            <div>
              <h4 style={{ fontSize: '1.35rem', marginBottom: '0.35rem', color: 'var(--text-main)' }}>{student.fullName}</h4>
              <span className="student-roll-badge">{student.rollNumber}</span>
            </div>
          </div>

          <div className="detail-grid">
            <div className="detail-item">
              <div className="detail-label">Department</div>
              <div className="detail-value">{student.department}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label">Year of Study</div>
              <div className="detail-value">{student.year}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label">Email Address</div>
              <div className="detail-value">{student.email}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label">Phone Number</div>
              <div className="detail-value">{student.phone}</div>
            </div>

            <div className="detail-item full-width">
              <div className="detail-label">Database Record ID (MongoDB _id)</div>
              <div className="detail-value" style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {student._id || student.id}
              </div>
            </div>

            <div className="detail-item full-width">
              <div className="detail-label">Enrolled / Added Date</div>
              <div className="detail-value" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {formatDate(student.createdAt)}
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          {onEditClick && (
            <button
              className="btn btn-primary"
              onClick={() => {
                onClose();
                onEditClick(student);
              }}
            >
              Edit Student
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewStudentModal;
