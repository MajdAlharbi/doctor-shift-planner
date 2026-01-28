System Architecture – DoctorShift Planner
High-Level (API-first)
Architectural Goal

The primary goal of the system architecture is to centralize all planning and business logic in the backend and treat the frontend as a pure consumer of APIs.

This ensures:

Clear separation of concerns

Testable and reviewable planning logic

No dependency on UI behavior for correctness

The backend is the single source of truth.

High-Level Components
1. Frontend (Next.js + React)

Responsibilities

Collect user input:

Shifts

Personal commitments

Recovery and planning rules

Display generated weekly plans

Display conflicts and their explanations

Non-responsibilities

No planning or scheduling logic

No recovery rules enforcement

No business decisions

Communication

RESTful API calls to the backend

Stateless requests authenticated via JWT

UI Considerations

Supports Arabic (RTL) and English (LTR)

Calendar-based weekly visualization

Read-only rendering of backend decisions

2. Backend (Django + Django REST Framework)

Core system responsibility

The backend is responsible for all application logic, including:

User authentication and data ownership

Data persistence and validation

Rule-based planning engine

Conflict detection and explanation

Weekly plan generation

All planning outputs are generated server-side and returned as structured API responses.

3. Authentication (JWT)

Stateless authentication using JSON Web Tokens

Access tokens used for all protected API endpoints

Tokens scoped per user

No shared or public data access

This approach simplifies scalability and keeps the backend independent from session state.

4. Database (PostgreSQL)

Role

Persistent storage for all user-owned data

Enforces relationships between entities

Supports structured querying for planning logic

Data Principles

Each record belongs to exactly one user

No cross-user data visibility

No derived planning data stored permanently (generated on demand)

API-First Rationale

The system is designed as API-first for the following reasons:

Planning logic can be tested independently from the UI

Backend behavior is explicit and reviewable

Prevents leakage of business rules into the frontend

Allows future clients (without commitment) without refactoring core logic

The frontend does not infer or calculate any planning decisions.

High-Level Data Flow

User submits:

Shift data

Commitment data

Planning and recovery rules

Frontend sends structured API requests.

Backend:

Authenticates the user

Validates ownership and input

Executes rule-based planning logic

Generates:

Weekly plan

Conflict list with explanations

Frontend renders the returned results without modification.

Intentional Constraints

To keep the system focused and reviewable, the following are intentionally excluded:

No planning logic in the frontend

No background jobs or schedulers

No notifications or reminders

No external API integrations

No AI or machine learning components

Summary

DoctorShift Planner follows a clean API-first architecture where:

Backend logic drives all decisions

Frontend is a thin presentation layer

Planning is deterministic, explainable, and testable

This architecture supports the MVP goals without unnecessary complexity.