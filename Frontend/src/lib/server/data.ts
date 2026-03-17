import { db } from "$lib/server/db";
import { data } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export async function getData(locals: App.Locals) {
  const userId = locals.user?.id;
  if (!userId) return null;

  const row = await db
    .select()
    .from(data)
    .where(eq(data.userId, userId))
    .limit(1);

  return row[0]?.data ?? null;
}

function deepMerge(
    current: Record<string, unknown>,
    incoming: Record<string, unknown>
): Record<string, unknown> {
    const result = { ...current };
    for (const key of Object.keys(incoming)) {
        const currentValue = current[key];
        const incomingValue = incoming[key];
        if (Array.isArray(currentValue) && Array.isArray(incomingValue)) {
            // Append new array items, avoiding duplicates
            result[key] = [...new Set([...currentValue, ...incomingValue])];
        } else if (
            typeof currentValue === 'object' && currentValue !== null && !Array.isArray(currentValue) &&
            typeof incomingValue === 'object' && incomingValue !== null && !Array.isArray(incomingValue)
        ) {
            result[key] = deepMerge(
                currentValue as Record<string, unknown>,
                incomingValue as Record<string, unknown>
            );
        } else {
            result[key] = incomingValue;
        }
    }
    return result;
}

export async function addData(locals: App.Locals, newData: Record<string, unknown>) {
    const userId = locals.user?.id;
    if (!userId) throw new Error("User not authenticated");

    const row = await db.select().from(data).where(eq(data.userId, userId)).limit(1);
    const currentData = (row[0]?.data ?? {}) as Record<string, unknown>;
    const updatedData = deepMerge(currentData, newData);

    await db.update(data).set({ data: updatedData }).where(eq(data.userId, userId));

    return updatedData;
}

/**
 * Remove specific keys or array items from stored data.
 *
 * - Pass a key with `null` to delete that key entirely:  { "button": null }
 * - Pass a key with an array to remove those items from the existing array: { "button": ["Continue"] }
 * - Pass a key with a nested object to recursively remove from that object.
 */
export async function removeData(
    locals: App.Locals,
    toRemove: Record<string, unknown>
) {
    const userId = locals.user?.id;
    if (!userId) throw new Error("User not authenticated");

    const row = await db.select().from(data).where(eq(data.userId, userId)).limit(1);
    const currentData = (row[0]?.data ?? {}) as Record<string, unknown>;
    const updatedData = deepRemove(currentData, toRemove);

    await db.update(data).set({ data: updatedData }).where(eq(data.userId, userId));

    return updatedData;
}

function deepRemove(
    current: Record<string, unknown>,
    toRemove: Record<string, unknown>
): Record<string, unknown> {
    const result = { ...current };
    for (const key of Object.keys(toRemove)) {
        if (!(key in result)) continue;
        const removeVal = toRemove[key];
        if (removeVal === null) {
            // Delete the key entirely
            delete result[key];
        } else if (Array.isArray(removeVal) && Array.isArray(result[key])) {
            // Remove specific items from the array
            const removeSet = new Set(removeVal);
            result[key] = (result[key] as unknown[]).filter((item) => !removeSet.has(item));
        } else if (
            typeof removeVal === 'object' && !Array.isArray(removeVal) &&
            typeof result[key] === 'object' && result[key] !== null && !Array.isArray(result[key])
        ) {
            result[key] = deepRemove(
                result[key] as Record<string, unknown>,
                removeVal as Record<string, unknown>
            );
        }
    }
    return result;
}