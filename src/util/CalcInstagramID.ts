// Credit to this answer on Stack Overlow: https://stackoverflow.com/a/68497086

import bigint from "big-integer";

var lower = "abcdefghijklmnopqrstuvwxyz";
var upper = lower.toUpperCase();
var numbers = "0123456789";
var ig_alphabet = upper + lower + numbers + "-_";
var bigint_alphabet = numbers + lower;

export function fromShortcode(shortcode) {
  var o = shortcode.replace(/\S/g, (m) => {
    var c = ig_alphabet.indexOf(m);
    var b = bigint_alphabet.charAt(c);
    return b != "" ? b : `<${c}>`;
  });
  return bigint(o, 64).toString(10);
}
