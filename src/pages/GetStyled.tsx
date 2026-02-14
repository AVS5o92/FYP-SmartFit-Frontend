import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wand2, CloudSun, Calendar, MapPin, RefreshCw, Star, Send, Lock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ClothingItem } from "@/components/ClothingUploadDialog";
import { DEFAULT_WARDROBE_ITEMS } from "@/data/wardrobeItems";
import OutfitRecommendation from "@/components/OutfitRecommendation";

const BASIC_OUTFIT_LIMIT = 20;

const GetStyled = () => {
  const [rating, setRating] = useState<number[]>([5]);
  const [comment, setComment] = useState("");
  const [outfitCount, setOutfitCount] = useState(0);
  const [userPlan, setUserPlan] = useState<string>("basic");
  const [occasion, setOccasion] = useState<string>("");
  const [weather, setWeather] = useState<string>("auto");
  const [generatedOutfit, setGeneratedOutfit] = useState<ClothingItem[] | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const plan = localStorage.getItem("userPlan") || "basic";
    setUserPlan(plan);
    const savedCount = parseInt(localStorage.getItem("outfitCount") || "0", 10);
    setOutfitCount(savedCount);
  }, []);

  const isBasicPlan = userPlan === "basic";
  const hasReachedLimit = isBasicPlan && outfitCount >= BASIC_OUTFIT_LIMIT;

  const generateOutfitFromWardrobe = (): ClothingItem[] => {
    const items = DEFAULT_WARDROBE_ITEMS;
    const outfit: ClothingItem[] = [];
    const categories = ["Tops", "Bottoms", "Dresses", "Outerwear", "Shoes", "Accessories"];

    for (const cat of categories) {
      const catItems = items.filter((i) => i.category === cat);
      if (catItems.length === 0) continue;

      if (cat === "Accessories") {
        // Pick 1-2 accessories
        const count = Math.min(catItems.length, Math.random() > 0.5 ? 2 : 1);
        const shuffled = [...catItems].sort(() => Math.random() - 0.5);
        outfit.push(...shuffled.slice(0, count));
      } else {
        const pick = catItems[Math.floor(Math.random() * catItems.length)];
        outfit.push(pick);
      }
    }

    return outfit;
  };

  const handleGenerateOutfit = () => {
    if (hasReachedLimit) return;

    const outfit = generateOutfitFromWardrobe();
    setGeneratedOutfit(outfit);

    const newCount = outfitCount + 1;
    setOutfitCount(newCount);
    localStorage.setItem("outfitCount", newCount.toString());
    toast({
      title: "Outfit Generated!",
      description: `You have ${isBasicPlan ? `${BASIC_OUTFIT_LIMIT - newCount} recommendations remaining` : "unlimited recommendations"}.`,
    });
  };

  const handleRefreshOutfit = () => {
    if (hasReachedLimit) return;
    handleGenerateOutfit();
  };

  const handleSubmitFeedback = () => {
    if (comment.trim() === "") {
      toast({
        title: "Please add a comment",
        description: "Share your thoughts about the outfit recommendation.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Feedback submitted!",
      description: `You rated this outfit ${rating[0]}/10. Thank you for your feedback!`,
    });
    setRating([5]);
    setComment("");
  };

  const occasionLabel = occasion
    ? occasion.charAt(0).toUpperCase() + occasion.slice(1)
    : "";

  const weatherLabel =
    weather === "auto"
      ? "Auto (Based on location)"
      : weather.charAt(0).toUpperCase() + weather.slice(1) + " Weather";

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="animate-fade-in-up">
        <h1 className="text-4xl font-bold text-foreground">Get Styled</h1>
        <p className="text-muted-foreground text-lg">
          AI-powered outfit recommendations just for you
          {isBasicPlan && ` (${outfitCount}/${BASIC_OUTFIT_LIMIT} used)`}
        </p>
      </div>

      {/* Subscription Limit Banner */}
      {hasReachedLimit && (
        <Card className="border-primary/50 bg-primary/5 animate-fade-in-up">
          <CardContent className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">Outfit recommendation limit reached</p>
                <p className="text-sm text-muted-foreground">
                  You've used all 4 outfit recommendations on the Basic plan. Subscribe to Premium for unlimited recommendations.
                </p>
              </div>
            </div>
            <Button onClick={() => navigate("/subscription")} className="bg-gradient-to-r from-primary to-primary-glow">
              Upgrade
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Preferences */}
      <Card className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        <CardHeader>
          <CardTitle>Customize Your Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>Occasion</span>
              </label>
              <Select disabled={hasReachedLimit} value={occasion} onValueChange={setOccasion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select occasion" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="party">Party</SelectItem>
                  <SelectItem value="sports">Sports/Gym</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center space-x-2">
                <CloudSun className="w-4 h-4 text-accent" />
                <span>Weather Consideration</span>
              </label>
              <Select value={weather} onValueChange={setWeather} disabled={hasReachedLimit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto (Based on location)</SelectItem>
                  <SelectItem value="hot">Hot Weather</SelectItem>
                  <SelectItem value="warm">Warm Weather</SelectItem>
                  <SelectItem value="cool">Cool Weather</SelectItem>
                  <SelectItem value="cold">Cold Weather</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-primary to-primary-glow"
            onClick={handleGenerateOutfit}
            disabled={hasReachedLimit}
          >
            <Wand2 className="w-4 h-4 mr-2" />
            Generate Outfit
          </Button>
        </CardContent>
      </Card>

      {/* Current Conditions */}
      <Card className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-accent" />
            <span>Current Conditions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <CloudSun className="w-12 h-12 text-accent" />
              <div>
                <div className="text-3xl font-bold text-foreground">22°C</div>
                <p className="text-muted-foreground">Partly Cloudy</p>
              </div>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <p>Humidity: 65%</p>
              <p>Wind: 12 km/h</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Today's Recommendations</CardTitle>
          {generatedOutfit && (
            <Button variant="ghost" size="icon" onClick={handleRefreshOutfit} disabled={hasReachedLimit}>
              <RefreshCw className="w-4 h-4" />
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {generatedOutfit ? (
            <OutfitRecommendation
              outfit={generatedOutfit}
              occasion={occasionLabel}
              weather={weatherLabel}
            />
          ) : (
            <div className="text-center py-12 space-y-4">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto">
                <Wand2 className="w-10 h-10 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">No recommendations yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Add items to your wardrobe first, then click "Generate Outfit" to get AI-powered styling suggestions.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Feedback Module - only after outfit generated */}
      {generatedOutfit && (
        <Card className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-primary" />
              <span>Rate This Outfit</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Your Rating</label>
                <span className="text-2xl font-bold text-primary">{rating[0]}/10</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">1</span>
                <Slider
                  value={rating}
                  onValueChange={setRating}
                  min={1}
                  max={10}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground">10</span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground px-2">
                <span>Not for me</span>
                <span>Love it!</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Share your thoughts</label>
              <Textarea
                placeholder="What did you like or dislike about this outfit? Any suggestions for improvement?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[100px] resize-none"
              />
            </div>

            <Button
              onClick={handleSubmitFeedback}
              className="w-full bg-gradient-to-r from-primary to-primary-glow"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Feedback
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GetStyled;
