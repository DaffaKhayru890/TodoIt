import React from 'react'

export default function Loading() {
  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-gray-100">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
    </div>
  )
}
