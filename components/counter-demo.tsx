"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import { increment, decrement, reset, incrementByAmount } from "@/lib/features/counter/counter-slice"
import { MotionDiv, fadeInUp, MagneticHover, scaleIn } from "@/providers/motion-provider"
import { Plus, Minus, RotateCcw } from "lucide-react"

export function CounterDemo() {
  const count = useAppSelector((state) => state.counter.value)
  const isLoading = useAppSelector((state) => state.counter.isLoading)
  const dispatch = useAppDispatch()

  return (
    <MotionDiv variants={fadeInUp} initial="initial" animate="animate" className="w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Redux Counter Demo</CardTitle>
          <CardDescription>A simple counter to demonstrate Redux Toolkit integration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <MotionDiv variants={scaleIn} className="text-center">
            <div className="text-4xl font-bold text-primary">{count}</div>
          </MotionDiv>

          <div className="flex gap-2 justify-center">
            <MagneticHover>
              <Button variant="outline" size="icon" onClick={() => dispatch(decrement())} disabled={isLoading}>
                <Minus className="h-4 w-4" />
              </Button>
            </MagneticHover>

            <MagneticHover>
              <Button variant="outline" size="icon" onClick={() => dispatch(reset())} disabled={isLoading}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </MagneticHover>

            <MagneticHover>
              <Button variant="outline" size="icon" onClick={() => dispatch(increment())} disabled={isLoading}>
                <Plus className="h-4 w-4" />
              </Button>
            </MagneticHover>
          </div>

          <div className="flex gap-2 justify-center">
            <MagneticHover>
              <Button variant="secondary" onClick={() => dispatch(incrementByAmount(5))} disabled={isLoading}>
                +5
              </Button>
            </MagneticHover>

            <MagneticHover>
              <Button variant="secondary" onClick={() => dispatch(incrementByAmount(10))} disabled={isLoading}>
                +10
              </Button>
            </MagneticHover>
          </div>
        </CardContent>
      </Card>
    </MotionDiv>
  )
}
