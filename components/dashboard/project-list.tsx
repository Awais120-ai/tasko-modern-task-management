"use client"

import { Card } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const courses = [
  { name: "Web Development Bootcamp", lessons: "18 / 42 lessons", progress: 43, image: "/courses/web-development.png" },
  { name: "UI/UX Design Fundamentals", lessons: "24 / 30 lessons", progress: 80, image: "/courses/ux-design.png" },
  { name: "Data Science with Python", lessons: "9 / 36 lessons", progress: 25, image: "/courses/data-science.png" },
  { name: "Machine Learning A-Z", lessons: "12 / 28 lessons", progress: 43, image: "/courses/machine-learning.png" },
]

export function ProjectList() {
  return (
    <Card
      className="p-6 transition-all duration-500 hover:shadow-xl animate-slide-in-up"
      style={{ animationDelay: "700ms" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Continue Learning</h2>
        <Button variant="outline" size="sm" className="transition-all duration-300 hover:scale-105 bg-transparent">
          <Plus className="w-4 h-4 mr-1" />
          Browse
        </Button>
      </div>
      <div className="space-y-3">
        {courses.map((course) => (
          <div
            key={course.name}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-all duration-300 cursor-pointer group"
          >
            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image src={course.image || "/placeholder.svg"} alt={course.name} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground text-sm truncate">{course.name}</p>
              <p className="text-xs text-muted-foreground mb-1.5">{course.lessons}</p>
              <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
