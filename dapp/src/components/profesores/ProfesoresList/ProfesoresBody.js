import {drizzleReactHooks} from '@drizzle/react-plugin'

import ProfesorRow from "./ProfesorRow";

const {useDrizzle} = drizzleReactHooks;

const ProfesoresBody = () => {
    const {useCacheCall} = useDrizzle();

    const numProfesores = useCacheCall("Asignatura", "profesoresLength") || 0;

    let rows = [];
    for (let i = 0; i < numProfesores; i++) {
        rows.push(<ProfesorRow key={"ab-"+i} profesorIndex={i}/>);
    }

    return <tbody>{rows}</tbody>;
};

export default ProfesoresBody;
