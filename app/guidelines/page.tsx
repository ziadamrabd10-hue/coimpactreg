import Image from 'next/image'
import Link from 'next/link'
import { Download, FileText, Mail, ClipboardList } from 'lucide-react'

const documents = [
  {
    title: 'Co-IMPACT Standard Operating Procedures',
    version: 'Version 2 · 13.07.2026',
    description:
      'Roles, responsibilities, funding, authorship rules, new center approval, and consortium procedures. Replaces the previous SOP (v1).',
    href: '/documents/Co-IMPACT_SOP_v2.docx',
    filename: 'Co-IMPACT_SOP_v2.docx',
  },
  {
    title: 'Data Governance & Statistical Oversight Policy',
    version: 'Version 1.0',
    description:
      'Methodology and governance for preparing, harmonising, and analysing clinical data across Co-IMPACT sub-projects 1–4.',
    href: '/documents/CoIMPACT_Data_Governance_Policy_v1.docx',
    filename: 'CoIMPACT_Data_Governance_Policy_v1.docx',
  },
  {
    title: 'Analysis Request Form',
    version: 'Version 1.0 · Statistical Advisory Board',
    description:
      'Register an analysis and optionally request SAB support. Complete the form and submit it to Andreas Christoforou before starting analysis.',
    href: '/documents/CoIMPACT_Analysis_Request_Form_v1.docx',
    filename: 'CoIMPACT_Analysis_Request_Form_v1.docx',
    highlight: true,
  },
] as const

export default function Guidelines() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="max-w-[850px] mx-auto space-y-8 px-4 sm:px-0">
        {/* Documents hub */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            <div className="flex justify-center mb-8">
              <Image
                src="/images/coimpact.png"
                alt="CO-IMPACT Logo"
                width={200}
                height={70}
                className="h-auto"
              />
            </div>

            <div className="text-center mb-10">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                <strong>CO-IMPACT</strong> Guidelines &amp; Documents
              </h1>
              <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
                Official consortium documents for download. The Standard Operating Procedures below have been updated to version 2.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {documents.map((doc) => (
                <div
                  key={doc.href}
                  className={`rounded-lg border p-5 ${
                    'highlight' in doc && doc.highlight
                      ? 'border-blue-300 bg-blue-50 dark:border-blue-700 dark:bg-blue-950/40'
                      : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40'
                  }`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex gap-3">
                      <FileText className="h-6 w-6 shrink-0 text-[#1a365d] dark:text-blue-300 mt-0.5" />
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {doc.title}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                          {doc.version}
                        </p>
                        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                          {doc.description}
                        </p>
                      </div>
                    </div>
                    <a
                      href={doc.href}
                      download={doc.filename}
                      className="inline-flex items-center justify-center gap-2 shrink-0 rounded-md bg-[#1a365d] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#2d4a7c] transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </a>
                  </div>

                  {'highlight' in doc && doc.highlight && (
                    <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800 flex flex-col sm:flex-row gap-3">
                      <a
                        href={`mailto:andreas.christoforou3@goc.com.cy?subject=${encodeURIComponent(
                          'Co-IMPACT Analysis Request Form'
                        )}&body=${encodeURIComponent(
                          'Dear Andreas,\n\nPlease find attached my completed Co-IMPACT Analysis Request Form.\n\nKind regards,'
                        )}`}
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-blue-400 bg-white px-4 py-2.5 text-sm font-medium text-[#1a365d] hover:bg-blue-50 dark:bg-transparent dark:text-blue-200 dark:border-blue-600 dark:hover:bg-blue-950"
                      >
                        <Mail className="h-4 w-4" />
                        Email completed form to Andreas
                      </a>
                      <Link
                        href="/analysis-request"
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-blue-400 bg-white px-4 py-2.5 text-sm font-medium text-[#1a365d] hover:bg-blue-50 dark:bg-transparent dark:text-blue-200 dark:border-blue-600 dark:hover:bg-blue-950"
                      >
                        <ClipboardList className="h-4 w-4" />
                        Submit online form
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              Analysis requests must be submitted to the Statistical Advisory Board at{' '}
              <a
                href="mailto:andreas.christoforou3@goc.com.cy"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                andreas.christoforou3@goc.com.cy
              </a>{' '}
              prior to commencing analysis. You can download the Word form, complete it, and email it — or use the{' '}
              <Link href="/analysis-request" className="text-blue-600 hover:underline dark:text-blue-400">
                online analysis request form
              </Link>
              .
            </p>
          </div>
        </div>

        {/* SOP v2 read online */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                <strong>CO-IMPACT</strong> – Standard Operating Procedures (v2)
              </h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Online summary · full official document available for download above
              </p>
            </div>

            <div className="mb-8 overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="border border-gray-300 dark:border-gray-600 p-2 text-left text-gray-900 dark:text-white">
                      Version
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600 p-2 text-left text-gray-900 dark:text-white">
                      Date
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600 p-2 text-left text-gray-900 dark:text-white">
                      Issued by
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600 p-2 text-left text-gray-900 dark:text-white">
                      Approved by
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 p-2 text-gray-900 dark:text-white">
                      1
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 p-2 text-gray-900 dark:text-white">
                      26.11.2024
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 p-2 text-gray-900 dark:text-white">
                      Constantinos Zamboglou
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 p-2 text-gray-900 dark:text-white">
                      All Co-IMPACT PIs
                    </td>
                  </tr>
                  <tr className="bg-blue-50 dark:bg-blue-950/30">
                    <td className="border border-gray-300 dark:border-gray-600 p-2 font-semibold text-gray-900 dark:text-white">
                      2 (current)
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 p-2 font-semibold text-gray-900 dark:text-white">
                      13.07.2026
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 p-2 text-gray-900 dark:text-white">
                      Constantinos Zamboglou
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 p-2 text-gray-900 dark:text-white">
                      All Co-IMPACT PIs
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-6 text-gray-900 dark:text-white">
              <section>
                <h3 className="text-xl font-bold mb-3">1. PURPOSE</h3>
                <p>
                  This Standard Operating Procedure (SOP) describes the activities required to: Coordinate and
                  monitor the activities of the Consortium for Implementation of PSMA-PET in Prostate Cancer
                  therapy Trials (Co-IMPACT).
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-3">2. INTRODUCTION | SCOPE</h3>
                <p className="mb-3">
                  Prostate cancer is the most prevalent malignancy among men in the Western world, and with
                  ongoing demographic shifts, its incidence is expected to rise in the coming years. Despite
                  advancements, optimal treatment strategies for prostate cancer remain uncertain in various
                  clinical scenarios. To address this, the Co-IMPACT consortium was established by a global,
                  multidisciplinary team of experts in radiotherapy, nuclear medicine, and medical oncology.
                  Comprising 45 centers across Europe, the USA, Asia, and Australia, the consortium is dedicated
                  to advancing prostate cancer care.
                </p>
                <p className="mb-3">
                  Through four sub-projects (Co-IMPACT1-4), the consortium will investigate specific clinical
                  scenarios along the prostate cancer patient pathway. The aim is to define personalized
                  treatment approaches and, using advanced medical imaging such as PSMA-PET/CT, improve
                  outcomes for patients with prostate cancer.
                </p>
                <p>
                  This SOP defines the roles, the responsibilities of the consortium&apos;s principal
                  investigators as well as the procedures ensuring a smooth operation.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-3">3. OBJECTIVES</h3>
                <p>
                  To define the Co-IMPACT consortium&apos;s SOPs for (i) the role of the principal investigators
                  (PIs), (ii) the funding strategy, (iii) the authorship rules, (iv) the creation and the
                  amendment(s) of the data transfer agreement, (v) the creation and the amendment(s) of the
                  study protocol and (vi) the inclusion of new study centers.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-3">4. RESPONSIBILITIES</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold mb-2">4.1 Co-IMPACT PIs</h4>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>The consortium consists of 16 PIs which are divided into 4 PIs per project.</li>
                      <li>
                        The PIs are responsible for the strategic and operational management of the consortium.
                      </li>
                      <li>
                        All decisions require a majority vote (greater than 50% of the votes). If not all
                        Principal Investigators (PIs) are present during a meeting, only the votes of those in
                        attendance will be taken into account.
                      </li>
                      <li>
                        The performance of all Principal Investigators (PIs) will be evaluated annually. Should
                        a PI no longer demonstrate active involvement, they may be excluded, requiring the
                        approval of 75% of the voters for such a decision. In this case each PI can name a
                        candidate for the PI position. The candidate with most of the votes will be invited to
                        serve as a new Co-IMPACT PI.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2">4.2 Co-IMPACT project manager</h4>
                    <p>
                      The project manager is responsible for the administrative tasks including the recruitment
                      of new centers, the initial quality control of the clinical datasets, the organization and
                      follow-up steps of the consortium meetings as well as the correspondence with all
                      participants.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      4.3 Data management and statistical analyses
                    </h4>
                    <p>
                      Please see the{' '}
                      <a
                        href="/documents/CoIMPACT_Data_Governance_Policy_v1.docx"
                        download
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        Co-IMPACT Data Governance Policy
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-3">5. PROCEDURES and RULES</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold mb-2">5.1 Funding</h4>
                    <p className="mb-3">
                      All Co-IMPACT PIs can apply for funding for the consortium via different sources including
                      private, governmental and other. All funding actions must be approved by the PIs. The main
                      aim is to ensure a smooth operation of the project related work, especially the data
                      management and the administrative tasks. Additionally, the organization of consortium
                      meetings is a major aim.
                    </p>
                    <p className="mb-3">
                      All contracts/funding proposals will be shared among the PIs just for transparency and
                      centrally stored.
                    </p>
                    <p className="mb-3">
                      Regarding industry/private sponsors a two-level system will be applied:
                    </p>
                    <div className="pl-4 mb-3">
                      <h5 className="font-medium mb-2">Level 1: General Sponsorship</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          Sponsors at this level provide funding to support Co-IMPACT as a whole, rather than
                          any specific project or topic.
                        </li>
                        <li>
                          These sponsors will be acknowledged in all Co-IMPACT publications, on the website, and
                          in every presentation.
                        </li>
                      </ul>
                    </div>
                    <div className="pl-4">
                      <h5 className="font-medium mb-2">Level 2: Project-Specific Sponsorship</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          Sponsors at this level may apply to collaborate on a project utilizing Co-IMPACT data.
                        </li>
                        <li>
                          While direct access to clinical data or imaging will not be granted, sponsors can
                          request an analysis contingent on approval by the Principal Investigators (PIs).
                        </li>
                        <li>
                          They are welcome to participate in Co-IMPACT meetings when discussions pertain to their
                          dedicated project.
                        </li>
                        <li>
                          Additionally, they may propose ancillary projects that do not involve clinical or
                          imaging data, such as studies related to treatment concepts, including those based on
                          questionnaire-based research (e.g. on treatment strategies).
                        </li>
                        <li>Level 2 sponsorships must also apply for a level 1 sponsorship.</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2">5.2 Approval of new study centers</h4>
                    <p className="mb-3">
                      Centers interested in participating in Co-IMPACT may apply by directly contacting a
                      Principal Investigator (PI) or through the Co-IMPACT website. Applications must follow a
                      designated template (see{' '}
                      <Link href="/register" className="text-blue-600 hover:underline dark:text-blue-400">
                        center application form
                      </Link>
                      ), which should include the names of the primary local participants, the expected number
                      of patients, the need for a signed DTA and the approximated time to complete a DTA, the
                      sub-projects of interest, and confirmation regarding the ability to share DICOM data.
                      Furthermore, applicants are required to reference any prior publications relevant to the
                      consortium&apos;s focus areas.
                    </p>
                    <p>
                      Each application will be shared within the consortium PIs and a majority vote is needed to
                      include a center. Each PI has a time frame of 2 weeks to reject a center including a
                      plausible explanation, otherwise the application will be automatically approved. Upon this
                      step, the approved new center will receive the DTA, the study protocol and the data
                      exchange files.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2">5.3 Authorship rights</h4>
                    <p className="mb-3">
                      1. First/Last Authorships — For each paper resulting from a pre-specified analysis using
                      the Co-IMPACT database, the responsible institution(s) are defined. This/These
                      institution(s) is/are allowed to name the first and last authors.
                    </p>
                    <p className="mb-3">
                      2. Co-authors — All Co-IMPACT PIs must be named as Co-authors in the main author line. The
                      policy considers the number of patients included in each sub-project (Co-IMPACT 1-4)
                      according to the following co-authorship guidelines:
                    </p>
                    <div className="pl-4 mb-3">
                      <h5 className="font-medium mb-2">Papers Including Only Clinical Data</h5>
                      <p className="mb-2">Institutions contributing:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Up to 100 patients: 2 names as PubMed indexed author collaborators</li>
                        <li>
                          More than 100 but fewer than 200 patients: 1 name on the main author line; 1 name as
                          PubMed indexed author collaborator
                        </li>
                        <li>
                          More than 200 but fewer than 300 patients: 2 names on the main author line; 2 names as
                          PubMed indexed author collaborators
                        </li>
                        <li>
                          More than 300 patients: 3 names on the main author line; 3 names as PubMed indexed
                          author collaborators
                        </li>
                      </ul>
                    </div>
                    <div className="pl-4 mb-3">
                      <h5 className="font-medium mb-2">Papers Including Clinical and Imaging Data</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          Up to 100 patients: 1* name on the main author line; 2 names as PubMed indexed author
                          collaborators
                        </li>
                        <li>
                          More than 100 but fewer than 200 patients: 2* names on the main author line; 2 names as
                          PubMed indexed author collaborators
                        </li>
                        <li>
                          More than 200 patients: 3* names on the main author line; 3 names as PubMed indexed
                          author collaborators
                        </li>
                      </ul>
                      <p className="mt-2 text-sm italic">
                        * Depending on journal restrictions on the number of authors in the main author line, the
                        responsible institutions for the respective analysis are allowed to name up to additional
                        1–3 authors for the main author line. The Co-IMPACT PIs remain in the main author line.
                        After consultation with the sub-project lead and Co-IMPACT PIs, there is the right to
                        deviate from the maximum number allowed based on specific involvement and activity of
                        colleagues within the project.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      5.4 Changes of the study protocol, DTA or data exchange files
                    </h4>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>All centers may submit their comments to a/the PI(s) or administrative staff.</li>
                      <li>The request is discussed among the PIs and with the requesting party.</li>
                      <li>
                        If a majority vote favors the change, the relevant PIs will implement the modification.
                      </li>
                      <li>The change is then communicated to all participating centers.</li>
                    </ul>
                    <p className="mt-2">
                      These rules apply for changes in the study protocol, the DTA and the data exchange files.
                    </p>
                    <p className="mt-2">
                      (Minor adjustments may be collected and incorporated into a protocol amendment at a later
                      stage to minimize bureaucratic overhead.)
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      5.5 Clinical data submission and initial quality check
                    </h4>
                    <p>
                      Please see the{' '}
                      <a
                        href="/documents/CoIMPACT_Data_Governance_Policy_v1.docx"
                        download
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        Co-IMPACT Data Governance Policy
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-3">6. ABBREVIATIONS</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>PI: principal investigator</li>
                  <li>DTA: data exchange file</li>
                  <li>GDPR: General Data Protection Regulation</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-3">7. MONITORING</h3>
                <p>This SOP will be monitored and updated every two years by all Co-IMPACT PIs.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-3">8. GUIDELINES AND REFERENCES</h3>
                <p className="mb-2">The Co-IMPACT consortium will follow the:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <a
                      href="https://www.equator-network.org/reporting-guidelines/strobe/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline dark:text-blue-400"
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
    </div>
  )
}
