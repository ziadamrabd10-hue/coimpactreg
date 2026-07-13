import AnalysisRequestForm from '@/components/analysis-request-form'

export default function AnalysisRequestPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="max-w-[850px] mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Analysis Request Form
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Statistical Advisory Board · Version 1.0
              </p>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Complete all sections and submit to the Statistical Advisory Board (SAB) at{' '}
                <a
                  href="mailto:andreas.christoforou3@goc.com.cy"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  andreas.christoforou3@goc.com.cy
                </a>{' '}
                prior to commencing analysis. This form serves as both an analysis registration and, where
                applicable, a support request.
              </p>
            </div>
            <AnalysisRequestForm />
          </div>
        </div>
      </div>
    </div>
  )
}
