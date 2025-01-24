export const DateBR = () => {
  const currentDate = new Date()

  // Obtener el offset en minutos de São Paulo (-3 horas)
  const saoPauloOffset = -3 * 60

  // Ajustar la fecha sumando el offset (en milisegundos)
  const adjustedTime = currentDate.getTime() + saoPauloOffset * 60 * 1000

  // Crear un nuevo objeto Date ajustado
  return new Date(adjustedTime)
}
