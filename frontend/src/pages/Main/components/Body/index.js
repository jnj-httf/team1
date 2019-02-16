import axios from "axios";
import React, { Component } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import { Table } from 'reactstrap';
import { Button, Container, Form, FormHeader, InputText } from './styles';



class Body extends Component {
  state = {
    searchCity: {
      city: null,
      currentPage: 1,
      maxPage: 1,
      ubss: [],
    },
    searchCoords: {
      currentPage: 1,
      maxPage: 1,
      ubss: [],
      long: 0,
      lat: 0,
    },
  }

  componentDidMount() {
    this.setState({ cities: [{ name: 'SJC', cod: 1 }, { name: 'JAC', cod: 2 }] });

    navigator.geolocation.getCurrentPosition(({ coords }) => {
      this.setState({
        searchCoords: {
          ...this.state.searchCoords,
          lat: coords.latitude,
          long: coords.longitude,
        }
      })
    })
  }

  onChangeCity = (e) => {
    this.setState({ searchCity: { ...this.state.searchCity, city: e.target.value } })
  }

  doSearchByCity = () => {
    const url = "http://api-ldc-hackathon.herokuapp.com/api/ubs/city/";
    const objToPost = { city: this.state.searchCity.city, page: this.state.searchCity.currentPage };
    
    axios.post(url, objToPost , { "Access-Control-Allow-Origin": true })
      .then(({ data }) => {
        const maxPage = data._metadata.page.split(' ')[2]
        console.log(parseInt(maxPage))
        this.setState({ searchCity: { ...this.state.searchCity, ubss: data.records, maxPage: parseInt(maxPage) }})
      }
      ).catch(error => {
        console.log(error)
      })
  }

  doSearchByCoords = () => {
    // const url = `http://api?format=json&lat=${this.state.searchCoords.lat}&long=${this.state.searchCoords.long}`;
    // axios.get(url)
    //   .then(({ data }) => {
    //     this.setState({ searchCoords: { ubss: data.records } })
    //   }
    //   ).catch(error => {
    //     console.log(error)
    //   })
    
    const mockUBS = [{
      "vlr_latitude": "-19.9212491512293",
      "vlr_longitude": "-43.9948368072497",
      "cod_munic": "310620",
      "cod_cnes": "23868",
      "nom_estab": "CENTRO DE SAUDE DOM CABRAL",
      "dsc_endereco": "PRC DA COMUNIDADE",
      "dsc_bairro": "DOM CABRAL",
      "dsc_cidade": "Belo Horizonte",
      "dsc_telefone": "3132778400",
      "dsc_estrut_fisic_ambiencia": "Desempenho mediano ou  um pouco abaixo da média",
      "dsc_adap_defic_fisic_idosos": "Desempenho mediano ou  um pouco abaixo da média",
      "dsc_equipamentos": "Desempenho mediano ou  um pouco abaixo da média",
      "dsc_medicamentos": "Desempenho muito acima da média",
      "co_cep": "30535210"
    },
    {
      "vlr_latitude": "-19.8307514190668",
      "vlr_longitude": "-43.8676786422717",
      "cod_munic": "310620",
      "cod_cnes": "2708302",
      "nom_estab": "CENTRO DE SAUDE CAPITAO EDUARDO",
      "dsc_endereco": "RUA HUM",
      "dsc_bairro": "CAPITAO EDUARDO",
      "dsc_cidade": "Belo Horizonte",
      "dsc_telefone": "3132777846",
      "dsc_estrut_fisic_ambiencia": "Desempenho muito acima da média",
      "dsc_adap_defic_fisic_idosos": "Desempenho muito acima da média",
      "dsc_equipamentos": "Desempenho acima da média",
      "dsc_medicamentos": "Desempenho muito acima da média",
      "co_cep": "31998360"
    },
    {
      "vlr_latitude": "-19.8019230365747",
      "vlr_longitude": "-43.9366865158068",
      "cod_munic": "310620",
      "cod_cnes": "23701",
      "nom_estab": "CENTRO DE SAUDE JAQUELINE",
      "dsc_endereco": "RUA AGENOR DE PAULA ESTRELA",
      "dsc_bairro": "JAQUELINE",
      "dsc_cidade": "Belo Horizonte",
      "dsc_telefone": "32775490",
      "dsc_estrut_fisic_ambiencia": "Desempenho muito acima da média",
      "dsc_adap_defic_fisic_idosos": "Desempenho acima da média",
      "dsc_equipamentos": "Desempenho acima da média",
      "dsc_medicamentos": "Desempenho muito acima da média",
      "co_cep": "31748190"
    },
    ]
    this.setState({ searchCoords: { ubss: mockUBS } })
  }

  movePage = (page) => {
    this.setState({ searchCity: { ...this.state.searchCity, currentPage: page } }, () => {
      this.doSearchByCity();
    });
  }

  render() {
    return (
      <Container>
        <Tabs>
          <TabList>
            <Tab>Busca por cidades</Tab>
            <Tab>Busca por coordenadas</Tab>
          </TabList>

          <TabPanel>
            <Form>
              <InputText type="text" value={this.state.searchCity.city} onChange={this.onChangeCity} />
              <Button onClick={this.doSearchByCity}>Buscar</Button>
              <Table striped>
                <thead>
                  <tr>
                    <th>Cod</th>
                    <th>Name</th>
                    <th>Endereço</th>
                    <th>Cep</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.searchCity.ubss.map(item =>
                  <tr>
                    <th scope="row">{item.cod_cnes}</th>
                    <td>{item.nom_estab}</td>
                    <td>{item.dsc_endereco}</td>
                    <td>{item.co_cep}</td>
                  </tr>
                  )}
                </tbody>
              </Table>
              {this.state.searchCity.currentPage > 1 && <Button onClick={() => this.movePage(this.state.searchCity.currentPage - 1)}>Prev</Button>}
              {this.state.searchCity.currentPage < this.state.searchCity.maxPage && <Button onClick={() => this.movePage(this.state.searchCity.currentPage + 1)}>Next</Button>}
            </Form>
          </TabPanel>
          <TabPanel>
            <Form>
              <InputText type="number" placeholder="Longitude" value={this.state.searchCoords.long} onChange={e => this.setState({ searchCoords: { long: e.target.value } })} />
              <InputText type="number" placeholder="Latitude" value={this.state.searchCoords.lat} onChange={e => this.setState({ searchCoords: { lat: e.target.value } })} />
              <Button onClick={this.doSearchByCoords}>Buscar</Button>
              <Table striped>
                <thead>
                  <tr>
                    <th>Cod</th>
                    <th>Name</th>
                    <th>Endereço</th>
                    <th>Cep</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.searchCoords.ubss.map(item =>
                  <tr>
                    <th scope="row">{item.cod_cnes}</th>
                    <td>{item.nom_estab}</td>
                    <td>{item.dsc_endereco}</td>
                    <td>{item.co_cep}</td>
                  </tr>
                  )}
                </tbody>
              </Table>
            </Form>
          </TabPanel>
        </Tabs>


      </Container>

      //Tela 1 (pesquisa por cidade)
    );
  }
}

export default Body