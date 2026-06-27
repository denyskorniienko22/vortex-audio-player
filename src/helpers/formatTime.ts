export const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return "00:00"

  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)

  return `${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`
}
