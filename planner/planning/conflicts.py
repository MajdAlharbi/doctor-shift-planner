from typing import Dict
_RULE_MESSAGES = {
    "MAX_COMMITMENTS_ON_SHIFT_DAY": "Too many commitments scheduled on a shift day",
    "INSUFFICIENT_REST_AFTER_NIGHT_SHIFT": "Not enough rest time after night shift",
    "OVERLAPPING_COMMITMENT": "Commitment overlaps with another block",
}


def explain_conflict(conflict: dict) -> dict:
    rule = conflict.get("rule")
    reference = conflict.get("reference")

    return {
        "rule": rule,
        "reference": reference,
        "message": _RULE_MESSAGES.get(
            rule,
            "Conflict detected"
        ),
    }


def explain_conflicts(conflicts: list[dict]) -> list[dict]:
    return [explain_conflict(c) for c in conflicts]