import Vue from "vue";
import moment from 'moment'
import numeral from 'numeral'

//llamamos a vue filter, le damos nombre a la funcion(duration). Luego creamos la función a la que insertaremos un 
//parametro. Posteriormente, agarramos el parametro y llamamos a la función moment par que convierta el string 
//con valor en segundos en formato mm:ss
Vue.filter('duration', function(value) {
    if (value) {
      return moment(String(value)).second(value).format('mm:ss')
    }
  }),
  //damos nombre a la funcion (number) y retornamos lo que devuelva la función numeral en el formato solicitado
Vue.filter("number", function (value) {
    return numeral(value).format("0,0"); 
});
