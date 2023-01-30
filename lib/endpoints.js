export function formatDate() {
  const year = new Date().toLocaleString('en-GB', { year: 'numeric' })
  const month = new Date().toLocaleString('en-GB', { month: '2-digit' })
  const day = Number(new Date().toLocaleString('en-GB', { day: '2-digit' })) //CASO EU QUEIRA MODIFICAR A DATA SO OPERAR AQUI - LEMBRANDO QUE NAO ACEITA MODIFICAR CONST DEPOIS

  return (year + '-' + month + '-' + day).toString()
}

export async function getPistasRacingPost() {
  const dataDados = formatDate()
  const url = `https://greyhoundbet.racingpost.com/meeting/blocks.sd?r_date=${dataDados}&view=meetings&blocks=header%2Clist`
  const response = await fetch(`${url}`)

  const data = await response.json()
  return data
}
