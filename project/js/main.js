let countryInput = document.getElementById('country'),
    searchBtn = document.getElementById('submitBtn'),
    flag = document.querySelector('.country-info img'),
    commonName = document.querySelector('h1.country-name'),
    fulName = document.querySelector('p.country-name'),
    curr = document.querySelector('span.country-currency'),
    sym = document.querySelector('span.currency-symbol'),
    cap = document.querySelector('span.country-capital'),
    lan = document.querySelector('span.country-lang'),
    p = document.querySelector('span.country-population'),
    search = document.querySelector('section.search'),
    c = document.querySelector('section.country');

searchBtn.onclick = async () => {
    if (countryInput.value != '') {
        const country = countryInput.value
        const [name, fullName, capital, currency, currencySymbol, flagSrc, lang, pop] = await fetchData(country);
        flag.src = flagSrc
        commonName.innerHTML = name
        fulName.innerHTML = fullName == undefined ? '' : fullName;
        curr.innerHTML = currency
        sym.innerHTML = currencySymbol
        cap.innerHTML = capital
        lan.innerHTML = lang
        p.innerHTML = pop
        search.classList.add('d-none')
        c.classList.remove('d-none')
    }
}
const fetchData = async (country) => {
    let res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    let data = await res.json();
    return [
        data[0].name.common,
        data[0].altSpellings[1],
        data[0].capital[0],
        Object.values(Object.values(data[0].currencies)[0])[0],
        Object.values(Object.values(data[0].currencies)[0])[1],
        data[0].flags.svg,
        Object.values(data[0].languages)[0],
        data[0].population
    ]
}
document.getElementById('returnToSearch').onclick = () => {
    countryInput.value = ""
    c.classList.add('d-none')
    search.classList.remove('d-none')
}