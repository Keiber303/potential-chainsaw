import Cl_mTablaWeb from "./tools/Cl_mTablaWeb.js";

export interface iExperto {
    id: number | null;
    creadoEl: string | null; // <-- Propiedad que debe tener un getter
    alias: string | null; // <-- Propiedad que debe tener un getter
    nombre: string;
    area: string;
    cargo: string;
}

export default class Cl_mExperto extends Cl_mTablaWeb {
    private _nombre: string = "";
    private _area: string = "";
    private _cargo: string = "";

    constructor({ id, creadoEl, alias, nombre, area, cargo }: iExperto) {
        super({ id, creadoEl, alias }); // Inicializa _id, _creadoEl, _alias
        this.nombre = nombre;
        this.area = area;
        this.cargo = cargo;
    }
    
    // 🟢 CORRECCIÓN: GETTERS PÚBLICOS DE PROPIEDADES BASE
    // Estos asumen que las propiedades privadas o protegidas en Cl_mTablaWeb
    // se llaman _id, _creadoEl, y _alias.
    get id(): number | null {
        return super.id; // Usamos 'any' por seguridad en la herencia
    }
    get creadoEl(): string | null {
        return (this as any)._creadoEl; // 👈 ESTO RESUELVE EL ERROR
    }
    get alias(): string | null {
        return (this as any)._alias;
    }
    
    // --- SETTERS y GETTERS para 'nombre' ---
    set nombre(nombre: string) {
        this._nombre = nombre.trim();
    }
    get nombre(): string {
        return this._nombre;
    }

    // --- SETTERS y GETTERS para 'area' ---
    set area(area: string) {
        this._area = area.trim();
    }
    get area(): string {
        return this._area;
    }

    // --- SETTERS y GETTERS para 'cargo' ---
    set cargo(cargo: string) {
        this._cargo = cargo.trim();
    }
    get cargo(): string {
        return this._cargo;
    }

   get idOk(): boolean {
        return this.id !== null && this.id !== undefined && this.id.toString().length === 2;
   }
   get nombreOk(): boolean {
        return this.nombre.length > 2;
   }
   get areaOk(): boolean {
        return this.area.length > 2;
   }
   get cargoOk(): boolean {
        return this.cargo.length > 2;
   }
    get expertoOk(): string | true {
       if (!this.idOk) return "id";
       if (!this.nombreOk) return "nombre";
       if (!this.areaOk) return "area";
       if (!this.cargoOk) return "cargo";
       return true;
    }
    
    toJSON(): iExperto {
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