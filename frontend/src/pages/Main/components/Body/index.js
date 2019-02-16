import React, { Component, Fragment } from 'react';
import { } from './styles';
import axios from "axios";

class Body extends Component {
  state = {
    ufs: [
      {
        uf: 'SP',
        name: 'São Paulo'
      },
      {
        uf: 'RJ',
        name: 'Rio de Janeiro'
      }
    ],
    city: null,
    cities: [],
    ubss: []
  }

  componentDidMount() {
    console.log('test')
    this.setState({
      cities: [
        {
          name: 'SJC',
          cod: 1
        },
        {
          name: 'JAC',
          cod: 2
        },
      ]
    })
  }

  onChangeUF = (e) => {
    console.log(e.target.value);
  }

  onChangeCity = (e) => {
    this.setState({ city: e.target.value })
  }

  doSearch = () => {    
    const url = "http://api-ldc-hackathon.herokuapp.com/api/ubs/city/";    
    axios.post(url, { city: this.state.city, page: 1 }, { "Access-Control-Allow-Origin": true })
      .then(response => {
        this.setState({ubss:response.data.records})
      }
      ).catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <Fragment>
        <div>
          {/* <select onChange={this.onChangeUF}>
            {this.state.ufs.map(item => <option value={this.state.uf} >{item.name}</option>)}
          </select> */}
          <h1 className="title1">Busca por nome de cidade</h1>
          <input type="text" value={this.state.city} onChange={this.onChangeCity} />
          <button onClick={this.doSearch} >Buscar</button>
          <div>
            {this.state.ubss.map(item=><p>{item.cod_cnes}</p>)}
          </div>
        </div>
        <div>
          <h1 className="title2">Busca por coordenadas</h1>
          <input type="" value={this.state.city} onChange={this.onChangeCity} />
          <button onClick={this.doSearch} >Buscar</button>
        </div>
      </Fragment>

      //Tela 1 (pesquisa por cidade)
    );
  }
}

export default Body