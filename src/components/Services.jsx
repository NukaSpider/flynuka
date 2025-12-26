import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaCamera, FaVideo, FaRocket } from 'react-icons/fa'

const Services = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const services = [
    {
      icon: FaCamera,
      title: 'Drone Photography',
      description:
        'Capture stunning aerial perspectives with professional-grade drone photography. Perfect for real estate, events, landscapes, and commercial projects.',
      color: 'from-brand-green to-emerald-400',
    },
    {
      icon: FaVideo,
      title: 'Drone Videography',
      description:
        'Create cinematic aerial videos that tell your story. From promotional content to event coverage, we deliver high-quality footage that stands out.',
      color: 'from-emerald-500 to-brand-green',
    },
    {
      icon: FaRocket,
      title: 'Aerial Solutions',
      description:
        'Comprehensive drone services tailored to your needs. Licensed and insured remote pilot with expertise in various industries and applications.',
      color: 'from-brand-green to-teal-400',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section
      id="services"
      ref={ref}
      className="py-24 md:py-32 px-6 bg-white relative overflow-hidden"
    >
      {/* Curved Green Shapes - matching card design */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Top curved shape */}
        <motion.div
          className="absolute top-0 right-0 w-[800px] h-[400px] bg-brand-green/10"
          style={{
            clipPath: 'ellipse(100% 60% at 80% 0%)',
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
        {/* Right curved shape */}
        <motion.div
          className="absolute top-1/2 right-0 w-[300px] h-[600px] bg-brand-green/8"
          style={{
            clipPath: 'ellipse(50% 100% at 100% 50%)',
          }}
          initial={{ x: 100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h2 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-brand-green block">Drone Photography</span>
            <span className="text-gray-900 block text-4xl md:text-5xl lg:text-6xl font-semibold my-2">and</span>
            <span className="text-brand-green block">Videography</span>
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 mt-8 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Professional aerial imaging services that elevate your projects
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="group relative bg-white rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
                whileHover={{ y: -12, scale: 1.02 }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-brand-green/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-green/20 transition-colors">
                    <Icon className="w-8 h-8 text-brand-green" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default Services


