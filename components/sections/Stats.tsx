
import { Users, BookOpen, Award, GraduationCap } from 'lucide-react'

export default function Stats() {
  const stats = [
    { icon: Users, value: "2000+", label: "Students" },
    { icon: BookOpen, value: "50+", label: "Qualified Teachers" },
    { icon: Award, value: "100+", label: "Awards Won" },
    { icon: GraduationCap, value: "95%", label: "Success Rate" }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <stat.icon className="text-blue-600" size={32} />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
