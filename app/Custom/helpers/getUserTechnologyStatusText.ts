/**
 * Возвращает перевод статуса
 */
export const getUserTechnologyStatusText = (status: string): string => {
  switch (status.toUpperCase()) {
    case 'ACTIVEUSE':
      return 'Активно использую'

    case 'NOLONGERUSE':
      return 'Больше не использую'

    case 'PLANTOSTUDY':
      return 'Планирую изучать'

    case 'RARELYUSE':
      return 'Иногда использую'

    case 'REFUSEDTOSTUDY':
      return 'Отказался изучать'

    case 'STUDY':
      return 'Изучаю'

    default:
      return ''
  }
}
