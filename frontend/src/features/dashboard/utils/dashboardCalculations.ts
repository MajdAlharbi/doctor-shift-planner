import { Shift, PersonalCommitment, RecoveryRules } from "../../../types";

export interface DashboardStats {
  totalShiftMinutes: number; // in minutes
  weeklyShiftCount: number;
  nightShiftCount: number;
  commitmentsOnShiftDays: number;
  recoveryCompliance: number; // %
  workLifeScore: number; // 0-100
  burnoutRisk: "low" | "moderate" | "high";
}

/**
 * Convert HH:mm to minutes
 */
const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

/**
 * Calculate shift duration in minutes
 */
const calculateShiftDuration = (shift: Shift): number => {
  const start = timeToMinutes(shift.startTime);
  const end = timeToMinutes(shift.endTime);

  // Handle overnight shifts (e.g., 22:00 → 06:00)
  if (end < start) {
    return 24 * 60 - start + end;
  }

  return end - start;
};

/**
 * Calculate total weekly shift minutes
 */
export function calculateWeeklyShiftMinutes(shifts: Shift[]): number {
  return shifts.reduce(
    (total, shift) => total + calculateShiftDuration(shift),
    0
  );
}

/**
 * Count night shifts
 */
export function calculateNightShiftCount(shifts: Shift[]): number {
  return shifts.filter((s) => s.type === "night").length;
}

/**
 * Count commitments that fall on shift days
 */
export function calculateCommitmentsOnShiftDays(
  shifts: Shift[],
  commitments: PersonalCommitment[]
): number {
  const shiftDates = shifts.map((s) => s.date.toDateString());

  return commitments.filter((c) =>
    shiftDates.includes(c.date.toDateString())
  ).length;
}

/**
 * Recovery compliance score (0–100)
 */
export function calculateRecoveryCompliance(
  shifts: Shift[],
  rules: RecoveryRules
): number {
  if (shifts.length === 0) return 100;

  let compliantCount = 0;

  shifts.forEach((shift) => {
    if (shift.type === "night") {
      // If night shift exists, assume recovery required
      // We consider it compliant by default (since we don't track sleep events yet)
      compliantCount++;
    } else {
      compliantCount++;
    }
  });

  return Math.round((compliantCount / shifts.length) * 100);
}

/**
 * Work-Life Balance Score (0–100)
 */
export function calculateWorkLifeScore(
  shifts: Shift[],
  commitments: PersonalCommitment[],
  rules: RecoveryRules
): number {
  let score = 100;

  const weeklyMinutes = calculateWeeklyShiftMinutes(shifts);
  const nightShifts = calculateNightShiftCount(shifts);
  const commitmentsOnShiftDays = calculateCommitmentsOnShiftDays(
    shifts,
    commitments
  );
  const recoveryCompliance = calculateRecoveryCompliance(shifts, rules);

  const weeklyHours = weeklyMinutes / 60;

  // Penalize excessive weekly hours (>60h)
  if (weeklyHours > 60) {
    score -= 15;
  }

  // Penalize too many night shifts
  if (nightShifts >= 3) {
    score -= 15;
  }

  // Penalize too many commitments on shift days
  if (commitmentsOnShiftDays > rules.maxCommitmentsOnShiftDays) {
    score -= 10;
  }

  // Penalize poor recovery compliance
  if (recoveryCompliance < 70) {
    score -= 20;
  }

  return Math.max(0, Math.min(100, score));
}

/**
 * Burnout Risk Estimator
 */
export function calculateBurnoutRisk(
  score: number
): "low" | "moderate" | "high" {
  if (score >= 75) return "low";
  if (score >= 50) return "moderate";
  return "high";
}

/**
 * Master calculation function
 */
export function calculateDashboardStats(
  shifts: Shift[],
  commitments: PersonalCommitment[],
  rules: RecoveryRules
) {
  const totalShiftMinutes = calculateWeeklyShiftMinutes(shifts);
  const weeklyShiftCount = shifts.length;
  const nightShiftCount = calculateNightShiftCount(shifts);
  const commitmentsOnShiftDays = calculateCommitmentsOnShiftDays(
    shifts,
    commitments
  );
  const recoveryCompliance = calculateRecoveryCompliance(shifts, rules);
  const workLifeScore = calculateWorkLifeScore(
    shifts,
    commitments,
    rules
  );
  const burnoutRisk = calculateBurnoutRisk(workLifeScore);


  const thisWeekShifts = weeklyShiftCount;
  const recoveryHours =
    nightShiftCount * rules.minSleepAfterNightShift;
  const activeConflicts = 0;

  return {
    totalShiftMinutes,
    weeklyShiftCount,
    nightShiftCount,
    commitmentsOnShiftDays,
    recoveryCompliance,
    workLifeScore,
    burnoutRisk,
    thisWeekShifts,
    recoveryHours,
    activeConflicts,
  };
}

