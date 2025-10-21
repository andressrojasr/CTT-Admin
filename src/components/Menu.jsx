import { NavLink } from 'react-router-dom'

export default function Menu ({ items }) {
  
  const menuItems = [
    { name: "Cursos", path: "/dashboard/cursos" },
    { name: "Reportes", path: "/dashboard/reports" },
    { name: "Configuración", path: "/dashboard/settings" },
  ];

  return (
    <aside className="w-64 bg-[#6C1313] text-white flex flex-col">
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
  )
}