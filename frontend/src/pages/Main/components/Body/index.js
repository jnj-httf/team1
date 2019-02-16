import axios from "axios";
import React, { Component } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import { Table } from 'reactstrap';
import { Container, Form, FormHeader, View } from './styles';
import { Button, Col, Row, Input } from 'reactstrap';
import './lista';



class Body extends Component {
  state = {
    search: {
      city: null,
      currentPage: 1,
      maxPage: 1,
      ubss: [],
    },
    long: null,
    lat: null,
    city: null,
    cities: [],
    page: 1,
  }

  componentDidMount() {
    this.setState({ cities: [{ name: 'SJC', cod: 1 }, { name: 'JAC', cod: 2 }] })
  }

  onChangeCity = (e) => {
    this.setState({ search: { ...this.state.search, city: e.target.value } })
  }

  doSearchByCity = () => {
    const url = "http://api-ldc-hackathon.herokuapp.com/api/ubs/city/";
    const objToPost = { city: this.state.search.city, page: this.state.search.currentPage };
    console.log(this.state); 
    
    axios.post(url, objToPost , { "Access-Control-Allow-Origin": true })
      .then(({ data }) => {
        const maxPage = data._metadata.page.split(' ')[2]
        console.log(parseInt(maxPage))
        this.setState({ search: { ...this.state.search, ubss: data.records, maxPage: parseInt(maxPage) }})
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

  movePage = (page) => {
    this.setState({ search: { ...this.state.search, currentPage: page } }, () => {
      this.doSearchByCity();
    });
  }

  // new statesCitiesBR({
  //   states: {
  //     elementID: "lista_estados",
  //     defaultOption: "Selecione um Estado"
  //   },
  //   cities: {
  //     elementID: "lista_cidades",
  //     state: "auto",
  //     defaultOption: "Selecione uma Cidade"
  //   }
  // });

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
              <Row form>
              <Col md = {8}>
              <Input type="text" value={this.state.search.city} onChange={this.onChangeCity} />
              {/* <select id="lista_estados"></select>
              <select id="lista_cidades"></select> */}
              </Col>
              <Col md = {4}>
              <Button size="lg" color="secondary" onClick={this.doSearchByCity} > Buscar </Button>
              </Col>
              </Row>
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
                  {this.state.search.ubss.map(item =>
                  <tr>
                    <th scope="row">{item.cod_cnes}</th>
                    <td>{item.nom_estab}</td>
                    <td>{item.dsc_endereco}</td>
                    <td>{item.co_cep}</td>
                  </tr>
                  )}
                </tbody>
              </Table>
              <div>
              {this.state.search.currentPage > 1 && <Button size="lg" onClick={() => this.movePage(this.state.search.currentPage - 1)}>Prev</Button>};
              {this.state.search.currentPage < this.state.search.maxPage && <Button size="lg" onClick={() => this.movePage(this.state.search.currentPage + 1)}>Next</Button>}
              </div>
            </Form>
          </TabPanel>
          <TabPanel>
            <Form>
              <Input type="number" placeholder="Longitude" value={this.state.long} onChange={e => this.setState({ long: e.target.value })} />
              <Input type="number" placeholder="Latitude" value={this.state.lat} onChange={e => this.setState({ lat: e.target.value })} />
              <Button onClick={this.doSearchByCoords}>Buscar</Button>
            </Form>
          </TabPanel>
        </Tabs>


      </Container>

      //Tela 1 (pesquisa por cidade)
    );
  }
}

export default Body