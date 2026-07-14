import SopOnlineContent from '@/components/sop-online-content'

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/60 to-[#f8fafc] pt-10 pb-10">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1a365d] tracking-tight">Downloads</h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Read the Co-IMPACT Standard Operating Procedures online or download the official document.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <SopOnlineContent />
      </section>
    </div>
  )
}
