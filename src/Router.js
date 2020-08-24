import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import FormClientes from "./components/FormClientes";
import Table from "./components/Table";
import Error from "./components/Error";
import BotonForm from "./components/BotonForm";
import Cliente from "./components/Cliente";
import FormEdit from "./components/FormEdit";

class Router extends Component{

    render() {
        return(
          <BrowserRouter>

                  <section className="card has-text-left">

              <Switch>
                  <Route exact path="/" render={(props)=>{
                      return(
                          <div className="container">
                              <BotonForm/>

                              <Table/>
                          </div>
                      )
                  }}/>
                  <Route exact path="/cliente/:id" component={Cliente}/>
                  <Route exact path="/form" render={(props)=>{
                      return(
                          <FormClientes/>
                      )
                  }}/>
                  <Route exact path="/edit/:id" component={FormEdit}/>

                  <Route component={Error}></Route>
              </Switch>
                  </section>
          </BrowserRouter>
        );
    }

}

export default Router;
