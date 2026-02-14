import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Camera, CloudSun, MessageCircle, Star, ArrowRight, Shirt, Palette, Zap } from "lucide-react";
import heroImage from "@/assets/hero-fashion.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        
        <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Your Personal
                <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  AI Stylist
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg">
                Transform your wardrobe with intelligent outfit recommendations tailored to your style, weather, and occasion.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/login">
                  <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                    Get Started Free
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/50 to-secondary/50 border-2 border-background" />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Loved by 10,000+ users</p>
                </div>
              </div>
            </div>
            
            <div className="relative animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-3xl blur-2xl transform rotate-6" />
              <img
                src={heroImage}
                alt="AI Fashion Styling"
                className="relative rounded-3xl shadow-2xl w-full object-cover aspect-[4/5]"
              />
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-2xl shadow-xl border animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">Perfect Match!</p>
                    <p className="text-sm text-muted-foreground">98% style score</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Everything You Need to
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Look Amazing</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Our AI understands your unique style and creates perfect outfit combinations from your own wardrobe.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Camera, title: "Smart Upload", desc: "Auto-categorize clothes with AI image recognition", color: "from-primary to-primary/50" },
              { icon: Palette, title: "Style Matching", desc: "Get outfits that match your personal aesthetic", color: "from-secondary to-secondary/50" },
              { icon: CloudSun, title: "Weather Aware", desc: "Recommendations based on real-time weather", color: "from-accent to-accent/50" },
              { icon: MessageCircle, title: "AI Assistant", desc: "Chat for styling tips and fashion advice", color: "from-primary to-secondary" },
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl bg-card border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              How It
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Works</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: "01", icon: Shirt, title: "Upload Your Wardrobe", desc: "Take photos of your clothes and our AI will automatically categorize them" },
              { step: "02", icon: Zap, title: "Get AI Recommendations", desc: "Receive personalized outfit suggestions based on your style and weather" },
              { step: "03", icon: Star, title: "Rate & Improve", desc: "Rate outfits to help the AI learn your preferences better" },
            ].map((item, i) => (
              <div key={i} className="relative text-center group">
                <div className="text-8xl font-bold text-primary/10 absolute -top-8 left-1/2 -translate-x-1/2">
                  {item.step}
                </div>
                <div className="relative z-10 pt-8">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border flex items-center justify-center mb-6 group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors">
                    <item.icon className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your Style?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have revolutionized their daily outfit selection with our AI stylist.
          </p>
          <Link to="/login">
            <Button size="lg" variant="secondary" className="gap-2 text-lg px-10 py-6">
              Start Styling Now
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">SmartFit</span>
            </div>
            <p className="text-muted-foreground">© 2024 SmartFit. Your Personal AI Fashion Assistant.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
