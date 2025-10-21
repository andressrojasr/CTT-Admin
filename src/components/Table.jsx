import { useState, useMemo } from "react";

export default function Table({ headers = [], data = [], filters = {} }) {
  const [search, setSearch] = useState("");
  const [columnFilters, setColumnFilters] = useState({});

  // Manejar filtro por columna
  const handleFilterChange = (column, value) => {
    setColumnFilters((prev) => ({ ...prev, [column]: value }));
  };

  // Datos filtrados: búsqueda global + filtros por columna
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      // Búsqueda global
      const matchesSearch = !search
        ? true
        : headers.some((header) =>
            String(row[header]).toLowerCase().includes(search.toLowerCase())
          );

      // Filtros por columna
      const matchesFilters = headers.every((header) => {
        if (!columnFilters[header] || columnFilters[header] === "All") return true;
        return String(row[header]) === columnFilters[header];
      });

      return matchesSearch && matchesFilters;
    });
  }, [search, columnFilters, data, headers]);

  return (
    <div className="flex flex-col space-y-4">
      {/* Controles de búsqueda */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6C1313] focus:border-[#6C1313]"
        />

        {/* Filtros por columna */}
        <div className="flex flex-wrap gap-2">
          {headers.map(
            (header) =>
              filters[header] && (
                <select
                  key={header}
                  value={columnFilters[header] || "All"}
                  onChange={(e) => handleFilterChange(header, e.target.value)}
                  className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6C1313] focus:border-[#6C1313] text-sm"
                >
                  <option value="All">Todos {header}</option>
                  {filters[header].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )
          )}
        </div>
      </div>

      {/* Tabla */}
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#6C1313]">
                <tr>
                  {headers.map((header, idx) => (
                    <th
                      key={idx}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.length > 0 ? (
                  filteredData.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={
                        rowIndex % 2 === 0
                          ? "bg-white hover:bg-gray-100"
                          : "bg-gray-50 hover:bg-gray-100"
                      }
                    >
                      {headers.map((header, colIndex) => (
                        <td
                          key={colIndex}
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                        >
                          {row[header]}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={headers.length}
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No se encontraron resultados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
