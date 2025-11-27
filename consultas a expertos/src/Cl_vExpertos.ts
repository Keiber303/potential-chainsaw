import { iExperto } from "./Cl_mExperto";  // Importa la interfaz iExperto
import Cl_vGeneral, { tHTMLElement }  from "./tools/Cl_vGeneral.js";
import { opcionFicha } from "./tools/core.tools.js";

interface iOpcionExperto {
    add: () => HTMLButtonElement | null;
    edit: () => HTMLButtonElement | null;
    delete: () => HTMLButtonElement | null;
}

export default class Cl_vExpertos extends Cl_vGeneral {
    private btagregar: HTMLButtonElement;
    private bteditar: HTMLButtonElement;
    private bteliminar: HTMLButtonElement;
    private btVolver: HTMLButtonElement;
    private divExpertos: HTMLDivElement;

    constructor () {
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
            onclick: () => this.controlador!.activarVista({ vista: "expertos" }),
        });
        this.divExpertos = this.crearHTMLElement("divExpertos", {
            type: tHTMLElement.CONTAINER,
            refresh: () => this.mostrarExpertos(),
        })as HTMLDivElement;
    }

    mostrarExpertos() {
        this.divExpertos.innerHTML = "";
        let expertos = this.controlador!.dtExpertos;
        if (!expertos) return;
        expertos.forEach(
            (experto: iExperto, index: number) => 
            (this.divExpertos.innerHTML += `<tr>
                <td>${experto.id}</td>
                <td>${experto.nombre}</td>
                <td>${experto.area}</td>
                <td>
                    <button class="btAccion" data-id="${index}" data-accion="editar">✏️</button>
                    <button class="btAccion" data-id="${index}" data-accion="eliminar">🗑️</button>
                </td>
            </tr>`)
        );
        expertos.forEach((experto: iExperto, index: number) =>{
            this.crearHTMLButtonElement(`btEditar${index}`, {
                onclick: () => this.editExperto(experto.id as number),
            });
            this.crearHTMLButtonElement(`btEliminar${index}`, {
                onclick: () => this.deleteExperto(experto.id as number),
            });
        });
    }
    addExperto() {
        this.controlador!.activarVista({
            vista: "experto",
            opcion: opcionFicha.add,
        });
    }
    editExperto(id: number) {
        let experto = this.controlador?.experto(id);
        if (experto)
            this.controlador!.activarVista({
                vista: "experto",
                opcion: opcionFicha.edit,
                object: experto,
            });
    }
    deleteExperto(id: number) {
        if (confirm(`¿Seguro que desea eliminar el experto con id ${id}?`)) 
            this.controlador?.deleteExperto({
                id,
                callback: (error) => {
                    if (error)
                        alert(`No se pudo eliminar el experto: ${id}.\n${error}`);
                    else
                        this.mostrarExpertos();
                },
            });
        }
        show({ver}: {ver: boolean}) {
            super.show({ ver });
            if (ver) 
                this.mostrarExpertos();
        }
    }