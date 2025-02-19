"use client"

import { useState } from "react"
import { Book } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { User, HistoryEntry } from "./data/types"

export default function LibrarySystem() {
  const [activeUsers, setActiveUsers] = useState<User[]>([])
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [userName, setUserName] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const handleCheckIn = () => {
    if (!userName.trim()) return

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: userName.trim(),
      checkInTime: new Date(),
    }

    setActiveUsers((prev) => [...prev, newUser])
    setUserName("")
  }

  const handleCheckOut = (userId: string) => {
    const user = activeUsers.find((u) => u.id === userId)
    if (!user) return

    const historyEntry: HistoryEntry = {
      id: Math.random().toString(36).substr(2, 9),
      userName: user.name,
      checkInTime: user.checkInTime,
      checkOutTime: new Date(),
    }

    setHistory((prev) => [historyEntry, ...prev])
    setActiveUsers((prev) => prev.filter((u) => u.id !== userId))
  }

  const filteredHistory = history.filter((entry) => entry.userName.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="bg-blue-600 text-white p-3 rounded-xl">
            <Book className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Library Management System</h1>
            <p className="text-gray-500">Track and manage library visits efficiently</p>
          </div>
          <div className="ml-auto bg-blue-50 text-blue-600 px-4 py-2 rounded-lg flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-current" />
            <span>{activeUsers.length} Active Users</span>
          </div>
        </div>

        {/* Check-in System */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-lg">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14" />
            </svg>
            <h2>Check-in System</h2>
          </div>
          <div className="flex gap-3">
            <Input
              placeholder="Enter user name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleCheckIn} className="bg-blue-600 hover:bg-blue-700">
              Check In
            </Button>
          </div>
        </div>

        {/* Check-out History */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-lg">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
              </svg>
              <h2>Check-out History</h2>
            </div>
            <Input
              placeholder="Search history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
          </div>

          <div className="bg-white rounded-lg shadow">
            {filteredHistory.length > 0 ? (
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">User</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Check In</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Check Out</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHistory.map((entry) => (
                    <tr key={entry.id} className="border-b last:border-0">
                      <td className="px-6 py-4 text-sm">{entry.userName}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{entry.checkInTime.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{entry.checkOutTime.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-8 text-gray-500">No history entries found</div>
            )}
          </div>
        </div>

        {/* Active Users */}
        {activeUsers.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg">Active Users</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {activeUsers.map((user) => (
                <div key={user.id} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-500">Since {user.checkInTime.toLocaleTimeString()}</div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleCheckOut(user.id)}>
                    Check Out
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

