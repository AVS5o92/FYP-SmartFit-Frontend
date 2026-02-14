import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Crown, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Subscription = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleBasicPlan = () => {
    localStorage.setItem("userPlan", "basic");
    toast({
      title: "Basic Plan Selected",
      description: "Welcome! You're now on the Basic plan.",
    });
    navigate("/dashboard");
  };

  const handlePremiumPlan = () => {
    navigate("/payment");
  };

  const basicFeatures = [
    "8 clothing items upload limit",
    "4 outfit recommendations per day",
    "16 AI chat messages per day",
    "Basic wardrobe organization",
    "Weather-based suggestions",
  ];

  const premiumFeatures = [
    "Unlimited clothing uploads",
    "Unlimited outfit recommendations",
    "Unlimited AI chat messages",
    "Advanced style analytics",
    "Priority support",
    "Exclusive fashion tips",
    "Early access to new features",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8 animate-fade-in-up">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground">Choose Your Plan</h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Select the plan that best fits your style journey
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Basic Plan */}
          <Card className="relative border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">Basic</CardTitle>
              <CardDescription>Perfect for getting started</CardDescription>
              <div className="pt-4">
                <span className="text-4xl font-bold text-foreground">Free</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {basicFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                onClick={handleBasicPlan}
                variant="outline" 
                className="w-full h-12"
              >
                Get Started Free
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="relative border-2 border-primary bg-gradient-to-b from-primary/5 to-transparent hover:shadow-xl transition-all duration-300">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
                RECOMMENDED
              </span>
            </div>
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-2">
                <Crown className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Premium</CardTitle>
              <CardDescription>Unlock your full style potential</CardDescription>
              <div className="pt-4">
                <span className="text-4xl font-bold text-foreground">$4.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {premiumFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                onClick={handlePremiumPlan}
                className="w-full h-12 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90"
              >
                Upgrade to Premium
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-muted-foreground">
          You can change your plan anytime from your profile settings
        </p>
      </div>
    </div>
  );
};

export default Subscription;
