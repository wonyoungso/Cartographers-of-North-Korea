import _ from 'lodash';
import axios from 'axios';


export const constrain = (amt, low, high) => {
  return (amt < low) ? low : ((amt > high) ? high : amt);
}




export const numberWithDelimiter = (number, delimiter, separator) => {
  try {
    var delimiter = delimiter || ",";
    var separator = separator || ".";
    
    var parts = number.toString().split('.');
    parts[0] = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + delimiter);
    return parts.join(separator);
  } catch(e) {
    return number
  }
};

export const getMetaContent = (name) => {
  var metas = document.getElementsByTagName('meta');
  let result = ""
  _.each(metas, (meta) => {
    if (meta.getAttribute("name") == name) {
      result = meta.getAttribute("content");
    }
  });

  return result;
}

String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};


export const randomBetween = (low, high) => {
  if (low >= high) return low;
  var diff = high - low;
  return Math.random() * diff + low;
};

export const map = (value, start1,  stop1, start2,  stop2) => {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}
