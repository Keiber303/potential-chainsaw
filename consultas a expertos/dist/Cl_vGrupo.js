import Cl_mConsulta from "./Cl_mConsulta.js";
import Cl_vGeneral from "./tools/Cl_vGeneral.js";
import { opcionFicha } from "./tools/core.tools.js";
export default class Cl_vGrupo extends Cl_vGeneral {
    constructor() {
        super({ formName: "consulta" });
        this.opcion = null;
        this.consulta = new Cl_mConsulta();
        this.lblOpcion = this.crearHTMLLabelElement("lblOpcion", {
            refresh: () => (this.lblOpcion.innerHTML =
                this.opcion === opcionFicha.add ? "Enviar" : "EnviarConsulta"),
        });
        this.inExpertoId = this.crearHTMLInputElement("inExpertoId", {
            oninput: () => {
                this.inExpertoId.value = this.consulta.expertoId = this.inExpertoId.value
                    .toUpperCase()
                    .trim();
                this.refresh();
            },
            refresh: () => (this.inExpertoId.style.borderColor = this.consulta.expertoIdOk ? "" : "red"),
        });
        this.inExpertoId.disabled = this.opcion === opcionFicha.add;
        this.inPregunta = this.crearHTMLInputElement("inPregunta", {
            oninput: () => {
                this.inPregunta.value = this.consulta.pregunta = this.inPregunta.value
                    .toUpperCase()
                    .trim();
                this.refresh();
            },
            refresh: () => (this.inPregunta.style.borderColor = this.consulta.preguntaOk ? "" : "red"),
        });
        this.inRespuesta = this.crearHTMLInputElement("inRespuesta", {
            oninput: () => {
                this.inRespuesta.value = this.consulta.respuesta = this.inRespuesta.value
                    .toUpperCase()
                    .trim();
                this.refresh();
            },
            refresh: () => (this.inRespuesta.style.borderColor = this.consulta.respuestaOk ? "" : "red"),
        });
        this.inFechaConsulta = this.crearHTMLInputElement("inFechaConsulta", {
            oninput: () => {
                this.inFechaConsulta.value = this.consulta.fechaConsulta = this.inFechaConsulta.value;
                this.refresh();
            },
        });
        this.inFechaRespuesta = this.crearHTMLInputElement("inFechaRespuesta", {
            oninput: () => {
                this.inFechaRespuesta.value = this.consulta.fechaRespuesta = this.inFechaRespuesta.value;
                this.refresh();
            },
        });
        this.btEnviar = this.crearHTMLButtonElement("btEnviar", {
            onclick: () => this.enviar(),
            refresh: () => {
                this.btEnviar.disabled = this.consulta.consultaOk !== true;
            },
        });
        this.btCancelar = this.crearHTMLButtonElement("btCancelar", {
            onclick: () => {
                if (this.controlador !== null) {
                    this.controlador.activarVista({ vista: "consultas" });
                }
            },
        });
    }
    enviar() {
        var _a;
        if (this.opcion === opcionFicha.add) {
            if (this.controlador !== null) {
                this.controlador.addConsulta({
                    dtConsulta: this.consulta,
                    callback: (error) => {
                        var _a;
                        if (!error)
                            (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.activarVista({ vista: "consultas" });
                        else
                            alert(`Error al enviar la consulta: ${error}`);
                    },
                });
            }
        }
        else {
            (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.editConsulta({
                dtConsulta: this.consulta,
                callback: (error) => {
                    var _a;
                    if (!error)
                        (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.activarVista({ vista: "consultas" });
                    else
                        alert(`Error al enviar la consulta: ${error}`);
                },
            });
        }
    }
}
