import { motion } from 'framer-motion'

const Hero = () => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-green"
    >
      {/* Animated Diagonal Grid Background - matching card design */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5 }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            transform: 'rotate(-45deg)',
            transformOrigin: 'center',
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-4 tracking-tight"
        >
          Joseph Duguay
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white/90 mb-8"
        >
          Remote Pilot
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-16"
        >
          <motion.a
            href="#services"
            className="px-10 py-5 bg-white text-brand-green font-bold text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all relative overflow-hidden group"
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">View Services</span>
            <motion.div
              className="absolute inset-0 bg-brand-green/10"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
          <motion.a
            href="#contact"
            className="px-10 py-5 bg-transparent border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-brand-green transition-all backdrop-blur-sm"
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero

