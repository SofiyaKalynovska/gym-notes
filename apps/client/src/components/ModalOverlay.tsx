'use client'

import { X } from "lucide-react"


interface Props {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export function ModalOverlay({ open, onClose, children }: Props) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-[var(--color-bg-secondary)] text-white text-lg px-4 py-6 flex flex-col items-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white bg-white/10 hover:bg-white/20 rounded-full"
        aria-label="Close"
      >
        <X size={24} />
      </button>

      <div className="mt-12 w-full max-w-md flex flex-col gap-6">
        {children}
      </div>
    </div>
  )
}
