export default class Cl_controlador {
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;
    }
    addExperto({ dtExperto, callback }) {
        this.modelo.addExperto({
            dtExperto,
            callback
        });
    }
    editExperto({ dtExperto, callback }) {
        this.modelo.editExperto({
            dtExperto,
            callback
        });
    }
    addConsulta({ dtConsulta, callback }) {
        this.modelo.addConsulta({
            dtConsulta,
            callback
        });
    }
    editConsulta({ dtConsulta, callback }) {
        this.modelo.editConsulta({
            dtConsulta,
            callback
        });
    }
    deleteExperto({ id, callback }) {
        this.modelo.deleteExperto({
            id,
            callback
        });
    }
    experto(id) {
        let experto = null;
        if (Array.isArray(this.modelo.tbExperto) && this.modelo.tbExperto.length > 0) {
            experto = this.modelo.tbExperto.find((experto) => experto.id === id) || null; // Busca el experto por ID(id);
        }
        return experto;
    }
    get dtExpertos() {
        let dtExpertos = [];
        if (Array.isArray(this.modelo.tbExperto) && this.modelo.tbExperto.length > 0) {
            dtExpertos = this.modelo.tbExperto.map((experto) => {
                // Realiza cualquier transformación o filtrado necesario aquí
                return experto.toJSON();
            });
        }
        return dtExpertos;
    }
    consulta(id) {
        let Consulta = null;
        if (Array.isArray(this.modelo.tbConsulta) && this.modelo.tbConsulta.length > 0) {
            Consulta = this.modelo.tbConsulta.find((consulta) => consulta.id === id) || null; // Busca la consulta por ID(id);
        }
        return Consulta;
    }
    get dtConsultas() {
        let dtConsultas = [];
        if (Array.isArray(this.modelo.tbConsulta) && this.modelo.tbConsulta.length > 0) {
            dtConsultas = this.modelo.tbConsulta.map((consulta) => {
                // Realiza cualquier transformación o filtrado necesario aquí
                return consulta.toJSON();
            });
        }
        return dtConsultas;
    }
    activarVista({ vista, opcion, object, }) {
        this.vista.activarVista({ vista, opcion, objeto: object });
    }
}
