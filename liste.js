
window.addEventListener('load', ()=>{

    let countrySelect = document.getElementById('countriesSelect');
    let departementDiv = document.getElementById('departments');
    let citiesDiv = document.getElementById('cities');
    let cityInfo = document.getElementById('cityinfos');

    // select eventlisteners
    countrySelect.addEventListener('change', showDepartements);

    // la page est chargée: aller chercher la liste des pays
    fetchCountries();

    /**
     * Makes AJAX request when the page is loaded to fetch 
     * the list of countries from the database
     */
    function fetchCountries()
    {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "requestController.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        let params = 'action=getcountries';
       
        xhr.onreadystatechange = function()
        {
            if(xhr.readyState === 4 && xhr.status === 200){
                                
                let countries = JSON.parse(xhr.responseText);

                for (let i = 0; i < countries.length; i++)
                {
                    const country = countries[i];

                    let option = document.createElement('option');
                    option.innerText = country.pays_nom;
                    option.value = country.pays_id;
                    countrySelect.appendChild(option);
                }
            } 
        }

        xhr.onerror = function()
        {
            console.log('erreur de connexion');   
        }
        
        xhr.send(params);
    }


    /**
     * Fetch the list of departments in the country when the user selects a country
     * @param {*} e 
     */
    function showDepartements(e)
    {
        let countryId = e.target.value;
                
        let departementsSelect = document.createElement('select');
        departementsSelect.addEventListener('change', showCity);

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "requestController.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        let params = 'action=getdepartments&id='+countryId;
    
        xhr.onload = function()
        {
            if(xhr.status === 200)
            {                                
                let departements = JSON.parse(xhr.responseText);

                let option = document.createElement('option');
                option.innerHTML = 'Choisir un département';
                option.value = '';
                departementsSelect.appendChild(option);

                for (let i = 0; i < departements.length; i++)
                {
                    const departement = departements[i];

                    let option = document.createElement('option');
                    option.innerHTML = departement.departement_nom;
                    option.value = departement.departement_code;
                    departementsSelect.appendChild(option);
                }
            } 
        }

        xhr.onerror = function()
        {
            console.log('erreur de connexion');
        }

        if (departementDiv.childElementCount > 0) {
            departementDiv.removeChild(departementDiv.firstChild);
        }
       
        departementDiv.appendChild(departementsSelect);
        xhr.send(params);
    }



    function showCity(e)
    {
        let cityId = e.target.value;
                
        let citySelect = document.createElement('select');
        citySelect.addEventListener('change', displaycityinfo);
    
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "requestController.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        let params = 'action=getcities&id='+cityId;
    
        xhr.onload = function()
        {
            if(xhr.status === 200)
            {            
                let cities = JSON.parse(xhr.responseText);

                let option = document.createElement('option');
                    option.innerHTML = 'Choisir une ville';
                    option.value = '';
                    citySelect.appendChild(option);
                
                for (let i = 0; i < cities.length; i++) {
                    const city = cities[i];

                    let option = document.createElement('option');
                    option.innerHTML = city.ville_nom_reel;
                    option.value = city.ville_id;
                    
                    // remplir les options comme il faut
                    citySelect.appendChild(option);
                }
            } 
        }

        xhr.onerror = function(){
            console.log('erreur de connexion');
        }
        if (citiesDiv.childElementCount > 0)
        {
            citiesDiv.removeChild(citiesDiv.firstChild);
        }

        citiesDiv.appendChild(citySelect);
        xhr.send(params);
    }


    function displaycityinfo(e)
    {
        let cityId = e.target.value;
                
        
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "requestController.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        let params = 'action=showcity&id='+cityId;
    
        xhr.onload = function()
        {
            if(xhr.status === 200)
            {            
                let city = JSON.parse(xhr.responseText);
                console.log(city);

                //let ul = document.createElement('ul');
                //let li = document.createElement('li');
                let p = document.createElement('p');
                p.innerHTML = '<strong> Nom : </strong>' + city.ville_nom_reel + '<br>' +
                              '<strong> Departement : </strong>' + city.ville_departement + '<br>' +
                              '<strong> Code postale : </strong>' + city.ville_code_postal + '<br>' +
                              '<strong> Population : </strong>' + city.ville_population + ' habitants<br>' +
                              '<strong> Surface : </strong>' + city.ville_surface + 'km2<br>' ;
                              
                if (cityInfo.childElementCount !== 0) {
                    cityInfo.removeChild(cityInfo.firstChild);
                }
                
                cityInfo.appendChild(p);

                console.log(cityInfo.childElementCount);
            } 
        }

        xhr.onerror = function(){
            console.log('erreur de connexion');
        }

        xhr.send(params);
    }
}); // end of onload