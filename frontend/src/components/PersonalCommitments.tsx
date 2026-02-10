import { useState } from 'react';
import { Plus, Filter, Search, Clock, AlertCircle, CheckCircle2, X, Calendar, ArrowUpDown } from 'lucide-react';

interface PersonalCommitmentsProps {
  isDarkMode: boolean;
  isRTL: boolean;
}

interface Commitment {
  id: string;
  title: string;
  type: 'meeting' | 'appointment' | 'personal' | 'family' | 'training';
  priority: 'high' | 'medium' | 'low';
  isFlexible: boolean;
  startTime: string;
  endTime: string;
  date: string;
  location?: string;
  notes?: string;
}

export function PersonalCommitments({ isDarkMode, isRTL }: PersonalCommitmentsProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [filterType, setFilterType] = useState('all');
  const [filterFlexibility, setFilterFlexibility] = useState<'all' | 'flexible' | 'fixed'>('all');
  const [sortBy, setSortBy] = useState<'priority' | 'date' | 'time'>('priority');
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    type: 'personal' as const,
    priority: 'medium' as const,
    isFlexible: false,
    startTime: '09:00',
    endTime: '10:00',
    date: '',
    location: '',
    notes: ''
  });

  // Mock commitments data
  const [commitments] = useState<Commitment[]>([
    {
      id: '1',
      title: 'Parent-Teacher Conference',
      type: 'family',
      priority: 'high',
      isFlexible: false,
      startTime: '14:00',
      endTime: '15:00',
      date: '2026-02-12',
      location: 'School Campus',
      notes: 'Discuss children\'s progress'
    },
    {
      id: '2',
      title: 'Medical Research Seminar',
      type: 'training',
      priority: 'high',
      isFlexible: true,
      startTime: '10:00',
      endTime: '12:00',
      date: '2026-02-13',
      location: 'University Hospital - Conference Hall',
      notes: 'Latest advances in cardiology'
    },
    {
      id: '3',
      title: 'Dentist Appointment',
      type: 'appointment',
      priority: 'medium',
      isFlexible: true,
      startTime: '16:00',
      endTime: '17:00',
      date: '2026-02-14',
      location: 'Downtown Dental Clinic'
    },
    {
      id: '4',
      title: 'Gym Workout',
      type: 'personal',
      priority: 'low',
      isFlexible: true,
      startTime: '18:00',
      endTime: '19:30',
      date: '2026-02-10',
      location: 'Fitness Center'
    },
    {
      id: '5',
      title: 'Department Meeting',
      type: 'meeting',
      priority: 'medium',
      isFlexible: false,
      startTime: '09:00',
      endTime: '10:30',
      date: '2026-02-11',
      location: 'Building A - Meeting Room 3',
      notes: 'Monthly departmental review'
    },
    {
      id: '6',
      title: 'Family Dinner',
      type: 'family',
      priority: 'high',
      isFlexible: false,
      startTime: '19:00',
      endTime: '21:00',
      date: '2026-02-15',
      location: 'Home',
      notes: 'Celebrating anniversary'
    }
  ]);

  const commitmentTypes = [
    { value: 'meeting', label: isRTL ? 'اجتماع' : 'Meeting' },
    { value: 'appointment', label: isRTL ? 'موعد' : 'Appointment' },
    { value: 'personal', label: isRTL ? 'شخصي' : 'Personal' },
    { value: 'family', label: isRTL ? 'عائلي' : 'Family' },
    { value: 'training', label: isRTL ? 'تدريب' : 'Training' }
  ];

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high':
        return {
          bg: isDarkMode ? 'bg-red-900/40 text-red-400 border-red-700' : 'bg-red-50 text-red-700 border-red-200',
          icon: '🔴',
          label: isRTL ? 'عالي' : 'High'
        };
      case 'medium':
        return {
          bg: isDarkMode ? 'bg-amber-900/40 text-amber-400 border-amber-700' : 'bg-amber-50 text-amber-700 border-amber-200',
          icon: '🟡',
          label: isRTL ? 'متوسط' : 'Medium'
        };
      case 'low':
        return {
          bg: isDarkMode ? 'bg-blue-900/40 text-blue-400 border-blue-700' : 'bg-blue-50 text-blue-700 border-blue-200',
          icon: '🟢',
          label: isRTL ? 'منخفض' : 'Low'
        };
      default:
        return {
          bg: isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-700',
          icon: '⚪',
          label: 'Unknown'
        };
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meeting':
        return isDarkMode ? 'bg-purple-900/40 text-purple-400' : 'bg-purple-50 text-purple-700';
      case 'appointment':
        return isDarkMode ? 'bg-cyan-900/40 text-cyan-400' : 'bg-cyan-50 text-cyan-700';
      case 'personal':
        return isDarkMode ? 'bg-amber-900/40 text-amber-400' : 'bg-amber-50 text-amber-700';
      case 'family':
        return isDarkMode ? 'bg-pink-900/40 text-pink-400' : 'bg-pink-50 text-pink-700';
      case 'training':
        return isDarkMode ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-50 text-emerald-700';
      default:
        return isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-700';
    }
  };

  const sortCommitments = (commitments: Commitment[]) => {
    return [...commitments].sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (sortBy === 'date') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === 'time') {
        return a.startTime.localeCompare(b.startTime);
      }
      return 0;
    });
  };

  const filteredCommitments = sortCommitments(
    commitments.filter(commitment => {
      const matchesSearch = commitment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           commitment.location?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriority = filterPriority === 'all' || commitment.priority === filterPriority;
      const matchesType = filterType === 'all' || commitment.type === filterType;
      const matchesFlexibility = filterFlexibility === 'all' || 
                                (filterFlexibility === 'flexible' && commitment.isFlexible) ||
                                (filterFlexibility === 'fixed' && !commitment.isFlexible);
      
      return matchesSearch && matchesPriority && matchesType && matchesFlexibility;
    })
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowAddForm(false);
    // Reset form
    setFormData({
      title: '',
      type: 'personal',
      priority: 'medium',
      isFlexible: false,
      startTime: '09:00',
      endTime: '10:00',
      date: '',
      location: '',
      notes: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {isRTL ? 'الالتزامات الشخصية' : 'Personal Commitments'}
          </h2>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {isRTL ? 'إدارة الأنشطة والمواعيد غير الطبية' : 'Manage non-medical activities and appointments'}
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className={`
            flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all hover:scale-105
            ${isDarkMode ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-amber-500 hover:bg-amber-600 text-white'}
          `}
        >
          <Plus className="w-5 h-5" />
          <span>{isRTL ? 'إضافة التزام' : 'Add Commitment'}</span>
        </button>
      </div>

      {/* Add Commitment Form */}
      {showAddForm && (
        <div className={`rounded-xl p-6 border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-lg`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {isRTL ? 'إضافة التزام جديد' : 'Add New Commitment'}
            </h3>
            <button
              onClick={() => setShowAddForm(false)}
              className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isRTL ? 'العنوان' : 'Title'}
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder={isRTL ? 'مثال: موعد الطبيب' : 'e.g., Doctor Appointment'}
                  className={`
                    w-full px-4 py-2.5 rounded-lg border transition-all
                    ${isDarkMode 
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-500' 
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                    }
                  `}
                  required
                />
              </div>

              {/* Type */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isRTL ? 'النوع' : 'Type'}
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className={`
                    w-full px-4 py-2.5 rounded-lg border transition-all
                    ${isDarkMode 
                      ? 'bg-slate-700 border-slate-600 text-white' 
                      : 'bg-white border-slate-300 text-slate-900'
                    }
                  `}
                  required
                >
                  {commitmentTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              {/* Priority */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isRTL ? 'الأولوية' : 'Priority'}
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                  className={`
                    w-full px-4 py-2.5 rounded-lg border transition-all
                    ${isDarkMode 
                      ? 'bg-slate-700 border-slate-600 text-white' 
                      : 'bg-white border-slate-300 text-slate-900'
                    }
                  `}
                  required
                >
                  <option value="high">{isRTL ? '🔴 عالي' : '🔴 High'}</option>
                  <option value="medium">{isRTL ? '🟡 متوسط' : '🟡 Medium'}</option>
                  <option value="low">{isRTL ? '🟢 منخفض' : '🟢 Low'}</option>
                </select>
              </div>

              {/* Date */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isRTL ? 'التاريخ' : 'Date'}
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className={`
                    w-full px-4 py-2.5 rounded-lg border transition-all
                    ${isDarkMode 
                      ? 'bg-slate-700 border-slate-600 text-white' 
                      : 'bg-white border-slate-300 text-slate-900'
                    }
                  `}
                  required
                />
              </div>

              {/* Time Window */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isRTL ? 'الوقت' : 'Time Window'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className={`
                      px-3 py-2.5 rounded-lg border transition-all text-sm
                      ${isDarkMode 
                        ? 'bg-slate-700 border-slate-600 text-white' 
                        : 'bg-white border-slate-300 text-slate-900'
                      }
                    `}
                    required
                  />
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className={`
                      px-3 py-2.5 rounded-lg border transition-all text-sm
                      ${isDarkMode 
                        ? 'bg-slate-700 border-slate-600 text-white' 
                        : 'bg-white border-slate-300 text-slate-900'
                      }
                    `}
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isRTL ? 'الموقع' : 'Location'}
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder={isRTL ? 'مثال: المستشفى الرئيسي' : 'e.g., Main Hospital'}
                  className={`
                    w-full px-4 py-2.5 rounded-lg border transition-all
                    ${isDarkMode 
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-500' 
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                    }
                  `}
                />
              </div>

              {/* Notes */}
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isRTL ? 'ملاحظات' : 'Notes'}
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={isRTL ? 'أي ملاحظات إضافية...' : 'Any additional notes...'}
                  rows={3}
                  className={`
                    w-full px-4 py-2.5 rounded-lg border transition-all resize-none
                    ${isDarkMode 
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-500' 
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                    }
                  `}
                />
              </div>
            </div>

            {/* Flexibility Toggle */}
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFlexible}
                  onChange={(e) => setFormData({ ...formData, isFlexible: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-2 focus:ring-amber-500"
                />
                <div>
                  <div className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    {isRTL ? 'وقت مرن' : 'Flexible Timing'}
                  </div>
                  <div className={`text-xs mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {isRTL ? 'يمكن إعادة جدولة هذا الالتزام حسب الحاجة' : 'This commitment can be rescheduled as needed'}
                  </div>
                </div>
              </label>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className={`
                  px-6 py-2.5 rounded-lg font-medium transition-all
                  ${isDarkMode 
                    ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                    : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
                  }
                `}
              >
                {isRTL ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="submit"
                className={`
                  flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all hover:scale-105
                  ${isDarkMode ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-amber-500 hover:bg-amber-600 text-white'}
                `}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isRTL ? 'حفظ الالتزام' : 'Save Commitment'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters and Search */}
      <div className={`rounded-xl p-6 border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isRTL ? 'بحث عن التزام...' : 'Search commitments...'}
                className={`
                  w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all
                  ${isDarkMode 
                    ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-500' 
                    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                  }
                `}
              />
            </div>
          </div>

          {/* Priority Filter */}
          <div>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as any)}
              className={`
                w-full px-4 py-2.5 rounded-lg border transition-all
                ${isDarkMode 
                  ? 'bg-slate-700 border-slate-600 text-white' 
                  : 'bg-white border-slate-300 text-slate-900'
                }
              `}
            >
              <option value="all">{isRTL ? 'جميع الأولويات' : 'All Priorities'}</option>
              <option value="high">{isRTL ? '🔴 عالي' : '🔴 High'}</option>
              <option value="medium">{isRTL ? '🟡 متوسط' : '🟡 Medium'}</option>
              <option value="low">{isRTL ? '🟢 منخفض' : '🟢 Low'}</option>
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className={`
                w-full px-4 py-2.5 rounded-lg border transition-all
                ${isDarkMode 
                  ? 'bg-slate-700 border-slate-600 text-white' 
                  : 'bg-white border-slate-300 text-slate-900'
                }
              `}
            >
              <option value="all">{isRTL ? 'جميع الأنواع' : 'All Types'}</option>
              {commitmentTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          {/* Flexibility Filter */}
          <div>
            <select
              value={filterFlexibility}
              onChange={(e) => setFilterFlexibility(e.target.value as any)}
              className={`
                w-full px-4 py-2.5 rounded-lg border transition-all
                ${isDarkMode 
                  ? 'bg-slate-700 border-slate-600 text-white' 
                  : 'bg-white border-slate-300 text-slate-900'
                }
              `}
            >
              <option value="all">{isRTL ? 'الكل' : 'All'}</option>
              <option value="flexible">{isRTL ? 'مرن' : 'Flexible'}</option>
              <option value="fixed">{isRTL ? 'ثابت' : 'Fixed'}</option>
            </select>
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-3 mt-4 pt-4 border-t" style={{
          borderColor: isDarkMode ? 'rgb(51, 65, 85)' : 'rgb(226, 232, 240)'
        }}>
          <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {isRTL ? 'الترتيب:' : 'Sort by:'}
          </span>
          <div className="flex gap-2">
            {[
              { value: 'priority', label: isRTL ? 'الأولوية' : 'Priority' },
              { value: 'date', label: isRTL ? 'التاريخ' : 'Date' },
              { value: 'time', label: isRTL ? 'الوقت' : 'Time' }
            ].map((sort) => (
              <button
                key={sort.value}
                onClick={() => setSortBy(sort.value as any)}
                className={`
                  px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                  ${sortBy === sort.value
                    ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                    : (isDarkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200')
                  }
                `}
              >
                {sort.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Commitments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCommitments.map((commitment) => {
          const priorityStyle = getPriorityStyle(commitment.priority);
          const typeColor = getTypeColor(commitment.type);

          return (
            <div
              key={commitment.id}
              className={`
                rounded-xl p-6 border transition-all hover:shadow-lg hover:scale-105 cursor-pointer
                ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}
              `}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {commitment.title}
                  </h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`inline-flex px-2 py-1 rounded-md text-xs font-medium border ${priorityStyle.bg}`}>
                      {priorityStyle.icon} {priorityStyle.label}
                    </span>
                    <span className={`inline-flex px-2 py-1 rounded-md text-xs font-medium ${typeColor}`}>
                      {commitmentTypes.find(t => t.value === commitment.type)?.label}
                    </span>
                  </div>
                </div>
                {commitment.isFlexible ? (
                  <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`} title={isRTL ? 'مرن' : 'Flexible'}>
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                ) : (
                  <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-600'}`} title={isRTL ? 'ثابت' : 'Fixed'}>
                    <AlertCircle className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="space-y-3">
                <div className={`flex items-center gap-2 text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>{new Date(commitment.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                </div>
                <div className={`flex items-center gap-2 text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{commitment.startTime} - {commitment.endTime}</span>
                </div>
                {commitment.location && (
                  <div className={`flex items-start gap-2 text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    <span className="text-xs">📍</span>
                    <span className="flex-1">{commitment.location}</span>
                  </div>
                )}
                {commitment.notes && (
                  <div className={`pt-3 mt-3 border-t text-xs ${isDarkMode ? 'border-slate-700 text-slate-400' : 'border-slate-200 text-slate-600'}`}>
                    {commitment.notes}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredCommitments.length === 0 && (
        <div className={`rounded-xl p-12 text-center border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
            <Calendar className={`w-8 h-8 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
          </div>
          <p className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {isRTL ? 'لا توجد التزامات' : 'No Commitments Found'}
          </p>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {isRTL ? 'جرب تغيير معايير الفلترة' : 'Try adjusting your filter criteria'}
          </p>
        </div>
      )}

      {/* Summary Stats */}
      <div className={`rounded-xl p-6 border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className="text-center">
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {filteredCommitments.length}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {isRTL ? 'الإجمالي' : 'Total'}
            </div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
              {filteredCommitments.filter(c => c.priority === 'high').length}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {isRTL ? 'عالي' : 'High'}
            </div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`}>
              {filteredCommitments.filter(c => c.priority === 'medium').length}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {isRTL ? 'متوسط' : 'Medium'}
            </div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
              {filteredCommitments.filter(c => c.isFlexible).length}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {isRTL ? 'مرن' : 'Flexible'}
            </div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              {filteredCommitments.filter(c => !c.isFlexible).length}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {isRTL ? 'ثابت' : 'Fixed'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
