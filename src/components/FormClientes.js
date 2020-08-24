import React, {Component} from 'react';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';
import Global from "../Global";
import SimpleReactValidator from "simple-react-validator";

class FormClientes extends Component{

    url = Global.url;

    primerNombreRef = React.createRef();
    segundoNombreRef = React.createRef();
    primerApellidoRef = React.createRef();
    segundoApellidoRef = React.createRef();
    tipoIdentificacionRef = React.createRef();
    identificacionRef = React.createRef();
    direccionRef = React.createRef();
    telefonoRef = React.createRef();
    emailRef = React.createRef();
    ocupacionRef = React.createRef();
    departamentoRef = React.createRef();
    municipioRef = React.createRef();

    state = {
      clientes: {},
      status: null,
    };

    componentWillMount() {
        this.validator = new SimpleReactValidator();
    }

    changeState = () => {
        this.setState({
           clientes: {
               primer_nombre: this.primerNombreRef.current.value,
               segundo_nombre: this.segundoNombreRef.current.value,
               primer_apellido:  this.primerApellidoRef.current.value,
               segundo_apellido: this.segundoApellidoRef.current.value,
               tipo_identificacion: this.tipoIdentificacionRef.current.value,
               identificacion: this.identificacionRef.current.value,
               direccion: this.direccionRef.current.value,
               telefono: this.telefonoRef.current.value,
               email: this.emailRef.current.value,
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
            axios.post(this.url, this.state.clientes)
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
<div className="container pb-5">

    <div className="columns">
        <div className="column">
            <h3>Crear Clientes</h3>
        </div>
    </div>

    <section class="notification card pb-5 mb-5">
        <div className="column px-1">

            <form onSubmit={this.saveCliente} className="">
                <div className="columns">
                    <div className="column">
                        <div className="field">
                            <label className="label">Tipo de identificación</label>
                            <div className="control">
                                <div className="select is-full">
                                    <select id="tipo_identificacion" name="tipo_identificacion" ref={this.tipoIdentificacionRef} onChange={this.changeState}>
                                        <option disabled defaultValue>Seleccione el tipo de identificación</option>
                                        <option>CC</option>
                                        <option>RC</option>
                                        <option>TI</option>
                                        <option>AS</option>
                                        <option>MS</option>
                                        <option>PA</option>
                                    </select>
                                </div>
                            </div>
                            {this.validator.message('tipo_identificacion',this.state.clientes.tipo_identificacion,'required')}

                        </div>
                    </div>
                    <div className="column">
                        <div className="field">
                            <label className="label">Identificación</label>
                            <div className="control">
                                <input className="input" type="number" placeholder="Digite número de identificación"
                                       id="identificacion" name="identificacion" ref={this.identificacionRef} onChange={this.changeState}/>
                            </div>
                            <p className="help">Solo numeros, sin puntos ni comas.</p>
                            {this.validator.message('identificacion',this.state.clientes.identificacion,'required|numeric|min:0')}
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column">
                        <div className="field">
                            <label className="label">Primer nombre</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Digite su primer nombre"
                                       id="primer_nombre" name="primer_nombre" ref={this.primerNombreRef} onChange={this.changeState}/>
                            </div>
                            {this.validator.message('primer_nombre',this.state.clientes.primer_nombre,'required|alpha|min:3|max:30')}

                        </div>
                    </div>
                    <div className="column">
                        <div className="field">
                            <label className="label">Segundo nombre</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Digite su segundo nombre"
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
                                <input className="input" type="text" placeholder="Digite su primer apellido"
                                       id="primer_apellido" name="primer_apellido" ref={this.primerApellidoRef} onChange={this.changeState}/>
                            </div>
                            {this.validator.message('primer_apellido',this.state.clientes.primer_apellido,'required|alpha|min:3|max:30')}
                        </div>
                    </div>
                    <div className="column">
                        <div className="field">
                            <label className="label">Segundo apellido</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Digite su segundo apellido"
                                       id="segundo_apellido" name="segundo_apellido" ref={this.segundoApellidoRef} onChange={this.changeState}/>
                            </div>
                            {this.validator.message('segundo_apellido',this.state.clientes.segundo_apellido,'alpha|max:30')}
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Dirección</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Digite su dirección de residencia"
                               id="direccion" name="direccion" ref={this.direccionRef} onChange={this.changeState}/>
                    </div>
                    {this.validator.message('direccion',this.state.clientes.direccion,'required|string|min:3|max:125')}

                </div>

                <div className="columns">
                    <div className="column">
                        <div className="field">
                            <label className="label">Teléfono</label>
                            <div className="control">
                                <input className="input" type="number" placeholder="Digite su número de teléfono"
                                       id="telefono" name="telefono" ref={this.telefonoRef} onChange={this.changeState}/>
                            </div>
                            {this.validator.message('telefono',this.state.clientes.telefono,'required|numeric|min:0')}
                        </div>
                    </div>
                    <div className="column">
                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control">
                                <input className="input" type="email" placeholder="example@mail.com" id="email"
                                       name="email" ref={this.emailRef} onChange={this.changeState}/>
                            </div>
                        </div>
                        {this.validator.message('email', this.state.clientes.email, 'required|email')
                        }
                    </div>
                </div>

                <div className="columns">
                    <div className="column">
                        <div className="field">
                            <label className="label">Ocupación</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Ocupación" id="ocupacion"
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
                                    <select id="departamento" name="departamento" ref={this.departamentoRef} onChange={this.changeState}>
                                        <option disabled selected>Seleccione Departamento</option>
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
                                    <select id="municipio" name="municipio" ref={this.municipioRef} onChange={this.changeState}>
                                        <option disabled selected>Seleccione Municipio</option>
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
        </div>
    </section>
    </div>
        );
    }
}
export default FormClientes;
