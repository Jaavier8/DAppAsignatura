// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

/**
 * Contrato Asignatura que representa una asignatura de la carrera.
 *
 * Version Full
 */
contract Asignatura {
    /// Version 2022 Full
    string public version = "2022 Full";
    /**
     * address del usuario que ha desplegado el contrato.
     * El contrato lo despliega el owner.
     */
    address public owner;

    /// Nombre de la asignatura
    string public nombre;

    /// Curso academico
    string public curso;

    /// Coordinador de la asigantura
    address public coordinador;

    /// Estado de la asignatura
    bool public cerrada;

    /// Acceder al nombre de un profesor dada su dirección
    mapping (address => string) public datosProfesor;

    /// Array con las direcciones de los profesores añadidos
    address[] public profesores;

    /// Datos de un alumno.
    struct DatosAlumno {
        string nombre;
        string dni;
        string email;
    }
    /// Acceder a los datos de un alumno dada su direccion.
    mapping(address => DatosAlumno) public datosAlumno;

    /**
     * Valores de DNI usados
     * Clave: DNI
     * Valor: dirección del alumno con ese DNI
     */
    mapping (string => address) public dniUsados;

    // Array con las direcciones de los alumnos matriculados.
    address[] public matriculas;

    /**
     * Datos de una evaluacion.
     */
    struct Evaluacion {
        string nombre;
        uint256 fecha;
        uint256 porcentaje;
        uint256 minimo;
    }

    /// Evaluaciones de la asignatura.
    Evaluacion[] public evaluaciones;

    /// Tipos de notas: sin usar, no presentado, y nota normal entre 0 y 1000.
    enum TipoNota { Empty,NP,Normal }

    /**
     * Datos de una nota.
     * La calificacion esta multiplicada por 100 porque no hay decimales.
     */
    struct Nota {
        TipoNota tipo;
        uint256 calificacion;
    }

    // Dada la direccion de un alumno, y el indice de la evaluacion, devuelve
    // la nota del alumno.
    mapping(address => mapping(uint256 => Nota)) public calificacionesAlumno;

    // Dado el indice de la evaluacion y la direccion de un alumno, devuelve
    // la nota del alumno.
    mapping(uint256 => mapping(address => Nota)) public calificacionesEvaluacion;

    /// Error usado para indicar que un DNI esta duplicado
    error DNIDuplicadoError(string dni);

    /**
     * Constructor.
     *
     * @param _nombre Nombre de la asignatura.
     * @param _curso Curso academico.
     */
    constructor(string memory _nombre, string memory _curso) {
        require(bytes(_nombre).length != 0,"El nombre de la asignatura no puede ser vacio");
        require(bytes(_curso).length != 0,"El curso academico de la asignatura no puede ser vacio");
        
        owner = msg.sender;
        nombre = _nombre;
        curso = _curso;
    }

    /**
     * Asignar la dirección del usuario coordinador
     *
     * @param addr Dirección del usuario coordinador
     */
    function setCoordinador(address addr) soloOwner soloAbierta public {
        coordinador = addr;
    }

    /**
     *Cerrar la asignatura
     */
    function cerrar() soloCoordinador public {
        cerrada = true;
    }

    /**
     * Añadir un profesor nuevo
     *
     * Impedir que se pueda meter un nombre vacío
     *
     * @param _addr Dirección del profesor
     * @param _nombre Nombre del profesor
     */
    function addProfesor(address _addr, string memory _nombre) soloOwner soloAbierta public{
        require(bytes(datosProfesor[_addr]).length == 0, "Ese profesor ya es profesor");
        require(bytes(_nombre).length != 0, "El nombre no puede ser vacio");
        
        datosProfesor[_addr] = _nombre;
        profesores.push(_addr);
    }

    /**
     * El numero de profesores añadidos
     *
     * @return Numero de profesores añadidos
     */
    function profesoresLength() public view returns(uint){
        return profesores.length;
    }

    /**
     * Los alumnos pueden automatricularse con el metodo automatricula.
     *
     * Impedir que se pueda meter un nombre vacio.
     *
     * El valor del DNI debe ser unico
     *
     * @param _nombre El nombre del alumno.
     * @param _dni El DNI del alumno.
     * @param _email El email del alumno.
     */
    function automatricula(string memory _nombre, string memory _dni, string memory _email) public soloNoMatriculados soloAbierta{
        _matricular(msg.sender, _nombre, _dni, _email);
    }

    /**
     * El owner puede matricular alumnos.
     *
     * Impedir que se pueda poner un nombre o DNI vacio.
     *
     * El valor del DNI debe ser unico
     *
     * @param _addr Direccion del alumno.
     * @param _nombre El nombre del alumno.
     * @param _dni El DNI del alumno.
     * @param _email El email del alumno.
     */
    function matricular(address _addr, string memory _nombre, string memory _dni, string memory _email) soloOwner soloAbierta public{
        require(!estaMatriculado(_addr), "Solo se pueden matricular alumno no matriculados.");
        _matricular(_addr, _nombre, _dni, _email);
    }

    function _matricular(address _addr, string memory _nombre, string memory _dni, string memory _email) soloNoMatriculados soloAbierta private {
        require(bytes(_nombre).length != 0, "El nombre no puede ser vacio");
        require(bytes(_dni).length != 0, "El DNI no puede ser vacio");

        if(dniUsados[_dni] != address(0x0)){
            revert DNIDuplicadoError({ dni: _dni});
        }

        DatosAlumno memory datos = DatosAlumno(_nombre, _dni, _email);

        datosAlumno[_addr] = datos;

        dniUsados[_dni] = _addr;

        matriculas.push(_addr);
    }

    /**
     * El numero de alumnos matriculados.
     *
     * @return El numero de alumnos matriculados.
     */
    function matriculasLength() public view returns (uint256) {
        return matriculas.length;
    }

    /**
     * Permite a un alumno obtener sus propios datos.
     *
     * @return _nombre El nombre del alumno que invoca el metodo.
     * @return _dni El DNI del alumno que invoca el metodo.
     * @return _email El email del alumno que invoca el metodo.
     */
    function quienSoy() public view soloMatriculados returns (string memory _nombre, string memory _dni, string memory _email){
        DatosAlumno memory datos = datosAlumno[msg.sender];
        _nombre = datos.nombre;
        _dni = datos.dni;
        _email = datos.email;
    }

    /**
     * Crear una prueba de evaluacion de la asignatura. Por ejemplo, el primer parcial, o la practica 3.
     *
     * Las evaluaciones se meteran en el array evaluaciones, y nos referiremos a ellas por su posicion en el
     array.
     *
     * @param _nombre El nombre de la evaluacion.
     * @param _fecha La fecha de evaluacion (segundos desde el 1/1/1970).
     * @param _porcentaje El porcentaje de puntos que proporciona a la nota final.
     * @param _minimo Nota minima necesaria para aprobar.
     *
     * @return La posicion en el array evaluaciones,
     */
    function creaEvaluacion(string memory _nombre, uint256 _fecha, uint256 _porcentaje, uint256 _minimo) public soloCoordinador returns (uint256) {
        require(bytes(_nombre).length != 0, "El nombre de la evaluacion no puede ser vacio");
        
        evaluaciones.push(Evaluacion(_nombre, _fecha, _porcentaje, _minimo));
        return evaluaciones.length - 1;
    }

    /**
     * Edita una prueba de evaluacion de la asignatura.
     *
     * @param _posicion Posicion en el array de evaluaciones.
     * @param _nombre El nombre de la evaluacion.
     * @param _fecha La fecha de evaluacion (segundos desde el 1/1/1970).
     * @param _porcentaje El porcentaje de puntos que proporciona a la nota final.
     * @param _minimo Nota minima necesaria para aprobar.
     *
     * @return La posicion en el array evaluaciones,
     */
    function editaEvaluacion(uint256 _posicion, string memory _nombre, uint256 _fecha, uint256 _porcentaje, uint256 _minimo) public soloCoordinador returns (uint256) {
        require(bytes(_nombre).length != 0, "El nombre de la evaluacion no puede ser vacio");
        
        //delete evaluaciones[_posicion];
        evaluaciones[_posicion] = Evaluacion(_nombre, _fecha, _porcentaje, _minimo);
        return _posicion;
    }

    /**
     * El numero de evaluaciones creadas.
     *
     * @return El numero de evaluaciones creadas.
     */
    function evaluacionesLength() public view returns (uint256) {
        return evaluaciones.length;
    }

    /**
     * Poner la nota de un alumno en una evaluacion.
     *
     * @param alumno La direccion del alumno.
     * @param evaluacion El indice de una evaluacion en el array evaluaciones.
     * @param tipo Tipo de nota.
     * @param calificacion La calificacion, multipilicada por 100 porque no hay decimales.
     */
    function califica(address alumno, uint256 evaluacion, TipoNota tipo, uint256 calificacion) public soloAbierta soloProfesor {
        require(estaMatriculado(alumno), "Solo se pueden calificar a un alumno matriculado.");
        require(evaluacion < evaluaciones.length, "No se puede calificar una evaluacion que no existe.");
        require(calificacion <= 1000, "No se puede calificar con una nota superior a la maxima permitida.");
        
        Nota memory nota = Nota(tipo, calificacion);

        calificacionesAlumno[alumno][evaluacion] = nota;
        calificacionesEvaluacion[evaluacion][alumno] = nota;
    }

    /**
     * Devuelve el tipo de nota y la calificacion que ha sacado el alumno que invoca el metodo en la evaluacion
     pasada como parametro.
     *
     * @param evaluacion Indice de una evaluacion en el array de evaluaciones
     *
     * @return tipo El tipo de nota que ha sacado el alumno.
     * @return calificacion La calificacion que ha sacado el alumno.
     */
    function miNota(uint256 evaluacion) public view soloMatriculados returns (TipoNota tipo, uint256 calificacion){
        require(evaluacion < evaluaciones.length, "El indice de la evaluacion no existe.");

        Nota memory nota = calificacionesAlumno[msg.sender][evaluacion];

        tipo = nota.tipo;
        calificacion = nota.calificacion;
    }

    /**
     * Devuelve la nota final del alumno que llama a este metodo
     *
     * Si el tipo de nota de alguna evaluacion es Empty, este metodo devuelve (Empty, 0)
     * Si todas son NP, devuelve (NP, 0)
     * En otros casos devuelve la nota final aplicando porcentajes adecuados
     * Si es superior a 499 y hay alguna nota NP, entonce devuelve maximo NP
     *
     * @return tipo Tipo de nota
     * @return calificacion Calificacion del alumno
     */
    function miNotaFinal() soloMatriculados public view returns (TipoNota tipo, uint256 calificacion){
        return _notaFinal(msg.sender);
    }

    /**
     * Devuelve la nota final del alumno indicado
     *
     * @param _addr Direccion del alumno
     * 
     * @return tipo Tipo de nota
     * @return calificacion Calificacion del alumno
     */
    function notaFinal(address _addr) soloCoordinador public view returns (TipoNota tipo, uint256 calificacion){
        return _notaFinal(_addr);
    }

    function _notaFinal(address _addr) private view returns (TipoNota tipo, uint256 calificacion){
        tipo = TipoNota.NP;

        for (uint i = 0; i < evaluaciones.length; i++){
            if(calificacionesAlumno[_addr][i].tipo == TipoNota.Empty){
                return (TipoNota.Empty, 0);
            }
            if(calificacionesAlumno[_addr][i].tipo == TipoNota.Normal){
                tipo = TipoNota.Normal;
                continue;
            }
        }

        if(tipo == TipoNota.NP){
            return (tipo, 0);
        }

        bool suspenso = false;
        uint256 nota = 0;

        for(uint i = 0; i < evaluaciones.length; i++){
            if(calificacionesAlumno[_addr][i].calificacion < evaluaciones[i].minimo){
                suspenso = true;
            }
            nota += calificacionesAlumno[_addr][i].calificacion * evaluaciones[i].porcentaje / 100;
        }

        if(suspenso && nota > 499) {
            nota = 499;
        }

        tipo = TipoNota.Normal;
        calificacion = nota;
    }

    /**
     * Consulta si una direccion pertenece a un alumno matriculado.
     *
     * @param alumno La direccion de un alumno.
     *
     * @return true si es una alumno matriculado.
     */
    function estaMatriculado(address alumno) private view returns (bool) {
        string memory _nombre = datosAlumno[alumno].nombre;

        return bytes(_nombre).length != 0;
    }

    /**
     * Modificador para que una funcion solo la pueda ejecutar el owner.
     *
     * Se usa en setCoordinador y en addProfesor.
     */
    modifier soloOwner() {
        require(msg.sender == owner, "Solo permitido al owner");
        _;
    }

    /**
     * Modificador para que una funcion solo la pueda ejecutar el coordinador.
     *
     * Se usa en cerrar y en creaEvaluacion.
     */
    modifier soloCoordinador() {
        require(msg.sender == coordinador, "Solo permitido al coordinador");
        _;
    }

    /**
     * Modificador para que una funcion solo la pueda ejecutar el profesor.
     *
     * Se usa en califica.
     */
    modifier soloProfesor() {
        string memory _nombre = datosProfesor[msg.sender];
        require(bytes(_nombre).length != 0, "Solo permitido al profesor");
        _;
    }
    /**
     * Modificador para que una funcion solo la pueda ejecutar un alumno matriculado.
     */
    modifier soloMatriculados() {
        require(estaMatriculado(msg.sender), "Solo permitido a alumnos matriculados");
        _;
    }
    /**
     * Modificador para que una funcion solo la pueda ejecutar un alumno no matriculado aun.
     */
    modifier soloNoMatriculados() {
        require(!estaMatriculado(msg.sender), "Solo permitido a alumnos no matriculados");
        _;
    }

    /**
     * Modificador para que una funcion solo la pueda ejecutar si la asigantura no esta cerrada.
     *
     * Se usa en csetCoordinador, addProfesor, automatricula, creaEvaluacion y califica.
     */
    modifier soloAbierta() {
        require(!cerrada, "Solo permitido si la asignatura no esta cerrada");
        _;
    }

    /**
     * No se permite la recepcion de dinero.
     */
    receive() external payable {
        revert("No se permite la recepcion de dinero.");
    }
}
