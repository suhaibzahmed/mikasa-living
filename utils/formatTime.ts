import { format, parse } from 'date-fns'

export function formatTime(time: string) {
  const date = parse(time, 'HH:mm', new Date())
  return format(date, 'h:mm a')
}
