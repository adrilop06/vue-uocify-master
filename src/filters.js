import Vue from "vue";
import moment from 'moment'
import numeral from 'numeral'

Vue.filter('duration', function(value) {
    if (value) {
      return moment(String(value)).second(value).format('mm:ss')
    }
  }),
Vue.filter("number", function (value) {
    return numeral(value).format("0,0"); // displaying other groupings/separators is possible, look at the docs
});
