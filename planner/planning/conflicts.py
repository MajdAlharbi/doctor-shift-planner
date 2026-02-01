from typing import Dict

CONFLICT_MESSAGES: Dict[str, str] = {
    "SHIFT_OVERLAP": "Two shifts overlap in time.",
    "COMMITMENT_OVERLAP": "A commitment overlaps with another block.",
    "NO_RECOVERY_AFTER_NIGHT": (
        "There is not enough recovery time after a night shift."
    ),
}

def explain_conflict(conflict):
    message = CONFLICT_MESSAGES.get(
        conflict.rule,
        "Scheduling conflict detected."
    )

    reference = None
    if conflict.reference_id:
        reference = {
            "id": conflict.reference_id
        }

    return {
        "rule": conflict.rule,
        "message": message,
        "reference": reference,
    }

def explain_conflicts(conflicts):
    return [explain_conflict(c) for c in conflicts]
