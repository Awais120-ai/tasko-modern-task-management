"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MoreHorizontal } from "lucide-react"

const teamMembers = [
  {
    name: "Sarah Mitchell",
    role: "Web Development",
    email: "sarah@learnly.com",
    status: "active",
    tasks: 5,
    avatar: "/avatars/avatar-1.jpg",
    initials: "SM",
  },
  {
    name: "Edwin Adenike",
    role: "UI/UX Design",
    email: "edwin@learnly.com",
    status: "active",
    tasks: 3,
    avatar: "/avatars/avatar-2.jpg",
    initials: "EA",
  },
  {
    name: "Isaac Oluwatemilorun",
    role: "Data Science",
    email: "isaac@learnly.com",
    status: "away",
    tasks: 4,
    avatar: "/avatars/avatar-3.jpg",
    initials: "IO",
  },
  {
    name: "David Oshodi",
    role: "Digital Marketing",
    email: "david@learnly.com",
    status: "active",
    tasks: 2,
    avatar: "/avatars/avatar-4.jpg",
    initials: "DO",
  },
]

export function TeamContent() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <Card
            key={member.email}
            className="p-6 hover:shadow-lg transition-all duration-300 animate-slide-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <Avatar className="w-16 h-16 border-2 border-primary/20">
                <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                <AvatarFallback>{member.initials}</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>

              <Badge variant={member.status === "active" ? "default" : "secondary"}>
                {member.status === "active" ? "Active" : "Away"}
              </Badge>

              <div className="pt-2 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Courses Teaching</span>
                  <span className="font-semibold">{member.tasks}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Mail className="w-4 h-4 mr-1" />
                  Message
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Phone className="w-4 h-4 mr-1" />
                  Profile
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
