import AdmissionForm from '@/components/forms/AdmissionForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, CheckCircle, FileText, ClipboardList, Sparkles, ArrowRight, Phone, Calendar, Users, GraduationCap, Clock, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import PageHeader from '@/components/ui/PageHeader'
import Link from 'next/link'

export const metadata = {
  title: 'Admissions',
  description: 'Apply for admission to Hilltop Educational Institute.',
}

const stepColors = [
  { gradient: "from-blue-500 to-cyan-500", bg: "bg-blue-50", glow: "shadow-blue-500/25" },
  { gradient: "from-purple-500 to-violet-500", bg: "bg-purple-50", glow: "shadow-purple-500/25" },
  { gradient: "from-green-500 to-emerald-500", bg: "bg-green-50", glow: "shadow-green-500/25" },
  { gradient: "from-orange-500 to-amber-500", bg: "bg-orange-50", glow: "shadow-orange-500/25" },
]

export default async function AdmissionsPage() {
  const supabase = await createServerSupabaseClient()
  
  // Fetch all data from Supabase
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
    process_description: "Simple steps to become part of the Hilltop family",
    eligibility_heading: "Eligibility & Requirements",
    fee_structure_heading: "Fee Structure",
    fee_note: "* Fee includes tuition, library, sports, and basic facilities.",
    academic_year: "2025-26",
    contact_phone: "+91 9876543210",
    admission_deadline: "31st March 2025"
  }

  const admissionSteps = steps.length > 0 ? steps : [
    { id: 1, step_number: "1", title: "Get Information", description: "Visit our campus or call for admission details and prospectus" },
    { id: 2, step_number: "2", title: "Fill Application", description: "Complete the admission form online or collect from office" },
    { id: 3, step_number: "3", title: "Submit Documents", description: "Submit required documents with the filled application form" },
    { id: 4, step_number: "4", title: "Confirmation", description: "Pay fees and complete the admission process" }
  ]

  const eligibilityCriteria = eligibility.length > 0 ? eligibility : [
    { id: 1, criteria: "Age appropriate for the class applying" },
    { id: 2, criteria: "Valid transfer certificate from previous school" },
    { id: 3, criteria: "Clear entrance assessment (for Class 6 onwards)" },
    { id: 4, criteria: "Parent/Guardian interview may be required" }
  ]

  const requiredDocs = documents.length > 0 ? documents : [
    { id: 1, document_name: "Birth Certificate (Original & Photocopy)" },
    { id: 2, document_name: "Transfer Certificate from Previous School" },
    { id: 3, document_name: "Report Card of Previous Class" },
    { id: 4, document_name: "4 Passport Size Photographs" },
    { id: 5, document_name: "Aadhar Card Copy (Student & Parents)" },
    { id: 6, document_name: "Address Proof" }
  ]

  const feeStructure = fees.length > 0 ? fees : [
    { id: 1, class_name: "Nursery - KG", annual_fee: "₹8,000", admission_fee: "₹1,500", monthly_fee: "₹800" },
    { id: 2, class_name: "Class 1 - 5", annual_fee: "₹12,000", admission_fee: "₹2,000", monthly_fee: "₹1,000" },
    { id: 3, class_name: "Class 6 - 8", annual_fee: "₹15,000", admission_fee: "₹2,500", monthly_fee: "₹1,250" },
    { id: 4, class_name: "Class 9 - 10", annual_fee: "₹18,000", admission_fee: "₹3,000", monthly_fee: "₹1,500" },
    { id: 5, class_name: "Class 11 - 12", annual_fee: "₹22,000", admission_fee: "₹3,500", monthly_fee: "₹1,800" }
  ]

  return (
    <div className="min-h-screen">
      {/* Premium Hero Section */}
      <PageHeader 
        title={admissionsPage.hero_title}
        subtitle={admissionsPage.hero_subtitle}
        badge="Admissions Open 2025-26"
      />

      {/* Quick Info Banner */}
      <section className="py-6 bg-gradient-to-r from-green-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-wrap justify-center items-center gap-8 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-green-100">Last Date</p>
                <p className="font-bold">{admissionsPage.admission_deadline || "31st March 2025"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-green-100">Call Us</p>
                <p className="font-bold">{admissionsPage.contact_phone || "+91 9876543210"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-green-100">Available Seats</p>
                <p className="font-bold">Limited Seats</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Process - Dark Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
                <ClipboardList className="w-4 h-4 text-green-400" />
                <span className="text-white font-semibold text-sm">Simple Steps</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{admissionsPage.process_heading}</h2>
              <p className="text-gray-400 text-lg">{admissionsPage.process_description || "Simple steps to become part of the Hilltop family"}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {admissionSteps.map((item, index) => {
                const colors = stepColors[index % stepColors.length]
                
                return (
                  <div key={item.id} className="relative group">
                    {/* Connector Line */}
                    {index < admissionSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-white/20 to-transparent"></div>
                    )}
                    
                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
                      <div className={`w-20 h-20 bg-gradient-to-br ${colors.gradient} text-white rounded-2xl flex items-center justify-center mx-auto mb-5 text-3xl font-bold shadow-xl ${colors.glow} group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                        {item.step_number}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-300 transition-colors">{item.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility & Documents */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-20"></div>
        <div className="absolute top-20 right-20 w-80 h-80 bg-green-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-emerald-100/50 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full px-5 py-2 mb-6">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-green-700 font-semibold text-sm">Requirements</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{admissionsPage.eligibility_heading}</h2>
              <div className="mt-6 h-1 w-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Eligibility */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-bl-[100px]"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <CheckCircle className="text-white" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Eligibility Criteria</h3>
                  <ul className="space-y-4">
                    {eligibilityCriteria.map((item, index) => (
                      <li key={item.id} className="flex items-start gap-4 group/item">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform">
                          <CheckCircle className="text-white" size={14} />
                        </div>
                        <span className="text-gray-700 leading-relaxed">{item.criteria}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Documents */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-violet-100 rounded-bl-[100px]"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <FileText className="text-white" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Required Documents</h3>
                  <ul className="space-y-4">
                    {requiredDocs.map((item, index) => (
                      <li key={item.id} className="flex items-start gap-4 group/item">
                        <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform">
                          <CheckCircle className="text-white" size={14} />
                        </div>
                        <span className="text-gray-700 leading-relaxed">{item.document_name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-xl shadow-green-500/25 group">
                <Download className="mr-2 group-hover:animate-bounce" size={20} />
                Download Admission Form (PDF)
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Fee Structure - Premium Cards */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full px-5 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-green-600" />
                <span className="text-green-700 font-semibold text-sm">Affordable Education</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {admissionsPage.fee_structure_heading} {admissionsPage.academic_year}
              </h2>
              <div className="mt-6 h-1 w-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto"></div>
            </div>
            
            {/* Fee Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {feeStructure.map((fee, index) => (
                <div 
                  key={fee.id}
                  className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-6 border border-gray-100 overflow-hidden ${index === Math.floor(feeStructure.length / 2) ? 'lg:scale-105 lg:z-10 lg:shadow-2xl border-green-200' : ''}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {index === Math.floor(feeStructure.length / 2) && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      Popular
                    </div>
                  )}
                  
                  <div className="relative z-10 text-center">
                    <div className="w-14 h-14 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <GraduationCap className="text-white" size={24} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{fee.class_name}</h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600 text-sm">Admission Fee</span>
                        <span className="font-semibold text-gray-900">{fee.admission_fee}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600 text-sm">Annual Fee</span>
                        <span className="font-semibold text-gray-900">{fee.annual_fee}</span>
                      </div>
                      {fee.monthly_fee && (
                        <div className="flex justify-between items-center py-2">
                          <span className="text-gray-600 text-sm">Monthly Fee</span>
                          <span className="font-bold text-green-600 text-lg">{fee.monthly_fee}</span>
                        </div>
                      )}
                    </div>
                    
                    <Button variant="outline" className="w-full border-green-200 hover:bg-green-50 hover:border-green-400 group/btn">
                      Apply Now
                      <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {admissionsPage.fee_note && (
              <p className="text-sm text-gray-500 mt-8 text-center">{admissionsPage.fee_note}</p>
            )}
          </div>
        </div>
      </section>

      {/* Online Application Form */}
      <section className="py-24 bg-gradient-to-br from-green-800 to-emerald-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-green-300" />
                <span className="text-white font-semibold text-sm">Apply Online</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Online Application</h2>
              <p className="text-green-100 text-lg">Fill out the form below to start your admission process</p>
            </div>
            
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
              <AdmissionForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
