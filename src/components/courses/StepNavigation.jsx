export default function StepNavigation({ currentStep, onStepChange }) {
  const steps = ['Datos Generales', 'Requisitos', 'Contenido', 'Imagenes']

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between">
        {steps.map((label, i) => (
          <div key={i} className="flex items-center flex-1">
            <button
              onClick={() => onStepChange(i + 1)}
              className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all ${
                currentStep === i + 1
                  ? 'bg-[#6C1313] text-white shadow-lg'
                  : currentStep > i + 1
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {currentStep > i + 1 ? '✓' : i + 1}
            </button>
            <div className="ml-3 flex-1">
              <p className={`text-sm font-medium ${currentStep === i + 1 ? 'text-[#6C1313]' : 'text-gray-600'}`}>
                Paso {i + 1}
              </p>
              <p className={`text-xs ${currentStep === i + 1 ? 'text-gray-900' : 'text-gray-500'}`}>{label}</p>
            </div>
            {i < 2 && (
              <div className={`h-0.5 flex-1 mx-4 ${currentStep > i + 1 ? 'bg-green-500' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
