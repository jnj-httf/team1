import axios from "axios";
import React, { Component } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import { Table } from 'reactstrap';
import { Button, Container, Form, FormHeader, InputText } from './styles';



class Body extends Component {
  state = {
    long: null,
    lat: null,
    city: null,
    cities: [],
    ubss: []
  }

  componentDidMount() {
    this.setState({ cities: [{ name: 'SJC', cod: 1 }, { name: 'JAC', cod: 2 }] })
  }
  onChangeCity = (e) => {
    this.setState({ city: e.target.value })
  }

  doSearchByCity = () => {
    const url = "http://api-ldc-hackathon.herokuapp.com/api/ubs/city/";
    axios.post(url, { city: this.state.city, page: 1 }, { "Access-Control-Allow-Origin": true })
      .then(response => {
        this.setState({ ubss: response.data.records })
      }
      ).catch(error => {
        console.log(error)
      })
  }

  doSearchByCoords = () => {
    const url = "http://api/";
    const objPost = { vlr_longitude: this.state.long, vlr_latitude: this.state.lat };
    axios.post(url, objPost, { "Access-Control-Allow-Origin": true })
      .then(response => {
        this.setState({ ubss: response.data.records })
      }
      ).catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <Container>
        <Tabs>
          <TabList>
<<<<<<< HEAD
            <Tab>Busca por cidades</Tab>
=======
            <Tab>Busca por município</Tab>
>>>>>>> 92f8ae5194d60ad33d986a30117639f09743a9ad
            <Tab>Busca por coordenadas</Tab>
          </TabList>

          <TabPanel>
            <Form>
              <InputText type="text" value={this.state.city} onChange={e => this.setState({ city: e.target.value })} />
              <Button onClick={this.doSearch} >Buscar</Button>

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
                  {this.state.ubss.map(item =>
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
          <TabPanel>
            <Form>
              <InputText type="number" placeholder="Longitude" value={this.state.long} onChange={e => this.setState({ long: e.target.value })} />
              <InputText type="number" placeholder="Latitude" value={this.state.lat} onChange={e => this.setState({ lat: e.target.value })} />
              <Button onClick={this.doSearchByCoords}>Buscar</Button>
              <List>
                {this.state.ubss.map(item => <li>{item.nom_estab}, {item.dsc_endereco}, {item.co_cep}</li>)}
              </List>
            </Form>
          </TabPanel>
        </Tabs>


      </Container>

      //Tela 1 (pesquisa por cidade)
    );
  }
}

export default Body