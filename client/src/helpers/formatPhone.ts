export const formatPhone = (phoneNumber: string) => {

  const numbericOnly = phoneNumber.replace(/\D/g, '')

  const formattedNumber = `+${numbericOnly.slice(0,2)} ${numbericOnly.slice(2,4)} ${numbericOnly.slice(4,7)} ${numbericOnly.slice(7)}`
  
  return formattedNumber
}