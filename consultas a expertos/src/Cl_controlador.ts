import Cl_mConsulta, { iConsulta } from "./Cl_mConsulta.js";
import Cl_mExperto, { iExperto } from "./Cl_mExperto.js";
import Cl_mSistema from "./Cl_mSistema.js";
import Cl_vAdministrador from "./Cl_vAdministrador.js";
import { opcionFicha } from "./tools/core.tools.js";

export default class Cl_controlador {
    modelo: Cl_mSistema;
    vista: Cl_vAdministrador;
    constructor(modelo: Cl_mSistema, vista: Cl_vAdministrador) {
        this.modelo = modelo;
        this.vista = vista;
    }
    addExperto({ 
        dtExperto,
        callback 
    }: { dtExperto: Cl_mExperto, 
        callback: (error: string | false) => void;
     }): void {
        this.modelo.addExperto({
            dtExperto, 
            callback});
    }
    editExperto({ 
        dtExperto,
        callback 
    }: { dtExperto: Cl_mExperto, 
        callback: (error: string | false) => void;
     }): void {
        this.modelo.editExperto({
            dtExperto, 
            callback});
    }
    addConsulta({
        dtConsulta,
        callback
    }: {
        dtConsulta: Cl_mConsulta,
        callback: (error: string | false) => void;
    }): void {
        this.modelo.addConsulta({
            dtConsulta,
            callback
    });
    }
    editConsulta({
        dtConsulta,
        callback
    }: {
        dtConsulta: Cl_mConsulta,
        callback: (error: string | false) => void;
    }): void {
        this.modelo.editConsulta({
            dtConsulta,
            callback
    });
    }
    deleteExperto({ 
        id,
        callback 
    }: { id: number, 
        callback: (error: string | false) => void;
     }): void {
        this.modelo.deleteExperto({
            id, 
            callback});
    }
   experto(id: number): Cl_mExperto | null {
    let experto: Cl_mExperto | null = null;
    if (Array.isArray(this.modelo.tbExperto) && this.modelo.tbExperto.length > 0) {
        experto = this.modelo.tbExperto.find((experto: Cl_mExperto) => experto.id === id) || null; // Busca el experto por ID(id);
    }
    return experto;
}
  get dtExpertos(): iExperto[] {
    let dtExpertos: iExperto[] = [];
    if (Array.isArray(this.modelo.tbExperto) && this.modelo.tbExperto.length > 0) {
        dtExpertos = this.modelo.tbExperto.map((experto: Cl_mExperto) => {
            // Realiza cualquier transformación o filtrado necesario aquí
            return experto.toJSON();
        });
    }
    return dtExpertos;
}
consulta(id: number): Cl_mConsulta | null {
    let Consulta: Cl_mConsulta | null = null;
    if (Array.isArray(this.modelo.tbConsulta) && this.modelo.tbConsulta.length > 0) {
        Consulta = this.modelo.tbConsulta.find((consulta: Cl_mConsulta) => consulta.id === id) || null; // Busca la consulta por ID(id);
    }
    return Consulta;
}
get dtConsultas():iConsulta[] {
    let dtConsultas: iConsulta[] = [];
    if (Array.isArray(this.modelo.tbConsulta) && this.modelo.tbConsulta.length > 0) {
        dtConsultas = this.modelo.tbConsulta.map((consulta: Cl_mConsulta) => {
            // Realiza cualquier transformación o filtrado necesario aquí
            return consulta.toJSON();
        });
    }
    return dtConsultas;
}
    activarVista({
        vista,
        opcion,
        object,
    }:{
        vista: string,
        opcion?: opcionFicha,
        object?: Cl_mExperto

    }): void {
        this.vista.activarVista({ vista, opcion, objeto: object });
    }
       
}