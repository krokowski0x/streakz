import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const streakSchema = z.object({
  id: z.number(),
  name: z.string(),
  completed: z.array(z.boolean()),
});

type Streak = z.infer<typeof streakSchema>;

const createStreakSchema = z.object({ name: z.string() });
const updateStreakSchema = z.object({
  index: z.number(),
  completed: z.boolean(),
});

const STREAKS: Streak[] = [
  {
    id: 1,
    name: "Run 🏃‍♂️",
    completed: [false, true, true, true],
  },
];

export const streaksRoute = new Hono()
  .get("/", (c) => {
    return c.json({ streaks: STREAKS });
  })
  .post("/", zValidator("json", createStreakSchema), async (c) => {
    const streak = await c.req.valid("json");
    STREAKS.push({ id: STREAKS.length + 1, completed: [], ...streak });

    return c.json(streak);
  })
  .put("/:id{[0-9]+}", zValidator("json", updateStreakSchema), async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const streakToUpdate = await c.req.valid("json");
    const streak = STREAKS.findIndex((s) => s.id === id);

    if (streak === -1) {
      return c.notFound();
    }

    STREAKS[streak].completed[streakToUpdate.index] = streakToUpdate.completed;

    return c.json(STREAKS[streak]);
  });
