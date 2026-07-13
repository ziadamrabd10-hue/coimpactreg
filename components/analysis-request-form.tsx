'use client'

import { useState } from 'react'
import { Download, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const SAB_EMAIL = 'andreas.christoforou3@goc.com.cy'

const subProjects = ['Co-IMPACT 1', 'Co-IMPACT 2', 'Co-IMPACT 3', 'Co-IMPACT 4'] as const
const dataTypes = [
  'Clinical data (coded clinical variables and endpoints from REDCap / codebooks)',
  'PSMA-PET/CT DICOM data (raw imaging files — subject to separate governance)',
] as const
const supportTypes = [
  'Analysis design and statistical methodology advice',
  'Sample size / power calculation',
  'Assistance with statistical analysis execution',
  'Interpretation of results',
  'Other',
] as const

export default function AnalysisRequestForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setNotification(null)

    const form = e.currentTarget
    const fd = new FormData(form)

    const selectedSubProjects = subProjects.filter((p) => fd.get(`subProject_${p}`) === 'on')
    const selectedDataTypes = dataTypes.filter((_, i) => fd.get(`dataType_${i}`) === 'on')
    const selectedSupport = supportTypes.filter((_, i) => fd.get(`support_${i}`) === 'on')

    const payload = {
      formType: 'analysis-request',
      analysisLeadName: String(fd.get('analysisLeadName') || ''),
      analysisLeadInstitution: String(fd.get('analysisLeadInstitution') || ''),
      coLeadName: String(fd.get('coLeadName') || ''),
      coLeadInstitution: String(fd.get('coLeadInstitution') || ''),
      contactEmail: String(fd.get('contactEmail') || ''),
      submissionDate: String(fd.get('submissionDate') || ''),
      anticipatedStart: String(fd.get('anticipatedStart') || ''),
      anticipatedSubmission: String(fd.get('anticipatedSubmission') || ''),
      subProjects: selectedSubProjects,
      dataTypes: selectedDataTypes,
      title: String(fd.get('title') || ''),
      primaryObjective: String(fd.get('primaryObjective') || ''),
      primaryEndpoints: String(fd.get('primaryEndpoints') || ''),
      secondaryEndpoints: String(fd.get('secondaryEndpoints') || ''),
      population: String(fd.get('population') || ''),
      methods: String(fd.get('methods') || ''),
      targetJournal: String(fd.get('targetJournal') || ''),
      sabSupport: String(fd.get('sabSupport') || ''),
      supportTypes: selectedSupport,
      supportDetails: String(fd.get('supportDetails') || ''),
      overlap: String(fd.get('overlap') || ''),
      overlapDetails: String(fd.get('overlapDetails') || ''),
      conflict: String(fd.get('conflict') || ''),
      conflictDetails: String(fd.get('conflictDetails') || ''),
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit analysis request')
      }

      setNotification({
        type: 'success',
        message: `Your analysis request has been sent to ${SAB_EMAIL}.`,
      })
      form.reset()
    } catch (error) {
      console.error(error)
      setNotification({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Failed to submit analysis request. Please try again or email Andreas directly.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/40 p-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Prefer the official Word template? Download it, complete it offline, and email it to Andreas.
        </p>
        <div className="flex flex-wrap gap-2 shrink-0">
          <a
            href="/documents/CoIMPACT_Analysis_Request_Form_v1.docx"
            download="CoIMPACT_Analysis_Request_Form_v1.docx"
            className="inline-flex items-center gap-2 rounded-md bg-[#1a365d] px-3 py-2 text-sm font-medium text-white hover:bg-[#2d4a7c]"
          >
            <Download className="h-4 w-4" />
            Download form
          </a>
          <a
            href={`mailto:${SAB_EMAIL}?subject=${encodeURIComponent(
              'Co-IMPACT Analysis Request Form'
            )}&body=${encodeURIComponent(
              'Dear Andreas,\n\nPlease find attached my completed Co-IMPACT Analysis Request Form.\n\nKind regards,'
            )}`}
            className="inline-flex items-center gap-2 rounded-md border border-blue-400 bg-white px-3 py-2 text-sm font-medium text-[#1a365d] hover:bg-blue-50 dark:bg-transparent dark:text-blue-200 dark:border-blue-600"
          >
            <Mail className="h-4 w-4" />
            Email Andreas
          </a>
        </div>
      </div>

      {notification && (
        <div
          className={`p-4 rounded-lg ${
            notification.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {notification.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-gray-900">Section A — Applicant Details</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="analysisLeadName">Analysis Lead — Name *</Label>
              <Input id="analysisLeadName" name="analysisLeadName" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="analysisLeadInstitution">Analysis Lead — Institution *</Label>
              <Input id="analysisLeadInstitution" name="analysisLeadInstitution" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="coLeadName">Co-Lead — Name</Label>
              <Input id="coLeadName" name="coLeadName" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="coLeadInstitution">Co-Lead — Institution</Label>
              <Input id="coLeadInstitution" name="coLeadInstitution" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contactEmail">Contact Email *</Label>
              <Input id="contactEmail" name="contactEmail" type="email" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="submissionDate">Date of Submission *</Label>
              <Input id="submissionDate" name="submissionDate" type="date" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="anticipatedStart">Anticipated Analysis Start Date</Label>
              <Input id="anticipatedStart" name="anticipatedStart" type="date" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="anticipatedSubmission">Anticipated Submission Date</Label>
              <Input id="anticipatedSubmission" name="anticipatedSubmission" type="date" />
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-gray-900">Section B — Data Requested</legend>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Co-IMPACT Sub-Project(s)</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {subProjects.map((project) => (
                <label key={project} className="flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" name={`subProject_${project}`} className="rounded border-gray-300" />
                  {project}
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Data Type</p>
            <div className="space-y-2">
              {dataTypes.map((type, i) => (
                <label key={type} className="flex items-start gap-2 text-sm text-gray-700">
                  <input type="checkbox" name={`dataType_${i}`} className="mt-1 rounded border-gray-300" />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-gray-900">Section C — Analysis Description</legend>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title / Working Title *</Label>
              <Input id="title" name="title" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="primaryObjective">Primary Objective *</Label>
              <Textarea id="primaryObjective" name="primaryObjective" required className="min-h-[80px]" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="primaryEndpoints">Primary Endpoint(s)</Label>
              <Textarea id="primaryEndpoints" name="primaryEndpoints" className="min-h-[60px]" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="secondaryEndpoints">Secondary Endpoint(s)</Label>
              <Textarea id="secondaryEndpoints" name="secondaryEndpoints" className="min-h-[60px]" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="population">Patient Population / Inclusion &amp; Exclusion Criteria</Label>
              <Textarea id="population" name="population" className="min-h-[80px]" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="methods">Planned Statistical Methods</Label>
              <Textarea id="methods" name="methods" className="min-h-[80px]" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="targetJournal">Intended Target Journal / Conference</Label>
              <Input id="targetJournal" name="targetJournal" />
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-gray-900">Section D — SAB Support Request</legend>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="radio" name="sabSupport" value="yes" required />
              Yes — I am requesting SAB support for this analysis
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="radio" name="sabSupport" value="no" />
              No — I will conduct the analysis independently and submit for pre-publication review
            </label>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Nature of support requested</p>
            <div className="space-y-2">
              {supportTypes.map((type, i) => (
                <label key={type} className="flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" name={`support_${i}`} className="rounded border-gray-300" />
                  {type}
                </label>
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="supportDetails">Additional details on support required</Label>
            <Textarea id="supportDetails" name="supportDetails" className="min-h-[60px]" />
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-gray-900">
            Section E — Overlap &amp; Conflict of Interest
          </legend>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Known overlapping analyses?</p>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="radio" name="overlap" value="no" required />
              No known overlap
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="radio" name="overlap" value="yes" />
              Yes — details below
            </label>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="overlapDetails">Overlap details</Label>
            <Textarea id="overlapDetails" name="overlapDetails" className="min-h-[60px]" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Conflict of interest?</p>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="radio" name="conflict" value="no" required />
              No
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="radio" name="conflict" value="yes" />
              Yes — details below
            </label>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="conflictDetails">Conflict details</Label>
            <Textarea id="conflictDetails" name="conflictDetails" className="min-h-[60px]" />
          </div>
        </fieldset>

        <p className="text-sm text-gray-600">
          By submitting this form, you confirm that the analysis will use the approved dataset, that outputs will
          be submitted to the SAB for pre-publication review, and that authorship will comply with ICMJE
          criteria and the Data Governance Policy.
        </p>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 text-base font-medium bg-[#1a365d] hover:bg-[#2d4a7c] text-white"
        >
          {isLoading ? 'Submitting...' : 'Submit to Statistical Advisory Board'}
        </Button>
      </form>
    </div>
  )
}
