import { z } from "zod";

export const ideaSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    print_time_hours: z.number().min(0).default(0),
    print_time_minutes: z.number().min(0).max(59).default(0),
    filament_used_meters: z.number().min(0).default(0),
    labels: z.object({
        difficulty: z.enum(["Easy", "Medium", "Hard"]),
        material: z.enum(["PLA", "ABS", "PETG", "Nylon"]),
        type: z.string().min(1, "Type is required"),
        theme: z.string().min(1, "Theme is required"),
    }),
    multipart: z.boolean().default(false),
    needs_support: z.boolean().default(false),
});

export type Idea = z.infer<typeof ideaSchema>;
