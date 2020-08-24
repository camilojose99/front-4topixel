import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import Global from "../Global";

class Table extends Component{

    url = Global.url;

    state = {
        clientes: [],
        status: null
    }

    componentWillMount() {
         this.getClientes()
    }

    getClientes = () => {
        axios.get(this.url)
            .then(res => {
                this.setState({
                    clientes: res.data,
                    status: 'success'
                })
                console.log(this.state)
            });
    };

    deleteCliente = (id) => {
        axios.delete(this.url+id)
            .then(res => {
                this.setState({
                    clientes: res.data,
                    status: 'deleted'
                })
            });
        alert('Cliente eliminado')
    }

    render() {
        if (this.state.status === 'deleted'){
            return <Link to="/"/>
        };
        if (this.state.clientes.length >= 1){

            const listClientes = this.state.clientes.map((cliente) => {
                return (
                    <tr key={cliente.id}>
                        <td>{cliente.identificacion}</td>
                        <td>{cliente.primer_nombre +' '+cliente.primer_apellido}</td>
                        <td>{cliente.email}</td>
                        <td>{cliente.telefono}</td>
                        <td>{cliente.direccion}</td>
                        <td>
                            <Link to={'/cliente/'+cliente.id}>
                            <button className="button">
                            <span className="icon is-small has-text-info">
                    <i className="far fa-eye"></i>
                  </span>
                        </button>
                            </Link>
                            <Link to={'/edit/'+cliente.id}>
                            <button className="button">
                  <span className="icon is-small has-text-warning">
                    <i className="far fa-edit"></i>
                  </span>
                            </button>
                            </Link>
                            <button className="button" onClick={
                                () => {
                                    this.deleteCliente(cliente.id)
                                }
                            }>
                  <span className="icon is-small has-text-danger">
                    <i className="far fa-trash-alt"></i>
                  </span>
                            </button>
                        </td>
                    </tr>
                )
            });

            return(
                <div className="container">
<section class="notification card">
                    <div className="columns">

                        <div className="column">
                            <table className="table is-full">
                                <thead>
                                <tr>
                                    <th><abbr title="identificacion">identificación</abbr></th>
                                    <th><abbr title="nombre">Nombre</abbr></th>
                                    <th>Email</th>
                                    <th>Teléfono</th>
                                    <th>Dirección</th>
                                    <th>
                                        Acciones
                                    </th>
                                </tr>
                                </thead>
                                <tfoot>
                                <tr>
                                    <th><abbr title="identificacion">identificación</abbr></th>
                                    <th><abbr title="nombre">Nombre</abbr></th>
                                    <th>Email</th>
                                    <th>Teléfono</th>
                                    <th>Dirección</th>
                                    <th>
                                        Acciones
                                    </th>
                                </tr>
                                </tfoot>
                                <tbody>
                                {listClientes}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    </section>
                </div>

            );
        }else if(this.state.clientes.length === 0 && this.state.status === 'success'){
            return (
                <div>
                    <h1>No hay Clientes</h1>
                </div>
            )
        }else {
            return (
                <div>
                    <h1>Cargando Clientes...</h1>
                </div>
            )
        }


    }
}
export default Table;
