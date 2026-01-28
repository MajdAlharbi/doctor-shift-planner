Core Data Model – DoctorShift Planner
Design Principles

Minimal number of models

Clear ownership: all data belongs to a single user

No persistence of derived or generated planning data

Data model supports rule-based planning without UI dependency

The data model is designed to support the MVP scope only, without feature expansion.

Models Overview
1. User

The system uses Django’s built-in User model for authentication and identity management.

Purpose

Represents the authenticated physician

Acts as the owner of all related data entities

Relationships

One-to-Many with Shift

One-to-Many with Commitment

One-to-One with RecoveryRule

One-to-Many with EventLog

2. Shift

Represents a single medical shift.

Core Fields

user (ForeignKey → User)

date (Date)

start_time (Time)

end_time (Time)

shift_type (DAY, NIGHT, ON_CALL)

location (Optional, CharField)

Purpose

Primary driver of the planning logic

Determines recovery periods and workload constraints

Notes

Shifts are immutable in planning logic once used for generation

Overlapping shifts for the same user are not allowed

3. Commitment

Represents a non-clinical personal commitment.

Core Fields

user (ForeignKey → User)

title (CharField)

duration_minutes (Integer)

priority (HIGH, MEDIUM, LOW)

earliest_start (DateTime)

latest_end (DateTime)

Purpose

Provides flexible, movable planning blocks

Can be rescheduled within defined time windows

Notes

Commitments are not tied to fixed times by default

Planning engine attempts to fit them without violating recovery rules

4. RecoveryRule

Stores user-defined planning and recovery constraints.

Core Fields

user (OneToOneField → User)

min_sleep_hours_after_night_shift (Integer)

buffer_before_shift_minutes (Integer)

buffer_after_shift_minutes (Integer)

max_commitments_on_shift_day (Integer)

Purpose

Allows customization of planning behavior per user

Prevents hard-coded assumptions in the planning engine

Notes

Exactly one RecoveryRule record per user

Used as input for every planning run

5. EventLog

A lightweight log for sensitive user actions.

Core Fields

user (ForeignKey → User)

event_type (LOGIN, DATA_EXPORT, DATA_DELETE)

timestamp (DateTime)

Purpose

Basic auditability for privacy-related events

No analytics or monitoring intent

Why There Is No “Plan” Model

Generated plans are derived data, produced from:

Shifts

Commitments

RecoveryRules

Persisting plans would:

Create synchronization issues

Complicate updates and invalidation

Increase storage and logic complexity

Therefore, plans are generated on demand and returned as API responses only.

Summary

The data model:

Is intentionally minimal

Clearly separates input data from derived output

Supports deterministic, testable planning logic

Avoids premature complexity

This structure provides a stable foundation for backend logic implementation.