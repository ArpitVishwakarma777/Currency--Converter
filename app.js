const Base_URL =
  "https://v6.exchangerate-api.com/v6/a361d5167580b3fbbd91cfaf/latest/USD";

const slt = document.querySelectorAll(".select-container select");
for (let select of slt) {
  for (country in countryList) {
    let newOption = document.createElement("option");

    newOption.innerHTML = country;

    newOption.value = country;
    // console.log("1", country);
    // console.log("2", newOption.value);
    if (select.id === "from" && country === "USD") {
      newOption.selected = "selected";
    } else if (select.id === "to" && country === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (e) => {
    changeFlag(e.target);
    // console.log(e.target);
  });
}
function changeFlag(element) {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  const img = element.parentElement.querySelector("img");
  //console.log(a);
  img.src = newSrc;
}
document.querySelector(".btn").addEventListener("click", () => {
  ExchangeRate();
});

async function ExchangeRate() {
  let fromSelect = document.getElementById("from");
  let FromSValue = fromSelect.value;
  let URL = `https://v6.exchangerate-api.com/v6/a361d5167580b3fbbd91cfaf/latest/${FromSValue}`;
  let respones = await fetch(URL);
  let data = await respones.json();
  // console.log(data);
  let toSelect = document.getElementById("to");
  let toSValue = toSelect.value;
  console.log(toSValue);
  for (currKey in data.conversion_rates) {
    if (currKey === toSValue) {
      let temp = data.conversion_rates;
      let rate = temp[toSValue];
      //   console.log(rate);
      output(rate, FromSValue, toSValue);
    }
  }
}

function output(rate, fromV, toS) {
  let input = document.querySelector("#inn").value;
  let calcu = (rate * input);
  let print = `${input} ${fromV} = ${calcu.toFixed(5)} ${toS}`;
  document.querySelector(".msg").innerHTML = print;
}