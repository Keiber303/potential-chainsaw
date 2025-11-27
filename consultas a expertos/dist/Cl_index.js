import Cl_controlador from "./Cl_controlador.js";
import Cl_mSistema from "./Cl_mSistema.js";
import Cl_vAdministrador from "./Cl_vAdministrador.js";
export default class Cl_index {
    constructor() {
        let modelo = new Cl_mSistema();
        modelo.cargar((error) => {
            if (error)
                alert(error);
            if (error)
                throw new Error(`Error cargando expertos: ${error}` + error);
            let vista = new Cl_vAdministrador();
            let controlador = new Cl_controlador(modelo, vista);
            vista.controlador = controlador;
            vista.refresh();
        });
    }
}
