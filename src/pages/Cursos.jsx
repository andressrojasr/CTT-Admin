import { useEffect, useState } from "react";
import { getCourses, getCoursesByCategory } from "../api/courses";
import { EyeIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import AOS from "aos";
import "aos/dist/aos.css";

const headers = ["id", "titulo", "horas", "estado", "acciones"];

const filters = {
  estado: ["Activo", "Cerrado"],
};

export default function Cursos() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [categorySelected, setCategorySelected] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const navigate = useNavigate();

  const loadCourses = async (
    category = "Todos",
    pageRequested = 1,
    pageSizeRequested = pageSize,
    status = statusFilter
  ) => {
    try {
      setLoading(true);
      setError(null);

      const response =
        category && category !== "Todos"
          ? await getCoursesByCategory(
              category,
              pageRequested,
              pageSizeRequested,
              status
            )
          : await getCourses(pageRequested, pageSizeRequested, status);
        console.log("API Response:", response);
      // Manejar ambos formatos de respuesta
      const coursesArray = Array.isArray(response)
        ? response
        : response?.courses || [];
      const respTotal = response?.total ?? (Array.isArray(response) ? response.length : 0);
      const respPageSize = response?.page_size ?? pageSizeRequested;
      const respTotalPages = response?.total_pages ?? Math.max(1, Math.ceil(respTotal / respPageSize));

      // Transformar los datos de la API para que coincidan con la estructura esperada por CardCourse
      const transformedCourses = coursesArray.map((course) => ({
        titulo: course.title,
        estado: (() => {
          const s = String(course.status || "").toLowerCase();
          if (s === "activo") return "Activo";
          if (s === "inactivo") return "Cerrado";
          return s ? s[0].toUpperCase() + s.slice(1) : "";
        })(),
        horas: course.requirements?.hours?.total?.toString() || "0",
        id: course.id,
        acciones: (
          <div className="flex gap-2">
            <button onClick={() => navigate(`/dashboard/cursos/${course.id}`)}>
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
      setTotal(respTotal);
      setPage(pageRequested);
      setPageSize(respPageSize);
      setTotalPages(respTotalPages);
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

  const handleFilterChange = (filterColumn, value) => {
    if (filterColumn === "estado") {
      // Mapear valores de UI a valores de API
      let statusValue = null;
      if (value === "Activo") {
        statusValue = "activo";
      } else if (value === "Cerrado") {
        statusValue = "inactivo";
      }
      
      setStatusFilter(statusValue);
      // Resetear a página 1 cuando cambia el filtro
      loadCourses(categorySelected || "Todos", 1, pageSize, statusValue);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Cursos</h1>
        <button
          onClick={() => navigate("/dashboard/cursos/crear/editar")}
          className="px-4 py-2 bg-[#6C1313] hover:bg-[#5a0f0f] text-white rounded-lg transition"
        >
          + Crear curso
        </button>
      </div>
      <div className="mb-4">
        <Table
          headers={headers}
          data={courses}
          filters={filters}
          page={page}
          pageSize={pageSize}
          total={total}
          totalPages={totalPages}
          loading={loading}
          onPageChange={(newPage) =>
            loadCourses(categorySelected || "Todos", newPage, pageSize, statusFilter)
          }
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            loadCourses(categorySelected || "Todos", 1, newSize, statusFilter);
          }}
          onFilterChange={handleFilterChange}
        />
      </div>
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </div>
  );
}
