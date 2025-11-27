import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";
import { opcionFicha } from "./tools/core.tools.js";
export default class Cl_vGrupos extends Cl_vGeneral {
    constructor() {
        super({ formName: "grupos" });
        this.btPreguntar = this.crearHTMLButtonElement("preguntar", {
            onclick: () => this.addConsulta(),
        });
        this.btSalir = this.crearHTMLButtonElement("salir", {
            onclick: () => { var _a; return (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.activarVista({ vista: "administrador" }); },
        });
        this.divConsultas = this.crearHTMLElement("consultas", {
            type: tHTMLElement.CONTAINER,
            refresh: () => this.mostrarConsultas(),
        });
    }
    mostrarConsultas() {
        var _a;
        this.divConsultas.innerHTML = "";
        let consultas = (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.dtConsultas;
        if (!consultas)
            return;
        consultas.forEach((consulta, index) => (this.divConsultas.innerHTML += `<tr>
                <td>${consulta.pregunta}</td>
                <td>${consulta.expertoId}</td>
                <td>${consulta.respuesta}</td>
                <td>
                    <button class="btAccion" data-id="${consulta.id}" data-accion="ver">👀</button>
                </td>
            </tr>`));
        consultas.forEach((consulta, index) => {
            this.crearHTMLButtonElement(`ver${index}`, {
                onclick: () => { var _a; return (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.activarVista({ vista: "consulta", }); },
            });
        });
    }
    addConsulta() {
        var _a;
        (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.activarVista({
            vista: "consulta",
            opcion: opcionFicha.add,
        });
    }
    editConsulta(expertoId) {
        var _a, _b;
        let consulta = (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.consulta(expertoId);
        if (consulta)
            (_b = this.controlador) === null || _b === void 0 ? void 0 : _b.activarVista({
                vista: "consulta",
                opcion: opcionFicha.edit,
            });
    }
    show({ ver }) {
        super.show({ ver });
        if (ver)
            this.mostrarConsultas();
    }
}
