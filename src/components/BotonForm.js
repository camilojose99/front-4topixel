import React, {Component} from "react";
import {NavLink} from "react-router-dom";

class BotonForm extends Component{
    render() {
        return(
            <nav className="level">
                <div className="level-left">
                    <div className="level-item">
                        <p className="level-item">
                            <NavLink to="/form"><button className="button is-success">
                            <i className="far fa-address-book"></i> Nuevo cliente</button></NavLink></p>
                    </div>

                </div>
            </nav>
        )
    }
}

export default BotonForm;
