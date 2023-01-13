import { BrowserRouter, Routes, Route } from "react-router-dom";

import Loading from './components/Loading';
import Layout from './components/Layout';
import NoMatch from './components/NoMatch';

import HomeScreen from './pages/HomeScreen';
import EvaluationsScreen from "./pages/EvaluationsScreen";
import ProfessorsScreen from "./pages/ProfessorsScreen";
import StudentsScreen from "./pages/StudentsScreen";
import StudentDataScreen from "./pages/StudentDataScreen";
import MyInfoScreen from "./pages/MyInfoScreen";
import EvaluationCalificationsScreen from "./pages/EvaluationCalificationsScreen";
import CalificationsScreen from "./pages/CalificationsScreen";
import FinalCalificationsScreen from "./pages/FinalCalificationsScreen";

function App() {

    return (
        <Loading>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<HomeScreen />} />
                        <Route path="evaluaciones" element={<EvaluationsScreen />} />
                        <Route path="alumnos" element={<StudentsScreen />} />
                        <Route path="alumnos/:addr" element={<StudentDataScreen />} />
                        <Route path="profesores" element={<ProfessorsScreen />} />
                        <Route path="calificacionesEv/:id" element={<EvaluationCalificationsScreen />} />
                        <Route path="calificaciones" element={<CalificationsScreen />} />
                        <Route path="miscosas" element={<MyInfoScreen />} />
                        <Route path="notasfinales" element={<FinalCalificationsScreen />} />
                        <Route path="*" element={<NoMatch />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Loading>
    );
}

export default App;