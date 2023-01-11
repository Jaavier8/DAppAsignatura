import { BrowserRouter, Routes, Route } from "react-router-dom";

import '../css/App.css';
import Loading from './Loading';
import Layout from './Layout';
import HomePage from './home/HomePage';
import EvaluacionesPage from "./evaluaciones/EvaluacionesPage";
import EvaluacionPage from "./evaluaciones/EvaluacionPage";
import AlumnosPage from "./alumnos/AlumnosPage";
import AlumnoDetail from "./alumnos/AlumnoDetail";
import ProfesoresPage from "./profesores/ProfesoresPage";
import CalificacionesPage from "./calificaciones/CalificacionesPage";
import CalificacionesEvaluacion from "./calificaciones/CalificacionesEvaluacion";
import MisCosasPage from "./misCosas/MisCosasPage";
import NotasAlumno from "./calificaciones/NotasAlumno";
import NotasFinales from "./calificaciones/NotasFinales";
import NoMatch from './NoMatch';

function App() {
    return (
        <div className="App">
            <Loading>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout/>}>
                            <Route index element={<HomePage/>}/>
                            <Route path="evaluaciones" element={<EvaluacionesPage/>}/>
                            <Route path="evaluaciones/:id" element={<EvaluacionPage/>}/>
                            <Route path="alumnos" element={<AlumnosPage/>}/>
                            <Route path="alumnos/:addr" element={<AlumnoDetail/>}/>
                            <Route path="profesores" element={<ProfesoresPage/>}/>
                            <Route path="calificacionesEv/:id" element={<CalificacionesEvaluacion/>}/>
                            <Route path="calificaciones" element={<CalificacionesPage/>}/>
                            <Route path="miscosas" element={<MisCosasPage/>}/>
                            <Route path="misnotas" element={<NotasAlumno/>}/>
                            <Route path="notasfinales" element={<NotasFinales/>}/>
                            <Route path="*" element={<NoMatch/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Loading>
        </div>
    );
}

export default App;