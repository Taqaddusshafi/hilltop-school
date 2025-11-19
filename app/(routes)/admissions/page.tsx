import AdmissionForm from '@/components/forms/AdmissionForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Admissions',
  description: 'Apply for admission to Hilltop Educational Institute.',
}

export default async function AdmissionsPage() {
  const supabase = await createServerSupabaseClient()
  
  // Fetch all data
  let pageData = null
  let steps: any[] = []
  let eligibility: any[] = []
  let documents: any[] = []
  let fees: any[] = []

  if (supabase) {
    const [page, stepsData, eligibilityData, docsData, feesData] = await Promise.all([
      supabase.from('admissions_page').select('*').eq('is_active', true).single(),
      supabase.from('admission_steps').select('*').eq('is_active', true).order('display_order'),
      supabase.from('eligibility_criteria').select('*').eq('is_active', true).order('display_order'),
      supabase.from('required_documents').select('*').eq('is_active', true).order('display_order'),
      supabase.from('fee_structure').select('*').eq('is_active', true).order('display_order')
    ])

    pageData = page.data
    steps = stepsData.data || []
    eligibility = eligibilityData.data || []
    documents = docsData.data || []
    fees = feesData.data || []
  }

  // Fallback data
  const admissionsPage = pageData || {
    hero_title: "Admissions",
    hero_subtitle: "Join our community of learners and future leaders",
    process_heading: "Admission Process",
    eligibility_heading: "Eligibility & Requirements",
    fee_structure_heading: "Fee Structure",
    fee_note: "* Fee includes tuition, library, sports, and basic facilities.",
    academic_year: "2025-26"
  }

  const admissionSteps = steps.length > 0 ? steps : [
    { id: 1, step_number: "1", title: "Fill Application", description: "Complete online form" }
  ]

  const eligibilityCriteria = eligibility.length > 0 ? eligibility : [
    { id: 1, criteria: "Age appropriate for the class applying" }
  ]

  const requiredDocs = documents.length > 0 ? documents : [
    { id: 1, document_name: "Birth Certificate" }
  ]

  const feeStructure = fees.length > 0 ? fees : [
    { id: 1, class_name: "Class 1 - 5", annual_fee: "₹12,000", admission_fee: "₹2,000" }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section - Dynamic */}
      <section className="bg-gradient-to-r from-green-900 to-green-700 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{admissionsPage.hero_title}</h1>
          <p className="text-xl text-green-100 max-w-2xl">
            {admissionsPage.hero_subtitle}
          </p>
        </div>
      </section>

      {/* Admission Process - Dynamic */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{admissionsPage.process_heading}</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {admissionSteps.map((item) => (
                <Card key={item.id} className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xl font-bold">
                      {item.step_number}
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility & Requirements - Dynamic */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{admissionsPage.eligibility_heading}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Eligibility Criteria</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    {eligibilityCriteria.map((item) => (
                      <li key={item.id} className="flex items-start gap-2">
                        <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={16} />
                        <span>{item.criteria}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Required Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    {requiredDocs.map((item) => (
                      <li key={item.id} className="flex items-start gap-2">
                        <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={16} />
                        <span>{item.document_name}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline" size="lg">
                <Download className="mr-2" size={20} />
                Download Admission Form (PDF)
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Fee Structure - Dynamic */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {admissionsPage.fee_structure_heading} {admissionsPage.academic_year}
            </h2>
            <div className="bg-white border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Class</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Annual Fee</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Admission Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {feeStructure.map((fee) => (
                    <tr key={fee.id}>
                      <td className="px-6 py-4 text-gray-700">{fee.class_name}</td>
                      <td className="px-6 py-4 text-gray-600">{fee.annual_fee}</td>
                      <td className="px-6 py-4 text-gray-600">{fee.admission_fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {admissionsPage.fee_note && (
              <p className="text-sm text-gray-600 mt-4">
                {admissionsPage.fee_note}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Online Application Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Online Application</h2>
            <AdmissionForm />
          </div>
        </div>
      </section>
    </div>
  )
}
