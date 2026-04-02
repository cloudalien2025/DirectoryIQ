export type BrainId = "directoryiq";
export type EntitlementUser = Record<string, unknown> | null | undefined;

function tryParseJsonObject(input: string | null): Record<string, unknown> | null {
  if (!input) return null;
  try {
    const parsed = JSON.parse(input) as unknown;
    if (parsed && typeof parsed === "object") return parsed as Record<string, unknown>;
  } catch {
    return null;
  }
  return null;
}

type HeaderReader = {
  get(name: string): string | null;
};

export function resolveUserFromHeaders(headers: HeaderReader): Record<string, unknown> {
  const parsedUser = tryParseJsonObject(headers.get("x-user"));
  const cfAccessEmail = headers.get("cf-access-authenticated-user-email");
  const headerEmail = headers.get("x-user-email") ?? headers.get("x-forwarded-email") ?? cfAccessEmail;

  return {
    ...(parsedUser ?? {}),
    ...(cfAccessEmail ? { cf_access_authenticated: true } : {}),
    is_admin:
      headers.get("x-user-is-admin") === "1" ||
      headers.get("x-user-is-admin")?.toLowerCase() === "true" ||
      ((parsedUser?.is_admin as boolean | undefined) ?? false),
    email: headerEmail ?? (parsedUser?.email as string | undefined) ?? null,
    name: headers.get("x-user-name") ?? (parsedUser?.name as string | undefined) ?? "Operator",
  };
}

export function isEntitled(_user: EntitlementUser, brainId: BrainId): boolean {
  return brainId === "directoryiq";
}
