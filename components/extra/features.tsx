import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Wand2,
  Image,
  Edit3,
  Download,
  BookOpen,
  Palette,
  Sparkles,
  Copy,
  History,
  Moon,
  Zap,
  Heart,
} from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: Wand2,
      title: "AI Story Generation",
      description:
        "Just tell us what your story should be about, and our magical AI will create an enchanting tale filled with adventure, friendship, and wonder!",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Image,
      title: "Beautiful Illustrations",
      description:
        "Every story comes with a custom AI-generated illustration that brings your tale to life with vibrant colors and magical scenes.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Edit3,
      title: "Story Editing",
      description:
        "Not quite perfect? Edit your stories up to 3 times! Refine the plot, add characters, or change the adventure completely.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Download,
      title: "Save & Share",
      description:
        "Download beautiful illustrations and copy story text to share your magical creations with family and friends!",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: History,
      title: "Story Collection",
      description:
        "Keep all your magical stories in one place! Browse your personal library of adventures whenever you want.",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: Moon,
      title: "Day & Night Modes",
      description:
        "Switch between bright day mode for active creation and cozy night mode perfect for bedtime story reading.",
      gradient: "from-slate-600 to-slate-800",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Magical Features
              </h3>
              <p className="text-muted-foreground">
                Everything you need to create, edit, and share amazing stories
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="bg-gradient-card shadow-gentle hover:shadow-hover transition-all duration-300 transform hover:scale-105 border-0 animate-in fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center mb-4 animate-bounce-gentle`}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>{" "}
    </div>
  );
};
