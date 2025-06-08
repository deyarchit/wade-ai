// app/page.tsx
"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import { FaSitemap, FaClockRotateLeft, FaRobot } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import FeatureCard from "@/components/feature-card"

export default function Home() {
  const plugin = React.useRef(
    Autoplay({ delay: 15000, stopOnInteraction: true })
  )

  const slides = [
    "./Human-Human.png",
    "./Human-Agent.png",
    "./Agent-Agent.png",
  ];

  return (
    <>
      <header className="fixed w-full top-0 z-10 bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 md:py-6 flex justify-between items-center">
          <Link href="/">
            <Image src="./full_logo.svg" alt="WADE AI Logo" width={200} height={500} className="h-10 md:h-12" />
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
            <h2 className="text-3xl md:text-4xl font-semibold text-center mb-16">
              Unlocking Effective Decisions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center text-gray-600">
              <div className="leading-relaxed space-y-10">
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    The Challenge: Scattered Context & Ineffective Decisions
                  </h3>
                  <ul className="list-none space-y-3 pl-1">
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleArrowRight} className="text-gray-500 mt-1" />
                      <span>
                        <span className="font-bold">Project context is scattered across multiple apps</span>, making it difficult to get a complete and accurate picture of the project.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleArrowRight} className="text-gray-500 mt-1" />
                      <span><span className="font-bold">Decision rationales are rarely captured</span> within the project context and are often pulled from our memories.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleArrowRight} className="text-gray-500 mt-1" />
                      <span>
                        <span className="font-bold">Gathering crucial decision-making context is time-consuming and often inaccurate</span>, as information is scattered across various tools during product development.
                      </span>
                    </li>                    
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    The Solution: Organized Context & Well-Informed Decisions
                  </h3>
                  <ul className="list-none space-y-3 pl-1">                    
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleArrowRight} className="text-gray-500 mt-1" />
                      <span>
                        A <span className="font-bold">shared source of truth for your projects</span>, ensuring everyone stays aligned and works from the same facts.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleArrowRight} className="text-gray-500 mt-1" />
                      <span>
                        <span className="font-bold">Enables capturing decisions within project context</span>, allowing you to easily understand their rationale. 
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleArrowRight} className="text-gray-500 mt-1" />
                      <span>
                        <span className="font-bold">AI helps you make decisions effectively</span> by bringing accurate insights quickly.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleArrowRight} className="text-gray-500 mt-1" />
                      <span>
                        <span className="font-bold">Gain visibility</span> into actions and decisions taken by human and AI agents. 
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="./Systems-Diagram.svg"
                  alt="Scattered info vs organized context diagram"
                  width={600}
                  height={400}
                  className="max-w-full"
                  unoptimized={true}
                />
              </div>
            </div>
          </div>
        </section>


        <section id="key-ideas" className="py-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">Key Ideas</h2>
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <p className="text-gray-700">
                  <span className="font-bold">WADE</span> is an acronym that represents the core components of the framework. Each component
                  plays a crucial role in capturing and contextualizing information within a project.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Image src="./logo-W.svg" alt="WADE AI Logo" width={30} height={30} />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Workstreams</h3>
                    <p className="text-gray-600">
                      The central component of the framework, organizing key project elements: Decisions,
                      Events, and Actions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Image src="./logo-A.svg" alt="WADE AI Logo" width={24} height={24} />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Actions</h3>
                    <p className="text-gray-600">
                      Tasks and activities performed by users within a Workstream, driving progress
                      towards
                      its goals.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Image src="./logo-D.svg" alt="WADE AI Logo" width={24} height={24} />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Decisions</h3>
                    <p className="text-gray-600">
                      Capture the intent and rationale behind a Workstream’s actions. They are the only
                      elements that change a Workstream’s state.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Image src="./logo-E.svg" alt="WADE AI Logo" width={24} height={24} />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Events</h3>
                    <p className="text-gray-600">
                      Observations or external factors relevant to a Workstream, recorded for context and
                      awareness.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-auto h-full -mt-6 ml-8 mr-8">
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
                imageSrc="./WS_Relationships.gif"
                imageAlt="Workstream Relationships"
              />

              <FeatureCard
                icon={<FaClockRotateLeft />}
                header="Effective Timeline Visualization"
                description="See a time-based log of decisions, actions & events related to the workstream."
                imageSrc="./WS_Logs.gif"
                imageAlt="Workstream Logs"
              />

              <FeatureCard
                icon={<FaRobot />}
                header="AI Powered Insights"
                description="Get a personalized AI assistant who will answer your workstream related questions and help you make informed decisions!"
                imageSrc="./WS_AI.gif"
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
                To empower individuals, teams, and organizations to operate with integrity and transparency, fostering a workplace where decisions are made with the most accurate and unbiased insights.
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
