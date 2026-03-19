'use client'

import { useEffect } from 'react'
import { PortfolioNav, HeroSection, ProjectsSection, SkillsSection, ContactSection, ExperienceSection, PortfolioFooter } from '@/components/portfolio'
import { usePortfolioStore } from '@/store/portfolioStore'

export default function PortfolioPage() {
  const { setIsLoading } = usePortfolioStore()

  useEffect(() => {
    setIsLoading(false)
  }, [setIsLoading])

  return (
    <div className="min-h-screen bg-background">
      <PortfolioNav />
      <main>
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <PortfolioFooter />
    </div>
  )
}
