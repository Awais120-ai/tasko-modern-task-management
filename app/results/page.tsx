import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { ResultsContent } from "@/components/results/results-content"

export default function ResultsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 p-4 lg:p-6 lg:ml-64">
        <Header title="Results" description="Review your grades and track your academic performance." />

        <div className="mt-6">
          <ResultsContent />
        </div>
      </main>
    </div>
  )
}
