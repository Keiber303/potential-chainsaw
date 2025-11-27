import Cl_mTablaWeb from "./tools/Cl_mTablaWeb.js";

export interface iConsulta {
    id: number | null;
    creadoEl: string | null;
    alias: string | null;
    
    // Propiedades específicas de la consulta
    expertoId: number;         // 🟢 ID del experto al que se dirige (Corregido)
    pregunta: string;
    respuesta: string | null;
    fechaConsulta: string;     // Fecha de envío
    fechaRespuesta: string | null; // Fecha en que el experto respondió
}

// ==========================================================
//                           CLASE
// ==========================================================

export default class Cl_mConsulta extends Cl_mTablaWeb {
    
    // 1. Campos Privados
    private _expertoId: number = 0;
    private _pregunta: string = "";
    private _respuesta: string | null = null;
    private _fechaConsulta: string = new Date().toISOString();
    private _fechaRespuesta: string | null = null;

    constructor(
        { id, creadoEl, alias, expertoId, pregunta, respuesta, fechaConsulta, fechaRespuesta }: iConsulta = {
            id: null,
            creadoEl: null,
            alias: null,
            expertoId: 0,
            pregunta: "",
            respuesta: null,
            fechaConsulta: new Date().toISOString(),
            fechaRespuesta: null,
        }
    ) {
        super({ id, creadoEl, alias });
        this.expertoId = expertoId;
        this.pregunta = pregunta;
        this.respuesta = respuesta;
        this.fechaConsulta = fechaConsulta;
        this.fechaRespuesta = fechaRespuesta;
    }

    set expertoId(expertoId: number) { this._expertoId = expertoId; }
    get expertoId(): number { return this._expertoId; }

    set pregunta(pregunta: string) { this._pregunta = pregunta.trim(); }
    get pregunta(): string { return this._pregunta; }

    set respuesta(respuesta: string | null) { this._respuesta = respuesta ? respuesta.trim() : null; }
    get respuesta(): string | null { return this._respuesta; }

    set fechaConsulta(fechaConsulta: string) { this._fechaConsulta = fechaConsulta; }
    get fechaConsulta(): string { return this._fechaConsulta; }

    set fechaRespuesta(fechaRespuesta: string | null) { this._fechaRespuesta = fechaRespuesta; }
    get fechaRespuesta(): string | null { return this._fechaRespuesta; }
    
    // 3. Validación y Serialización
    
    get preguntaOk(): boolean {
        return this.pregunta.length > 10;
    }
    
    get expertoIdOk(): boolean {
        return this.expertoId > 0;
    }
    get respuestaOk(): boolean {
        return this.respuesta !== null;
    }
    
    get fechaRespuestaOk(): boolean {
        return this.respuesta !== null;
    }
    
    get fechaConsultaOk(): boolean {
        return this.respuesta !== null;
    }

    get consultaOk(): string | true {
        if (!this.expertoIdOk) return "expertoId";
        if (!this.preguntaOk) return "pregunta";
        if (!this.respuestaOk) return "respuesta";
        if (!this.fechaRespuestaOk) return "fechaRespuesta";
        if (!this.fechaConsultaOk) return "fechaConsulta";
        return true;
    }

    toJSON(): iConsulta {
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