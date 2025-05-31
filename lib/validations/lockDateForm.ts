// lib/validations/lockDateForm.ts
import * as z from "zod";

export const lockDateFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  eventTitle: z.string().min(1, "Event title is required"),
  hall: z.enum(["upper", "lower", "both"], { required_error: "Select a hall" }),
  specialRequirements: z.string().optional(),
  daysToHold: z.coerce.number().min(1, "Must hold for at least 1 day"),
});

export type LockDateFormValues = z.infer<typeof lockDateFormSchema>;
