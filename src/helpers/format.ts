import Movie from "../types/movie";

export function currency(currency: number){
   return `R$ ${currency.toFixed(2).replace('.', ',')}`
}

export function date(release_date : string){
   const dateSplit = release_date.split('-');
   const newDate = new Date (parseInt(dateSplit[2]), parseInt(dateSplit[1])-1, parseInt(dateSplit[0]));
   const month = newDate.toLocaleString('pt-BR', { month: 'long' });

   return `${dateSplit[2]} de ${month}, ${dateSplit[0]}`;
}