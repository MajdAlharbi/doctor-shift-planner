from datetime import datetime, timedelta
from typing import List

from .domain import (
    PlanningBlock,
    PlanningResult,
    PlanningInput,
    Conflict,
    BlockType,
)

class PlanningEngine:
    """
    Rule-based planning engine.
    """

    def __init__(self, recovery_rules):
        self.rules = recovery_rules

    def generate(
        self,
        planning_input: PlanningInput,
        shifts: list,
        commitments: list,
    ) -> PlanningResult:
        blocks: List[PlanningBlock] = []
        conflicts: List[Conflict] = []

        for shift in shifts:
            blocks.append(
                PlanningBlock(
                    block_type=BlockType.SHIFT,
                    start=shift.start_datetime,
                    end=shift.end_datetime,
                    reference_id=shift.id,
                )
            )

            if shift.is_night:
                recovery_start = shift.end_datetime
                recovery_end = recovery_start + timedelta(
                    hours=self.rules.min_sleep_hours_after_night_shift
                )

                blocks.append(
                    PlanningBlock(
                        block_type=BlockType.RECOVERY,
                        start=recovery_start,
                        end=recovery_end,
                        reference_id=shift.id,
                    )
                )

        commitments_sorted = sorted(
            commitments,
            key=lambda c: c.priority,
            reverse=True,
        )

        for commitment in commitments_sorted:
            placed = False
            for candidate_start in commitment.possible_starts():
                candidate_end = candidate_start + commitment.duration

                if self._overlaps(candidate_start, candidate_end, blocks):
                    continue
                blocks.append(
                    PlanningBlock(
                        block_type=BlockType.COMMITMENT,
                        start=candidate_start,
                        end=candidate_end,
                        reference_id=commitment.id,
                    )
                )
                placed = True
                break
            if not placed:
                conflicts.append(
                    Conflict(
                        rule="NO_VALID_SLOT",
                        message="No valid time slot available for this commitment",
                        reference_id=commitment.id,
                    )
                )
        return PlanningResult(blocks=blocks, conflicts=conflicts)
    def _overlaps(self, start: datetime, end: datetime, blocks: list) -> bool:
        for block in blocks:
            if start < block.end and end > block.start:
                return True
        return False
