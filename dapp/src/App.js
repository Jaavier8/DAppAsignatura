import { BrowserRouter, Routes, Route } from "react-router-dom";

import Loading from './components/Loading';
import Layout from './components/Layout';
import HomePage from './components/home/HomePage';
import EvaluacionesPage from "./components/evaluaciones/EvaluacionesPage";
import EvaluacionPage from "./components/evaluaciones/EvaluacionPage";
import AlumnosPage from "./components/alumnos/AlumnosPage";
import AlumnoDetail from "./components/alumnos/AlumnoDetail";
import ProfesoresPage from "./components/profesores/ProfesoresPage";
import CalificacionesPage from "./components/calificaciones/CalificacionesPage";
import CalificacionesEvaluacion from "./components/calificaciones/CalificacionesEvaluacion";
import MisCosasPage from "./components/misCosas/MisCosasPage";
import NotasAlumno from "./components/calificaciones/NotasAlumno";
import NotasFinales from "./components/calificaciones/NotasFinales";
import NoMatch from './components/NoMatch';

import HomeScreen from './pages/HomeScreen';

function App() {

    return (
        <Loading>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<HomeScreen />} />
                        <Route path="evaluaciones" element={<EvaluacionesPage />} />
                        <Route path="evaluaciones/:id" element={<EvaluacionPage />} />
                        <Route path="alumnos" element={<AlumnosPage />} />
                        <Route path="alumnos/:addr" element={<AlumnoDetail />} />
                        <Route path="profesores" element={<ProfesoresPage />} />
                        <Route path="calificacionesEv/:id" element={<CalificacionesEvaluacion />} />
                        <Route path="calificaciones" element={<CalificacionesPage />} />
                        <Route path="miscosas" element={<MisCosasPage />} />
                        <Route path="misnotas" element={<NotasAlumno />} />
                        <Route path="notasfinales" element={<NotasFinales />} />
                        <Route path="*" element={<NoMatch />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Loading>
    );
}

export default App;