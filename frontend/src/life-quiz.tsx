"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { CheckCircle, ChevronRight } from "lucide-react"

export default function LifeQuiz() {
  // State to track values for each life category
  const [values, setValues] = useState({
    health: 5,
    career: 5,
    finances: 5,
    relationships: 5,
    growth: 5,
    fun: 5,
    spirituality: 5,
    environment: 5,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Categories with their labels, descriptions and icons
  const categories = [
    {
      id: "health",
      label: "Health",
      description: "Physical and mental wellbeing",
      color: "from-emerald-500 to-teal-500",
      bgLight: "bg-emerald-50",
    },
    {
      id: "career",
      label: "Career",
      description: "Work satisfaction and progress",
      color: "from-blue-500 to-indigo-500",
      bgLight: "bg-blue-50",
    },
    {
      id: "finances",
      label: "Finances",
      description: "Financial stability and growth",
      color: "from-green-500 to-emerald-500",
      bgLight: "bg-green-50",
    },
    {
      id: "relationships",
      label: "Relationships",
      description: "Quality of personal connections",
      color: "from-pink-500 to-rose-500",
      bgLight: "bg-pink-50",
    },
    {
      id: "growth",
      label: "Personal Growth",
      description: "Learning and self-improvement",
      color: "from-purple-500 to-violet-500",
      bgLight: "bg-purple-50",
    },
    {
      id: "fun",
      label: "Fun",
      description: "Enjoyment and recreation",
      color: "from-amber-500 to-orange-500",
      bgLight: "bg-amber-50",
    },
    {
      id: "spirituality",
      label: "Spirituality",
      description: "Sense of meaning and purpose",
      color: "from-violet-500 to-purple-500",
      bgLight: "bg-violet-50",
    },
    {
      id: "environment",
      label: "Environment",
      description: "Living space and surroundings",
      color: "from-teal-500 to-cyan-500",
      bgLight: "bg-teal-50",
    },
  ]

  // Handle slider value changes
  const handleSliderChange = (category: string, newValue: number) => {
    setValues((prev) => ({
      ...prev,
      [category]: newValue,
    }))
  }

  // Handle form submission
  const handleSubmit = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      console.log("Submitted values:", values)
      setIsSubmitting(false)
      setSubmitted(true)
      // Here you would typically send the data to your backend
    }, 1500)
  }

  // Get average score
  const averageScore = Object.values(values).reduce((a, b) => a + b, 0) / 8

  // Get emoji based on score
  const getEmoji = (score: number) => {
    if (score <= 3) return "😞"
    if (score <= 5) return "😐"
    if (score <= 7) return "🙂"
    return "😄"
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg border-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-violet-500 to-purple-600 text-white">
        <CardTitle className="text-2xl md:text-3xl font-bold text-center">Life Satisfaction Quiz</CardTitle>
        <CardDescription className="text-center text-white/90">
          Rate your satisfaction in each area of life from 1 to 10
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 md:p-8">
        {submitted ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
            <p className="text-muted-foreground mb-6">Your responses have been recorded.</p>
            <div className="text-5xl mb-4">{getEmoji(averageScore)}</div>
            <p className="font-medium">Your average life satisfaction score is:</p>
            <p className="text-3xl font-bold">{averageScore.toFixed(1)}/10</p>
            <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-6">
              Edit Responses
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg ${category.bgLight}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{category.label}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                  <div className="text-2xl font-bold flex items-center gap-2">
                    <span>{getEmoji(values[category.id as keyof typeof values])}</span>
                    <span>{values[category.id as keyof typeof values]}</span>
                  </div>
                </div>

                <div className="relative pt-1">
                  <div className={`overflow-hidden h-2 text-xs flex rounded bg-gray-200`}>
                    <div
                      style={{ width: `${(values[category.id as keyof typeof values] / 10) * 100}%` }}
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r ${category.color}`}
                    ></div>
                  </div>

                  <div className="mt-4 flex justify-between">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                      <button
                        key={value}
                        onClick={() => handleSliderChange(category.id, value)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${
                          values[category.id as keyof typeof values] === value
                            ? `bg-gradient-to-r ${category.color} text-white`
                            : "bg-white border border-gray-300 hover:border-gray-400"
                        }`}
                        aria-label={`Rate ${category.label} as ${value}`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
      {!submitted && (
        <CardFooter className="px-6 pb-6 pt-2">
          <Button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white py-6 text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Submit <ChevronRight className="w-5 h-5" />
              </span>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
