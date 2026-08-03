"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Clock, HelpCircle, CheckCircle2, XCircle, RotateCcw, ChevronRight, Trophy } from "lucide-react"
import { useState } from "react"

interface Question {
  id: number
  question: string
  options: string[]
  answer: number
}

interface Quiz {
  id: number
  title: string
  course: string
  questions: Question[]
  timeLimit: string
}

const quizzes: Quiz[] = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    course: "Web Development Bootcamp",
    timeLimit: "10 min",
    questions: [
      {
        id: 1,
        question: "Which keyword declares a block-scoped variable in JavaScript?",
        options: ["var", "let", "function", "define"],
        answer: 1,
      },
      {
        id: 2,
        question: "What does the '===' operator check for?",
        options: ["Value only", "Type only", "Value and type", "Reference only"],
        answer: 2,
      },
      {
        id: 3,
        question: "Which method adds an element to the end of an array?",
        options: ["shift()", "unshift()", "pop()", "push()"],
        answer: 3,
      },
    ],
  },
  {
    id: 2,
    title: "Design Principles",
    course: "UI/UX Design Fundamentals",
    timeLimit: "8 min",
    questions: [
      {
        id: 1,
        question: "What principle refers to the visual weight of elements?",
        options: ["Contrast", "Balance", "Repetition", "Proximity"],
        answer: 1,
      },
      {
        id: 2,
        question: "Which color model is used for digital screens?",
        options: ["CMYK", "RGB", "Pantone", "Grayscale"],
        answer: 1,
      },
    ],
  },
]

const availableQuizzes = [
  { title: "Python Basics", course: "Data Science with Python", questions: 12, status: "not-started" },
  { title: "Marketing Metrics", course: "Digital Marketing Mastery", questions: 8, status: "completed", score: 88 },
]

export function QuizzesContent() {
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null)
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [finished, setFinished] = useState(false)

  const startQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz)
    setCurrentQ(0)
    setSelected(null)
    setAnswers([])
    setFinished(false)
  }

  const reset = () => {
    setActiveQuiz(null)
    setCurrentQ(0)
    setSelected(null)
    setAnswers([])
    setFinished(false)
  }

  const nextQuestion = () => {
    if (selected === null || !activeQuiz) return
    const newAnswers = [...answers, selected]
    setAnswers(newAnswers)
    if (currentQ + 1 < activeQuiz.questions.length) {
      setCurrentQ(currentQ + 1)
      setSelected(null)
    } else {
      setFinished(true)
    }
  }

  if (activeQuiz && finished) {
    const correct = answers.filter((a, i) => a === activeQuiz.questions[i].answer).length
    const total = activeQuiz.questions.length
    const percent = Math.round((correct / total) * 100)
    const passed = percent >= 60

    return (
      <div className="animate-fade-in max-w-2xl mx-auto">
        <Card className="p-8 text-center">
          <div
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4",
              passed ? "bg-primary/15" : "bg-destructive/15",
            )}
          >
            <Trophy className={cn("w-8 h-8", passed ? "text-primary" : "text-destructive")} />
          </div>
          <h2 className="text-2xl font-bold text-foreground">{passed ? "Great job!" : "Keep practicing!"}</h2>
          <p className="text-muted-foreground mt-1">{activeQuiz.title}</p>

          <div className="my-6">
            <p className="text-5xl font-bold text-foreground">{percent}%</p>
            <p className="text-sm text-muted-foreground mt-1">
              {correct} of {total} correct
            </p>
          </div>

          <div className="space-y-3 text-left mb-6">
            {activeQuiz.questions.map((q, i) => {
              const isCorrect = answers[i] === q.answer
              return (
                <div key={q.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary">
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-foreground">{q.question}</p>
                    <p className="text-xs text-muted-foreground mt-1">Correct answer: {q.options[q.answer]}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => startQuiz(activeQuiz)} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Retry
            </Button>
            <Button onClick={reset} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Back to Quizzes
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  if (activeQuiz) {
    const question = activeQuiz.questions[currentQ]
    const progress = ((currentQ + 1) / activeQuiz.questions.length) * 100

    return (
      <div className="animate-fade-in max-w-2xl mx-auto">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-foreground">{activeQuiz.title}</h2>
              <p className="text-sm text-muted-foreground">
                Question {currentQ + 1} of {activeQuiz.questions.length}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={reset}>
              Exit
            </Button>
          </div>

          <div className="w-full bg-secondary rounded-full h-2 overflow-hidden mb-6">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <h3 className="text-lg font-medium text-foreground mb-4 text-pretty">{question.question}</h3>

          <div className="space-y-3">
            {question.options.map((option, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={cn(
                  "w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200",
                  selected === i
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border hover:border-primary/50 hover:bg-secondary text-foreground",
                )}
              >
                <span
                  className={cn(
                    "w-6 h-6 rounded-full border flex items-center justify-center text-xs font-semibold shrink-0",
                    selected === i ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground",
                  )}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm">{option}</span>
              </button>
            ))}
          </div>

          <Button
            onClick={nextQuestion}
            disabled={selected === null}
            className="w-full mt-6 gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {currentQ + 1 === activeQuiz.questions.length ? "Finish Quiz" : "Next Question"}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">Ready to take</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quizzes.map((quiz, index) => (
            <Card
              key={quiz.id}
              className="p-5 hover:shadow-lg transition-all duration-300 animate-slide-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                  <HelpCircle className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{quiz.title}</h3>
                  <p className="text-sm text-muted-foreground">{quiz.course}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  {quiz.questions.length} questions
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {quiz.timeLimit}
                </span>
              </div>
              <Button
                onClick={() => startQuiz(quiz)}
                className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Start Quiz
              </Button>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">Other quizzes</h2>
        <div className="space-y-3">
          {availableQuizzes.map((quiz, index) => (
            <Card
              key={quiz.title}
              className="p-4 flex items-center gap-4 animate-slide-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm">{quiz.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {quiz.course} &middot; {quiz.questions} questions
                </p>
              </div>
              {quiz.status === "completed" ? (
                <Badge className="bg-primary/15 text-primary">Scored {quiz.score}%</Badge>
              ) : (
                <Badge variant="outline">Not started</Badge>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
