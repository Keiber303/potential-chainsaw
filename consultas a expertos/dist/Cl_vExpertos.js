import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";
import { opcionFicha } from "./tools/core.tools.js";
export default class Cl_vExpertos extends Cl_vGeneral {
    constructor() {
        super({ formName: "expertos" });
        this.btagregar = this.crearHTMLButtonElement("btagregar", {
            onclick: () => this.addExperto(),
        });
        this.bteditar = this.crearHTMLButtonElement("bteditar", {
            onclick: () => this.editExperto(1),
        });
        this.bteliminar = this.crearHTMLButtonElement("bteliminar", {
            onclick: () => this.deleteExperto(1),
        });
        this.btVolver = this.crearHTMLButtonElement("btVolver", {
            onclick: () => this.controlador.activarVista({ vista: "expertos" }),
        });
        this.divExpertos = this.crearHTMLElement("divExpertos", {
            type: tHTMLElement.CONTAINER,
            refresh: () => this.mostrarExpertos(),
        });
    }
    mostrarExpertos() {
        this.divExpertos.innerHTML = "";
        let expertos = this.controlador.dtExpertos;
        if (!expertos)
            return;
        expertos.forEach((experto, index) => (this.divExpertos.innerHTML += `<tr>
                <td>${experto.id}</td>
                <td>${experto.nombre}</td>
                <td>${experto.area}</td>
                <td>
                    <button class="btAccion" data-id="${index}" data-accion="editar">✏️</button>
                    <button class="btAccion" data-id="${index}" data-accion="eliminar">🗑️</button>
                </td>
            </tr>`));
        expertos.forEach((experto, index) => {
            this.crearHTMLButtonElement(`btEditar${index}`, {
                onclick: () => this.editExperto(experto.id),
            });
            this.crearHTMLButtonElement(`btEliminar${index}`, {
                onclick: () => this.deleteExperto(experto.id),
            });
        });
    }
    addExperto() {
        this.controlador.activarVista({
            vista: "experto",
            opcion: opcionFicha.add,
        });
    }
    editExperto(id) {
        var _a;
        let experto = (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.experto(id);
        if (experto)
            this.controlador.activarVista({
                vista: "experto",
                opcion: opcionFicha.edit,
                object: experto,
            });
    }
    deleteExperto(id) {
        var _a;
        if (confirm(`¿Seguro que desea eliminar el experto con id ${id}?`))
            (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.deleteExperto({
                id,
                callback: (error) => {
                    if (error)
                        alert(`No se pudo eliminar el experto: ${id}.\n${error}`);
                    else
                        this.mostrarExpertos();
                },
            });
    }
    show({ ver }) {
        super.show({ ver });
        if (ver)
            this.mostrarExpertos();
    }
}
