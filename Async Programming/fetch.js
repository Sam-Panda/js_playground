const myHeaders = new Headers();
myHeaders.append("apikey", "322CdNl3L21IrgSG5R1o9bWOL5MST76C");

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

try {
  const result = await fetch("https://api.apilayer.com/exchangerates_data/latest?base=USD", requestOptions);
  const resultObj = await result.json();
  console.log(JSON.stringify(resultObj, null, 2));
} catch(err) {
  console.error(`Could not fetch currency data`);
  throw err;
}