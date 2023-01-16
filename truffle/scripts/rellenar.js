module.exports = async callback => {

    try {
        const Asignatura = artifacts.require("./Asignatura.sol");

        // Usar las cuentas de usuario
        const accounts = await web3.eth.getAccounts();
        if (accounts.length < 8) {
            throw new Error("No hay cuentas.");
        }

        let asignatura = await Asignatura.deployed();

        console.log("Crear un profesor:");
        await asignatura.addProfesor(accounts[1], "Santiago Pavón");

        console.log("Asigna un coordinador:");
        await asignatura.setCoordinador(accounts[0]);

        console.log("Crear cuatro evaluaciones:");
        await asignatura.creaEvaluacion("Parcial 1", Date.now() + 60 * 24 * 3600000, 25, 0);
        await asignatura.creaEvaluacion("Parcial 2", Date.now() + 120 * 24 * 3600000, 30, 0);
        await asignatura.creaEvaluacion("Práctica 1", Date.now() + 50 * 24 * 3600000, 20, 0);
        await asignatura.creaEvaluacion("Práctica 1", Date.now() + 110 * 24 * 3600000, 25, 0);

        console.log("Matricular a dos alumnos:");
        let evaAccount = accounts[2];
        let pepeAccount = accounts[3];
        console.log("Cuenta de Eva =", evaAccount);
        console.log("Cuenta de Pepe =", pepeAccount);
        await asignatura.matricular(evaAccount, "Eva Martinez","00000001A", "em@dominio.es");
        await asignatura.matricular(pepeAccount, "Jose Redondo","00000002B", "jr@stio.com");

        console.log("Añadir calificaciones:");
        await asignatura.califica(evaAccount,  0, 1, 0, {from: accounts[1]});
        await asignatura.califica(evaAccount,  1, 2, 400, {from: accounts[1]});
        await asignatura.califica(evaAccount,  2, 2, 750, {from: accounts[1]});
        await asignatura.califica(evaAccount,  3, 2, 900, {from: accounts[1]});
        await asignatura.califica(pepeAccount, 0, 0, 0, {from: accounts[1]});
        await asignatura.califica(pepeAccount, 1, 1, 0, {from: accounts[1]});
        await asignatura.califica(pepeAccount, 2, 2, 350, {from: accounts[1]});
        await asignatura.califica(pepeAccount, 3, 2, 650, {from: accounts[1]});
    } catch (err) {   // Capturar errores
        console.log(`Error: ${err}`);
    } finally {
        console.log("FIN");
    }

    callback();      // Terminar
};
