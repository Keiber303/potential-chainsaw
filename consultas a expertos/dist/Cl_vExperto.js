import Cl_mExperto from "./Cl_mExperto.js";
import Cl_vGeneral from "./tools/Cl_vGeneral.js";
import { opcionFicha } from "./tools/core.tools.js";
export default class Cl_vExperto extends Cl_vGeneral {
    constructor() {
        super({ formName: "experto" });
        this.opcion = null;
        this.experto = new Cl_mExperto({ id: null, creadoEl: null, alias: null, nombre: "", area: "", cargo: "" });
        this.lblOpcion = this.crearHTMLLabelElement("lblOpcion", {
            refresh: () => (this.lblOpcion.innerHTML =
                this.opcion === opcionFicha.add ? "Registrar" : "Editar"),
        });
        this.inId = this.crearHTMLInputElement("id", {
            oninput: () => {
                this.inId.value = this.experto.id = this.inId.value
                    .toUpperCase()
                    .trim();
                this.refresh();
            },
            refresh: () => (this.inId.style.borderColor = this.experto.idOk ? "" : "red"),
        });
        this.inId.disabled = this.opcion === opcionFicha.edit;
        this.inNombre = this.crearHTMLInputElement("inNombre", {
            oninput: () => {
                this.inNombre.value = this.experto.nombre = this.inNombre.value
                    .trim()
                    .toUpperCase();
                this.refresh();
            },
            refresh: () => (this.inNombre.style.borderColor = this.experto.nombreOk ? "" : "red"),
        });
        this.inArea = this.crearHTMLInputElement("inArea", {
            oninput: () => {
                this.inArea.value = this.experto.area = this.inArea.value
                    .trim()
                    .toUpperCase();
                this.refresh();
            },
            refresh: () => (this.inArea.style.borderColor = this.experto.areaOk ? "" : "red"),
        });
        this.inCargo = this.crearHTMLInputElement("inCargo", {
            oninput: () => {
                this.inCargo.value = this.experto.cargo = this.inCargo.value
                    .trim()
                    .toUpperCase();
                this.refresh();
            },
            refresh: () => (this.inCargo.style.borderColor = this.experto.cargoOk ? "" : "red"),
        });
        this.btAceptar = this.crearHTMLButtonElement("btAceptar", {
            onclick: () => this.aceptar(),
            refresh: () => (this.btAceptar.disabled = this.experto.expertoOk !== true),
        });
        this.btCancelar = this.crearHTMLButtonElement("btCancelar", {
            onclick: () => {
                if (this.controlador)
                    this.controlador.activarVista({ vista: "expertos" });
            },
        });
    }
    aceptar() {
        if (this.opcion === opcionFicha.add)
            this.controlador.addExperto({
                dtExperto: this.experto.toJSON(),
                callback: (error) => {
                    if (!error)
                        this.controlador.activarVista({ vista: "expertos" });
                    else
                        alert(`Error al guardar: ${error}`);
                }
            });
        else {
            this.controlador.editExperto({
                dtExperto: this.experto.toJSON(),
                callback: (error) => {
                    if (!error)
                        this.controlador.activarVista({ vista: "expertos" });
                    else
                        alert(`Error al guardar: ${error}`);
                }
            });
        }
    }
    show({ ver, experto: experto, opcion, } = {
        ver: false,
        experto: new Cl_mExperto({ id: null, creadoEl: null, alias: null, nombre: "", area: "", cargo: "" }),
    }) {
        super.show({ ver });
        if (opcion) {
            this.opcion = opcion;
            this.experto.id = this.inId.value = this.experto.id;
            this.experto.area = this.inArea.value = experto.area;
            this.experto.cargo = this.inCargo.value = experto.cargo;
            this.experto.nombre = this.inNombre.value = experto.nombre;
            this.refresh();
        }
    }
}
