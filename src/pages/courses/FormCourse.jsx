import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import StepNavigation from '../../components/courses/StepNavigation'
import StepGeneralData from '../../components/courses/StepGeneralData'
import StepRequirements from '../../components/courses/StepRequirements'
import StepContents from '../../components/courses/StepContents'
import StepImages from '../../components/courses/StepImages'
import { getCourseById, createCourse, updateCourse, uploadImage, deleteImage } from '../../api/courses'

export default function FormCourse() {
  const { id } = useParams()
  const isEdit = Boolean(id && id !== 'crear')
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [pendingImages, setPendingImages] = useState({
    course_image: null,
    course_image_detail: null
  });
  const [originalImageUrls, setOriginalImageUrls] = useState({
    course_image: '',
    course_image_detail: ''
  });

  const [courseData, setCourseData] = useState({
    course_data: {
      title: '',
      description: '',
      category: 'TICS',
      status: 'Activo',
      course_image: '',
      course_image_detail: '',
      place: '',
      objectives: [''],
      organizers: [''],
      materials: [''],
      target_audience: ['']
    },
    requirements_data: {
      start_date_registration: '',
      end_date_registration: '',
      start_date_course: '',
      end_date_course: '',
      days: [''],
      start_time: '',
      end_time: '',
      location: '',
      min_quota: 0,
      max_quota: 0,
      in_person_hours: 0,
      autonomous_hours: 0,
      modality: '',
      certification: '',
      prerequisites: [''],
      prices: [{ amount: 0, category: '' }]
    },
    contents_data: [{
      unit: '',
      title: '',
      topics: [{ unit: '', title: '' }]
    }]
  })

    useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);
        const loadedCourse = await getCourseById(id);
        
        // Mapear los datos del curso al formato esperado
        const mappedCourseData = {
          course_data: {
            title: loadedCourse.title || '',
            description: loadedCourse.description || '',
            category: loadedCourse.category || 'TICS',
            // Mapear a valores de UI
            status: loadedCourse.status
              ? (String(loadedCourse.status).toLowerCase() === 'activo'
                  ? 'Activo'
                  : String(loadedCourse.status).toLowerCase() === 'inactivo'
                    ? 'Cerrado'
                    : loadedCourse.status)
              : 'Activo',
            course_image: loadedCourse.course_image || '',
            course_image_detail: loadedCourse.course_image_detail || '',
            place: loadedCourse.place || '',
            objectives: loadedCourse.objectives?.length > 0 ? loadedCourse.objectives : [''],
            organizers: loadedCourse.organizers?.length > 0 ? loadedCourse.organizers : [''],
            materials: loadedCourse.materials?.length > 0 ? loadedCourse.materials : [''],
            target_audience: loadedCourse.target_audience?.length > 0 ? loadedCourse.target_audience : ['']
          },
          requirements_data: {
            start_date_registration: loadedCourse.requirements?.registration?.startDate || '',
            end_date_registration: loadedCourse.requirements?.registration?.endDate || '',
            start_date_course: loadedCourse.requirements?.courseSchedule?.startDate || '',
            end_date_course: loadedCourse.requirements?.courseSchedule?.endDate || '',
            days: loadedCourse.requirements?.courseSchedule?.days?.length > 0 ? loadedCourse.requirements.courseSchedule.days : [''],
            start_time: loadedCourse.requirements?.courseSchedule?.startTime || '',
            end_time: loadedCourse.requirements?.courseSchedule?.endTime || '',
            location: loadedCourse.requirements?.location || '',
            min_quota: loadedCourse.requirements?.quota?.min || 0,
            max_quota: loadedCourse.requirements?.quota?.max || 0,
            in_person_hours: loadedCourse.requirements?.hours?.inPerson || 0,
            autonomous_hours: loadedCourse.requirements?.hours?.autonomous || 0,
            modality: loadedCourse.requirements?.modality || '',
            certification: loadedCourse.requirements?.certification || '',
            prerequisites: loadedCourse.requirements?.prerequisites?.length > 0 ? loadedCourse.requirements.prerequisites : [''],
            prices: loadedCourse.requirements?.prices?.length > 0 ? loadedCourse.requirements.prices : [{ amount: 0, category: '' }]
          },
          contents_data: loadedCourse.contents?.length > 0 ? loadedCourse.contents : [{
            unit: '',
            title: '',
            topics: [{ unit: '', title: '' }]
          }]
        };
        
        setCourseData(mappedCourseData);
        
        // Guardar las URLs originales
        setOriginalImageUrls({
          course_image: loadedCourse.course_image || '',
          course_image_detail: loadedCourse.course_image_detail || ''
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (isEdit) {
      loadCourse();
    } else {
      setLoading(false);
    }
  }, [id, isEdit]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#6C1313] mx-auto mb-4"></div>
          <p className="text-[#6C1313] text-lg">Cargando curso...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Error al cargar el curso</h2>
            <p className="mb-4">{error}</p>
            <button
              onClick={() => navigate('/courses')}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Volver a Cursos
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Curso no encontrado</p>
          <button
            onClick={() => navigate('/dashboard/cursos')}
            className="mt-4 bg-[#6C1313] hover:bg-[#5a0f0f] text-white font-bold py-2 px-6 rounded transition-colors"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  // General Data handlers
  const handleCourseDataChange = (field, value) => {
    setCourseData(prev => ({
      ...prev,
      course_data: {
        ...prev.course_data,
        [field]: value
      }
    }))
  }

  const handleCourseArrayChange = (field, index, value) => {
    setCourseData(prev => ({
      ...prev,
      course_data: {
        ...prev.course_data,
        [field]: prev.course_data[field].map((item, i) => i === index ? value : item)
      }
    }))
  }

  const addCourseArrayItem = (field) => {
    setCourseData(prev => ({
      ...prev,
      course_data: {
        ...prev.course_data,
        [field]: [...prev.course_data[field], '']
      }
    }))
  }

  const removeCourseArrayItem = (field, index) => {
    setCourseData(prev => ({
      ...prev,
      course_data: {
        ...prev.course_data,
        [field]: prev.course_data[field].filter((_, i) => i !== index)
      }
    }))
  }

  // Requirements handlers
  const handleRequirementsChange = (field, value) => {
    setCourseData(prev => ({
      ...prev,
      requirements_data: {
        ...prev.requirements_data,
        [field]: value
      }
    }))
  }

  const handleRequirementsArrayChange = (field, index, value) => {
    setCourseData(prev => ({
      ...prev,
      requirements_data: {
        ...prev.requirements_data,
        [field]: prev.requirements_data[field].map((item, i) => i === index ? value : item)
      }
    }))
  }

  const addRequirementsArrayItem = (field) => {
    setCourseData(prev => ({
      ...prev,
      requirements_data: {
        ...prev.requirements_data,
        [field]: [...prev.requirements_data[field], '']
      }
    }))
  }

  const removeRequirementsArrayItem = (field, index) => {
    setCourseData(prev => ({
      ...prev,
      requirements_data: {
        ...prev.requirements_data,
        [field]: prev.requirements_data[field].filter((_, i) => i !== index)
      }
    }))
  }

  const handlePriceChange = (index, field, value) => {
    setCourseData(prev => ({
      ...prev,
      requirements_data: {
        ...prev.requirements_data,
        prices: prev.requirements_data.prices.map((price, i) => 
          i === index ? { ...price, [field]: value } : price
        )
      }
    }))
  }

  const addPrice = () => {
    setCourseData(prev => ({
      ...prev,
      requirements_data: {
        ...prev.requirements_data,
        prices: [...prev.requirements_data.prices, { amount: 0, category: '' }]
      }
    }))
  }

  const removePrice = (index) => {
    setCourseData(prev => ({
      ...prev,
      requirements_data: {
        ...prev.requirements_data,
        prices: prev.requirements_data.prices.filter((_, i) => i !== index)
      }
    }))
  }

  // Contents handlers
  const handleContentChange = (moduleIndex, field, value) => {
    setCourseData(prev => ({
      ...prev,
      contents_data: prev.contents_data.map((content, i) =>
        i === moduleIndex ? { ...content, [field]: value } : content
      )
    }))
  }

  const handleTopicChange = (moduleIndex, topicIndex, field, value) => {
    setCourseData(prev => ({
      ...prev,
      contents_data: prev.contents_data.map((content, i) =>
        i === moduleIndex ? {
          ...content,
          topics: content.topics.map((topic, j) =>
            j === topicIndex ? { ...topic, [field]: value } : topic
          )
        } : content
      )
    }))
  }

  const addModule = () => {
    setCourseData(prev => ({
      ...prev,
      contents_data: [...prev.contents_data, { unit: '', title: '', topics: [{ unit: '', title: '' }] }]
    }))
  }

  const removeModule = (index) => {
    setCourseData(prev => ({
      ...prev,
      contents_data: prev.contents_data.filter((_, i) => i !== index)
    }))
  }

  const addTopic = (moduleIndex) => {
    setCourseData(prev => ({
      ...prev,
      contents_data: prev.contents_data.map((content, i) =>
        i === moduleIndex ? {
          ...content,
          topics: [...content.topics, { unit: '', title: '' }]
        } : content
      )
    }))
  }

  const removeTopic = (moduleIndex, topicIndex) => {
    setCourseData(prev => ({
      ...prev,
      contents_data: prev.contents_data.map((content, i) =>
        i === moduleIndex ? {
          ...content,
          topics: content.topics.filter((_, j) => j !== topicIndex)
        } : content
      )
    }))
  }

  // Reemplaza el handler de imágenes: solo almacena el archivo
  const handleImageChange = async (field, file) => {
    if (!file) return;
    setPendingImages(prev => ({
      ...prev,
      [field]: file
    }));
    // Crear URL temporal para preview
    const tempUrl = URL.createObjectURL(file);
    handleCourseDataChange(field, tempUrl);
  }

  const handleSubmit = async () => {
    setSaving(true)
    setSubmitError(null)
    
    try {
      // Subir imágenes pendientes antes de guardar
      const imageUrls = { ...courseData.course_data };
      
      for (const field of ['course_image', 'course_image_detail']) {
        if (pendingImages[field]) {
          setImageUploading(true);
          
          // Si estamos editando y hay una imagen anterior, eliminarla
          if (isEdit && originalImageUrls[field]) {
            try {
              await deleteImage(originalImageUrls[field]);
            } catch (deleteError) {
            }
          }
          
          // Subir la nueva imagen
          const uploaded = await uploadImage(pendingImages[field]);
          const newUrl = uploaded?.url || uploaded?.image_url || uploaded?.path;
          if (!newUrl) throw new Error(`No se recibió una URL válida para ${field}`);
          imageUrls[field] = newUrl;
        }
      }
      
      setImageUploading(false);
      
      const uiStatus = String(courseData.course_data.status || '').toLowerCase();
      const normalizedStatus = uiStatus === 'activo' ? 'activo' : uiStatus === 'cerrado' ? 'inactivo' : uiStatus;

      const dataToSend = {
        course_data: {
          ...imageUrls,
          status: normalizedStatus
        },
        requirements_data: courseData.requirements_data,
        contents_data: courseData.contents_data
      };

      if (isEdit) {
        await updateCourse(id, dataToSend);
      } else {
        await createCourse(dataToSend);
      }
      
      navigate('/dashboard/cursos')
    } catch (error) {
      setSubmitError(error.message || 'Error al guardar el curso. Por favor, intente nuevamente.')
    } finally {
      setSaving(false)
      setImageUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <button
                onClick={() => navigate('/dashboard/cursos')}
                className="flex items-center text-[#6C1313] hover:text-[#5a0f0f] transition-colors font-medium mb-5"
            >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Volver
            </button>
          <h1 className="text-3xl font-bold text-gray-900">{isEdit ? 'Editar Curso' : 'Crear Nuevo Curso'}</h1>
          <p className="text-gray-600 mt-2">Complete la información del curso en los siguientes pasos</p>
        </div>

        {/* Step Navigation */}
        <StepNavigation currentStep={step} onStepChange={setStep} totalSteps={4} />

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          {step === 1 && (
            <StepGeneralData
              courseData={courseData.course_data}
              onChange={handleCourseDataChange}
              onArrayChange={handleCourseArrayChange}
              onAddArrayItem={addCourseArrayItem}
              onRemoveArrayItem={removeCourseArrayItem}
            />
          )}

          {step === 2 && (
            <StepRequirements
              requirementsData={courseData.requirements_data}
              onChange={handleRequirementsChange}
              onArrayChange={handleRequirementsArrayChange}
              onAddArrayItem={addRequirementsArrayItem}
              onRemoveArrayItem={removeRequirementsArrayItem}
              onPriceChange={handlePriceChange}
              onAddPrice={addPrice}
              onRemovePrice={removePrice}
            />
          )}

          {step === 3 && (
            <StepContents
              contentsData={courseData.contents_data}
              onContentChange={handleContentChange}
              onTopicChange={handleTopicChange}
              onAddModule={addModule}
              onRemoveModule={removeModule}
              onAddTopic={addTopic}
              onRemoveTopic={removeTopic}
            />
          )}

          {/* Step 4 now uses a component */}
          {step === 4 && (
            <StepImages
              banner={courseData.course_data.course_image}
              detail={courseData.course_data.course_image_detail}
              onChangeImage={handleImageChange}
            />
          )}
        </div>
        {/* Error message if submit fails */}
        {submitError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6">
            <p className="font-semibold">Error al guardar</p>
            <p>{submitError}</p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="bg-white rounded-lg shadow-sm p-6 flex justify-between items-center">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1 || imageUploading}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition font-medium"
          >
            ← Anterior
          </button>

          <div className="text-sm text-gray-600">
            {imageUploading ? 'Subiendo imagen...' : `Paso ${step} de 4`}
          </div>

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={imageUploading}
              className="px-6 py-3 bg-[#6C1313] hover:bg-[#5a0f0f] text-white rounded-lg transition font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={saving || imageUploading}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold shadow-lg"
            >
              {saving ? '⏳ Guardando...' : (imageUploading ? 'Espere, subiendo imagen...' : (isEdit ? '✓ Guardar Cambios' : '✓ Guardar Curso'))}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}