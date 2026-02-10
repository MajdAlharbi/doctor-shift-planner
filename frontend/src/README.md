# MedShift Planner - Personal Medical Shift Planning Application

A comprehensive productivity tool designed for individual doctors to manage their shift schedules, personal commitments, and recovery rules to maintain work-life balance.

## 🎯 Key Features

### 1. **Personal Dashboard**
- Welcome screen with personalized greeting
- 4 key statistics cards (This Week's Shifts, Recovery Hours, Personal Commitments, Active Conflicts)
- Mini calendar showing current week with shift indicators
- Quick actions for adding shifts and commitments
- Urgent conflicts section with immediate alerts

### 2. **My Shifts Management**
- Add, edit, and delete personal shifts
- Support for Day, Night, and On-Call shifts
- Color-coded shift types (Blue for Day, Indigo for Night, Purple for On-Call)
- Repeat options: None, Weekly, Monthly
- Location tracking (optional)
- Filter shifts by type

### 3. **Weekly Calendar View**
- Interactive 7-day weekly calendar (Monday-Sunday)
- Vertical timeline from 6:00 AM to 10:00 PM
- Color-coded event blocks:
  - Shifts (blue shades)
  - Recovery periods (green) - automatically calculated after night shifts
  - Personal commitments (orange)
  - Conflicts (red highlights)
- Current time indicator
- Click on events to view details
- Week navigation controls

### 4. **My Commitments**
- Manage personal activities and appointments
- Priority system: High, Medium, Low
- Flexible timing option with time windows
- Duration tracking
- Notes for additional context
- Sort by priority and date

### 5. **Recovery Rules Settings**
- Minimum sleep after night shift (6-12 hours slider)
- Buffer time before shift (0-120 minutes)
- Buffer time after shift (0-180 minutes)
- Max personal commitments on shift days (0-5)
- Visual examples showing how rules affect scheduling
- Real-time preview of rule applications

### 6. **Conflict Resolution Center**
- Automatic conflict detection
- Categorized by severity (High, Medium, Low)
- Suggested fixes for each conflict
- Action options:
  - Apply Fix: Automatically reschedule based on suggestion
  - Ignore: Acknowledge and dismiss
  - Snooze: Temporarily hide for later review
- Current issues and history tabs
- Statistics dashboard

### 7. **Profile & Settings**
- Personal information management (Name, Specialty, Hospital)
- Language toggle: English/Arabic with full RTL support
- Theme toggle: Light/Dark mode
- Time format: 12h/24h
- Notifications on/off
- Account actions (Change Password, Export Data, Delete Account)

## 🎨 Design System

### Color Scheme
- **Primary (Day Shifts)**: #3B82F6 (Blue)
- **Secondary (Night Shifts)**: #1E40AF (Indigo)
- **Success (Recovery)**: #10B981 (Green)
- **Warning (Personal)**: #F59E0B (Orange)
- **Danger (Conflicts)**: #EF4444 (Red)
- **Background Light**: #F8FAFC
- **Background Dark**: #111827

### Typography
- **English**: System fonts (Inter-style)
- **Arabic**: Noto Sans Arabic (imported from Google Fonts)
- **RTL Support**: Full right-to-left layout for Arabic

### Spacing
- Based on 8px grid system
- Consistent spacing across all components
- Responsive padding and margins

## 🏗️ Technical Architecture

### Technologies
- **React 18** with TypeScript
- **React Router** (Data mode with BrowserRouter)
- **Tailwind CSS v4** for styling
- **date-fns** for date manipulation
- **Lucide React** for icons
- **Context API** for state management

### File Structure
```
/
├── App.tsx                      # Main app entry with provider
├── routes.tsx                   # React Router configuration
├── contexts/
│   └── AppContext.tsx          # Global state and translations
├── components/
│   ├── Header.tsx              # Navigation header
│   ├── Dashboard.tsx           # Main dashboard
│   ├── ShiftsManagement.tsx    # Shifts CRUD
│   ├── WeeklyCalendar.tsx      # Calendar view
│   ├── Commitments.tsx         # Personal commitments
│   ├── RecoveryRules.tsx       # Rules configuration
│   ├── ConflictResolution.tsx  # Conflict management
│   └── ProfileSettings.tsx     # User settings
├── types/
│   └── index.ts                # TypeScript type definitions
├── utils/
│   └── mockData.ts             # Mock data for development
└── styles/
    └── globals.css             # Global styles and theme
```

### State Management
All application state is managed through the `AppContext`:
- User profile and preferences
- Shifts collection
- Personal commitments
- Recovery rules
- Conflicts
- Theme and language settings

### Internationalization
Bilingual support with inline translations:
- English (default)
- Arabic with full RTL layout support
- Translations stored in AppContext
- Dynamic language switching

## 🚀 Getting Started

The application is ready to run with mock data. Simply navigate through the interface using the top navigation menu.

### Default Mock Data Includes:
- 4 sample shifts (Day, Night, On-Call)
- 4 personal commitments
- 2 sample conflicts for demonstration

## 📱 Responsive Design

The application is fully responsive across:
- **Desktop**: 1440px+ (optimal experience)
- **Tablet**: 768px-1439px
- **Mobile**: 375px-767px

### Responsive Features:
- Collapsible mobile navigation
- Stacked layouts on small screens
- Touch-friendly buttons and controls
- Optimized calendar view for mobile

## ♿ Accessibility

- Proper ARIA labels
- Keyboard navigation support
- Focus states on all interactive elements
- High contrast ratios (WCAG AA compliant)
- Screen reader friendly

## 🔮 Future Enhancements (Backend Integration Ready)

The application is structured to easily integrate with a backend:
- Replace mock data with API calls
- Add authentication
- Persist data to database
- Real-time conflict detection
- Push notifications
- Data export/import functionality

## 🎯 Use Cases

### For Emergency Medicine Doctors:
- Track irregular shift patterns
- Ensure adequate recovery after night shifts
- Balance personal life with demanding schedules
- Prevent burnout through automated conflict detection

### For General Practitioners:
- Manage clinic hours and on-call duties
- Schedule personal appointments around shifts
- Maintain consistent work-life balance
- Track commitments and avoid double-booking

## 📝 Notes

- All times are displayed based on user's time format preference (12h/24h)
- Recovery periods are automatically calculated based on configured rules
- Conflicts are detected in real-time when adding new shifts or commitments
- Dark mode persists across sessions (when backend is connected)
- Language preference saves automatically

---

**Built with ❤️ for healthcare professionals**
