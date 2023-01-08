import { drizzleReactHooks } from '@drizzle/react-plugin'

const { useDrizzle } = drizzleReactHooks;

const CalificacionesHead = () => {
    const { useCacheCall } = useDrizzle();

    let thead = [];
    thead.push(<th key={"chn"}>Nombre</th>);
    thead.push(<th key={"chev"}>Nota</th>);

    return <thead><tr>{thead}</tr></thead>;
};

export default CalificacionesHead;
