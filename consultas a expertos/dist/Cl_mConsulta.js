import Cl_mTablaWeb from "./tools/Cl_mTablaWeb.js";
// ==========================================================
//                           CLASE
// ==========================================================
export default class Cl_mConsulta extends Cl_mTablaWeb {
    constructor({ id, creadoEl, alias, expertoId, pregunta, respuesta, fechaConsulta, fechaRespuesta } = {
        id: null,
        creadoEl: null,
        alias: null,
        expertoId: 0,
        pregunta: "",
        respuesta: null,
        fechaConsulta: new Date().toISOString(),
        fechaRespuesta: null,
    }) {
        super({ id, creadoEl, alias });
        // 1. Campos Privados
        this._expertoId = 0;
        this._pregunta = "";
        this._respuesta = null;
        this._fechaConsulta = new Date().toISOString();
        this._fechaRespuesta = null;
        this.expertoId = expertoId;
        this.pregunta = pregunta;
        this.respuesta = respuesta;
        this.fechaConsulta = fechaConsulta;
        this.fechaRespuesta = fechaRespuesta;
    }
    set expertoId(expertoId) { this._expertoId = expertoId; }
    get expertoId() { return this._expertoId; }
    set pregunta(pregunta) { this._pregunta = pregunta.trim(); }
    get pregunta() { return this._pregunta; }
    set respuesta(respuesta) { this._respuesta = respuesta ? respuesta.trim() : null; }
    get respuesta() { return this._respuesta; }
    set fechaConsulta(fechaConsulta) { this._fechaConsulta = fechaConsulta; }
    get fechaConsulta() { return this._fechaConsulta; }
    set fechaRespuesta(fechaRespuesta) { this._fechaRespuesta = fechaRespuesta; }
    get fechaRespuesta() { return this._fechaRespuesta; }
    // 3. Validación y Serialización
    get preguntaOk() {
        return this.pregunta.length > 10;
    }
    get expertoIdOk() {
        return this.expertoId > 0;
    }
    get respuestaOk() {
        return this.respuesta !== null;
    }
    get fechaRespuestaOk() {
        return this.respuesta !== null;
    }
    get fechaConsultaOk() {
        return this.respuesta !== null;
    }
    get consultaOk() {
        if (!this.expertoIdOk)
            return "expertoId";
        if (!this.preguntaOk)
            return "pregunta";
        if (!this.respuestaOk)
            return "respuesta";
        if (!this.fechaRespuestaOk)
            return "fechaRespuesta";
        if (!this.fechaConsultaOk)
            return "fechaConsulta";
        return true;
    }
    toJSON() {
        return {
            id: this.id,
            creadoEl: this.creadoEl,
            alias: this.alias,
            expertoId: this._expertoId,
            pregunta: this._pregunta,
            respuesta: this._respuesta,
            fechaConsulta: this._fechaConsulta,
            fechaRespuesta: this._fechaRespuesta,
        };
    }
}
