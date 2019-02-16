import React, { Component } from 'react';
import { Container, Form, InputText, Button, FormHeader, List } from './styles';
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

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
            <Tab>Busca por município</Tab>
            <Tab>Busca por coordenadas</Tab>
          </TabList>

          <TabPanel>
            <Form>
              <InputText type="text" value={this.state.city} onChange={e => this.setState({ city: e.target.value })} />
              <Button onClick={this.doSearchByCity}>Buscar</Button>
              <List>
                {this.state.ubss.map(item => <li>{item.nom_estab}, {item.dsc_endereco}, {item.co_cep}</li>)}
              </List>
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