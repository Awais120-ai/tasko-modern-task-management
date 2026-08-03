import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { QuizzesContent } from "@/components/quizzes/quizzes-content"

export default function QuizzesPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 p-4 lg:p-6 lg:ml-64">
        <Header title="Quizzes" description="Test your knowledge and reinforce what you have learned." />

        <div className="mt-6">
          <QuizzesContent />
        </div>
      </main>
    </div>
  )
}
