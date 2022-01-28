export type Covid19ApiResponse = {
  Global: Global
  Countries: Array<Country>
  Date: string
}

export type Global = {
  NewConfirmed: number
  TotalConfirmed: number
  NewDeaths: number
  TotalDeaths: number
  NewRecovered: number
  TotalRecovered: number
}

export type Country = {
  ID: string
  Country: string
  CountryCode: string
  Slug: string
  NewConfirmed: number
  TotalConfirmed: number
  NewDeaths: number
  TotalDeaths: number
  NewRecovered: number
  TotalRecovered: number
  Date: string
}

export type Case = {
  Country: string
  CountryCode: string
  Lat: string
  Lon: string
  Cases: number
  Status: string
  Date: string
}
