import {drizzleReactHooks} from '@drizzle/react-plugin'
import {Link} from "react-router-dom";

const {useDrizzle} = drizzleReactHooks;

const ProfesorRow = ({profesorIndex}) => {
    const {useCacheCall} = useDrizzle();

    let name = useCacheCall(['Asignatura'],
        call => {
            const addr = call("Asignatura", "profesores", profesorIndex);
            const name = addr && call("Asignatura", "datosProfesor", addr);
            return name;
        }
    );

    return <tr key={"PRO-" + profesorIndex}>
        <th>P<sub>{profesorIndex}</sub></th>
        <td>{name}</td>
    </tr>;
};

export default ProfesorRow;
