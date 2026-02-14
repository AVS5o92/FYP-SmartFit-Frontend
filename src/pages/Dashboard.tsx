import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shirt, Wand2, TrendingUp, CloudSun } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2 animate-fade-in-up">
        <h1 className="text-4xl font-bold text-foreground">Welcome Back!</h1>
        <p className="text-muted-foreground text-lg">Your personal AI stylist is ready to help</p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="animate-fade-in-up" style={{ animationDelay: "0ms" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">0</div>
            <p className="text-xs text-muted-foreground mt-1">in your wardrobe</p>
          </CardContent>
        </Card>

        <Card className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Outfits Created</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">0</div>
            <p className="text-xs text-muted-foreground mt-1">AI recommendations</p>
          </CardContent>
        </Card>

        <Card className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Favorites</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">0</div>
            <p className="text-xs text-muted-foreground mt-1">saved outfits</p>
          </CardContent>
        </Card>

        <Card className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today's Weather</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <CloudSun className="w-8 h-8 text-accent" />
              <div className="text-3xl font-bold text-foreground">22°C</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Partly cloudy</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shirt className="w-5 h-5 text-primary" />
              <span>Build Your Wardrobe</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Start by uploading photos of your clothes. Our AI will automatically categorize them for you.
            </p>
            <Link to="/wardrobe">
              <Button className="w-full bg-gradient-to-r from-primary to-primary-glow">
                <Shirt className="w-4 h-4 mr-2" />
                Add Clothes
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="animate-fade-in-up" style={{ animationDelay: "500ms" }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wand2 className="w-5 h-5 text-secondary" />
              <span>Get Styled Today</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Let AI create perfect outfit combinations based on the weather and your preferences.
            </p>
            <Link to="/styled">
              <Button className="w-full bg-gradient-to-r from-secondary to-accent">
                <Wand2 className="w-4 h-4 mr-2" />
                Get Recommendations
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="animate-fade-in-up" style={{ animationDelay: "600ms" }}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <p>No activity yet. Start by adding items to your wardrobe!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
