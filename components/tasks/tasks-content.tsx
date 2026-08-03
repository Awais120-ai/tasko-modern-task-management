"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Star, Clock, PlayCircle } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const courses = [
  {
    id: 1,
    title: "Web Development Bootcamp",
    instructor: "Sarah Mitchell",
    category: "Development",
    level: "Beginner",
    rating: 4.9,
    duration: "42 lessons",
    progress: 43,
    image: "/courses/web-development.png",
    status: "in-progress",
  },
  {
    id: 2,
    title: "UI/UX Design Fundamentals",
    instructor: "Edwin Adenike",
    category: "Design",
    level: "Intermediate",
    rating: 4.8,
    duration: "30 lessons",
    progress: 80,
    image: "/courses/ux-design.png",
    status: "in-progress",
  },
  {
    id: 3,
    title: "Data Science with Python",
    instructor: "Isaac Oluwatemilorun",
    category: "Data",
    level: "Intermediate",
    rating: 4.7,
    duration: "36 lessons",
    progress: 25,
    image: "/courses/data-science.png",
    status: "in-progress",
  },
  {
    id: 4,
    title: "Digital Marketing Mastery",
    instructor: "David Oshodi",
    category: "Marketing",
    level: "Beginner",
    rating: 4.6,
    duration: "24 lessons",
    progress: 100,
    image: "/courses/marketing.png",
    status: "completed",
  },
  {
    id: 5,
    title: "Machine Learning A-Z",
    instructor: "Sarah Mitchell",
    category: "Data",
    level: "Advanced",
    rating: 4.9,
    duration: "28 lessons",
    progress: 43,
    image: "/courses/machine-learning.png",
    status: "in-progress",
  },
  {
    id: 6,
    title: "Graphic Design Essentials",
    instructor: "Edwin Adenike",
    category: "Design",
    level: "Beginner",
    rating: 4.8,
    duration: "20 lessons",
    progress: 100,
    image: "/courses/graphic-design.png",
    status: "completed",
  },
]

export function TasksContent() {
  const [filter, setFilter] = useState("all")

  const filteredCourses =
    filter === "all"
      ? courses
      : filter === "completed"
        ? courses.filter((c) => c.status === "completed")
        : courses.filter((c) => c.status === "in-progress")

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search courses..." className="pl-10" />
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      <div className="flex gap-2">
        <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")} size="sm">
          All ({courses.length})
        </Button>
        <Button
          variant={filter === "in-progress" ? "default" : "outline"}
          onClick={() => setFilter("in-progress")}
          size="sm"
        >
          In Progress ({courses.filter((c) => c.status === "in-progress").length})
        </Button>
        <Button
          variant={filter === "completed" ? "default" : "outline"}
          onClick={() => setFilter("completed")}
          size="sm"
        >
          Completed ({courses.filter((c) => c.status === "completed").length})
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <Card
            key={course.id}
            className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer animate-slide-in group p-0"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="relative h-40 w-full overflow-hidden">
              <Image
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <Badge className="absolute top-3 left-3 bg-background/90 text-foreground hover:bg-background/90">
                {course.category}
              </Badge>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {course.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {course.duration}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground leading-tight text-pretty">{course.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">by {course.instructor}</p>
              </div>
              <Badge variant="outline" className="text-xs">
                {course.level}
              </Badge>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">{course.progress}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                <PlayCircle className="w-4 h-4" />
                {course.progress === 100 ? "Review Course" : "Continue"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
