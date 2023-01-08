
import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const SoyProfesor = ({children}) => {
    const {useCacheCall} = useDrizzle();
    const drizzleState = useDrizzleState(state => state);

    const connected = drizzleState.accounts[0];

    const isProfesor = useCacheCall("Asignatura", "datosProfesor", connected) !== "";

    if (!isProfesor) {
        return null
    }
    return <>
        {children}
    </>

};

export default SoyProfesor;
