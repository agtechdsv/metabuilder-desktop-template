'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const envUrl = process.env.NEXT_PUBLIC_TUNNEL_URL
    if (envUrl) {
      window.location.href = envUrl
    }
  }, [])

  if (!isMounted) return null

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-6 text-center">
      <div className="max-w-md w-full p-8 bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 space-y-6">
        <div className="w-16 h-16 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">
            {process.env.NEXT_PUBLIC_APP_NAME || "App Desktop Nativo"}
          </h1>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Este aplicativo foi empacotado com sucesso. Nenhuma URL de servidor central foi fornecida durante a compilação.
          </p>
        </div>
      </div>
    </main>
  )
}
