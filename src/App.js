/***********************************************************************************************************
                                                WEBAPP DOCO 0.0
************************************************************************************************************
07-09-22 (MR)
************************************************************************************************************
-FUNCIONALITAT:
  -El codi fa petites modificacions de https://stackblitz.com/edit/export-data-to-csv-react?file=AsyncCSV.js
  -Usuari pot introduir una ID d'una màquina per a obtindre un .csv de tots els esdeveniments del tipus 
   dispens d'aquella màquina
  -El .csv queda ordenat cronològicament per defecte

-POSSIBLES MILLORES:
  -La búsqueda és poc eficient perquè es realitza primer un scan de tota la DB i llavors es filtra, 
   teòricament podríem fer un query per ID i ja ens retornaria directament les dades de la DB que necessitem
*/
import React, { useState } from "react";
import "@aws-amplify/ui-react/styles.css";
import { API } from "aws-amplify";
import { CSVLink } from "react-csv";
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";
import AsyncCSV from './AsyncCSV'

function App({ signOut }) {
  
  const [id, setId] = useState('');
  let dbFiltrada = []; 
  
  async function obtenirEventsId() {
    console.log("Executant obtenirEventsId()");
    if(id == '') return;
    const idN = Number(id);
	const dbScanned = await API.get('intentapi','/pets/ID'); 
	//De API.get:(nom API, path) Path l'hem establert com a /pets, pero al estar a DDB afegim la Partition Key
	console.log(idN);
	dbFiltrada = dbScanned.filter(item => item.ID === idN && item.Type === 'Disp');
	console.log(dbFiltrada);
  }
  
  
  return (
    <View className="App">
      <header className="App-header">
	    <Heading level={2}>WebApp DoCo 0.0</Heading>
		<p>
		  Introdueix ID d'una Màquina per a obtenir la informació de les seves dispensacions
		  <AsyncCSV/>
		</p>  
	
	  </header>
	  <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
}


export default withAuthenticator(App)

