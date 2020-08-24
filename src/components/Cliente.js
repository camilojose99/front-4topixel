import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from 'axios';
import Global from "../Global";

class Cliente extends Component{

    url = Global.url;

    state = {
        cliente: {},
        status: null
    };

    componentWillMount() {
        this.getCliente();
    }

    getCliente = () => {
      var id = this.props.match.params.id;

      axios.get(this.url+id)
          .then(res=> {
             this.setState({
                 cliente: res.data,
                 status: 'success'
             });
          })
          .catch(err => {
              this.setState({
                  cliente: false,
                  status: 'success'
              });
          });
    };

    render() {
        var cliente = this.state.cliente;
        return(

            <div>
                {cliente &&
                <div className="container">
                    <nav className="level">
                        <div className="level-left">
                            <div className="level-item">
                                <p className="level-item">
                                    <Link to="/"><button className="button is-success">
                                        <i className="far fa-home"></i>Volver</button></Link></p>
                            </div>

                        </div>
                    </nav>
                    <section className="notification card has-text-left">
                        <div className="columns">
                            <div className="column">
                                <h1 className="has-text-weight-bold">Datos del cliente</h1>
                            </div>
                        </div>

                        <div className="columns">
                            <div className="column">
                                <div className="media">
                                    <div className="media-content">
                                        {cliente.segundo_nombre !== null && cliente.segundo_apellido !== null ?(
                                            <p className="title is-4">{cliente.primer_nombre+' '+ cliente.segundo_nombre+' '+cliente.primer_apellido+' '+cliente.segundo_apellido}</p>
                                        ) : cliente.segundo_nombre !== null && cliente.segundo_apellido === null ? (
                                            <p className="title is-4">{cliente.primer_nombre+' '+ cliente.segundo_nombre+' '+cliente.primer_apellido}</p>
                                        ): cliente.segundo_nombre === null && cliente.segundo_apellido !== null ? (
                                            <p className="title is-4">{cliente.primer_nombre+' '+cliente.primer_apellido+' '+cliente.segundo_apellido}</p>
                                        ) : (
                                            <p className="title is-4">{cliente.primer_nombre+' '+cliente.primer_apellido}</p>
                                        )
                                        }
                                        <p className="subtitle is-6">{cliente.identificacion}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="columns">
                            <div className="column">
                                <h5 className="has-text-weight-bold">Primer Nombre</h5>
                                <p>{cliente.primer_nombre}</p>
                            </div>
                            <div className="column">
                                <h5 className="has-text-weight-bold">Segundo Nombre</h5>
                                {cliente.segundo_nombre === null ?( <p>No tiene</p> ): (<p>{cliente.segundo_nombre}</p>)}
                            </div>
                            <div className="column">
                                <h5 className="has-text-weight-bold">Primer Apellido</h5>
                                <p>{cliente.primer_apellido}</p>
                            </div>
                            <div className="column">
                                <h5 className="has-text-weight-bold">Segundo Apellido</h5>
                                {cliente.segundo_apellido === null ?( <p>No tiene</p> ): (<p>{cliente.segundo_apellido}</p>)}
                            </div>
                        </div>

                        <div className="columns">
                            <div className="column">
                                <h5 className="has-text-weight-bold">Tipo de identificación</h5>
                                <p>{cliente.tipo_identificacion}</p>
                            </div>
                            <div className="column">
                                <h5 className="has-text-weight-bold">Número de identificación</h5>
                                <p>{cliente.identificacion}</p>
                            </div>
                            <div className="column">
                                <h5 className="has-text-weight-bold">Email</h5>
                                <p>{cliente.email}</p>
                            </div>

                            <div className="column">
                                <h5 className="has-text-weight-bold">Teléfono</h5>
                                <p>{cliente.telefono}</p>
                            </div>
                        </div>

                        <div className="columns">
                            <div className="column">
                                <h5 className="has-text-weight-bold">Dirección</h5>
                                <p>{cliente.direccion}</p>
                            </div>
                            <div className="column">
                                <h5 className="has-text-weight-bold">Departamento</h5>
                                <p>{cliente.departamentos_id}</p>
                            </div>
                            <div className="column">
                                <h5 className="has-text-weight-bold">Municipio</h5>
                                <p>{cliente.municipios_id}</p>
                            </div>

                            <div className="column">
                                <h5 className="has-text-weight-bold">Ocupación</h5>
                                <p>{cliente.ocupacion}</p>
                            </div>
                        </div>

                        </section>

                </div>
                }
                {!cliente && this.state.status === 'success' &&
                <h1>No existe el registro</h1>
                }
                {this.state.status === 'null' &&
                <h1>Cargando el registro...</h1>
                }
            </div>

        )
    }

}

export default Cliente;
