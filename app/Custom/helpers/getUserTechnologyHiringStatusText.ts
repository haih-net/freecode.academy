/**
 * Возвращает перевод статуса заинтересованности в трудоустройстве
 */
export const getUserTechnologyHiringStatusText = (status: string): string => {
  switch (status.toUpperCase()) {
    case 'ACTIVE':
      return 'Очень заинтересован'

    case 'NEGATIVE':
      return 'Не заинтересован'

    case 'NEUTRAL':
      return 'Не против'

    default:
      return ''
  }
}
