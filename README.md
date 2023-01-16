# DApp Asignatura Full

En este repositorio se encuentra el código desarrollado para la creación de una aplicación descentralizada (DApp) como proyecto final de la asignatura **Blockchain: Desarrollo de Aplicaciones.**

Aparte de las funcionalidades obligatorias, se han desarrollado todas las opcionales, además de otras mejoras que afectan principalmente al estilo. Estas últimas son:

- **Material UI.** Se utiliza la biblioteca Material UI para poder utilizar sus componentes y crear una interfaz de usuario más vistosa.
- **Contexto de React.** Se utiliza un contexto de React para guardar algunas propiedades, como los roles del usuario conectado, ya que esto se utiliza en varias partes del código y así no hay necesidad de pasarlo como **props** por componentes intermedios que no lo necesitan.
- **Creación de página para asignatura cerrada.** Cuando la asignatura está cerrada, la aplicación mostrará una nueva página que, en el caso de ser coordinador, owner o profesor, muestra que la asignatura está cerrada junto con las notas finales de los alumnos. En caso de no ser ninguno de los anterior, únicamente muestra el mensaje de que la asignatura se ha cerrado. Cuando la asignatura está cerrada, cualquier ruta redirige a esta página.
- **Autorización.** En toda la aplicación se muestran únicamente los datos a los que el usuario conectado tiene acceso. Por ejemplo, en la barra de navegación, se muestran distintos elementos dependiendo del rol. Si un usuario intenta acceder a una ruta a la que no tiene acceso de forma forzosa (introduciendo la url directamente en lugar de navengando por la aplicación), se muestra una página indicando que no tiene acceso.
- **Introducción de roles en *Header*.** En la cabecera de la aplicación, a la derecha, se muestran los roles del usuario conectado para que se puedan ver en cualquier página de la aplicación. Si el usuario conectado no tiene ningún rol, aparece un botón para automatricularse, para poder hacerlo estando en cualquier página de la aplicación.
- **Componentes modales para transacciones.** Se introducen componentes modales para todas las transacciones.
- **Alertas.** Se introducen alertas personalizadas indicando el correcto funcionamiento o el error tras una transacción.
- **Script para rellenar.** Se actualiza el *script* para rellenar la aplicación de datos para adaptarlo a los cambios.

## Primeros pasos

A continuación, se indican los pasos que hay que seguir para levantar la aplicación y probar todas las funcionalidades.

- Clonar el repositorio del proyecto e instalar dependencias de la *dapp* y de *truffle*:

```
git clone https://github.com/Jaavier8/DAppAsignatura

cd DAppAsignatura/dapp
npm install

cd ../truffle
npm install

```

- Abrir Ganache y crear un nuevo *workspace* añadiendo el *truffle-config.js*, con lo que se levanta en local la red de pruebas.

- Con Ganache funcionando, hay que desplegar el contrato **Asignatura** en la red, para lo que se utiliza *truffle*, además de guardar algunos datos para comprobar el correcto funcionamiento.

```
npx truffle migrate
```

Desplegado el contrato, ya podemos ver la aplicación, pero está vacía, no tiene ningún dato. Para ello, ejecutamos el *script* creado para rellenar algunos datos:

```
npx truffle exec scripts/rellenar.js
```

Tras ejecutar el *script*, tendremos desplegado un contrato **Asignatura** con su coordinador, un profesor, dos alumnos y cuatro evaluaciones. Del *array* *accounts* se utilizan las siguientes direcciones:

- *Primera dirección (posición 0):* *Owner*.
- *Primera dirección (posición 1):* Coordinador.
- *Primera dirección (posición 2):* Profesor.
- *Primera dirección (posición 3):* Alumno.
- *Primera dirección (posición 4):* Alumno.

En este punto, ya tenemos la aplicación lista.

## Pruebas

Una vez levantado el escenario, se prueba el correcto funcionamiento de todas las funcionalidades, tanto obligatorias como opcionales. Los pasos seguidos son los siguientes:

1. Importar las seis primeras cuentas de Ganache en *Metamask* (coordinador, *owner*, profesor, dos alumnos y una cuenta sin ningún rol).
2. Arrancar la *dapp*.
```
cd ../dapp
npm start
```
3. Conectar *Metamask* a la red de pruebas Ganache, conectado a la primera cuenta (coordinador y *owner*).
4. Prueba de todas las páginas:

      4.1. **Página *Home***. Se muestra la dirección del *owner*, del coordinador, y el estado de la asignatura (1.1, 1.2 y 1.4). En la parte inferior podemos ver que se muestra un botón para cambiar el coordinador (1.3), y que este botón sólo se muestra si el usuario conectado es el *owner* (podemos cambiar de cuenta y ver que desaparece). Si cambiamos a la cuenta del coordinador, podemos ver que el botón que aparece es para cerrar la asignatura (1.5), y que sólo aparece para el coordinador.
Al pulsar estos botones se despliega un componente modal para realizar la operación y, al realizarla, podemos ver las alertas. La prueba de cerrar la asignatura no la realizamos en este punto, la dejamos para el final.

      4.2 **Página *Evaluaciones***. Se muestra una tabla con las distintas evaluaciones de la asignatura, la cual puede ver cualquier persona. En el caso de ser el coordinador, aparece un botón en la parte inferior para añadir una evaluación (2.1) y una columna más en la tabla con un botón para editar la evaluación (2.2). Para ambos casos se muestra un componente modal. 
En el caso de ser el coordinador o profesor, también aparece una columna con un botón para ver todas las notas de esa evaluación, que redirige a otra página donde se muestran (5.1).

      4.3 **Página *Profesores***. Se muestra una tabla con los distintos profesores de la asignatura (3.1), la cual puede ver cualquier persona. 
En el caso de ser el *owner*, aparece un botón en la parte inferior para añadir un profesor (3.2), que de nuevo, funciona con un componente modal.

      4.4 **Página *Alumnos***. En esta página se muestra una tabla con los distintos alumnos de la asignatura y sólo está accesible para el *owner*, el coordinador o profesores (4.1). En caso de no corresponderse con ese rol, no se muestra en la barra de navegación ni se podrá acceder a ella introduciendo su ruta.
En el caso de ser el *owner*, aparece un botón en la parte inferior para añadir un alumno (4.3), que de nuevo, funciona con un componente modal.
Para que un alumno se pueda automatricular, aparece un botón en el *Header* de la página (4.2). Para ello, seleccionamos la cuenta sin ningún rol y podemos comprobar su funcionamiento. 

      4.5 **Página *Calificaciones***. Se muestra una tabla con todos los alumnos y sus calificaciones en todas las evaluaciones.
En caso de ser el profesor, en cada celda de la tabla aparece un icono de un lápiz para editar esa nota, que funciona con un componente modal, teniendo únicamente que poner el tipo de nota y calificación (5.3).

      4.6 **Página *Notas Finales***. En esta página se muestra una tabla con los distintos alumnos de la asignatura y sus notas finales en la asignatura sólo está accesible para el coordinador o profesores (5.4). En caso de no corresponderse con ese rol, no se muestra en la barra de navegación ni se podrá acceder a ella introduciendo su ruta.

      4.7 **Página *Mis Datos***. Se muestran distintos datos de la cuenta conectada (nombre, correo electrónico, dirección, balance y roles). Los roles también se muestran en todo momento en la barra de navegación (6.1).
En caso de ser alumno, se muestra una tabla con sus calificaciones en todas las evaluaciones (5.2).

Una vez probadas todas las funcionalidades, volvemos a la página *Home* conectado con la cuenta de coordinador, y cerramos la asignatura. Una vez cerrada, podemos ver que aparece una nueva página con todas las calificaciones finales de los alumnos (sólo para *owner*, coordinador y profesores, para el resto sólo se muestra un mensaje), y que desaparece la barra de navegación. Todas las rutas redirigen a esta página una vez la asignatura está cerrada.
