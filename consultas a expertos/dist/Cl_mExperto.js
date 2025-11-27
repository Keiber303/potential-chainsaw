import Cl_mTablaWeb from "./tools/Cl_mTablaWeb.js";
export default class Cl_mExperto extends Cl_mTablaWeb {
    constructor({ id, creadoEl, alias, nombre, area, cargo }) {
        super({ id, creadoEl, alias }); // Inicializa _id, _creadoEl, _alias
        this._nombre = "";
        this._area = "";
        this._cargo = "";
        this.nombre = nombre;
        this.area = area;
        this.cargo = cargo;
    }
    // 🟢 CORRECCIÓN: GETTERS PÚBLICOS DE PROPIEDADES BASE
    // Estos asumen que las propiedades privadas o protegidas en Cl_mTablaWeb
    // se llaman _id, _creadoEl, y _alias.
    get id() {
        return super.id; // Usamos 'any' por seguridad en la herencia
    }
    get creadoEl() {
        return this._creadoEl; // 👈 ESTO RESUELVE EL ERROR
    }
    get alias() {
        return this._alias;
    }
    // --- SETTERS y GETTERS para 'nombre' ---
    set nombre(nombre) {
        this._nombre = nombre.trim();
    }
    get nombre() {
        return this._nombre;
    }
    // --- SETTERS y GETTERS para 'area' ---
    set area(area) {
        this._area = area.trim();
    }
    get area() {
        return this._area;
    }
    // --- SETTERS y GETTERS para 'cargo' ---
    set cargo(cargo) {
        this._cargo = cargo.trim();
    }
    get cargo() {
        return this._cargo;
    }
    get idOk() {
        return this.id !== null && this.id !== undefined && this.id.toString().length === 2;
    }
    get nombreOk() {
        return this.nombre.length > 2;
    }
    get areaOk() {
        return this.area.length > 2;
    }
    get cargoOk() {
        return this.cargo.length > 2;
    }
    get expertoOk() {
        if (!this.idOk)
            return "id";
        if (!this.nombreOk)
            return "nombre";
        if (!this.areaOk)
            return "area";
        if (!this.cargoOk)
            return "cargo";
        return true;
    }
    toJSON() {
        return {
            id: this.id,
            creadoEl: this.creadoEl,
            alias: this.alias,
            nombre: this.nombre,
            area: this.area,
            cargo: this.cargo,
        };
    }
}
