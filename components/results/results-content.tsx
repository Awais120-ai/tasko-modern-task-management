"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Award, TrendingUp, Target, BookOpen } from "lucide-react"

interface Result {
  id: number
  course: string
  type: "Quiz" | "Assignment" | "Exam"
  date: string
  score: number
  total: number
}

const results: Result[] = [
  { id: 1, course: "Machine Learning A-Z", type: "Assignment", date: "Jul 25, 2026", score: 138, total: 150 },
  { id: 2, course: "Graphic Design Essentials", type: "Assignment", date: "Jul 20, 2026", score: 95, total: 100 },
  { id: 3, course: "Digital Marketing Mastery", type: "Quiz", date: "Jul 18, 2026", score: 88, total: 100 },
  { id: 4, course: "Web Development Bootcamp", type: "Exam", date: "Jul 12, 2026", score: 82, total: 100 },
  { id: 5, course: "UI/UX Design Fundamentals", type: "Quiz", date: "Jul 8, 2026", score: 76, total: 100 },
  { id: 6, course: "Data Science with Python", type: "Assignment", date: "Jul 2, 2026", score: 64, total: 100 },
]

function gradeFor(percent: number) {
  if (percent >= 90) return { letter: "A", className: "bg-primary/15 text-primary" }
  if (percent >= 80) return { letter: "B", className: "bg-primary/15 text-primary" }
  if (percent >= 70) return { letter: "C", className: "bg-amber-500/15 text-amber-600 dark:text-amber-400" }
  if (percent >= 60) return { letter: "D", className: "bg-amber-500/15 text-amber-600 dark:text-amber-400" }
  return { letter: "F", className: "bg-destructive/15 text-destructive" }
}

const typeColors: Record<Result["type"], string> = {
  Quiz: "bg-secondary text-secondary-foreground",
  Assignment: "bg-secondary text-secondary-foreground",
  Exam: "bg-secondary text-secondary-foreground",
}

export function ResultsContent() {
  const percentages = results.map((r) => (r.score / r.total) * 100)
  const average = Math.round(percentages.reduce((a, b) => a + b, 0) / percentages.length)
  const best = Math.round(Math.max(...percentages))
  const passed = percentages.filter((p) => p >= 60).length

  const summary = [
    { label: "Overall Average", value: `${average}%`, icon: TrendingUp },
    { label: "Highest Score", value: `${best}%`, icon: Target },
    { label: "Assessments Passed", value: `${passed}/${results.length}`, icon: Award },
    { label: "Active Courses", value: "6", icon: BookOpen },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summary.map((item, index) => (
          <Card
            key={item.label}
            className="p-4 animate-slide-in-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <item.icon className="w-4 h-4" />
              <p className="text-xs">{item.label}</p>
            </div>
            <p className="text-2xl font-bold text-foreground">{item.value}</p>
          </Card>
        ))}
      </div>

      <Card className="p-5">
        <h2 className="font-semibold text-foreground mb-4">Assessment History</h2>
        <div className="space-y-3">
          {results.map((result, index) => {
            const percent = Math.round((result.score / result.total) * 100)
            const grade = gradeFor(percent)
            return (
              <div
                key={result.id}
                className="flex items-center gap-4 p-3 rounded-xl bg-secondary/40 hover:bg-secondary transition-colors duration-200 animate-slide-in-up"
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <div
                  className={cn(
                    "w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold shrink-0",
                    grade.className,
                  )}
                >
                  {grade.letter}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-medium text-foreground text-sm truncate">{result.course}</h3>
                    <Badge variant="outline" className="text-[10px]">
                      {result.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{result.date}</p>
                  <div className="w-full bg-background rounded-full h-1.5 overflow-hidden mt-2 max-w-xs">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-base font-bold text-foreground">{percent}%</p>
                  <p className="text-xs text-muted-foreground">
                    {result.score}/{result.total}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
