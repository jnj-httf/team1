import React, { Component } from 'react';
import { Container, Form, InputText, Button, FormHeader, List } from './styles';
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

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
            <Tab>Title 1</Tab>
            <Tab>Title 2</Tab>
          </TabList>

          <TabPanel>
            <Form>
              <FormHeader className="title1">Busca por nome de cidade</FormHeader>
              <InputText type="text" value={this.state.city} onChange={e => this.setState({ city: e.target.value })} />
              <Button onClick={this.doSearch} >Buscar</Button>
              <List>
                {this.state.ubss.map(item => <li>{item.nom_estab}, {item.dsc_endereco}, {item.co_cep}</li>)}
              </List>
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