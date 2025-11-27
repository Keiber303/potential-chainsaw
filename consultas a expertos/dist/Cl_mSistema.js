import Cl_dcytDb from "https://gtplus.net/forms2/dcytDb/api/Cl_dcytDb.php?v251110-2150";
import Cl_mConsulta from "./Cl_mConsulta.js";
import Cl_mExperto from "./Cl_mExperto.js";
export default class Cl_mSistema {
    constructor() {
        this.expertos = [];
        this.consultas = [];
        this.tbExperto = "--------";
        this.tbConsulta = "--------";
        this.db = new Cl_dcytDb({ aliasCuenta: "CodeBreakers" });
        this.expertos = [];
        this.consultas = [];
    }
    addExperto({ dtExperto, callback, }) {
        let experto = new Cl_mExperto(dtExperto);
        if (this.expertos.find((e) => e.id === dtExperto.id))
            callback(`el experto con id ${dtExperto.id} ya existe`);
        else if (!experto.expertoOk)
            callback(experto.expertoOk);
        else
            this.db.addRecord({
                tabla: this.tbExperto,
                registroAlias: dtExperto.id,
                object: experto,
                callback: ({ id, objects: expertos, error }) => {
                    if (!error)
                        this.expertos.push(experto);
                    callback(error);
                },
            });
    }
    editExperto({ dtExperto, callback, }) {
        let experto = new Cl_mExperto(dtExperto);
        if (!experto.expertoOk)
            callback(experto.expertoOk);
        else
            this.db.editRecord({
                tabla: this.tbExperto,
                object: experto,
                callback: ({ error }) => {
                    callback(error);
                },
            });
    }
    deleteExperto({ id, callback, }) {
        let indice = this.expertos.findIndex((e) => e.id === id);
        if (indice !== -1)
            callback(`el experto con id ${id} no existe`);
        else {
            let algunExperto = false;
            for (let consulta of this.consultas) {
                if (consulta.expertoId === id) {
                    algunExperto = true;
                    break;
                }
            }
            if (algunExperto)
                callback(`no se puede eliminar el experto con id ${id} porque tiene consultas asignadas`);
            else
                this.db.deleteRecord({
                    tabla: this.tbExperto,
                    object: { id: id },
                    callback: ({ objects: expertos, error }) => {
                        if (!error)
                            this.expertos.splice(indice, 1);
                        callback(error);
                    },
                });
        }
    }
    addConsulta({ dtConsulta, callback, }) {
        let existe = this.consultas.find((c) => c.id === dtConsulta.id);
        if (existe)
            callback(`la consulta con id ${dtConsulta.id} ya existe`);
        let consulta = new Cl_mConsulta(dtConsulta);
        if (!consulta.consultaOk)
            callback(consulta.consultaOk);
        this.consultas.push(consulta);
        callback(false);
    }
    responderConsulta({ idConsulta, respuesta, callback, }) {
        let consulta = this.consultas.find((c) => c.id === idConsulta);
        if (!consulta)
            callback(`la consulta con id ${idConsulta} no existe`);
        else {
            consulta.respuesta = respuesta;
            callback(false);
        }
    }
    editConsulta({ dtConsulta, callback, }) {
        let consulta = this.consultas.find((c) => c.id === dtConsulta.id);
        if (!consulta)
            callback(`la consulta con id ${dtConsulta.id} no existe`);
        else {
            let consulta = new Cl_mConsulta(dtConsulta);
            if (!consulta.consultaOk)
                callback(consulta.consultaOk);
            callback(false);
        }
    }
    cargar(callback) {
        this.db.listRecords({
            tabla: this.tbExperto,
            callback: ({ expertos, error }) => {
                if (!error)
                    callback(`Error cargando expertos: ${error}`);
                else
                    this.db.listRecords({
                        tabla: this.tbExperto,
                        callback: ({ expertos, error }) => {
                            var _a;
                            if (error)
                                callback(`Error cargando expertos: ${error}`);
                            else {
                                this.RegistrarExpertos(expertos !== null && expertos !== void 0 ? expertos : []);
                                this.ResponderConsultas((_a = this.consultas) !== null && _a !== void 0 ? _a : []);
                                callback(false);
                            }
                        }
                    });
            },
        });
    }
    RegistrarExpertos(expertos) {
        this.expertos = [];
        expertos.forEach((expertos) => {
            this.expertos.push(new Cl_mExperto(expertos));
        });
    }
    ResponderConsultas(consultas) {
        this.consultas = [];
        consultas.forEach((consultas) => {
            this.consultas.push(new Cl_mConsulta(consultas));
        });
    }
}
