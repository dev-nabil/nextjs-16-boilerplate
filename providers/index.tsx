"use client"

import type React from "react"

import { Provider as ReduxProvider } from "react-redux"
import { MotionProvider } from "@/providers/motion-provider"
import { store } from "@/lib/store"


export function Providers({ children }: { children: React.ReactNode }) {

  return (
    <ReduxProvider store={store}>
          <MotionProvider>{children}</MotionProvider>
    </ReduxProvider>
  )
}
