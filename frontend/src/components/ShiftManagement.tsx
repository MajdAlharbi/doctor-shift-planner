import { useState } from 'react';
import { Plus, Filter, Search, Calendar as CalendarIcon, Clock, MapPin, User, Repeat, X, Check } from 'lucide-react';

interface ShiftManagementProps {
  isDarkMode: boolean;
  isRTL: boolean;
}

interface Shift {
  id: string;
  doctorName: string;
  department: string;
  type: 'morning' | 'evening' | 'night' | 'on-call';
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  isRecurring?: boolean;
  recurringPattern?: 'daily' | 'weekly' | 'monthly';
}

export function ShiftManagement({ isDarkMode, isRTL }: ShiftManagementProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'morning' | 'evening' | 'night' | 'on-call'>('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    doctorName: '',
    department: '',
    type: 'morning' as const,
    date: '',
    startTime: '08:00',
    endTime: '16:00',
    location: '',
    isRecurring: false,
    recurringPattern: 'weekly' as const
  });

  // Mock shift data
  const [shifts] = useState<Shift[]>([
    {
      id: '1',
      doctorName: 'Dr. Sarah Ahmed',
      department: 'Emergency',
      type: 'morning',
      date: '2026-02-10',
      startTime: '08:00',
      endTime: '16:00',
      location: 'Building A - Floor 3',
      isRecurring: true,
      recurringPattern: 'weekly'
    },
    {
      id: '2',
      doctorName: 'Dr. Mohammed Ali',
      department: 'ICU',
      type: 'evening',
      date: '2026-02-10',
      startTime: '16:00',
      endTime: '00:00',
      location: 'Building B - Floor 2',
      isRecurring: false
    },
    {
      id: '3',
      doctorName: 'Dr. Fatima Hassan',
      department: 'Surgery',
      type: 'morning',
      date: '2026-02-11',
      startTime: '08:00',
      endTime: '16:00',
      location: 'Building C - OR Suite',
      isRecurring: true,
      recurringPattern: 'weekly'
    },
    {
      id: '4',
      doctorName: 'Dr. Ahmed Khalil',
      department: 'Pediatrics',
      type: 'night',
      date: '2026-02-12',
      startTime: '00:00',
      endTime: '08:00',
      location: 'Building D - Floor 1',
      isRecurring: false
    },
    {
      id: '5',
      doctorName: 'Dr. Layla Ibrahim',
      department: 'Cardiology',
      type: 'on-call',
      date: '2026-02-13',
      startTime: '08:00',
      endTime: '20:00',
      location: 'Building A - Floor 4',
      isRecurring: false
    }
  ]);

  const departments = ['Emergency', 'ICU', 'Surgery', 'Pediatrics', 'Cardiology'];
  const doctors = ['Dr. Sarah Ahmed', 'Dr. Mohammed Ali', 'Dr. Fatima Hassan', 'Dr. Ahmed Khalil', 'Dr. Layla Ibrahim'];

  const getShiftTypeColor = (type: string) => {
    switch (type) {
      case 'morning':
        return isDarkMode ? 'bg-blue-900/40 text-blue-400 border-blue-700' : 'bg-blue-50 text-blue-700 border-blue-200';
      case 'evening':
        return isDarkMode ? 'bg-blue-800/40 text-blue-300 border-blue-600' : 'bg-blue-100 text-blue-800 border-blue-300';
      case 'night':
        return isDarkMode ? 'bg-indigo-900/40 text-indigo-400 border-indigo-700' : 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'on-call':
        return isDarkMode ? 'bg-cyan-900/40 text-cyan-400 border-cyan-700' : 'bg-cyan-50 text-cyan-700 border-cyan-200';
      default:
        return isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-700';
    }
  };

  const filteredShifts = shifts.filter(shift => {
    const matchesSearch = shift.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shift.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || shift.type === filterType;
    const matchesDepartment = filterDepartment === 'all' || shift.department === filterDepartment;
    const matchesDate = !selectedDate || shift.date === selectedDate;
    
    return matchesSearch && matchesType && matchesDepartment && matchesDate;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowAddForm(false);
    // Reset form
    setFormData({
      doctorName: '',
      department: '',
      type: 'morning',
      date: '',
      startTime: '08:00',
      endTime: '16:00',
      location: '',
      isRecurring: false,
      recurringPattern: 'weekly'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {isRTL ? 'إدارة المناوبات' : 'Shift Management'}
          </h2>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {isRTL ? 'عرض وإدارة جميع المناوبات المجدولة' : 'View and manage all scheduled shifts'}
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className={`
            flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all hover:scale-105
            ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}
          `}
        >
          <Plus className="w-5 h-5" />
          <span>{isRTL ? 'إضافة مناوبة' : 'Add Shift'}</span>
        </button>
      </div>

      {/* Add Shift Form */}
      {showAddForm && (
        <div className={`rounded-xl p-6 border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-lg`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {isRTL ? 'إضافة مناوبة جديدة' : 'Add New Shift'}
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
              {/* Doctor Name */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isRTL ? 'اسم الطبيب' : 'Doctor Name'}
                </label>
                <select
                  value={formData.doctorName}
                  onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                  className={`
                    w-full px-4 py-2.5 rounded-lg border transition-all
                    ${isDarkMode 
                      ? 'bg-slate-700 border-slate-600 text-white' 
                      : 'bg-white border-slate-300 text-slate-900'
                    }
                  `}
                  required
                >
                  <option value="">{isRTL ? 'اختر الطبيب' : 'Select Doctor'}</option>
                  {doctors.map(doctor => (
                    <option key={doctor} value={doctor}>{doctor}</option>
                  ))}
                </select>
              </div>

              {/* Department */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isRTL ? 'القسم' : 'Department'}
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className={`
                    w-full px-4 py-2.5 rounded-lg border transition-all
                    ${isDarkMode 
                      ? 'bg-slate-700 border-slate-600 text-white' 
                      : 'bg-white border-slate-300 text-slate-900'
                    }
                  `}
                  required
                >
                  <option value="">{isRTL ? 'اختر القسم' : 'Select Department'}</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Shift Type */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isRTL ? 'نوع المناوبة' : 'Shift Type'}
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
                  <option value="morning">{isRTL ? 'صباحية' : 'Morning'}</option>
                  <option value="evening">{isRTL ? 'مسائية' : 'Evening'}</option>
                  <option value="night">{isRTL ? 'ليلية' : 'Night'}</option>
                  <option value="on-call">{isRTL ? 'عند الطلب' : 'On-Call'}</option>
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

              {/* Start Time */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isRTL ? 'وقت البداية' : 'Start Time'}
                </label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
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

              {/* End Time */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isRTL ? 'وقت النهاية' : 'End Time'}
                </label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
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

              {/* Location */}
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isRTL ? 'الموقع' : 'Location'}
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder={isRTL ? 'مثال: المبنى A - الطابق 3' : 'e.g., Building A - Floor 3'}
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
            </div>

            {/* Recurring Option */}
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isRecurring}
                  onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex items-center gap-2">
                  <Repeat className="w-4 h-4" />
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    {isRTL ? 'مناوبة متكررة' : 'Recurring Shift'}
                  </span>
                </div>
              </label>

              {formData.isRecurring && (
                <div className="mt-4 pl-7">
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    {isRTL ? 'نمط التكرار' : 'Repeat Pattern'}
                  </label>
                  <select
                    value={formData.recurringPattern}
                    onChange={(e) => setFormData({ ...formData, recurringPattern: e.target.value as any })}
                    className={`
                      w-full px-4 py-2.5 rounded-lg border transition-all
                      ${isDarkMode 
                        ? 'bg-slate-700 border-slate-600 text-white' 
                        : 'bg-white border-slate-300 text-slate-900'
                      }
                    `}
                  >
                    <option value="daily">{isRTL ? 'يومي' : 'Daily'}</option>
                    <option value="weekly">{isRTL ? 'أسبوعي' : 'Weekly'}</option>
                    <option value="monthly">{isRTL ? 'شهري' : 'Monthly'}</option>
                  </select>
                </div>
              )}
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
                  ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}
                `}
              >
                <Check className="w-4 h-4" />
                <span>{isRTL ? 'حفظ المناوبة' : 'Save Shift'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters and Search */}
      <div className={`rounded-xl p-6 border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isRTL ? 'بحث عن طبيب أو قسم...' : 'Search by doctor or department...'}
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

          {/* Filter by Type */}
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className={`
                w-full px-4 py-2.5 rounded-lg border transition-all
                ${isDarkMode 
                  ? 'bg-slate-700 border-slate-600 text-white' 
                  : 'bg-white border-slate-300 text-slate-900'
                }
              `}
            >
              <option value="all">{isRTL ? 'جميع الأنواع' : 'All Types'}</option>
              <option value="morning">{isRTL ? 'صباحية' : 'Morning'}</option>
              <option value="evening">{isRTL ? 'مسائية' : 'Evening'}</option>
              <option value="night">{isRTL ? 'ليلية' : 'Night'}</option>
              <option value="on-call">{isRTL ? 'عند الطلب' : 'On-Call'}</option>
            </select>
          </div>

          {/* Filter by Department */}
          <div>
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className={`
                w-full px-4 py-2.5 rounded-lg border transition-all
                ${isDarkMode 
                  ? 'bg-slate-700 border-slate-600 text-white' 
                  : 'bg-white border-slate-300 text-slate-900'
                }
              `}
            >
              <option value="all">{isRTL ? 'جميع الأقسام' : 'All Departments'}</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Shifts List */}
      <div className={`rounded-xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${isDarkMode ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
              <tr>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isRTL ? 'الطبيب' : 'Doctor'}
                </th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isRTL ? 'القسم' : 'Department'}
                </th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isRTL ? 'النوع' : 'Type'}
                </th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isRTL ? 'التاريخ' : 'Date'}
                </th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isRTL ? 'الوقت' : 'Time'}
                </th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isRTL ? 'الموقع' : 'Location'}
                </th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {isRTL ? 'التكرار' : 'Recurring'}
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? 'divide-slate-700' : 'divide-slate-200'}`}>
              {filteredShifts.map((shift) => (
                <tr key={shift.id} className={`transition-colors ${isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-slate-50'}`}>
                  <td className={`px-6 py-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-400" />
                      <span className="font-medium">{shift.doctorName}</span>
                    </div>
                  </td>
                  <td className={`px-6 py-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    {shift.department}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getShiftTypeColor(shift.type)}`}>
                      {shift.type.charAt(0).toUpperCase() + shift.type.slice(1)}
                    </span>
                  </td>
                  <td className={`px-6 py-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-slate-400" />
                      <span>{new Date(shift.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </td>
                  <td className={`px-6 py-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>{shift.startTime} - {shift.endTime}</span>
                    </div>
                  </td>
                  <td className={`px-6 py-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="text-sm">{shift.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {shift.isRecurring ? (
                      <div className={`flex items-center gap-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        <Repeat className="w-4 h-4" />
                        <span className="text-xs font-medium">{shift.recurringPattern}</span>
                      </div>
                    ) : (
                      <span className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        {isRTL ? 'مرة واحدة' : 'Once'}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredShifts.length === 0 && (
          <div className={`p-12 text-center ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">
              {isRTL ? 'لم يتم العثور على مناوبات' : 'No shifts found'}
            </p>
            <p className="text-sm">
              {isRTL ? 'جرب تغيير معايير البحث أو الفلترة' : 'Try adjusting your search or filter criteria'}
            </p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className={`rounded-xl p-6 border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {filteredShifts.length}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {isRTL ? 'إجمالي المناوبات' : 'Total Shifts'}
            </div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              {filteredShifts.filter(s => s.type === 'morning').length}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {isRTL ? 'صباحية' : 'Morning'}
            </div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              {filteredShifts.filter(s => s.type === 'evening').length}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {isRTL ? 'مسائية' : 'Evening'}
            </div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
              {filteredShifts.filter(s => s.isRecurring).length}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {isRTL ? 'متكررة' : 'Recurring'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
