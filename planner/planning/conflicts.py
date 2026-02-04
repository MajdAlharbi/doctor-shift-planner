from typing import Dict

CONFLICT_MESSAGES: Dict[str, str] = {
    "SHIFT_OVERLAP": "Two shifts overlap in time.",
    "COMMITMENT_OVERLAP": "A commitment overlaps with another block.",
    "NO_RECOVERY_AFTER_NIGHT": (
        "There is not enough recovery time after a night shift."
    ),
}

def explain_conflict(conflict):
 
    rule = conflict.rule if hasattr(conflict, "rule") else conflict.get("rule")
    reference = (
        conflict.reference
        if hasattr(conflict, "reference")
        else conflict.get("reference")
    )

    return {
        "rule": rule,
        "reference": reference,
        "message": f"Rule violated: {rule}",
    }


def explain_conflicts(conflicts):
    return [explain_conflict(c) for c in conflicts]
