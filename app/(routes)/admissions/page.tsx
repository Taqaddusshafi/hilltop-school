
import AdmissionForm from '@/components/forms/AdmissionForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Admissions',
  description: 'Apply for admission to Hilltop Educational Institute.',
}

export default function AdmissionsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Admissions</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Join our community of learners and future leaders
          </p>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Admission Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Fill Application", desc: "Complete online form" },
                { step: "2", title: "Submit Documents", desc: "Upload required docs" },
                { step: "3", title: "Entrance Test", desc: "Written examination" },
                { step: "4", title: "Confirmation", desc: "Fee payment & admission" }
              ].map((item, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xl font-bold">
                      {item.step}
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility & Requirements */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Eligibility & Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Eligibility Criteria</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={16} />
                      <span>Age appropriate for the class applying</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={16} />
                      <span>Previous school records (for transfer students)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={16} />
                      <span>Pass entrance examination</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Required Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={16} />
                      <span>Birth Certificate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={16} />
                      <span>Passport size photographs (4)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={16} />
                      <span>Transfer Certificate (if applicable)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={16} />
                      <span>Mark sheets of previous class</span>
                    </li>
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

      {/* Fee Structure */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Fee Structure 2025-26</h2>
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
                  <tr>
                    <td className="px-6 py-4 text-gray-700">Class 1 - 5</td>
                    <td className="px-6 py-4 text-gray-600">₹12,000</td>
                    <td className="px-6 py-4 text-gray-600">₹2,000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-700">Class 6 - 8</td>
                    <td className="px-6 py-4 text-gray-600">₹15,000</td>
                    <td className="px-6 py-4 text-gray-600">₹2,500</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-700">Class 9 - 10</td>
                    <td className="px-6 py-4 text-gray-600">₹18,000</td>
                    <td className="px-6 py-4 text-gray-600">₹3,000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-700">Class 11 - 12</td>
                    <td className="px-6 py-4 text-gray-600">₹20,000</td>
                    <td className="px-6 py-4 text-gray-600">₹3,500</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              * Fee includes tuition, library, sports, and basic facilities. Transport charges separate.
            </p>
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
