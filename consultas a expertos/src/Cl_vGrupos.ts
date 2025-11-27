import { iConsulta } from "./Cl_mConsulta.js";
import Cl_vGeneral, { tHTMLElement } from "./tools/Cl_vGeneral.js";
import { opcionFicha } from "./tools/core.tools.js";

interface iOpcionGrupo {
    add: HTMLButtonElement;
    edit: HTMLButtonElement;
    delete: HTMLButtonElement;
}


export default class Cl_vGrupos extends Cl_vGeneral {
    private btPreguntar: HTMLButtonElement;
    private btSalir: HTMLButtonElement;
    private divConsultas: HTMLDivElement;

    constructor(){
        super({ formName: "grupos" });
        this.btPreguntar = this.crearHTMLButtonElement("preguntar",{
            onclick: () => this.addConsulta(),
        });
        this.btSalir = this.crearHTMLButtonElement("salir",{
            onclick: () => this.controlador?.activarVista({ vista: "administrador" }),
        });
        this.divConsultas = this.crearHTMLElement("consultas",{
            type: tHTMLElement.CONTAINER,
            refresh: () => this.mostrarConsultas(),
        }) as HTMLDivElement;
    }
    mostrarConsultas() {
        this.divConsultas.innerHTML = "";
        let consultas = this.controlador?.dtConsultas;
        if(!consultas) return;
        consultas.forEach(
            (consulta: iConsulta, index: number) => 
            (this.divConsultas.innerHTML += `<tr>
                <td>${consulta.pregunta}</td>
                <td>${consulta.expertoId}</td>
                <td>${consulta.respuesta}</td>
                <td>
                    <button class="btAccion" data-id="${consulta.id}" data-accion="ver">👀</button>
                </td>
            </tr>`)
        );
        consultas.forEach((consulta: iConsulta, index: number) => {
            this.crearHTMLButtonElement(`ver${index}`,{
                onclick: () => this.controlador?.activarVista({ vista: "consulta", }),
            })
        });
    }
    addConsulta() {
        this.controlador?.activarVista({
             vista: "consulta",
             opcion: opcionFicha.add,
            });
    }
editConsulta(expertoId: number) {
        let consulta = this.controlador?.consulta(expertoId);
        if(consulta)
            this.controlador?.activarVista({
                vista: "consulta",
                opcion: opcionFicha.edit,
            });
    }
    show({ver}: {ver: boolean}): void {
        super.show({ver});
        if(ver) this.mostrarConsultas();
    }

}