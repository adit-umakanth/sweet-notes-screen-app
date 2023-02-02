// Credit: Copy of Adafruit library converted to Javascript using: https://extendsclass.com/python-to-javascript.html

export function wrapTextToLines(string, max_chars) {
  /*wrap_text_to_lines function
    A helper that will return a list of lines with word-break wrapping
     :param str string: The text to be wrapped
    :param int max_chars: The maximum number of characters on a line before wrapping
     :return: A list of lines where each line is separated based on the amount
    of ``max_chars`` provided
    :rtype: List[str]
    */
  var the_line, the_lines, words;
  string = string.replace("\n", "").replace("\r", "");
  words = string.split(" ");
  the_lines = [];
  the_line = "";

  for (
    var w, _pj_c = 0, _pj_a = words, _pj_b = _pj_a.length;
    _pj_c < _pj_b;
    _pj_c += 1
  ) {
    w = _pj_a[_pj_c];

    if ((the_line + " " + w).length <= max_chars) {
      the_line += " " + w;
    } else {
      if (!the_line && w.length === max_chars) {
        the_lines.push(w);
      } else {
        the_lines.push(the_line);
        the_line = "" + w;
      }
    }
  }

  if (the_line) {
    the_lines.push(the_line);
  }

  while (!the_lines[0]) {
    delete the_lines[0];
  }

  if (the_lines[0][0] === " ") {
    the_lines[0] = the_lines[0].slice(1);
  }

  return the_lines;
}
