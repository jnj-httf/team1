import axios from "axios";
import React, { Component } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import { Table } from 'reactstrap';
import { Button, Container, Form, FormHeader, InputText } from './styles';



class Body extends Component {
  state = {
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

  doSearch = () => {
    const url = "http://api-ldc-hackathon.herokuapp.com/api/ubs/city/";
    axios.post(url, { city: this.state.city, page: 1 }, { "Access-Control-Allow-Origin": true })
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
            <Tab>Busca por cidades</Tab>
            <Tab>Busca por coordenadas</Tab>
          </TabList>

          <TabPanel>
            <Form>
              <FormHeader className="title1">Busca por nome de cidade</FormHeader>
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
              {/* <List>
                {this.state.ubss.map(item => <li>{item.nom_estab}, {item.dsc_endereco}, {item.co_cep}</li>)}
              </List> */}
            </Form>
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
        </Tabs>


      </Container>

      //Tela 1 (pesquisa por cidade)
    );
  }
}

export default Body