export function date(ms) {
  const diffTime = Date.now() - Number(ms)
  const s = parseInt(Math.floor(diffTime / 1000))
  const m = 60
  const m5 = 60 * 5
  const m10 = 60 * 10
  const m30 = 60 * 30

  if (s < m) return ' - 1 минуту назад'
  if (s < m5) return ' - 5 минут назад'
  if (s < m10) return ' - 10 минут назад'
  if (s < m30) return ' - 30 минут назад'
  else {
    const date = new Date(ms)
    const yy = date.getFullYear()
    const month = date.getMonth()
    const dd = date.getDate()
    const hh = date.getHours()
    const mm = date.getMinutes()

    const currentDate = new Date()
    const cyy = currentDate.getFullYear()
    const cMonth = currentDate.getMonth()
    const cdd = currentDate.getDate()

    if (cyy > yy) {
      return ` - ${new Date(yy, month, dd).toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}`
    } else if (cyy === yy && month !== cMonth) {
      return ` - ${new Date(yy, month, dd).toLocaleString('ru', {
        month: 'long',
        day: 'numeric'
      })}`
    } else if (dd !== cdd) {
      return ` - ${new Date(yy, month, dd).toLocaleString('ru', {
        month: 'long',
        day: 'numeric'
      })}`
    } else {
      return ` - ${new Date(yy, month, dd, hh, mm).toLocaleString('ru', {
        hour: 'numeric',
        minute: 'numeric'
      })}`
    }
  }
}
