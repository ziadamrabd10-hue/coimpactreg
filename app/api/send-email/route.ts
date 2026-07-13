import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface Contact {
  name: string
  email: string
}

interface ProjectData {
  participation: string
  patients: string
  dicomShared: string
}

interface RegistryFormData {
  date: string
  centerName: string
  centerAddress: string
  contacts: Contact[]
  projects: {
    [key: string]: ProjectData
  }
  dataTransferAgreement: string
  references: string
}

const DEFAULT_RECIPIENTS =
  'Mohamed.shelan@insel.ch, Constantinos.Zamboglou@goc.com.cy'
const ANALYSIS_REQUEST_RECIPIENT = 'andreas.christoforou3@goc.com.cy'

function listHtml(items: string[] | undefined, empty = 'None selected') {
  if (!items || items.length === 0) return empty
  return `<ul>${items.map((i) => `<li>${escapeHtml(i)}</li>`).join('')}</ul>`
}

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function row(label: string, value: unknown) {
  return `<p style="margin: 8px 0;"><strong style="color: #4b5563;">${label}:</strong> ${escapeHtml(
    value
  )}</p>`
}

export async function POST(req: Request) {
  try {
    const gmailUser = process.env.GMAIL_USER
    const gmailPass = process.env.GMAIL_APP_PASSWORD

    if (!gmailUser || !gmailPass) {
      console.error(
        'Email not configured: set GMAIL_USER and GMAIL_APP_PASSWORD environment variables.'
      )
      return NextResponse.json(
        {
          error:
            'Email service is not configured. Please contact the site administrators directly.',
        },
        { status: 503 }
      )
    }

    const data = await req.json()
    const formType = data.formType as string | undefined

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    })

    let mailOptions

    if (formType === 'registry') {
      const { formData } = data as { formData: RegistryFormData }
      mailOptions = {
        from: gmailUser,
        to: process.env.CONTACT_RECIPIENTS || DEFAULT_RECIPIENTS,
        replyTo: formData.contacts?.[0]?.email,
        subject: `New Registry Application from ${formData.centerName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #2563eb; margin-bottom: 25px; text-align: center; border-bottom: 2px solid #e5e7eb; padding-bottom: 15px;">New Registry Application</h2>
              
              <div style="margin-bottom: 25px; background-color: #f3f4f6; padding: 20px; border-radius: 6px;">
                ${row('Date', formData.date)}
                ${row('Center Name', formData.centerName)}
                ${row('Center Address', formData.centerAddress)}
              </div>
              
              <div style="margin-bottom: 25px;">
                <h3 style="color: #2563eb; margin-bottom: 15px;">Contact Persons</h3>
                <div style="display: grid; gap: 15px;">
                  ${formData.contacts
                    .map(
                      (contact: Contact, index: number) => `
                    <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px;">
                      <p style="margin: 5px 0;"><strong style="color: #4b5563;">Contact ${index + 1}</strong></p>
                      ${row('Name', contact.name)}
                      ${row('Email', contact.email)}
                    </div>
                  `
                    )
                    .join('')}
                </div>
              </div>
              
              <div style="margin-bottom: 25px;">
                <h3 style="color: #2563eb; margin-bottom: 15px;">Projects</h3>
                <div style="display: grid; gap: 15px;">
                  ${Object.entries(formData.projects)
                    .map(
                      ([project, projectData]: [string, ProjectData]) => `
                    <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px;">
                      <h4 style="color: #4b5563; margin: 0 0 10px 0;">${escapeHtml(project.toUpperCase())}</h4>
                      ${row('Participation', projectData.participation)}
                      ${
                        projectData.participation === 'yes'
                          ? row('Number of Patients', projectData.patients)
                          : ''
                      }
                      ${row('DICOM Shared', projectData.dicomShared)}
                    </div>
                  `
                    )
                    .join('')}
                </div>
              </div>
              
              <div style="margin-bottom: 25px; background-color: #f3f4f6; padding: 20px; border-radius: 6px;">
                <h3 style="color: #2563eb; margin-bottom: 15px;">Data Transfer Agreement</h3>
                <p style="margin: 0; line-height: 1.6;">${escapeHtml(formData.dataTransferAgreement)}</p>
              </div>
              
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px;">
                <h3 style="color: #2563eb; margin-bottom: 15px;">References</h3>
                <p style="margin: 0; line-height: 1.6;">${escapeHtml(formData.references)}</p>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px;">
              <p>This is an automated email from the Co-IMPACT Registry System</p>
            </div>
          </div>
        `,
      }
    } else if (formType === 'analysis-request') {
      mailOptions = {
        from: gmailUser,
        to:
          process.env.ANALYSIS_REQUEST_EMAIL ||
          ANALYSIS_REQUEST_RECIPIENT,
        cc: process.env.CONTACT_RECIPIENTS || DEFAULT_RECIPIENTS,
        replyTo: data.contactEmail,
        subject: `Co-IMPACT Analysis Request: ${data.title || data.analysisLeadName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #2563eb; margin-bottom: 25px; text-align: center; border-bottom: 2px solid #e5e7eb; padding-bottom: 15px;">Co-IMPACT Analysis Request Form</h2>

              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
                <h3 style="color: #2563eb; margin-bottom: 12px;">Section A — Applicant Details</h3>
                ${row('Analysis Lead', data.analysisLeadName)}
                ${row('Institution', data.analysisLeadInstitution)}
                ${row('Co-Lead', data.coLeadName || 'N/A')}
                ${row('Co-Lead Institution', data.coLeadInstitution || 'N/A')}
                ${row('Contact Email', data.contactEmail)}
                ${row('Date of Submission', data.submissionDate)}
                ${row('Anticipated Start', data.anticipatedStart || 'N/A')}
                ${row('Anticipated Submission', data.anticipatedSubmission || 'N/A')}
              </div>

              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
                <h3 style="color: #2563eb; margin-bottom: 12px;">Section B — Data Requested</h3>
                <p style="margin: 8px 0;"><strong style="color: #4b5563;">Sub-projects:</strong></p>
                ${listHtml(data.subProjects)}
                <p style="margin: 8px 0;"><strong style="color: #4b5563;">Data types:</strong></p>
                ${listHtml(data.dataTypes)}
              </div>

              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
                <h3 style="color: #2563eb; margin-bottom: 12px;">Section C — Analysis Description</h3>
                ${row('Title', data.title)}
                ${row('Primary Objective', data.primaryObjective)}
                ${row('Primary Endpoints', data.primaryEndpoints || 'N/A')}
                ${row('Secondary Endpoints', data.secondaryEndpoints || 'N/A')}
                ${row('Population', data.population || 'N/A')}
                ${row('Methods', data.methods || 'N/A')}
                ${row('Target Journal/Conference', data.targetJournal || 'N/A')}
              </div>

              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
                <h3 style="color: #2563eb; margin-bottom: 12px;">Section D — SAB Support</h3>
                ${row('SAB support requested', data.sabSupport)}
                <p style="margin: 8px 0;"><strong style="color: #4b5563;">Support types:</strong></p>
                ${listHtml(data.supportTypes)}
                ${row('Support details', data.supportDetails || 'N/A')}
              </div>

              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px;">
                <h3 style="color: #2563eb; margin-bottom: 12px;">Section E — Overlap & Conflict</h3>
                ${row('Known overlap', data.overlap)}
                ${row('Overlap details', data.overlapDetails || 'N/A')}
                ${row('Conflict of interest', data.conflict)}
                ${row('Conflict details', data.conflictDetails || 'N/A')}
              </div>
            </div>
            <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px;">
              <p>Automated submission from the Co-IMPACT website · Primary recipient: ${ANALYSIS_REQUEST_RECIPIENT}</p>
            </div>
          </div>
        `,
      }
    } else {
      const { name, email, institution, message } = data

      if (!name || !email || !message) {
        return NextResponse.json(
          { error: 'Name, email, and message are required.' },
          { status: 400 }
        )
      }

      mailOptions = {
        from: gmailUser,
        to: process.env.CONTACT_RECIPIENTS || DEFAULT_RECIPIENTS,
        replyTo: email,
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #2563eb; margin-bottom: 25px; text-align: center; border-bottom: 2px solid #e5e7eb; padding-bottom: 15px;">New Contact Form Submission</h2>
              
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
                ${row('Name', name)}
                ${row('Email', email)}
                ${row('Institution', institution)}
              </div>
              
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px;">
                <h3 style="color: #2563eb; margin-bottom: 15px;">Message</h3>
                <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</p>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px;">
              <p>This is an automated email from the Co-IMPACT Registry System</p>
            </div>
          </div>
        `,
      }
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      {
        error:
          'Failed to send email. Please try again later or contact Mohamed.shelan@insel.ch / Constantinos.Zamboglou@goc.com.cy directly.',
      },
      { status: 500 }
    )
  }
}
