import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Ruler, Heart, Settings, LogOut, UserCog, Moon, Sun, Monitor, Crown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { toast } from "sonner";

const Profile = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSignOut = () => {
    toast.success("Signed out successfully");
    navigate("/login");
  };

  const handleChangeAccount = () => {
    if (newEmail || newPassword) {
      toast.success("Account updated successfully");
      setNewEmail("");
      setNewPassword("");
    } else {
      toast.error("Please enter new email or password");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="animate-fade-in-up">
        <h1 className="text-4xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground text-lg">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="personal" className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        <TabsList>
          <TabsTrigger value="personal">
            <User className="w-4 h-4 mr-2" />
            Personal Info
          </TabsTrigger>
          <TabsTrigger value="measurements">
            <Ruler className="w-4 h-4 mr-2" />
            Measurements
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <Heart className="w-4 h-4 mr-2" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Personal Info */}
        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                  <User className="w-10 h-10 text-primary-foreground" />
                </div>
                <Button variant="outline">Change Photo</Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label>Age</Label>
                  <Input type="number" placeholder="25" />
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-primary to-primary-glow">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Measurements */}
        <TabsContent value="measurements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Body Measurements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                These measurements help us provide better outfit recommendations and fit suggestions.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Height (cm)</Label>
                  <Input type="number" placeholder="170" />
                </div>
                <div className="space-y-2">
                  <Label>Weight (kg)</Label>
                  <Input type="number" placeholder="65" />
                </div>
                <div className="space-y-2">
                  <Label>Chest/Bust (cm)</Label>
                  <Input type="number" placeholder="90" />
                </div>
                <div className="space-y-2">
                  <Label>Waist (cm)</Label>
                  <Input type="number" placeholder="75" />
                </div>
                <div className="space-y-2">
                  <Label>Hip (cm)</Label>
                  <Input type="number" placeholder="95" />
                </div>
                <div className="space-y-2">
                  <Label>Shoe Size</Label>
                  <Input placeholder="8" />
                </div>
              </div>

              <Button className="bg-gradient-to-r from-primary to-primary-glow">
                Save Measurements
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences */}
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Style Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Preferred Style</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="streetwear">Streetwear</SelectItem>
                    <SelectItem value="minimalist">Minimalist</SelectItem>
                    <SelectItem value="bohemian">Bohemian</SelectItem>
                    <SelectItem value="classic">Classic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Comfort Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="How important is comfort?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="very">Very Important</SelectItem>
                    <SelectItem value="moderate">Moderately Important</SelectItem>
                    <SelectItem value="style">Style Over Comfort</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Favorite Colors (comma separated)</Label>
                <Input placeholder="Blue, Black, White" />
              </div>

              <Button className="bg-gradient-to-r from-primary to-primary-glow">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>App Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Location (for weather)</Label>
                <Input placeholder="Enter your city" />
              </div>

              <div className="space-y-2">
                <Label>Temperature Unit</Label>
                <Select defaultValue="celsius">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="celsius">Celsius (°C)</SelectItem>
                    <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="bg-gradient-to-r from-primary to-primary-glow">
                Save Settings
              </Button>
            </CardContent>
          </Card>

          {/* Dark Mode */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {theme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Theme</Label>
                  <p className="text-sm text-muted-foreground">Select your preferred theme</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("light")}
                    className="gap-2"
                  >
                    <Sun className="w-4 h-4" />
                    Light
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("dark")}
                    className="gap-2"
                  >
                    <Moon className="w-4 h-4" />
                    Dark
                  </Button>
                  <Button
                    variant={theme === "system" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("system")}
                    className="gap-2"
                  >
                    <Monitor className="w-4 h-4" />
                    System
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subscription */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-primary" />
                Subscription
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Current Plan</Label>
                  <p className="text-sm text-muted-foreground">
                    {localStorage.getItem("userPlan") === "premium" ? "Premium" : "Basic (Free)"}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => navigate("/subscription")}
                  className="gap-2"
                >
                  <Crown className="w-4 h-4" />
                  {localStorage.getItem("userPlan") === "premium" ? "Manage Plan" : "Upgrade"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Change Account */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCog className="w-5 h-5" />
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <UserCog className="w-4 h-4" />
                    Change Account Details
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change Account Details</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>New Email</Label>
                      <Input 
                        type="email" 
                        placeholder="Enter new email" 
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>New Password</Label>
                      <Input 
                        type="password" 
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button onClick={handleChangeAccount}>Save Changes</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Separator />

              <Button 
                variant="destructive" 
                className="w-full justify-start gap-2"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
