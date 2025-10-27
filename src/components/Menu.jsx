import { NavLink } from 'react-router-dom'
import { useState } from 'react'

export default function Menu ({ items }) {
  const [isOpen, setIsOpen] = useState(false)
  
  const menuItems = [
    { name: "Cursos", path: "/dashboard/cursos" },
    { name: "Estudiantes", path: "/dashboard/estudiantes" },
    { name: "Reportes", path: "/dashboard/reports" },
    { name: "Configuración", path: "/dashboard/settings" },
  ];

  return (
    <>
      {/* Botón hamburguesa - solo visible en pantallas pequeñas y medianas */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#6C1313] text-white rounded"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay - solo visible cuando el menú está abierto en móvil */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menú lateral */}
      <aside className={`
        w-64 bg-[#6C1313] text-white flex flex-col
        fixed lg:static inset-y-0 left-0 z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Encabezado del panel */}
        <div className="p-4 text-xl font-bold border-b border-white">
          Panel Administrativo
        </div>

        {/* Menú dinámico */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block p-2 rounded transition-colors duration-200 
                ${isActive ? "bg-white font-semibold NavLink" : " text-white hover:bg-white hover:!text-[#6C1313]"}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}