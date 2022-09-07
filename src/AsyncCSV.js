import React, { Component } from 'react';
import { CSVLink } from "react-csv";
import { API } from "aws-amplify";

//Dia Actual per al titol del .csv
const actual = new Date();
let day = actual.getDate();
let month = actual.getMonth() + 1;
let year = actual.getFullYear();

const date = `${year}_${month<10?`0${month}`:`${month}`}_${day<10?`0${day}`:`${day}`}`;

//Definim els headers per a obtenir el .csv ordenat
const headers = [
  { label: "ID", key: "ID" },
  { label: "Date", key: "Date" },
  { label: "Type", key: "Disp" },
  { label: "Concentrat", key: "Concentrat" }
];

class AsyncCSV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
	this.idCerca = '';
    this.csvLinkEl = React.createRef();
  }

  getUserList = () => {
    return API.get('intentapi','/pets/ID')
	  .then(res => {
	        //console.log(res);
			const idN = Number(this.idCerca);
	        const resFiltrada = res.filter(item => item.ID === idN && item.Type === 'Disp');
		    console.log(resFiltrada);
		    return resFiltrada;
			}
	   );
  }

  downloadReport = async () => {
    if(this.idCerca == ''){
	  console.log("No farem res");
	  return;
	}
    const data = await this.getUserList();
	//console.log(data);
    this.setState({ data: data }, () => {
      setTimeout(() => {
        this.csvLinkEl.current.link.click();
      });
    });
  }

  render() {
	const { data } = this.state;
    
    return (
      <div>
	    <input
        onChange={e => this.idCerca = e.target.value}
        placeholder="ID"
        />
        <input type="button" value="Obtenir Dades Facturació" onClick={this.downloadReport} />
        <CSVLink
		  headers={headers}
          filename={"Facturació_"+date+".csv"}
          data={data}
          ref={this.csvLinkEl}
        />
      </div>
    );
  }
}

export default AsyncCSV;