'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BookOpen, ChevronDown, ChevronRight, Download, Info, Shield } from 'lucide-react'

const navSections = [
  { id: 'purpose', label: '1. Purpose' },
  { id: 'introduction', label: '2. Introduction & Scope' },
  { id: 'objectives', label: '3. Objectives' },
  { id: 'responsibilities', label: '4. Responsibilities' },
  { id: 'procedures', label: '5. Procedures & Rules' },
  { id: 'abbreviations', label: '6. Abbreviations' },
  { id: 'monitoring', label: '7. Monitoring' },
  { id: 'references', label: '8. Guidelines & References' },
] as const

const abbreviations = [
  { abbr: 'SOP', full: 'Standard Operating Procedure' },
  { abbr: 'PI', full: 'Principal Investigator' },
  { abbr: 'DTA', full: 'Data Transfer Agreement' },
  { abbr: 'GDPR', full: 'General Data Protection Regulation' },
  { abbr: 'SAB', full: 'Statistical Advisory Board' },
  { abbr: 'REDCap', full: 'Research Electronic Data Capture' },
] as const

const procedureSections = [
  {
    id: 'funding',
    title: '5.1 Funding',
    content: (
      <>
        <p className="mb-3 text-gray-600 leading-relaxed">
          All Co-IMPACT PIs can apply for funding for the consortium via different sources including private,
          governmental and other. All funding actions must be approved by the PIs. The main aim is to ensure a
          smooth operation of the project related work, especially the data management and the administrative
          tasks. Additionally, the organization of consortium meetings is a major aim.
        </p>
        <p className="mb-3 text-gray-600 leading-relaxed">
          All contracts/funding proposals will be shared among the PIs just for transparency and centrally stored.
        </p>
        <p className="mb-3 text-gray-600 leading-relaxed">
          Regarding industry/private sponsors a two-level system will be applied:
        </p>
        <div className="pl-4 mb-3">
          <h5 className="font-semibold text-[#1a365d] mb-2">Level 1: General Sponsorship</h5>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>
              Sponsors at this level provide funding to support Co-IMPACT as a whole, rather than any specific
              project or topic.
            </li>
            <li>
              These sponsors will be acknowledged in all Co-IMPACT publications, on the website, and in every
              presentation.
            </li>
          </ul>
        </div>
        <div className="pl-4">
          <h5 className="font-semibold text-[#1a365d] mb-2">Level 2: Project-Specific Sponsorship</h5>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Sponsors at this level may apply to collaborate on a project utilizing Co-IMPACT data.</li>
            <li>
              While direct access to clinical data or imaging will not be granted, sponsors can request an
              analysis contingent on approval by the Principal Investigators (PIs).
            </li>
            <li>
              They are welcome to participate in Co-IMPACT meetings when discussions pertain to their dedicated
              project.
            </li>
            <li>
              Additionally, they may propose ancillary projects that do not involve clinical or imaging data,
              such as studies related to treatment concepts, including those based on questionnaire-based research.
            </li>
            <li>Level 2 sponsorships must also apply for a level 1 sponsorship.</li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'centers',
    title: '5.2 Approval of new study centers',
    content: (
      <>
        <p className="mb-3 text-gray-600 leading-relaxed">
          Centers interested in participating in Co-IMPACT may apply by directly contacting a Principal
          Investigator (PI) or through the Co-IMPACT website. Applications must follow a designated template (see{' '}
          <Link href="/register" className="text-teal-600 hover:underline font-medium">
            center application form
          </Link>
          ), which should include the names of the primary local participants, the expected number of patients,
          the need for a signed DTA and the approximated time to complete a DTA, the sub-projects of interest,
          and confirmation regarding the ability to share DICOM data.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Each application will be shared within the consortium PIs and a majority vote is needed to include a
          center. Each PI has a time frame of 2 weeks to reject a center including a plausible explanation,
          otherwise the application will be automatically approved. Upon this step, the approved new center will
          receive the DTA, the study protocol and the data exchange files.
        </p>
      </>
    ),
  },
  {
    id: 'authorship',
    title: '5.3 Authorship rights',
    content: (
      <>
        <p className="mb-3 text-gray-600 leading-relaxed">
          1. First/Last Authorships — For each paper resulting from a pre-specified analysis using the Co-IMPACT
          database, the responsible institution(s) are defined. This/These institution(s) is/are allowed to name
          the first and last authors.
        </p>
        <p className="mb-3 text-gray-600 leading-relaxed">
          2. Co-authors — All Co-IMPACT PIs must be named as Co-authors in the main author line. The policy
          considers the number of patients included in each sub-project (Co-IMPACT 1-4) according to the following
          co-authorship guidelines:
        </p>
        <div className="pl-4 mb-3">
          <h5 className="font-semibold text-[#1a365d] mb-2">Papers Including Only Clinical Data</h5>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Up to 100 patients: 2 names as PubMed indexed author collaborators</li>
            <li>
              More than 100 but fewer than 200 patients: 1 name on the main author line; 1 name as PubMed indexed
              author collaborator
            </li>
            <li>
              More than 200 but fewer than 300 patients: 2 names on the main author line; 2 names as PubMed
              indexed author collaborators
            </li>
            <li>
              More than 300 patients: 3 names on the main author line; 3 names as PubMed indexed author
              collaborators
            </li>
          </ul>
        </div>
        <div className="pl-4">
          <h5 className="font-semibold text-[#1a365d] mb-2">Papers Including Clinical and Imaging Data</h5>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Up to 100 patients: 1* name on the main author line; 2 names as PubMed indexed author collaborators</li>
            <li>
              More than 100 but fewer than 200 patients: 2* names on the main author line; 2 names as PubMed
              indexed author collaborators
            </li>
            <li>
              More than 200 patients: 3* names on the main author line; 3 names as PubMed indexed author
              collaborators
            </li>
          </ul>
          <p className="mt-2 text-sm italic text-gray-500">
            * Depending on journal restrictions, the responsible institutions may name up to 1–3 additional
            authors for the main author line. The Co-IMPACT PIs remain in the main author line.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'changes',
    title: '5.4 Changes of the study protocol, DTA or data exchange files',
    content: (
      <>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>All centers may submit their comments to a/the PI(s) or administrative staff.</li>
          <li>The request is discussed among the PIs and with the requesting party.</li>
          <li>If a majority vote favors the change, the relevant PIs will implement the modification.</li>
          <li>The change is then communicated to all participating centers.</li>
        </ul>
        <p className="mt-3 text-gray-600 leading-relaxed">
          These rules apply for changes in the study protocol, the DTA and the data exchange files.
        </p>
        <p className="mt-2 text-gray-500 text-sm italic">
          Minor adjustments may be collected and incorporated into a protocol amendment at a later stage to
          minimize bureaucratic overhead.
        </p>
      </>
    ),
  },
  {
    id: 'data-submission',
    title: '5.5 Clinical data submission and initial quality check',
    content: (
      <p className="text-gray-600 leading-relaxed">
        Please see the{' '}
        <a
          href="/documents/CoIMPACT_Data_Governance_Policy_v1.docx"
          download
          className="text-teal-600 hover:underline font-medium"
        >
          Co-IMPACT Data Governance Policy
        </a>
        .
      </p>
    ),
  },
] as const

function ProcedureAccordion({
  title,
  content,
  isOpen,
  onToggle,
}: {
  title: string
  content: React.ReactNode
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-4 py-3.5 text-left transition-colors ${
          isOpen ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'
        }`}
      >
        <span className="font-semibold text-[#1a365d] text-sm sm:text-base">{title}</span>
        {isOpen ? (
          <ChevronDown className="h-5 w-5 text-gray-400 shrink-0" />
        ) : (
          <ChevronRight className="h-5 w-5 text-gray-400 shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-4 pt-1 bg-gray-50 border-t border-gray-100 text-sm">{content}</div>
      )}
    </div>
  )
}

export default function SopOnlineContent() {
  const [activeSection, setActiveSection] = useState('purpose')
  const [openProcedures, setOpenProcedures] = useState<Record<string, boolean>>({
    changes: true,
  })

  const toggleProcedure = (id: string) => {
    setOpenProcedures((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      <div className="px-6 sm:px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1a365d]">
              CO-IMPACT – Standard Operating Procedures (v2)
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Online summary · full official document available for download above
            </p>
          </div>
          <a
            href="/documents/Co-IMPACT_SOP_v2.docx"
            download="Co-IMPACT_SOP_v2.docx"
            className="inline-flex items-center justify-center gap-2 shrink-0 rounded-lg bg-[#1a365d] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#2d4a7c] transition-colors"
          >
            <Download className="h-4 w-4" />
            Download SOP
          </a>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        <aside className="lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-gray-100 bg-slate-50/50 p-5">
          <h3 className="text-sm font-bold text-[#1a365d] uppercase tracking-wide mb-4">On this page</h3>
          <nav className="space-y-1">
            {navSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => setActiveSection(section.id)}
                className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                  activeSection === section.id
                    ? 'bg-teal-50 text-teal-700 border-l-2 border-teal-500 font-medium'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-[#1a365d]'
                }`}
              >
                {section.label}
              </a>
            ))}
          </nav>
          <div className="mt-6 flex gap-2 p-3 rounded-lg bg-blue-50 border border-blue-100">
            <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700 leading-relaxed">
              Click a section to jump to that part of the SOP.
            </p>
          </div>
        </aside>

        <div className="flex-1 p-6 sm:p-8 space-y-8 scroll-smooth">
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-700">Version</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Date</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Issued by</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Approved by</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-3 text-gray-600">1</td>
                  <td className="px-4 py-3 text-gray-600">26.11.2024</td>
                  <td className="px-4 py-3 text-gray-600">Constantinos Zamboglou</td>
                  <td className="px-4 py-3 text-gray-600">All Co-IMPACT PIs</td>
                </tr>
                <tr className="bg-teal-50/50">
                  <td className="px-4 py-3 font-semibold text-[#1a365d]">
                    2{' '}
                    <span className="ml-1 inline-flex items-center rounded-full bg-teal-100 px-2 py-0.5 text-xs font-medium text-teal-700">
                      Current
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-[#1a365d]">13.07.2026</td>
                  <td className="px-4 py-3 text-gray-700">Constantinos Zamboglou</td>
                  <td className="px-4 py-3 text-gray-700">All Co-IMPACT PIs</td>
                </tr>
              </tbody>
            </table>
          </div>

          <section id="purpose" className="scroll-mt-24">
            <h3 className="text-lg font-bold text-[#1a365d] mb-3">1. PURPOSE</h3>
            <p className="text-gray-600 leading-relaxed">
              This Standard Operating Procedure (SOP) describes the activities required to: Coordinate and
              monitor the activities of the Consortium for Implementation of PSMA-PET in Prostate Cancer
              therapy Trials (Co-IMPACT).
            </p>
          </section>

          <section id="introduction" className="scroll-mt-24">
            <h3 className="text-lg font-bold text-[#1a365d] mb-3">2. INTRODUCTION | SCOPE</h3>
            <p className="mb-3 text-gray-600 leading-relaxed">
              Prostate cancer is the most prevalent malignancy among men in the Western world, and with ongoing
              demographic shifts, its incidence is expected to rise in the coming years. Despite advancements,
              optimal treatment strategies for prostate cancer remain uncertain in various clinical scenarios.
              To address this, the Co-IMPACT consortium was established by a global, multidisciplinary team of
              experts in radiotherapy, nuclear medicine, and medical oncology. Comprising 45 centers across
              Europe, the USA, Asia, and Australia, the consortium is dedicated to advancing prostate cancer
              care.
            </p>
            <p className="mb-3 text-gray-600 leading-relaxed">
              Through four sub-projects (Co-IMPACT1-4), the consortium will investigate specific clinical
              scenarios along the prostate cancer patient pathway. The aim is to define personalized treatment
              approaches and, using advanced medical imaging such as PSMA-PET/CT, improve outcomes for patients
              with prostate cancer.
            </p>
            <p className="text-gray-600 leading-relaxed">
              This SOP defines the roles, the responsibilities of the consortium&apos;s principal investigators
              as well as the procedures ensuring a smooth operation.
            </p>
          </section>

          <section id="objectives" className="scroll-mt-24">
            <h3 className="text-lg font-bold text-[#1a365d] mb-3">3. OBJECTIVES</h3>
            <p className="text-gray-600 leading-relaxed">
              To define the Co-IMPACT consortium&apos;s SOPs for (i) the role of the principal investigators
              (PIs), (ii) the funding strategy, (iii) the authorship rules, (iv) the creation and the
              amendment(s) of the data transfer agreement, (v) the creation and the amendment(s) of the study
              protocol and (vi) the inclusion of new study centers.
            </p>
          </section>

          <section id="responsibilities" className="scroll-mt-24">
            <h3 className="text-lg font-bold text-[#1a365d] mb-4">4. RESPONSIBILITIES</h3>
            <div className="space-y-5">
              <div>
                <h4 className="font-semibold text-[#1a365d] mb-2">4.1 Co-IMPACT PIs</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 text-sm leading-relaxed">
                  <li>The consortium consists of 16 PIs which are divided into 4 PIs per project.</li>
                  <li>The PIs are responsible for the strategic and operational management of the consortium.</li>
                  <li>
                    All decisions require a majority vote (greater than 50% of the votes). If not all Principal
                    Investigators (PIs) are present during a meeting, only the votes of those in attendance will
                    be taken into account.
                  </li>
                  <li>
                    The performance of all Principal Investigators (PIs) will be evaluated annually. Should a PI
                    no longer demonstrate active involvement, they may be excluded, requiring the approval of 75%
                    of the voters for such a decision.
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#1a365d] mb-2">4.2 Co-IMPACT project manager</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The project manager is responsible for the administrative tasks including the recruitment of
                  new centers, the initial quality control of the clinical datasets, the organization and
                  follow-up steps of the consortium meetings as well as the correspondence with all participants.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-[#1a365d] mb-2">4.3 Data management and statistical analyses</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Please see the{' '}
                  <a
                    href="/documents/CoIMPACT_Data_Governance_Policy_v1.docx"
                    download
                    className="text-teal-600 hover:underline font-medium"
                  >
                    Co-IMPACT Data Governance Policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>

          <section id="procedures" className="scroll-mt-24">
            <h3 className="text-lg font-bold text-[#1a365d] mb-4">5. PROCEDURES and RULES</h3>
            <div className="space-y-2">
              {procedureSections.map((section) => (
                <ProcedureAccordion
                  key={section.id}
                  title={section.title}
                  content={section.content}
                  isOpen={!!openProcedures[section.id]}
                  onToggle={() => toggleProcedure(section.id)}
                />
              ))}
            </div>
          </section>

          <section id="abbreviations" className="scroll-mt-24">
            <h3 className="text-lg font-bold text-[#1a365d] mb-4">6. ABBREVIATIONS</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {abbreviations.map((item) => (
                <div
                  key={item.abbr}
                  className="rounded-lg bg-gray-50 border border-gray-100 px-4 py-3 text-center"
                >
                  <p className="font-bold text-[#1a365d] text-sm">{item.abbr}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-snug">{item.full}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <section id="monitoring" className="scroll-mt-24 rounded-lg border border-gray-100 p-5 bg-gray-50/50">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-teal-600" />
                <h3 className="text-lg font-bold text-[#1a365d]">7. MONITORING</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                This SOP will be monitored and updated every two years by all Co-IMPACT PIs.
              </p>
            </section>

            <section id="references" className="scroll-mt-24 rounded-lg border border-gray-100 p-5 bg-gray-50/50">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-5 w-5 text-teal-600" />
                <h3 className="text-lg font-bold text-[#1a365d]">8. GUIDELINES AND REFERENCES</h3>
              </div>
              <p className="text-gray-600 text-sm mb-2">The Co-IMPACT consortium will follow the:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li>
                  <a
                    href="https://www.equator-network.org/reporting-guidelines/strobe/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:underline font-medium"
                  >
                    STROBE guidelines
                  </a>
                </li>
                <li>Each center must apply to the local GDPR and ethics legislations</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
