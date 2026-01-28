DoctorShift Planner
Problem Statement & MVP Scope
1. Problem Statement

On-call physicians, especially those working in Emergency Departments and Urgent Care, operate under highly irregular and frequently changing schedules. These schedules often include night shifts, extended hours, and inconsistent rest periods, which makes structured personal planning difficult.

General-purpose tools such as calendars and task managers fail to address the realities of medical shift work. They do not account for post-night-shift recovery, do not prevent unrealistic scheduling of commitments, and do not help translate shift schedules into actionable daily or weekly plans.

The core problem is not the lack of visibility into work schedules, but the absence of a structured way to convert shift schedules and personal commitments into a realistic, executable plan that respects recovery constraints and reduces cognitive load caused by repetitive manual planning, while preserving user privacy.

DoctorShift Planner is a web-based platform designed to solve this problem through clear, rule-based planning logic. It does not provide medical diagnosis, treatment, or health monitoring.

2. MVP Scope – MUST-HAVE Features

Shift Schedule Management

Create, update, and delete shifts (date, start time, end time, shift type).

Support quick duplication of recurring shifts.

Personal Commitment Management

Create non-medical tasks or appointments (e.g., exercise, study, errands).

Basic attributes: duration, priority, allowed time window.

Post-Shift Recovery Rules (User-defined)

Minimum sleep duration after night shifts.

Buffer time before and after shifts.

Maximum allowed commitments on shift days.

Rule-based Weekly Plan Generation

Combine shifts, commitments, and recovery rules.

Automatically reschedule commitments within allowed time windows.

Weekly Calendar View with Conflict Detection

Display the generated plan in a weekly calendar.

Highlight conflicts with explicit explanations for each violation.

Authentication and Basic Privacy Controls

User authentication using JWT.

Strict data isolation per user.

Logging of basic security-related events (e.g., login, data deletion).

3. Out of Scope (Explicitly Excluded)

Mobile application development or PWA support.

Integration with external calendars (Google Calendar, Apple Calendar).

Notifications (email, SMS, push notifications).

Machine learning or AI-based recommendations.

Social features or schedule sharing.

Health or medical tracking (symptoms, diagnoses, medications).

Advanced analytics or burnout scoring.

Financial or payroll features.

Multi-role access or administrative dashboards.

Team or institutional usage.