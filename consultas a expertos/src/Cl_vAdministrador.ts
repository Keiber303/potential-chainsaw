import Cl_controlador from "./Cl_controlador.js";
import Cl_mExperto from "./Cl_mExperto.js";
import Cl_vExperto from "./Cl_vExperto.js";
import Cl_vExpertos from "./Cl_vExpertos.js";
import Cl_mConsulta from "./Cl_mConsulta.js";
import Cl_vGrupo from "./Cl_vGrupo.js";
import Cl_vGrupos from "./Cl_vGrupos.js";
import Cl_vGeneral from "./tools/Cl_vGeneral.js";
import { opcionFicha } from "./tools/core.tools.js";

export default class Cl_vAdministrador extends Cl_vGeneral {
    private vExpertos: Cl_vExpertos;
    private vGrupos: Cl_vGrupos;
    private vExperto: Cl_vExperto;
    private vGrupo: Cl_vGrupo;
    private btAdministrador: HTMLButtonElement;
    private btExpertos: HTMLButtonElement;
    private btGrupos: HTMLButtonElement;
    private lblExpertos: HTMLLabelElement;
    private lblGrupos: HTMLLabelElement;

constructor(){
    super({ formName: "Administrador" });
    this.vExpertos = new Cl_vExpertos();
    this.vExpertos.show({ ver: false });
    this.vGrupos = new Cl_vGrupos();
    this.vGrupos.show({ ver: false });
    this.vExperto = new Cl_vExperto();
    this.vExperto.show({ ver: false });
    this.vGrupo = new Cl_vGrupo();
    this.vGrupo.show({ ver: false });
    this.btExpertos = this.crearHTMLButtonElement("btExpertos", {
        onclick: () => this.controlador!.activarVista({ vista: "expertos" }),
    });
    this.btGrupos = this.crearHTMLButtonElement("btGrupos", {
        onclick: () => this.controlador!.activarVista({ vista: "grupos" }),
    });
    this.btAdministrador = this.crearHTMLButtonElement("btAdministrador", {
        onclick: () => this.controlador!.activarVista({ vista: "sistema" }),
    });
    this.lblExpertos = this.crearHTMLLabelElement("lblExpertos", {
        refresh: () => {}
    });
    this.lblGrupos = this.crearHTMLLabelElement("lblGrupos", {
        refresh: () => {}
    });
}
set controlador(controlador: Cl_controlador) {
    super.controlador = controlador;
    this.vExpertos.controlador = controlador;
    this.vGrupos.controlador = controlador;
    this.vExperto.controlador = controlador;
    this.vGrupo.controlador = controlador;
}
get controlador(): Cl_controlador | null {
    return super.controlador;
}
activarVista({
    vista,
    opcion,
    objeto,
}: {
    vista: string;
    opcion?: opcionFicha;
    objeto?: Cl_mExperto;
}): void {
    this.show({ ver: vista === "sistema"});
    this.vExpertos.show({ ver: vista === "expertos" });
    this.vGrupos.show({ ver: vista === "grupos" });
    this.vExperto.show({ ver: vista === "experto", experto: objeto, opcion });
    this.vGrupo.show({ ver: vista === "grupo",});
}
}