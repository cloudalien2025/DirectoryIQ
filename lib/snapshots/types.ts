export type SnapshotBrainId = "directoryiq";
export type SnapshotStatus = "up_to_date" | "updating" | "needs_connection" | "error";
export type SnapshotMetricState = "ready" | "loading" | "stale";

export type SnapshotMetric = {
  key: string;
  label: string;
  value: string | number | null;
  unit?: string;
  state: SnapshotMetricState;
};

export type SnapshotResponse = {
  brain_id: SnapshotBrainId;
  status: SnapshotStatus;
  updated_at: string | null;
  metrics: SnapshotMetric[];
  hints?: string[];
  last_error?: string | null;
};

export const SNAPSHOT_REFRESH_THRESHOLD_MS = 6 * 60 * 60 * 1000;
export const SNAPSHOT_LOCK_TTL_MS = 10 * 60 * 1000;

export const DIRECTORYIQ_METRIC_DEFS = [
  { key: "travel_selection_readiness", label: "Travel Selection Readiness" },
  { key: "listings_optimized_total", label: "Listings Optimized / Total" },
  { key: "authority_gaps", label: "Authority Gaps" },
  { key: "monetization_opportunities", label: "Monetization Opportunities" },
  { key: "lead_capture_opportunities", label: "Lead Capture Opportunities" },
  { key: "schema_integrity", label: "Schema Integrity" },
] as const;

export function metricTemplate(_brainId: SnapshotBrainId, state: SnapshotMetricState): SnapshotMetric[] {
  return DIRECTORYIQ_METRIC_DEFS.map((def) => ({ key: def.key, label: def.label, value: null, state }));
}

export function isSnapshotStale(updatedAtIso: string | null): boolean {
  if (!updatedAtIso) return true;
  const parsed = Date.parse(updatedAtIso);
  if (!Number.isFinite(parsed)) return true;
  return Date.now() - parsed > SNAPSHOT_REFRESH_THRESHOLD_MS;
}

export function withMetricState(
  metrics: SnapshotMetric[],
  state: SnapshotMetricState
): SnapshotMetric[] {
  return metrics.map((metric) => ({ ...metric, state: metric.value == null ? "loading" : state }));
}
