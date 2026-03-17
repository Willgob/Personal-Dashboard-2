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
