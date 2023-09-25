import z from "zod";

export const Advice = z.object({
  id: z.number(),
  advice: z.string(),
});

export type AdviceType = z.infer<typeof Advice>;
