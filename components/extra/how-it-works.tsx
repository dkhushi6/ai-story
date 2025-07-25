import { motion } from "framer-motion";
import { Brain, BookOpen, Palette } from "lucide-react";

const steps = [
  {
    icon: Brain,
    title: "Type an idea",
    description: "Share your creative spark — any idea, no matter how wild!",
    number: "1",
  },
  {
    icon: BookOpen,
    title: "Let AI craft your story",
    description: "Our AI weaves your concept into an engaging narrative",
    number: "2",
  },
  {
    icon: Palette,
    title: "Watch it come alive",
    description: "Beautiful illustrations bring your story to life",
    number: "3",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 px-4 ">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            How the Magic Happens
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Creating your personalized story is as easy as 1, 2, 3
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center group"
              >
                {/* Step number */}
                <div className="relative mb-6">
                  <div
                    className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-primary/70
 rounded-full flex items-center justify-center shadow-magic group-hover:scale-110 transition-transform duration-300"
                  >
                    <span className="text-2xl  font-bold text-primary-foreground">
                      {step.number}
                    </span>
                  </div>
                  {/* Line (optional) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent -translate-y-1/2" />
                  )}
                </div>

                {/* Icon */}
                <div className="mb-4">
                  <IconComponent className="h-12 w-12 mx-auto text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>

                {/* Content */}
                <h3 className="text-xl  font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
