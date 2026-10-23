import React, { useState, useEffect, useCallback } from 'react';
import { studentAPI } from '../services/api';
import StatCard from '../components/StatCard';
import StudentModal from '../components/StudentModal';
import ViewStudentModal from '../components/ViewStudentModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import Toast from '../components/Toast';

const DEPARTMENTS = [
  'All',
  'Computer Science & Engineering',
  'Information Technology',
  'Electronics & Telecommunication',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Artificial Intelligence & Data Science',
];

const DashboardPage = () => {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    departmentStats: [],
    yearStats: [],
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [viewingStudent, setViewingStudent] = useState(null);
  const [deletingStudent, setDeletingStudent] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast feedback state
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast({ message: '', type: 'success' });
  };

  // Fetch students from backend API
  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      const res = await studentAPI.getAll({
        search: searchQuery,
        department: selectedDept,
      });

      if (res.success) {
        setStudents(res.students || []);
      }
    } catch (error) {
      showToast(error.message || 'Failed to load student records from database.', 'error');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedDept]);

  // Fetch overall statistics
  const fetchStats = useCallback(async () => {
    try {
      const res = await studentAPI.getStats();
      if (res.success && res.stats) {
        setStats(res.stats);
      }
    } catch (error) {
      console.warn('Could not load statistics:', error.message);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
    fetchStats();
  }, [fetchStudents, fetchStats]);

  // Handle Create or Update Student
  const handleSaveStudent = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingStudent) {
        // Update operation
        const res = await studentAPI.update(editingStudent._id, formData);
        showToast(res.message || 'Student updated successfully!', 'success');
      } else {
        // Create operation
        const res = await studentAPI.create(formData);
        showToast(res.message || 'Student added successfully!', 'success');
      }
      setIsFormModalOpen(false);
      setEditingStudent(null);
      fetchStudents();
      fetchStats();
    } catch (error) {
      showToast(error.message || 'Error saving student record.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete Student
  const handleDeleteConfirm = async () => {
    if (!deletingStudent) return;
    setIsDeleting(true);
    try {
      const res = await studentAPI.delete(deletingStudent._id);
      showToast(res.message || 'Student record deleted successfully.', 'success');
      setDeletingStudent(null);
      fetchStudents();
      fetchStats();
    } catch (error) {
      showToast(error.message || 'Error deleting student.', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  // Open Edit Modal
  const openEditModal = (student) => {
    setEditingStudent(student);
    setIsFormModalOpen(true);
  };

  // Open Add Modal
  const openAddModal = () => {
    setEditingStudent(null);
    setIsFormModalOpen(true);
  };

  // Helper to get count per department
  const getDeptStudentCount = (deptName) => {
    if (deptName === 'All') {
      return stats.totalStudents || students.length;
    }
    const found = stats.departmentStats?.find((d) => d._id === deptName);
    return found ? found.count : 0;
  };

  return (
    <div className="dashboard-container">
      <div className="container">
        {/* Top Header */}
        <div className="dashboard-top">
          <div className="dashboard-title">
            <h1>Student Management Dashboard</h1>
            <p>View, search, register, and update student academic profiles</p>
          </div>

          <div className="dashboard-header-actions">
            <button
              onClick={() => {
                fetchStudents();
                fetchStats();
              }}
              className="btn btn-secondary"
              title="Refresh Records"
            >
              🔄 Refresh
            </button>

            <button onClick={openAddModal} className="btn btn-primary">
              <span>+ Add New Student</span>
            </button>
          </div>
        </div>

        {/* Dashboard Statistics Cards */}
        <div className="stats-grid">
          <StatCard
            title="Total Enrolled Students"
            value={stats.totalStudents || students.length}
            icon="👥"
            color="blue"
            subtitle="Registered in MongoDB"
          />
          <StatCard
            title="Active Departments"
            value={stats.departmentStats?.length || 0}
            icon="🏛️"
            color="green"
            subtitle="Academic Branches"
          />
          <StatCard
            title="Top Department"
            value={stats.departmentStats?.[0]?._id ? stats.departmentStats[0]._id.split(' ')[0] : 'N/A'}
            icon="🏆"
            color="amber"
            subtitle={stats.departmentStats?.[0] ? `${stats.departmentStats[0].count} Students` : 'No records'}
          />
          <StatCard
            title="Database Status"
            value="Connected"
            icon="⚡"
            color="purple"
            subtitle="MongoDB Atlas / Local"
          />
        </div>

        {/* Dashboard Layout: Sidebar Navigation + Main Data Panel */}
        <div className="dashboard-layout-grid">
          {/* Brown Sidebar Navigation */}
          <aside className="dashboard-sidebar">
            <div className="sidebar-section-title">Academic Departments</div>
            <ul className="sidebar-menu">
              {DEPARTMENTS.map((dept) => {
                const isActive = selectedDept === dept;
                const count = getDeptStudentCount(dept);
                return (
                  <li key={dept}>
                    <button
                      className={`sidebar-btn ${isActive ? 'active' : ''}`}
                      onClick={() => setSelectedDept(dept)}
                    >
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: '0.5rem' }}>
                        {dept === 'All' ? 'All Departments' : dept.split(' ')[0]}
                      </span>
                      <span className="sidebar-badge">{count}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Sidebar Status Widget */}
            <div className="sidebar-widget">
              <div className="sidebar-widget-header">
                <span>🍃</span>
                <span>MERN Architecture</span>
              </div>
              <div className="sidebar-widget-body">
                Connected to MongoDB Atlas. Live REST API endpoints delivering real-time CRUD synchronization.
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <section className="dashboard-main">
            {/* Search, Filter, & View Mode Toolbar */}
            <div className="table-toolbar">
              <div className="search-box">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search by student name, roll number, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="filters-group">
                <select
                  className="filter-select"
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept === 'All' ? 'All Departments' : dept}
                    </option>
                  ))}
                </select>

                {/* View Mode Toggle: Table View vs Student Profile Cards */}
                <div className="view-mode-toggle" title="Switch Display Mode">
                  <button
                    className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
                    onClick={() => setViewMode('table')}
                  >
                    <span>📑</span> Table
                  </button>
                  <button
                    className={`view-toggle-btn ${viewMode === 'cards' ? 'active' : ''}`}
                    onClick={() => setViewMode('cards')}
                  >
                    <span>🪪</span> Cards
                  </button>
                </div>
              </div>
            </div>

            {/* Student Records Content (Table or Profile Cards) */}
            <div className="table-card">
              {loading ? (
                <div className="loading-container">
                  <div className="spinner spinner-primary"></div>
                  <p>Fetching records from MongoDB...</p>
                </div>
              ) : students.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📂</div>
                  <h3 className="empty-title">No Student Records Found</h3>
                  <p className="empty-text">
                    {searchQuery || selectedDept !== 'All'
                      ? 'No students matched your search or department filter. Try resetting your search.'
                      : 'Your database currently has no registered students. Click below to add the first record.'}
                  </p>
                  {searchQuery || selectedDept !== 'All' ? (
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedDept('All');
                      }}
                    >
                      Clear Filters
                    </button>
                  ) : (
                    <button className="btn btn-primary" onClick={openAddModal}>
                      + Add First Student
                    </button>
                  )}
                </div>
              ) : viewMode === 'table' ? (
                /* 1. TABLE VIEW */
                <div className="table-responsive">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Student ID</th>
                        <th>Full Name</th>
                        <th>Roll Number</th>
                        <th>Email Address</th>
                        <th>Department</th>
                        <th>Year</th>
                        <th>Phone</th>
                        <th style={{ textAlign: 'center' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student) => (
                        <tr key={student._id}>
                          {/* Shortened ID */}
                          <td style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            {student._id.slice(-6).toUpperCase()}
                          </td>

                          {/* Full Name */}
                          <td className="student-name-cell">
                            {student.fullName}
                          </td>

                          {/* Roll Number */}
                          <td>
                            <span className="student-roll-badge">{student.rollNumber}</span>
                          </td>

                          {/* Email */}
                          <td>{student.email}</td>

                          {/* Department */}
                          <td>
                            <span className="dept-badge">{student.department}</span>
                          </td>

                          {/* Year */}
                          <td>
                            <span className="year-badge">{student.year}</span>
                          </td>

                          {/* Phone */}
                          <td>{student.phone}</td>

                          {/* Action Buttons */}
                          <td>
                            <div className="action-buttons" style={{ justifyContent: 'center' }}>
                              <button
                                onClick={() => setViewingStudent(student)}
                                className="btn btn-sm btn-action-view"
                                title="View Full Profile"
                              >
                                👁️ View
                              </button>

                              <button
                                onClick={() => openEditModal(student)}
                                className="btn btn-sm btn-action-edit"
                                title="Edit Student Info"
                              >
                                ✏️ Edit
                              </button>

                              <button
                                onClick={() => setDeletingStudent(student)}
                                className="btn btn-sm btn-action-delete"
                                title="Delete Student Record"
                              >
                                🗑️ Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                /* 2. STUDENT PROFILE CARDS VIEW */
                <div style={{ padding: '1.5rem' }}>
                  <div className="student-cards-grid">
                    {students.map((student) => (
                      <div className="student-card" key={student._id}>
                        <div>
                          <div className="student-card-header">
                            <div className="student-card-avatar">
                              {student.fullName ? student.fullName.charAt(0).toUpperCase() : 'S'}
                            </div>
                            <div className="student-card-header-info">
                              <h4 className="student-card-name" title={student.fullName}>
                                {student.fullName}
                              </h4>
                              <span className="student-roll-badge">
                                {student.rollNumber}
                              </span>
                            </div>
                          </div>

                          <div className="student-card-body">
                            <div className="student-card-row">
                              <span className="card-icon">🏛️</span>
                              <span className="dept-badge" title={student.department}>
                                {student.department}
                              </span>
                            </div>

                            <div className="student-card-row">
                              <span className="card-icon">🎓</span>
                              <span className="year-badge">{student.year}</span>
                            </div>

                            <div className="student-card-row">
                              <span className="card-icon">✉️</span>
                              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {student.email}
                              </span>
                            </div>

                            <div className="student-card-row">
                              <span className="card-icon">📞</span>
                              <span>{student.phone}</span>
                            </div>
                          </div>
                        </div>

                        <div className="student-card-actions">
                          <button
                            onClick={() => setViewingStudent(student)}
                            className="btn btn-sm btn-action-view"
                            title="View Full Profile"
                          >
                            👁️ View
                          </button>
                          <button
                            onClick={() => openEditModal(student)}
                            className="btn btn-sm btn-action-edit"
                            title="Edit Student Info"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => setDeletingStudent(student)}
                            className="btn btn-sm btn-action-delete"
                            title="Delete Student Record"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Add / Edit Student Modal */}
      <StudentModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingStudent(null);
        }}
        onSave={handleSaveStudent}
        student={editingStudent}
        isSubmitting={isSubmitting}
      />

      {/* View Student Details Modal */}
      <ViewStudentModal
        isOpen={Boolean(viewingStudent)}
        onClose={() => setViewingStudent(null)}
        student={viewingStudent}
        onEditClick={(student) => openEditModal(student)}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingStudent)}
        onClose={() => setDeletingStudent(null)}
        onConfirm={handleDeleteConfirm}
        student={deletingStudent}
        isDeleting={isDeleting}
      />

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={closeToast}
      />
    </div>
  );
};

export default DashboardPage;
