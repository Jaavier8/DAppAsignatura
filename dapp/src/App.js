import { BrowserRouter, Routes, Route } from "react-router-dom";

import Loading from './components/Loading';
import Layout from './components/Layout';

import HomeScreen from './pages/HomeScreen';
import EvaluationsScreen from "./pages/EvaluationsScreen";
import ProfessorsScreen from "./pages/ProfessorsScreen";
import StudentsScreen from "./pages/StudentsScreen";
import StudentDataScreen from "./pages/StudentDataScreen";
import MyInfoScreen from "./pages/MyInfoScreen";
import EvaluationCalificationsScreen from "./pages/EvaluationCalificationsScreen";
import CalificationsScreen from "./pages/CalificationsScreen";
import FinalCalificationsScreen from "./pages/FinalCalificationsScreen";
import NoMatchScreen from "./pages/NoMatchScreen";
import ClosedScreen from "./pages/ClosedScreen";

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
                        <Route path="closed" element={<ClosedScreen />} />
                        <Route path="*" element={<NoMatchScreen />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Loading>
    );
}

export default App;