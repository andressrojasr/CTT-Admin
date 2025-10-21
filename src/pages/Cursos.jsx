import { useEffect, useState } from "react";
import { getCourses, getCoursesByCategory } from "../api/courses"
import { EyeIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import AOS from "aos"
import 'aos/dist/aos.css'


const headers = ["id", "titulo", "horas", "estado", "acciones"];

const filters = {
  estado: ["Activo", "Cerrado"]
};

export default function Cursos () {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const loadCourses = async (category = null) => {
        try {
            setLoading(true);
            setError(null);
    
            // Si category es null o 'Todos', obtenemos todos los cursos
            // Si category tiene un valor específico, filtramos por categoría
            const coursesData = category && category !== 'Todos'
                ? await getCoursesByCategory(category)
                : await getCourses();
    
            // Transformar los datos de la API para que coincidan con la estructura esperada por CardCourse
            const transformedCourses = coursesData.map(course => ({
                titulo: course.title,
                estado: course.status,
                horas: course.requirements?.hours?.total?.toString() || '0',
                id: course.id,
                acciones: (
                    <div className="flex gap-2">
                        <button 
                            onClick={() => navigate(`/dashboard/cursos/${course.id}`)} 
                        >
                            <EyeIcon className="h-5 w-5 inline-block" />  
                        </button>
                        <button
                            onClick={() => navigate(`/dashboard/cursos/${course.id}/editar`)}
                        >
                            Editar
                        </button>
                        <button
                            className="rojo"
                            onClick={() => alert(`Eliminar ${course.title}`)}
                        >
                            Eliminar
                        </button>
                    </div>
                ),
            }));
            setCourses(transformedCourses);
        } catch (err) {
                setError(err.message);
        } finally {
                setLoading(false);
        }
    };
    useEffect(() => {
            AOS.init({ duration: 1000, once: false, mirror: true });
            AOS.refresh();
            loadCourses();
    }, []);
    return (
        <div className="p-4">
        <Table headers={headers} data={courses} filters={filters} />
        </div>
  )
}
