"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ScrollAnimation,
  ScrollStagger,
  ParallaxScroll,
  MagneticHover,
  MotionDiv,
  staggerItem,
} from "@/providers/motion-provider"
import { Sparkles, Zap, Rocket, Star, Heart, Eye, Lightbulb, Palette, Code, Layers } from "lucide-react"

const animationTypes = [
  { name: "fadeInUp", icon: Sparkles, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  { name: "fadeInDown", icon: Zap, color: "bg-purple-500/10 text-purple-600 dark:text-purple-400" },
  { name: "fadeInLeft", icon: Rocket, color: "bg-green-500/10 text-green-600 dark:text-green-400" },
  { name: "fadeInRight", icon: Star, color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" },
  { name: "scaleIn", icon: Heart, color: "bg-red-500/10 text-red-600 dark:text-red-400" },
  { name: "scaleInRotate", icon: Eye, color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" },
  { name: "slideInUp", icon: Lightbulb, color: "bg-orange-500/10 text-orange-600 dark:text-orange-400" },
  { name: "flipIn", icon: Palette, color: "bg-pink-500/10 text-pink-600 dark:text-pink-400" },
  { name: "bounceIn", icon: Code, color: "bg-teal-500/10 text-teal-600 dark:text-teal-400" },
  { name: "elasticIn", icon: Layers, color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400" },
] as const

export function ScrollDemo() {
  return (
    <div className="space-y-24 py-12">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <ScrollAnimation variant="fadeInUp" delay={0.2}>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Scroll-Triggered Animations
          </h1>
        </ScrollAnimation>

        <ScrollAnimation variant="fadeInUp" delay={0.4}>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience smooth, performant animations that trigger as you scroll. Each animation plays once and
            integrates seamlessly with your theme.
          </p>
        </ScrollAnimation>

        <ScrollAnimation variant="scaleIn" delay={0.6}>
          <div className="flex justify-center gap-4">
            <MagneticHover>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Get Started
              </Button>
            </MagneticHover>
            <MagneticHover>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </MagneticHover>
          </div>
        </ScrollAnimation>
      </section>

      {/* Animation Types Grid */}
      <section className="space-y-12">
        <ScrollAnimation variant="fadeInUp" as="h2" className="text-3xl font-bold text-center">
          Animation Variants
        </ScrollAnimation>

        <ScrollStagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {animationTypes.map((animation, index) => {
            const Icon = animation.icon
            return (
              <MotionDiv key={animation.name} variants={staggerItem}>
                <ScrollAnimation variant={animation.name} delay={index * 0.1} className="h-full">
                  <MagneticHover className="h-full">
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-2 hover:border-primary/20">
                      <CardContent className="p-6 text-center space-y-4">
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${animation.color}`}
                        >
                          <Icon className="w-8 h-8" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{animation.name}</h3>
                          <Badge variant="secondary" className="mt-2">
                            Scroll Triggered
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </MagneticHover>
                </ScrollAnimation>
              </MotionDiv>
            )
          })}
        </ScrollStagger>
      </section>

      {/* Parallax Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 p-12">
        <ParallaxScroll speed={0.3} direction="up" className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl" />
        </ParallaxScroll>

        <div className="relative z-10 text-center space-y-8">
          <ScrollAnimation variant="scaleInRotate">
            <h2 className="text-4xl font-bold">Parallax Effects</h2>
          </ScrollAnimation>

          <ScrollAnimation variant="fadeInUp" delay={0.2}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Subtle parallax scrolling effects that add depth and dimension to your content without overwhelming the
              user experience.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="space-y-12">
        <ScrollAnimation variant="fadeInUp" as="h2" className="text-3xl font-bold text-center">
          Key Features
        </ScrollAnimation>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <ScrollAnimation
              key={feature.title}
              variant={index % 2 === 0 ? "fadeInLeft" : "fadeInRight"}
              delay={index * 0.1}
            >
              <Card className="h-full group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>
      </section>

      {/* Stagger Animation Demo */}
      <section className="space-y-12">
        <ScrollAnimation variant="fadeInUp" as="h2" className="text-3xl font-bold text-center">
          Stagger Animations
        </ScrollAnimation>

        <ScrollStagger className="space-y-4" staggerDelay={0.1}>
          {Array.from({ length: 6 }).map((_, index) => (
            <MotionDiv key={index} variants={staggerItem}>
              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold">Staggered Item {index + 1}</h3>
                    <p className="text-muted-foreground">This item animates in sequence with others</p>
                  </div>
                </div>
              </Card>
            </MotionDiv>
          ))}
        </ScrollStagger>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-8 py-16">
        <ScrollAnimation variant="bounceIn">
          <h2 className="text-4xl font-bold">Ready to Get Started?</h2>
        </ScrollAnimation>

        <ScrollAnimation variant="fadeInUp" delay={0.2}>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Integrate these beautiful scroll animations into your Next.js project and create engaging user experiences.
          </p>
        </ScrollAnimation>

        <ScrollAnimation variant="elasticIn" delay={0.4}>
          <MagneticHover>
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-lg px-8 py-3"
            >
              Start Building
            </Button>
          </MagneticHover>
        </ScrollAnimation>
      </section>
    </div>
  )
}

const features = [
  {
    title: "Performance Optimized",
    description:
      "Built with Framer Motion's optimized animation engine for smooth 60fps animations that don't impact performance.",
    icon: Zap,
    color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  },
  {
    title: "Play Once Logic",
    description:
      "Animations trigger only once per element, preventing repetitive animations when scrolling back and forth.",
    icon: Eye,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    title: "Theme Aware",
    description:
      "Seamlessly integrates with light and dark themes using the shadcn/ui color system for consistent styling.",
    icon: Palette,
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
  {
    title: "Customizable",
    description:
      "Easily adjust timing, delays, and animation variants to match your design requirements and brand identity.",
    icon: Lightbulb,
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  },
  {
    title: "Accessible",
    description:
      "Respects user preferences for reduced motion and provides fallbacks for better accessibility compliance.",
    icon: Heart,
    color: "bg-red-500/10 text-red-600 dark:text-red-400",
  },
  {
    title: "Developer Friendly",
    description:
      "Simple API with TypeScript support, comprehensive documentation, and easy integration with existing components.",
    icon: Code,
    color: "bg-green-500/10 text-green-600 dark:text-green-400",
  },
]
