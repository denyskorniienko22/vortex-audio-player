import z from "zod"

export const playlistFormSchema = z.object({
  title: z.string("This field is required").min(5, "Expected >= 4 characters"),
})

export type PlaylistFormValues = z.infer<typeof playlistFormSchema>
