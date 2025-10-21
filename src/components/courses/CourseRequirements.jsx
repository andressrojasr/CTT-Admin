export default function CourseRequirements({ course }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Requisitos del Curso
            </h2>

            <div className="prose prose-lg text-gray-600">
                {course.requirements?.prerequisites?.map((prerequisite, index) => (
                    <p key={index} className="mb-2">• {prerequisite}</p>
                ))}
            </div>
        </div>
    );
}
