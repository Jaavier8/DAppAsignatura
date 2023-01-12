import { BrowserRouter, Routes, Route } from "react-router-dom";

import Loading from './components/Loading';
import Layout from './components/Layout';
import AlumnosPage from "./components/alumnos/AlumnosPage";
import AlumnoDetail from "./components/alumnos/AlumnoDetail";
import CalificacionesPage from "./components/calificaciones/CalificacionesPage";
import CalificacionesEvaluacion from "./components/calificaciones/CalificacionesEvaluacion";
import MisCosasPage from "./components/misCosas/MisCosasPage";
import NotasAlumno from "./components/calificaciones/NotasAlumno";
import NotasFinales from "./components/calificaciones/NotasFinales";
import NoMatch from './components/NoMatch';

import HomeScreen from './pages/HomeScreen';
import EvaluationsScreen from "./pages/EvaluationsScreen";
import ProfessorsScreen from "./pages/ProfessorsScreen";

function App() {

    return (
        <Loading>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<HomeScreen />} />
                        <Route path="evaluaciones" element={<EvaluationsScreen />} />
                        <Route path="alumnos" element={<AlumnosPage />} />
                        <Route path="alumnos/:addr" element={<AlumnoDetail />} />
                        <Route path="profesores" element={<ProfessorsScreen />} />
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