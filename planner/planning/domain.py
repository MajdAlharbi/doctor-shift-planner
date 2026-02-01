from dataclasses import dataclass
from datetime import datetime
from enum import Enum
from typing import Optional, List


class BlockType(Enum):
    SHIFT = "shift"
    RECOVERY = "recovery"
    COMMITMENT = "commitment"


@dataclass
class PlanningBlock:
    block_type: BlockType
    start: datetime
    end: datetime
    reference_id: Optional[int] = None


@dataclass
class Conflict:
    rule: str
    message: str
    reference_id: Optional[int] = None


@dataclass
class PlanningInput:
    week_start: datetime
    week_end: datetime


@dataclass
class PlanningResult:
    blocks: List[PlanningBlock]
    conflicts: List[Conflict]
