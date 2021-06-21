let test = "8x5%";
let result = test.match(/(\-*x*\+*\/*[123.4567890%]+)/g);
console.log(result);
for (let i = 0; i < result.length; i++) {
  if (result[i][result[i].length - 1] == "%") {
    let operator = "";
    if (result[i][0] == "/" || result[i][0] == "x") {
      operator = result[i][0];
      result[i] = result[i].slice(1);
    }

    result[i] = parseFloat(result[i].slice(0, [result[i].length - 1])) / 100;
    result[i] = operator + result[i];
  }
  if (result[i][0] == "+" || result[i][0] == "-" || !isNaN(result[i][0])) {
    result[i] = parseFloat(result[i]);
  }
}
function count(array) {
  let i = 0;
  while (typeof array[i] != "string" && array[i] != null) {
    i++;
  }
  if (array[i] == null) {
    return array;
  }

  if (String(array[i])[0] == "x") {
    array[i - 1] = array[i - 1] * parseFloat(array[i].slice(1));

    array.splice(i, 1);
  } else if (String(array[i])[0] == "/") {
    array[i - 1] = array[i - 1] / parseFloat(array[i].slice(1));
    array.splice(i, 1);
  }
  return count(array);
}
result = count(result);
result = result.reduce((a, b) => a + b, 0);
console.log(result);
