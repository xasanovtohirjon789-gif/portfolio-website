'use client'

import { motion } from 'framer-motion'
import { Plus, FolderOpen, ExternalLink, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { usePortfolioStore } from '@/store/portfolioStore'

export function ProjectsSection() {
  const { projects, filteredProjects, selectedCategory, setCategory } = usePortfolioStore()

  // Get unique categories
  const categories = ['all', ...new Set(projects.map(p => p.category))]

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loyihalarim
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Yaratgan loyihalarim va ishlarim ro'yxati
          </p>
        </motion.div>

        {/* Category filter */}
        {projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCategory(category)}
                className="capitalize"
              >
                {category === 'all' ? 'Barchasi' : category}
              </Button>
            ))}
          </motion.div>
        )}

        {/* Projects grid or empty state */}
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <FolderOpen className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Hozircha loyhalar yo'q
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Loyihalar tez orada qo'shiladi. GitHub'da ko'proq loyihalarni ko'rishingiz mumkin.
            </p>
            <Button variant="outline" asChild>
              <a 
                href="https://github.com/xasanovtohirjon789-gif" 
                target="_blank" 
                rel="noopener noreferrer"
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                GitHub'ni ko'rish
              </a>
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Project card */}
                <div className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow h-full flex flex-col">
                  {/* Featured badge */}
                  {project.featured && (
                    <Badge className="w-fit mb-3 bg-gradient-to-r from-blue-500 to-purple-500">
                      ⭐ Ajralgan
                    </Badge>
                  )}
                  
                  {/* Title */}
                  <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4 flex-grow">{project.description}</p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 4}
                      </Badge>
                    )}
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex gap-2 mt-auto pt-2 border-t">
                    {project.liveUrl && (
                      <Button size="sm" asChild className="flex-1">
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Ko'rish
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button size="sm" variant="outline" asChild className="flex-1">
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="gap-2"
                        >
                          <Github className="w-4 h-4" />
                          Kod
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Stats */}
        {projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center text-muted-foreground"
          >
            Jami {projects.length} ta loyiha
          </motion.div>
        )}
      </div>
    </section>
  )
}
