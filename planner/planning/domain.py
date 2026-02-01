from dataclasses import dataclass
from datetime import datetime
from enum import Enum
from typing import Optional


class BlockType(Enum):
    SHIFT = "shift"
    RECOVERY = "recovery"
    COMMITMENT = "commitment"


@dataclass
class PlanningBlock:
    """
    Represents a time block in the generated plan.
    """
    block_type: BlockType
    start: datetime
    end: datetime
    reference_id: Optional[int] = None

@dataclass
class Conflict:
    """
    Represents a planning conflict with an explanation.
    """
    rule: str
    message: str
    reference_id: Optional[int] = None

@dataclass
class PlanningInput:
    """
    Input data passed to the planning engine.
    """
    week_start: datetime
    week_end: datetime
