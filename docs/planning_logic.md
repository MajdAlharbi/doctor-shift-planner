Smart Planning Logic – Rule-Based Engine
DoctorShift Planner
Objective

Transform user inputs (shifts, personal commitments, recovery rules) into a deterministic weekly plan that:

Respects recovery after shifts

Prevents scheduling conflicts

Minimizes cognitive load for the user

Produces explainable outcomes

This logic is rule-based, deterministic, and fully executed in the backend.

Inputs
1. Shifts

A list of user-defined medical shifts:

Date

Start time

End time

Shift type (DAY / NIGHT / ON_CALL)

2. Commitments

A list of flexible personal commitments:

Duration (minutes)

Priority (HIGH / MEDIUM / LOW)

Allowed time window (earliest_start → latest_end)

3. Recovery Rules

User-defined constraints:

Minimum sleep hours after night shift

Buffer time before a shift

Buffer time after a shift

Maximum number of commitments on a shift day

Outputs
1. Weekly Plan

A structured list of time blocks:

Sleep / Recovery blocks

Scheduled commitments

Fixed shift blocks

2. Conflict List

A list of conflicts with:

Affected item (shift or commitment)

Rule violated

Human-readable explanation

Core Rules (Deterministic)

Shifts are fixed

Shift times cannot be moved or altered.

Night shift recovery is mandatory

After a NIGHT shift, block a recovery window equal to:

min_sleep_hours_after_night_shift


Buffers are enforced

No commitment may start within:

buffer_before_shift_minutes before a shift

buffer_after_shift_minutes after a shift

Daily load limit

On any day with a shift, total scheduled commitments must not exceed:

max_commitments_on_shift_day


Priority-based placement

HIGH priority commitments are placed first.

LOW priority commitments are dropped first if space is insufficient.

Planning Algorithm (High-Level)

Load all shifts for the target week.

Generate fixed blocks:

Shift blocks

Recovery blocks

Buffer blocks

Sort commitments by:

Priority (HIGH → LOW)

Narrowest time window first

For each commitment:

Search for the earliest valid time slot that:

Falls within its allowed window

Does not overlap fixed blocks

Does not violate daily limits

If found → schedule it

If not found → mark as conflict

Return the final plan and conflicts.

Pseudo-Code
def generate_weekly_plan(shifts, commitments, rules):
    fixed_blocks = build_fixed_blocks(shifts, rules)
    plan = []
    conflicts = []

    commitments = sort_by_priority_and_window(commitments)

    for commitment in commitments:
        slot = find_valid_slot(commitment, fixed_blocks, plan, rules)

        if slot:
            plan.append(schedule(commitment, slot))
        else:
            conflicts.append(
                create_conflict(commitment, "No valid time slot found")
            )

    return {
        "plan": plan,
        "conflicts": conflicts
    }

Concrete Example
Input

Shift

Night shift: Monday 20:00 → Tuesday 08:00

Recovery Rules

Minimum sleep after night shift: 8 hours

Buffer after shift: 60 minutes

Max commitments on shift day: 1

Commitments

Gym (90 min, MEDIUM)
Allowed: Tuesday 10:00 → 22:00

Study (120 min, HIGH)
Allowed: Tuesday 12:00 → 20:00

Processing

Recovery block created:
Tuesday 08:00 → 16:00

Buffer applied:
No commitments allowed until 17:00

HIGH priority commitment placed first:

Study → 17:00 → 19:00

Daily limit reached → Gym cannot be scheduled

Output

Weekly Plan

Recovery: Tue 08:00 → 16:00

Study: Tue 17:00 → 19:00

Conflicts

Gym:

Reason: Exceeded maximum commitments allowed on a shift day

Design Characteristics

Deterministic and repeatable

Fully explainable

Testable via unit tests

Independent from UI rendering

Explicit Non-Goals

No optimization for “best lifestyle”

No behavioral predictions

No adaptive learning

No medical guidance

Summary

The planning engine converts raw scheduling data into an actionable weekly plan using explicit rules defined by the user.
All decisions are traceable, explainable, and enforceable without UI-side logic.