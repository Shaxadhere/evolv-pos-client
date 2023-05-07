import sc from "states-cities-db";

const COUNTRIES = sc.getCountries();

const getCountryTelCode = country =>
  country && COUNTRIES.find(({ iso }) => iso === country).prefix;

const getCodeToCountry = (code) => {
  return COUNTRIES.find(({ prefix }) => prefix === code);
}


  

export { COUNTRIES, getCountryTelCode,getCodeToCountry };
