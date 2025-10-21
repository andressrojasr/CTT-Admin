import { CheckCircleIcon, BookOpenIcon } from "@heroicons/react/24/outline";

export default function CourseContent({ course }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <BookOpenIcon className="h-6 w-6 text-[#6C1313] mr-3" />
                Temario del Curso
            </h2>

            <div className="space-y-6">
                {course.contents?.map((module, moduleIndex) => (
                    <div key={moduleIndex} className="border-l-4 border-[#6C1313] pl-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            {module.unit}: {module.title}
                        </h3>

                        <div className="space-y-3">
                            {module.topics?.map((topic, topicIndex) => (
                                <div key={topicIndex} className="flex items-start space-x-3">
                                    <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <span className="font-medium text-gray-700">
                                            {topic.unit}:
                                        </span>
                                        <span className="text-gray-600 ml-2">
                                            {topic.title}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
