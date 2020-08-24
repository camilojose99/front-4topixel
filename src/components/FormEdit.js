import React, {Component} from 'react';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';
import Global from "../Global";
import SimpleReactValidator from "simple-react-validator";

class FormEdit extends Component{

    url = Global.url;

    clienteId = null;

    primerNombreRef = React.createRef();
    segundoNombreRef = React.createRef();
    primerApellidoRef = React.createRef();
    segundoApellidoRef = React.createRef();
    direccionRef = React.createRef();
    telefonoRef = React.createRef();
    ocupacionRef = React.createRef();
    departamentoRef = React.createRef();
    municipioRef = React.createRef();

    state = {
        clientes: {},
        status: null,
    };

    componentWillMount() {
        this.clienteId = this.props.match.params.id;
        this.getCliente(this.clienteId);
        this.validator = new SimpleReactValidator();
    }

    getCliente = (id) =>{
        axios.get(this.url+id)
            .then(res => {
                this.setState({
                    clientes: res.data,
                })
            })
    }

    changeState = () => {
        this.setState({
            clientes: {
                primer_nombre: this.primerNombreRef.current.value,
                segundo_nombre: this.segundoNombreRef.current.value,
                primer_apellido:  this.primerApellidoRef.current.value,
                segundo_apellido: this.segundoApellidoRef.current.value,
                direccion: this.direccionRef.current.value,
                telefono: this.telefonoRef.current.value,
                ocupacion: this.ocupacionRef.current.value,
                departamentos_id: this.departamentoRef.current.value,
                municipios_id:this.municipioRef.current.value
            }
        });
    }

    saveCliente = (e) =>{
        e.preventDefault();
        this.changeState();
        if (this.validator.allValid()) {
            axios.put(this.url+this.clienteId, this.state.clientes)
                .then(res => {
                    if (res.data) {
                        this.setState({
                            clientes: res.data,
                            status: 'success'
                        })
                    } else {
                        this.setState({
                            status: 'failed'
                        })
                    }
                })
        }else {
            this.setState({
                status: 'failed'
            })
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    /* changeMuni = (e) =>{
             console.log(e.target.value)
             this.setState({
                 departamento: e.target.value
             });
         axios.get(this.url+'municipio/'+this.state.departamento)
             .then(res => {
                 if (res.data){
                     this.setState({
                         municipios: res.data,
                     })
                 }else {
                     this.setState({
                         status:'failed'
                     })
                 }
             })
     }*/


    render() {
        if (this.state.status === 'success'){
            return <Redirect to="/"/>
        };
        return (
            <div className="container">

                <div className="columns">
                    <div className="column">
                        <h3>Editar Cliente</h3>
                    </div>
                </div>


                <div className="column px-1">
                    {this.state.clientes &&
                    <form onSubmit={this.saveCliente} className="">

                        <div className="columns">
                            <div className="column">
                                <div className="field">
                                    <label className="label">Primer nombre</label>
                                    <div className="control">
                                        <input className="input" defaultValue={this.state.clientes.primer_nombre} type="text" placeholder="Digite su primer nombre"
                                               id="primer_nombre" name="primer_nombre" ref={this.primerNombreRef} onChange={this.changeState}/>
                                    </div>
                                    {this.validator.message('primer_nombre',this.state.clientes.primer_nombre,'required|alpha|min:3|max:30')}

                                </div>
                            </div>
                            <div className="column">
                                <div className="field">
                                    <label className="label">Segundo nombre</label>
                                    <div className="control">
                                        <input className="input" defaultValue={this.state.clientes.segundo_nombre}type="text" placeholder="Digite su segundo nombre"
                                               id="segundo_nombre" name="segundo_nombre" ref={this.segundoNombreRef} onChange={this.changeState}/>
                                    </div>
                                </div>
                                {this.validator.message('segundo_nombre',this.state.clientes.segundo_nombre,'alpha|max:30')}

                            </div>
                        </div>

                        <div className="columns">
                            <div className="column">
                                <div className="field">
                                    <label className="label">Primer apellido</label>
                                    <div className="control">
                                        <input className="input" defaultValue={this.state.clientes.primer_apellido} type="text" placeholder="Digite su primer apellido"
                                               id="primer_apellido" name="primer_apellido" ref={this.primerApellidoRef} onChange={this.changeState}/>
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field">
                                    <label className="label">Segundo apellido</label>
                                    <div className="control">
                                        <input className="input" defaultValue={this.state.clientes.segundo_apellido} type="text" placeholder="Digite su segundo apellido"
                                               id="segundo_apellido" name="segundo_apellido" ref={this.segundoApellidoRef} onChange={this.changeState}/>
                                    </div>
                                    {this.validator.message('segundo_apellido',this.state.clientes.segundo_apellido,'alpha|max:30')}
                                </div>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Dirección</label>
                            <div className="control">
                                <input className="input" defaultValue={this.state.clientes.direccion} type="text" placeholder="Digite su dirección de residencia"
                                       id="direccion" name="direccion" ref={this.direccionRef} onChange={this.changeState}/>
                            </div>
                            {this.validator.message('direccion',this.state.clientes.direccion,'required|string|min:3|max:125')}

                        </div>

                        <div className="columns">
                            <div className="column">
                                <div className="field">
                                    <label className="label">Teléfono</label>
                                    <div className="control">
                                        <input className="input" defaultValue={this.state.clientes.telefono} type="number" placeholder="Digite su número de teléfono"
                                               id="telefono" name="telefono" ref={this.telefonoRef} onChange={this.changeState}/>
                                    </div>
                                    {this.validator.message('telefono',this.state.clientes.telefono,'required|numeric|min:0')}
                                </div>
                            </div>

                        </div>

                        <div className="columns">
                            <div className="column">
                                <div className="field">
                                    <label className="label">Ocupación</label>
                                    <div className="control">
                                        <input className="input" defaultValue={this.state.clientes.ocupacion} type="text" placeholder="Ocupación" id="ocupacion"
                                               name="ocupacion" ref={this.ocupacionRef} onChange={this.changeState}/>
                                    </div>
                                    {this.validator.message('ocupacion',this.state.clientes.ocupacion,'string|max:100')}

                                </div>
                            </div>
                            <div className="column">
                                <div className="field">
                                    <label className="label">Departamento</label>
                                    <div className="control">
                                        <div className="select">
                                            <select id="departamento"  name="departamento" ref={this.departamentoRef} onChange={this.changeState}>
                                                <option disabled defaultValue={this.state.clientes.departamentos_id}>Seleccione Departamento</option>
                                                <option value="1">Bolívar</option>
                                                <option value="2">Atlántico</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field">
                                    <label className="label">Municipio</label>
                                    <div className="control">
                                        <div className="select">
                                            <select id="municipio"  name="municipio" ref={this.municipioRef} onChange={this.changeState}>
                                                <option disabled defaultValue={this.state.clientes.municipios_id}>Seleccione Municipio</option>
                                                <option value="1">Cartagena</option>
                                                <option value="2">Barranquilla</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="field is-grouped">
                            <div className="control">
                                <button type="submit" className="button is-link">Guardar cliente</button>
                            </div>
                            <div className="control">
                                <Link to="/">
                                    <button  className="button is-link is-danger">Cancelar operación</button>
                                </Link>
                            </div>
                        </div>


                    </form>
                    }
                    {!this.state.clientes &&
                        <h1> Cargando...</h1>
                    }

                </div>
            </div>
        );
    }
}
export default FormEdit;
