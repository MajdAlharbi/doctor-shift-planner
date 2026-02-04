import unittest
from datetime import datetime, timedelta,date
from planner.planning.conflicts import explain_conflicts
from planner.planning.engine import PlanningEngine
from planner.planning.domain import PlanningInput


class TestPlanningEngine(unittest.TestCase):
    def test_engine_runs_without_errors(self):
        engine = PlanningEngine(recovery_rules=None)

        planning_input = PlanningInput(
            week_start=datetime(2026, 2, 2),
            week_end=datetime(2026, 2, 9),
        )
        result = engine.generate(
            planning_input=planning_input,
            shifts=[],
            commitments=[],
        )

        self.assertIsNotNone(result)
        self.assertEqual(result.blocks, [])
        self.assertEqual(result.conflicts, [])

        def test_engine_returns_expected_structure(self):
            engine = PlanningEngine(recovery_rules=None)

        result = engine.generate(
            planning_input=None,
            shifts=[],
            commitments=[],
        )

        self.assertTrue(hasattr(result, "blocks"))
        self.assertTrue(hasattr(result, "conflicts"))
        self.assertIsInstance(result.blocks, list)
        self.assertIsInstance(result.conflicts, list)
        
        def test_conflict_explanation_returns_messages(self):
            from planner.planning.conflicts import explain_conflicts

        raw_conflicts = [
            {
                "rule": "MAX_COMMITMENTS_ON_SHIFT_DAY",
                "reference": {"type": "shift", "id": 1},
            }
        ]

        explained = explain_conflicts(raw_conflicts)

        self.assertIsInstance(explained, list)
        self.assertEqual(len(explained), 1)
        self.assertIn("message", explained[0])
        self.assertIn("rule", explained[0])

