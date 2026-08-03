"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, FileText, CheckCircle2, AlertCircle, Upload, Search, Flame } from "lucide-react"
import { useMemo, useState } from "react"

type AssignmentStatus = "pending" | "submitted" | "overdue" | "graded"

interface Assignment {
  id: number
  title: string
  course: string
  dueDate: string
  points: number
  status: AssignmentStatus
  grade?: number
  description: string
}

// Fixed "today" so the sample countdowns stay consistent in the demo.
const TODAY = new Date("2026-08-03T00:00:00")

const assignments: Assignment[] = [
  {
    id: 1,
    title: "Build a Responsive Landing Page",
    course: "Web Development Bootcamp",
    dueDate: "2026-08-08",
    points: 100,
    status: "pending",
    description: "Create a fully responsive landing page using HTML, CSS, and JavaScript.",
  },
  {
    id: 2,
    title: "User Persona Case Study",
    course: "UI/UX Design Fundamentals",
    dueDate: "2026-08-05",
    points: 80,
    status: "pending",
    description: "Research and document three user personas for a mobile banking app.",
  },
  {
    id: 3,
    title: "Data Cleaning with Pandas",
    course: "Data Science with Python",
    dueDate: "2026-08-01",
    points: 120,
    status: "overdue",
    description: "Clean and prepare the provided dataset for analysis using Pandas.",
  },
  {
    id: 4,
    title: "SEO Strategy Report",
    course: "Digital Marketing Mastery",
    dueDate: "2026-07-28",
    points: 90,
    status: "submitted",
    description: "Write a comprehensive SEO strategy for an e-commerce brand.",
  },
  {
    id: 5,
    title: "Linear Regression Model",
    course: "Machine Learning A-Z",
    dueDate: "2026-07-25",
    points: 150,
    status: "graded",
    grade: 138,
    description: "Implement and evaluate a linear regression model on housing data.",
  },
  {
    id: 6,
    title: "Brand Logo Design",
    course: "Graphic Design Essentials",
    dueDate: "2026-07-20",
    points: 100,
    status: "graded",
    grade: 95,
    description: "Design a complete logo suite for a fictional coffee startup.",
  },
]

const statusConfig: Record<AssignmentStatus, { label: string; className: string; icon: typeof Clock }> = {
  pending: { label: "Pending", className: "bg-amber-500/15 text-amber-600 dark:text-amber-400", icon: Clock },
  submitted: { label: "Submitted", className: "bg-primary/15 text-primary", icon: CheckCircle2 },
  overdue: { label: "Overdue", className: "bg-destructive/15 text-destructive", icon: AlertCircle },
  graded: { label: "Graded", className: "bg-primary/15 text-primary", icon: CheckCircle2 },
}

const filters = ["all", "pending", "submitted", "graded"] as const

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

function daysLeft(iso: string) {
  const due = new Date(iso + "T00:00:00")
  return Math.round((due.getTime() - TODAY.getTime()) / (1000 * 60 * 60 * 24))
}

export function AssignmentsContent() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("all")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const byStatus =
      filter === "all"
        ? assignments
        : filter === "pending"
          ? assignments.filter((a) => a.status === "pending" || a.status === "overdue")
          : assignments.filter((a) => a.status === filter)

    const q = query.trim().toLowerCase()
    if (!q) return byStatus
    return byStatus.filter(
      (a) => a.title.toLowerCase().includes(q) || a.course.toLowerCase().includes(q),
    )
  }, [filter, query])

  const completed = assignments.filter((a) => a.status === "submitted" || a.status === "graded").length
  const completionPercent = Math.round((completed / assignments.length) * 100)

  const stats = [
    { label: "Total", value: assignments.length },
    { label: "Pending", value: assignments.filter((a) => a.status === "pending" || a.status === "overdue").length },
    { label: "Submitted", value: assignments.filter((a) => a.status === "submitted").length },
    { label: "Graded", value: assignments.filter((a) => a.status === "graded").length },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-5 animate-slide-in-up">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold text-foreground">Course Progress</h2>
            <p className="text-sm text-muted-foreground">
              {completed} of {assignments.length} assignments completed
            </p>
          </div>
          <span className="text-2xl font-bold text-primary">{completionPercent}%</span>
        </div>
        <Progress value={completionPercent} className="mt-4 h-2" />
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={stat.label} className="p-4 animate-slide-in-up" style={{ animationDelay: `${index * 50}ms` }}>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </Card>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search assignments or courses..."
            className="pl-9"
            aria-label="Search assignments"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f)}
              size="sm"
              className="capitalize"
            >
              {f}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <Card className="p-8 text-center text-muted-foreground">No assignments match your search.</Card>
        )}
        {filtered.map((assignment, index) => {
          const config = statusConfig[assignment.status]
          const StatusIcon = config.icon
          const remaining = daysLeft(assignment.dueDate)
          const showCountdown = assignment.status === "pending" || assignment.status === "overdue"
          const urgent = remaining <= 3
          return (
            <Card
              key={assignment.id}
              className="p-5 hover:shadow-lg transition-all duration-300 animate-slide-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-foreground text-pretty">{assignment.title}</h3>
                    <Badge className={config.className}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {config.label}
                    </Badge>
                    {showCountdown && (
                      <Badge
                        className={
                          urgent
                            ? "bg-destructive/15 text-destructive"
                            : "bg-secondary text-secondary-foreground"
                        }
                      >
                        {urgent && <Flame className="w-3 h-3 mr-1" />}
                        {remaining < 0
                          ? `${Math.abs(remaining)}d overdue`
                          : remaining === 0
                            ? "Due today"
                            : `${remaining}d left`}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{assignment.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      {assignment.course}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Due {formatDate(assignment.dueDate)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between lg:flex-col lg:items-end gap-2 shrink-0">
                  <span className="text-sm font-semibold text-foreground">
                    {assignment.status === "graded"
                      ? `${assignment.grade}/${assignment.points} pts`
                      : `${assignment.points} pts`}
                  </span>
                  {showCountdown ? (
                    <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                      <Upload className="w-4 h-4" />
                      Submit
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
