import axios from 'axios';
import React, { Component } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import { Table } from 'reactstrap';
import { Container, Form, FormHeader, View, InputText, FormLabel } from './styles';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Button, Col, Row, Input } from 'reactstrap';
// import './lista';


class Body extends Component {
  state = {
    searchCity: {
      city: null,
      currentPage: 1,
      maxPage: 1,
      ubss: [],
      count: 0,
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
    this.setState({ searchCity: { ...this.state.searchCity,  count: 0, ubss: [], currentPage: 1, maxPage: 1, city: e.target.value } })
  }

  doSearchByCity = () => {
    const url = "http://api-ldc-hackathon.herokuapp.com/api/ubs/city/";
    const objToPost = { city: this.state.searchCity.city, page: this.state.searchCity.currentPage };

    axios.post(url, objToPost)
      .then(({ data }) => {
        const maxPage = data._metadata.page.split(' ')[2]
        const count = data._metadata.total_count
        this.setState({ searchCity: { ...this.state.searchCity, ubss: data.records, count, maxPage: parseInt(maxPage) } });
      }
      ).catch(error => {
        this.setState({ searchCity: { ...this.state.searchCity, ubss: [], maxPage: 1 } })
      })
  }

  doSearchByCoords = (e) => {
    e.preventDefault()
    const url = `http://localhost:8000/ubs/?format=json&lat=${this.state.searchCoords.lat}&lon=${this.state.searchCoords.long}`;
    console.log(url);
    axios.get(url)
      .then(({ data }) => {
        this.setState({ searchCoords: { ...this.state.searchCoords, ubss: data } })
      }
      ).catch(error => {
        this.setState({ searchCoords: { ...this.state.searchCoords, ubss: [] } })
      })
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
            <FormHeader>Certifique-se de separar maiúscula e minúscula</FormHeader>
            <Form>
              <Row form>
                <Col md={8}>
                  <Input type="text" value={this.state.searchCity.city} onChange={this.onChangeCity} />
                  {/* <select id="lista_estados"></select>
              <select id="lista_cidades"></select> */}
                </Col>
                <Col md={4}>
                  <Button size="lg" color="secondary" onClick={this.doSearchByCity} > Buscar </Button>
                </Col>
              </Row>
              <h3>Exibindo {this.state.searchCity.count} items</h3>
              {this.state.searchCity.ubss.length > 0
                && <Table striped>
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Nome</th>
                      <th>Endereço</th>
                      <th>CEP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.searchCity.ubss.map(item =>
                      <tr key={item.cod_cnes}>
                        <th scope="row">{item.cod_cnes}</th>
                        <td>{item.nom_estab}</td>
                        <td>{item.dsc_endereco}</td>
                        <td>{item.co_cep}</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              }
              {this.state.searchCity.currentPage > 1 && <Button onClick={() => this.movePage(this.state.searchCity.currentPage - 1)}>Prev</Button>}
              {this.state.searchCity.currentPage < this.state.searchCity.maxPage && <Button onClick={() => this.movePage(this.state.searchCity.currentPage + 1)}>Next</Button>}
              {/* </div> */}
            </Form>
          </TabPanel>
          <TabPanel>
            <FormHeader>Insira os valores de latitude e longitude no formato XX,YY</FormHeader>
            <Form>
              <FormLabel>Longitude</FormLabel>
              <InputText
                type="number"
                placeholder="Longitude"
                value={this.state.searchCoords.long}
                onChange={e => this.setState({ searchCoords: { ubss: [], lat: this.state.searchCoords.lat, long: e.target.value } })}
              />
              <FormLabel>Latitude</FormLabel>
              <InputText
                type="number"
                placeholder="Latitude"
                value={this.state.searchCoords.lat}
                onChange={e => this.setState({ searchCoords: { ubss: [], lat: e.target.value, long: this.state.searchCoords.long } })}
              />
              <Button onClick={this.doSearchByCoords} type="button" size={'lg'}>Buscar</Button>
              <Table striped>
                <thead>
                  <tr>
                    <th>Cod</th>
                    <th>Name</th>
                    <th>Endereço</th>
                    <th>Cep</th>
                    <th>Cidade</th>
                    <th>Distância</th>
                    <th>Rota</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.searchCoords.ubss.length ? this.state.searchCoords.ubss.map(item =>
                  <tr key={item.cod_cnes}>
                    <th scope="row">{item.cod_cnes}</th>
                    <td>{item.nom_estab}</td>
                    <td>{item.dsc_endereco}</td>
                    <td>{item.co_cep}</td>
                    <td>{item.dsc_cidade}</td>
                    <td>{item.distancia} km</td>
                    <td><a href={`https://www.google.com/maps/dir/${this.state.searchCoords.lat},${this.state.searchCoords.long}/${item.latitude},${item.longitude}/`}>Rota</a></td>
                  </tr>
                  ) : (
                    <tr>
                      <td colSpan={6}>Não foi encontrado resultado</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Form>
          </TabPanel>
        </Tabs>
        <Map
          ref={(ref) => this._map = ref}
          google={this.props.google}
          initialCenter={{
            lat: -23.2384429,
            lng: -45.9252880
          }}
          zoom={10}
          onClick={this.onMapClicked}
          style={{width: 500, height: 500, position: 'relative'}}
        >
          {this.state.searchCity.ubss.map(item => (
            <Marker
              title={'The marker`s title will appear as a tooltip.'}
              name={'SOMA'}
              position={{lat: item.vlr_latitude, lng: item.vlr_longitude}} />
          ))}
        </Map>
      </Container>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyDLe7faycXCbSAPOykyIeqjhfDjGxwZInE")
})(Body)