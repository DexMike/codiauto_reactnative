// const someCommonValues = ['common', 'values'];

// export const doSomethingWithInput = (theInput) => {
//    //Do something with the input
//    return theInput;
// };

export const moneyFormatter = (
  amount = 0,
  decimal = ".",
  decimalCount = 2,
  thousands = ",",
  prefix = "$ ",
  sufix = ""
) => {
  let returnVal = "";
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
      const negativeSign = amount < 0 ? "-" : "";
      const amounDec = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount), 0);
      const i = amounDec.toString();
      const j = (i.length > 3) ? i.length % 3 : 0;
      returnVal = prefix + negativeSign
        + (j ? i.substr(0, j) + thousands : "")
        + i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousands}`)
        + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "")
        + sufix;
    } catch (e) {
      // console.log(e);
      return "0";
    }
    return returnVal;
};

export const pass = (len) => {
  var length = (len) ? (len) : (10);
    var string = "abcdefghijklmnopqrstuvwxyz"; //to upper 
    var numeric = "0123456789";
    var punctuation = "!@#$%^&*()_+~`|}{[]\:;?><,./-=";
    var password = "";
    var character = "";
    var crunch = true;
    while ( password.length < length ) {
        const entity1 = Math.ceil(string.length * Math.random() * Math.random());
        const entity2 = Math.ceil(numeric.length * Math.random() * Math.random());
        const entity3 = Math.ceil(punctuation.length * Math.random() * Math.random());
        let hold = string.charAt( entity1 );
        hold = (password.length % 2 == 0) ? (hold.toUpperCase()) : (hold);
        character += hold;
        character += numeric.charAt( entity2 );
        character += punctuation.charAt( entity3 );
        password = character;
    }
    password = password.split("").sort(function(){return 0.5 - Math.random();}).join("");
    return password.substr(0,len);
};

export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
