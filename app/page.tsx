// app/page.tsx
"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import { FaSitemap, FaClockRotateLeft, FaRobot } from "react-icons/fa6";
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import FeatureCard from "@/components/feature-card"

import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowRight, Github, Linkedin, Mail, Users, Share2, Target, Award, TrendingDown, Heart } from "lucide-react"

export default function Home() {
  const plugin = React.useRef(
    Autoplay({ delay: 15000, stopOnInteraction: true })
  )

  const slides = [
    "/Human-Human.png",
    "/Human-Agent.png",
    "/Agent-Agent.png",
  ];

  return (
    <>
      <header className="fixed w-full top-0 z-10 bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 md:py-6 flex justify-between items-center">
          <Link href="/">
            <Image src="/full_logo.svg" alt="WADE AI Logo" width={200} height={500} className="h-10 md:h-12" />
          </Link>
          <ul className="hidden md:flex space-x-6 text-gray-900">
            {["challenge", "key-ideas", "features", "vision"].map(id => (
              <li key={id}>
                <a href={`#${id}`} className="hover:text-teal-500 transition duration-300 capitalize">
                  {id.replace("-", " ")}
                </a>
              </li>
            ))}
          </ul>
          <Button variant="ghost" size="sm" className="md:hidden">
            Menu
          </Button>
        </nav>
      </header>

      <main className="pt-24">
        <section id="home" className="bg-cover bg-center h-[calc(80vh-6rem)] flex flex-col justify-center items-center text-center p-8">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-4 leading-tight max-w-3xl">
            Accurate Context for <span className="text-teal-500">Effective Decisions</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl">
            A powerful framework for organizing your work and delivering insightful decision-making context
          </p>
        </section>

        <section id="challenge" className="pt-40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-semibold text-center mb-16">Unlocking Effective Decisions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="text-lg leading-relaxed space-y-10">
                <div>
                  <h3 className="text-xl font-semibold mb-4">The Challenge: Scattered Context & Ineffective Decisions</h3>
                  <ul className="list-none space-y-3 pl-1">
                    <li className="flex items-start gap-3">
                      <span className="text-gray-500">🔧</span>
                      <span>Modern tools streamline tasks, but crucial project context gets scattered across them.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gray-500">🗂️</span>
                      <span>Decision rationales are not captured and get easily lost.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gray-500">❓</span>
                      <span>Understanding the "why" behind past decisions is vital for future success, but often unclear and difficult to find.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gray-500">⏱️</span>
                      <span>Decision-making context is often pulled from our memories, which can be influenced by biases.</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">The Solution: Organized Context & Well-Informed Decisions</h3>
                  <ul className="list-none space-y-3 pl-1">
                    <li className="flex items-start gap-3">
                      <span className="text-gray-500">🔗</span>
                      <span>Provides a simple, unifying framework to organize fragmented information.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gray-500">🛡️</span>
                      <span>Keeps everyone aligned by creating a reliable and shared source of truth.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gray-500">🎯</span>
                      <span>Encourages clear ownership and transparent rationale for decisions.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gray-500">🧠</span>
                      <span>Enables truly informed decision-making with AI-powered insights.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="/Systems-Diagram.svg"
                  alt="Scattered info vs organized context diagram"
                  width={600}
                  height={400}
                  className="max-w-full"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="key-ideas" className="py-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">Key Ideas</h2>
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <p className="text-gray-700">
                WADE is an acronym that represents the core components of the framework. Each component plays a crucial role in capturing and contextualizing information within a project.
              </p>
              <div className="space-y-4">
                {["W", "A", "D", "E"].map(letter => (
                  <div key={letter} className="flex items-start gap-2">
                    <Image src={`/logo-${letter}.svg`} alt={`${letter} logo`} width={32} height={32} />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{letter === 'W' ? 'Workstreams' : letter === 'A' ? 'Actions' : letter === 'D' ? 'Decisions' : 'Events'}</h3>
                      <p className="text-gray-600">
                        {letter === 'W' && 'The central component of the framework, organizing key project elements: Decisions, Events, and Actions.'}
                        {letter === 'A' && 'Tasks and activities performed by users within a Workstream, driving progress towards its goals.'}
                        {letter === 'D' && 'Capture the intent and rationale behind a Workstream’s actions. They are the only elements that change a Workstream’s state.'}
                        {letter === 'E' && 'Observations or external factors relevant to a Workstream, recorded for context and awareness.'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-auto h-full -mt-6 ml-8">
              <Carousel
                plugins={[plugin.current]}
                className="p-4"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent>
                  {slides.map((src, i) => (
                    <CarouselItem key={i} className="flex justify-center">
                      <Image src={src} alt={`Slide ${i}`} width={800} height={800} unoptimized={true} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </section>

        <section id="features" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 text-center mb-12">
          Features
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FaSitemap />}
            header="Quick Discovery & Insights"
            description="Discover workstreams through an interactive visual tree which surfaces status."
            imageSrc="/WS_Relationships.gif"
            imageAlt="Workstream Relationships"
          />

          <FeatureCard
            icon={<FaClockRotateLeft />}
            header="Effective Timeline Visualization"
            description="See a time-based log of decisions, actions & events related to the workstream."
            imageSrc="/WS_Logs.gif"
            imageAlt="Workstream Logs"
          />

          <FeatureCard
            icon={<FaRobot />}
            header="AI Powered Insights"
            description="Get a personalized AI assistant who will answer your workstream related questions and help you make informed decisions!"
            imageSrc="/WS_AI.gif"
            imageAlt="Workstream AI Assistant"
          />
        </div>
      </div>
    </section>

        <section id="vision" className="py-16 mt-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-8">Vision</h2>
            <div className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              <p>
                To empower individuals, teams, and organizations to operate with integrity and transparency, fostering a world where decisions are made with the most accurate and unbiased insights.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <div>© 2025 WADE AI. All rights reserved.</div>
          <div className="flex space-x-4">
            <a href="mailto:dey.archit@gmail.com" className="hover:text-gray-900">Contact</a>
          </div>
        </div>
      </footer>
    </>
  )
}
