import api from './api';

export const getCourses = async () => {
    try {
        const response = await api.get('/courses');
        const data = (response.data);

        if (!data.courses) {
            throw new Error('No se encontraron cursos en la respuesta de la API');
        }

        return data.courses;
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            throw new Error('Tiempo de espera agotado. Verifica tu conexión a internet.');
        }
        if (error.response) {
            throw new Error(`Error del servidor: ${error.response.status} - ${error.response.data?.message || 'Error desconocido'}`);
        }
        throw new Error(`Error de red: ${error.message}`);
    }
};


export const getCoursesByCategory = async (category) => {
    try {
        const response = await api.get(`/courses/category/${encodeURIComponent(category)}`);
        const data = (response.data);

        if (!data.courses) {
            throw new Error('No se encontraron cursos en la respuesta de la API');
        }

        return data.courses;
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            throw new Error('Tiempo de espera agotado. Verifica tu conexión a internet.');
        }
        if (error.response) {
            throw new Error(`Error del servidor: ${error.response.status} - ${error.response.data?.message || 'Error desconocido'}`);
        }
        throw new Error(`Error de red: ${error.message}`);
    }
};

export const getCourseById = async (courseId) => {
    try {
        const response = await api.get(`/courses/${courseId}`);
        return response.data;
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            throw new Error('Tiempo de espera agotado. Verifica tu conexión a internet.');
        }
        if (error.response) {
            throw new Error(`Error del servidor: ${error.response.status} - ${error.response.data?.message || 'Error desconocido'}`);
        }
        throw new Error(`Error de red: ${error.message}`);
    }
};

/**
 * Obtiene cursos filtrados por rango de horas
 * @param {number} minHours - Horas mínimas
 * @param {number} maxHours - Horas máximas
 * @returns {Promise<Course[]>} Lista de cursos filtrados por horas
 * @throws {Error} Si ocurre un error en la petición
 */
export const getCoursesByHoursRange = async (minHours, maxHours) => {
    try {
        const response = await api.get(`/courses/hours-range/?min_hours=${minHours}&max_hours=${maxHours}`);
        const data = response.data;

        if (!data.courses) {
            throw new Error('No se encontraron cursos en la respuesta de la API');
        }

        return data.courses;
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            throw new Error('Tiempo de espera agotado. Verifica tu conexión a internet.');
        }
        if (error.response) {
            throw new Error(`Error del servidor: ${error.response.status} - ${error.response.data?.message || 'Error desconocido'}`);
        }
        throw new Error(`Error de red: ${error.message}`);
    }
};