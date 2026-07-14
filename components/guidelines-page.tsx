'use client'

import Link from 'next/link'
import {
  ClipboardList,
  Download,
  ExternalLink,
  FileText,
  ShieldCheck,
} from 'lucide-react'

const documents = [
  {
    title: 'Standard Operating Procedures',
    version: 'Version 2 · 13.07.2026',
    description:
      'Roles, responsibilities, funding, authorship rules, new center approval, and consortium procedures.',
    href: '/documents/Co-IMPACT_SOP_v2.docx',
    filename: 'Co-IMPACT_SOP_v2.docx',
    buttonLabel: 'Download SOP',
    icon: FileText,
    accent: 'border-t-[#1a365d]',
    buttonClass: 'bg-[#1a365d] hover:bg-[#2d4a7c]',
    iconClass: 'text-[#1a365d] bg-blue-50',
  },
  {
    title: 'Data Governance & Statistical Oversight Policy',
    version: 'Version 1.0',
    description:
      'Methodology and governance for preparing, harmonising, and analysing clinical data across Co-IMPACT sub-projects 1–4.',
    href: '/documents/CoIMPACT_Data_Governance_Policy_v1.docx',
    filename: 'CoIMPACT_Data_Governance_Policy_v1.docx',
    buttonLabel: 'Download Policy',
    icon: ShieldCheck,
    accent: 'border-t-teal-600',
    buttonClass: 'bg-teal-600 hover:bg-teal-700',
    iconClass: 'text-teal-600 bg-teal-50',
  },
  {
    title: 'Analysis Request Form',
    version: 'Version 1.0 · Statistical Advisory Board',
    description:
      'Register an analysis and optionally request SAB support. Complete the form and submit it to Andreas Christoforou before starting analysis.',
    href: '/documents/CoIMPACT_Analysis_Request_Form_v1.docx',
    filename: 'CoIMPACT_Analysis_Request_Form_v1.docx',
    buttonLabel: 'Download Form',
    icon: ClipboardList,
    accent: 'border-t-violet-600',
    buttonClass: 'bg-violet-600 hover:bg-violet-700',
    iconClass: 'text-violet-600 bg-violet-50',
    isForm: true,
  },
] as const

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/60 to-[#f8fafc] pt-10 pb-14">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <svg
            className="absolute bottom-0 w-full h-32"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 60C240 100 480 20 720 60C960 100 1200 20 1440 60V120H0V60Z"
              fill="url(#wave)"
              fillOpacity="0.3"
            />
            <defs>
              <linearGradient id="wave" x1="0" y1="0" x2="1440" y2="0">
                <stop stopColor="#0ea5e9" />
                <stop offset="1" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a365d] tracking-tight">
            CO-IMPACT Guidelines &amp; Documents
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Official consortium documents for download.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {documents.map((doc) => {
            const Icon = doc.icon
            return (
              <div
                key={doc.href}
                className={`bg-white rounded-xl shadow-md border border-gray-100 border-t-4 ${doc.accent} p-6 flex flex-col`}
              >
                <div className={`inline-flex p-3 rounded-lg w-fit ${doc.iconClass}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="mt-4 text-lg font-bold text-[#1a365d] leading-snug">{doc.title}</h2>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed flex-1">{doc.description}</p>
                <p className="mt-3 text-xs text-gray-400 font-medium">{doc.version}</p>

                {'isForm' in doc && doc.isForm ? (
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <a
                      href={doc.href}
                      download={doc.filename}
                      className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium text-white transition-colors ${doc.buttonClass}`}
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </a>
                    <Link
                      href="/analysis-request"
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg border-2 border-violet-600 px-3 py-2.5 text-sm font-medium text-violet-600 hover:bg-violet-50 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Submit Online
                    </Link>
                  </div>
                ) : (
                  <a
                    href={doc.href}
                    download={doc.filename}
                    className={`mt-5 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-colors ${doc.buttonClass}`}
                  >
                    <Download className="h-4 w-4" />
                    {doc.buttonLabel}
                  </a>
                )}
              </div>
            )
          })}
        </div>

        <p className="mt-6 text-sm text-gray-500 text-center max-w-3xl mx-auto">
          Analysis requests must be submitted to the Statistical Advisory Board at{' '}
          <a href="mailto:andreas.christoforou3@goc.com.cy" className="text-teal-600 hover:underline font-medium">
            andreas.christoforou3@goc.com.cy
          </a>{' '}
          prior to commencing analysis.
        </p>
      </section>
    </div>
  )
}
