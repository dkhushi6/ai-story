import { Sparkles, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/20 border-t border-border/50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-6">
          {/* Brand */}
          <div className="flex items-center justify-center space-x-2">
            <Sparkles className="h-6 w-6 text-primary glow-icon" />
            <h3 className="text-xl font-serif font-semibold text-foreground">
              AI-Story
            </h3>
          </div>

          {/* Taglines */}
          <div className="space-y-2">
            <p className="text-lg font-serif text-muted-foreground">
              Stories made magical by AI ✨
            </p>
            <p className="text-sm text-muted-foreground/80 flex items-center justify-center gap-1">
              Built with care, creativity, and a hint of magic
              <Heart className="h-4 w-4 text-red-400 fill-current" />
            </p>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-border/30">
            <p className="text-xs text-muted-foreground/60">
              © 2024 AI-Story. All rights reserved. | Making imagination
              accessible to everyone.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
