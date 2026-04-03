import { motion } from "framer-motion"

export default function BlurText({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) {
  const words = text.split(" ")
  
  return (
    <h1 className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: "blur(10px)", opacity: 0, y: 10 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: delay + i * 0.1 }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </h1>
  )
}
