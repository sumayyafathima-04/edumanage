import React from 'react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, student, isDeleting = false }) => {
  if (!isOpen || !student) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-body" style={{ textAlign: 'center', paddingTop: '2.5rem' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--danger-bg)',
              color: 'var(--danger-text)',
              border: '1px solid var(--danger-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
              fontSize: '1.75rem',
            }}
          >
            ⚠️
          </div>

          <h3 style={{ fontSize: '1.35rem', marginBottom: '0.65rem', color: 'var(--text-main)' }}>Delete Student Record?</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: '1.5', marginBottom: '1.25rem' }}>
            Are you sure you want to permanently delete the record for{' '}
            <strong style={{ color: 'var(--text-main)' }}>{student.fullName}</strong> (Roll: <code style={{ backgroundColor: 'var(--accent-lavender)', padding: '0.15rem 0.4rem', borderRadius: '4px', color: 'var(--text-main)' }}>{student.rollNumber}</code>)?
          </p>
          <div style={{ backgroundColor: 'var(--danger-bg)', border: '1px solid var(--danger-border)', borderRadius: 'var(--radius-md)', padding: '0.75rem', fontSize: '0.825rem', color: 'var(--danger-text)' }}>
            Notice: This action will permanently remove this student from the MongoDB database.
          </div>
        </div>

        <div className="modal-footer" style={{ justifyContent: 'center' }}>
          <button className="btn btn-secondary" onClick={onClose} disabled={isDeleting}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? (
              <>
                <span className="spinner"></span> Deleting...
              </>
            ) : (
              'Yes, Delete Record'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
