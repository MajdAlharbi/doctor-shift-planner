import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Calendar, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { PersonalCommitment, Priority } from '../../types';
import { format } from 'date-fns';

export const Commitments: React.FC = () => {
  const { commitments, addCommitment, updateCommitment, deleteCommitment, t } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingCommitment, setEditingCommitment] = useState<PersonalCommitment | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: '10:00',
    endTime: '11:00',
    priority: 'medium' as Priority,
    flexible: false,
    earliestStart: '08:00',
    latestEnd: '20:00',
    notes: '',
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate duration in minutes
    const [startHour, startMin] = formData.startTime.split(':').map(Number);
    const [endHour, endMin] = formData.endTime.split(':').map(Number);
    const duration = (endHour * 60 + endMin) - (startHour * 60 + startMin);
    
    const commitment: PersonalCommitment = {
      id: editingCommitment?.id || `c${Date.now()}`,
      name: formData.name,
      date: new Date(formData.date),
      startTime: formData.startTime,
      endTime: formData.endTime,
      duration,
      priority: formData.priority,
      flexible: formData.flexible,
      flexibleWindow: formData.flexible
        ? {
            earliestStart: formData.earliestStart,
            latestEnd: formData.latestEnd,
          }
        : undefined,
      notes: formData.notes || undefined,
    };
    
    if (editingCommitment) {
      updateCommitment(editingCommitment.id, commitment);
    } else {
      addCommitment(commitment);
    }
    
    resetForm();
  };
  
  const resetForm = () => {
    setFormData({
      name: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: '10:00',
      endTime: '11:00',
      priority: 'medium',
      flexible: false,
      earliestStart: '08:00',
      latestEnd: '20:00',
      notes: '',
    });
    setEditingCommitment(null);
    setShowForm(false);
  };
  
  const handleEdit = (commitment: PersonalCommitment) => {
    setFormData({
      name: commitment.name,
      date: format(commitment.date, 'yyyy-MM-dd'),
      startTime: commitment.startTime,
      endTime: commitment.endTime,
      priority: commitment.priority,
      flexible: commitment.flexible,
      earliestStart: commitment.flexibleWindow?.earliestStart || '08:00',
      latestEnd: commitment.flexibleWindow?.latestEnd || '20:00',
      notes: commitment.notes || '',
    });
    setEditingCommitment(commitment);
    setShowForm(true);
  };
  
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this commitment?')) {
      deleteCommitment(id);
    }
  };
  
  const sortedCommitments = [...commitments].sort((a, b) => {
    // Sort by priority first, then by date
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (a.priority !== b.priority) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return a.date.getTime() - b.date.getTime();
  });
  
  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700';
      case 'low':
        return 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700';
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t('myCommitments')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your personal activities and appointments
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>{t('addCommitment')}</span>
          </button>
        </div>
        
        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              {editingCommitment ? 'Edit Commitment' : 'Add New Commitment'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Activity Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Activity Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Dentist Appointment"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                
                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                </div>
                
                {/* Priority */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="high">{t('high')} Priority</option>
                    <option value="medium">{t('medium')} Priority</option>
                    <option value="low">{t('low')} Priority</option>
                  </select>
                </div>
                
                {/* Start Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                </div>
                
                {/* End Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    End Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Flexible Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="flexible"
                  checked={formData.flexible}
                  onChange={(e) => setFormData({ ...formData, flexible: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <div className="flex-1">
                  <label htmlFor="flexible" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Flexible timing
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Allow this activity to be rescheduled within a time window
                  </p>
                </div>
              </div>
              
              {/* Flexible Time Window */}
              {formData.flexible && (
                <div className="grid grid-cols-2 gap-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Earliest Start
                    </label>
                    <input
                      type="time"
                      value={formData.earliestStart}
                      onChange={(e) => setFormData({ ...formData, earliestStart: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Latest End
                    </label>
                    <input
                      type="time"
                      value={formData.latestEnd}
                      onChange={(e) => setFormData({ ...formData, latestEnd: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              )}
              
              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Add any additional notes..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500"
                />
              </div>
              
              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors font-medium"
                >
                  {t('save')}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors font-medium"
                >
                  {t('cancel')}
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Commitments List */}
        {sortedCommitments.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-12 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-lg text-gray-600 dark:text-gray-400">{t('noCommitments')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedCommitments.map((commitment) => (
              <div
                key={commitment.id}
                className={`bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-orange-200 dark:border-orange-800 hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {commitment.name}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-medium ${getPriorityColor(
                          commitment.priority
                        )}`}
                      >
                        {t(commitment.priority)} Priority
                      </span>
                      {commitment.flexible && (
                        <span className="flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded text-xs">
                          <CheckCircle className="w-3 h-3" />
                          Flexible
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Calendar className="w-4 h-4" />
                        {format(commitment.date, 'MMM dd, yyyy')}
                      </div>
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Clock className="w-4 h-4" />
                        {commitment.startTime} - {commitment.endTime}
                      </div>
                      <div className="text-gray-700 dark:text-gray-300">
                        Duration: {commitment.duration} min
                      </div>
                    </div>
                    
                    {commitment.flexible && commitment.flexibleWindow && (
                      <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-gray-700 dark:text-gray-300">
                        <AlertCircle className="w-4 h-4 inline mr-2" />
                        Can be scheduled between {commitment.flexibleWindow.earliestStart} and{' '}
                        {commitment.flexibleWindow.latestEnd}
                      </div>
                    )}
                    
                    {commitment.notes && (
                      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                        {commitment.notes}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(commitment)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-600 dark:text-gray-400"
                      aria-label="Edit"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(commitment.id)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-red-600 dark:text-red-400"
                      aria-label="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
