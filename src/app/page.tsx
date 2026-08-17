'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const envUrl = process.env.NEXT_PUBLIC_TUNNEL_URL
    if (envUrl) {
      window.location.replace(envUrl)
    }
  }, [])

  if (!isMounted) return null

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#09090b] p-6 text-center text-white">
      <div className="flex flex-col items-center gap-5">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-xl font-bold tracking-tight text-white">
            {process.env.NEXT_PUBLIC_APP_NAME || "Iniciando Sistema"}
          </h2>
          <p className="text-xs text-zinc-400">
            Conectando ao ambiente de execução...
          </p>
        </div>
      </div>
    </main>
  )
}
