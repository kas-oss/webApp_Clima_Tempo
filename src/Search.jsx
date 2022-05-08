import {useState} from 'react';
import './css/Search.css';

function Search(props) {

  const[cidade, setCidade] = useState("");

  function searchInput(e) {
    e.preventDefault();
    let currentValue = document.querySelector('input[name=searchInput]').value;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentValue}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
      const {main, name, sys, weather} = data;

      if(sys != undefined) {
        if(weather != undefined) {
          const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
                        weather[0]["icon"]}.svg`;
          setCidade(`
            <div class="containerCidade">
              <h3></h3>
              <p>Temperatura: ${main.temp} °C</p>
              <p>País: ${sys.country}</p>
              <p>Cidade: ${name}</p>
              <p>${weather[0]['description']}</p>
              <img src="${icon}" />
            </div>
          `);
        }
      }else{
        setCidade("");
      }
    })
  }

  return (
    <div className="searchWraper">
   
      <div className="search">
        <span>Clima & Tempo</span>
        <h2>Qual cidade você deseja consultar?</h2>
        <form onSubmit={(e)=>searchInput(e)}>
          <input type="text" name="searchInput" placeholder={props.placeholder} />
          <button type="submit">Consultar</button>
        </form>
      </div>

    {
      (cidade!= "")?

      <div dangerouslySetInnerHTML={{__html: cidade}} />:

      <div></div>

    }
    </div>
  )

}

export default Search;