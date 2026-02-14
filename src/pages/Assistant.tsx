import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, Sparkles, Lock, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BASIC_MESSAGE_LIMIT = 16;

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

const Assistant = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [userPlan, setUserPlan] = useState<string>("basic");
  const navigate = useNavigate();

  useEffect(() => {
    const plan = localStorage.getItem("userPlan") || "basic";
    setUserPlan(plan);
    // Load message count from localStorage
    const savedMessages = JSON.parse(localStorage.getItem("chatMessages") || "[]");
    setMessages(savedMessages);
  }, []);

  const isBasicPlan = userPlan === "basic";
  const userMessageCount = messages.filter(m => m.isUser).length;
  const hasReachedLimit = isBasicPlan && userMessageCount >= BASIC_MESSAGE_LIMIT;

  const handleSendMessage = () => {
    if (!message.trim() || hasReachedLimit) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      isUser: true,
    };

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      content: "Thank you for your question! I'm here to help with fashion advice. (This is a placeholder response)",
      isUser: false,
    };

    const updatedMessages = [...messages, newMessage, aiResponse];
    setMessages(updatedMessages);
    localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
    setMessage("");
  };

  const suggestedQuestions = [
    "What colors go well with navy blue?",
    "How do I style a white shirt?",
    "What should I wear to a business meeting?",
    "How do I care for leather jackets?",
    "What's trending this season?",
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="animate-fade-in-up">
        <h1 className="text-4xl font-bold text-foreground">Style Assistant</h1>
        <p className="text-muted-foreground text-lg">
          Your AI fashion expert is here to help
          {isBasicPlan && ` (${userMessageCount}/${BASIC_MESSAGE_LIMIT} messages used)`}
        </p>
      </div>

      {/* Subscription Limit Banner */}
      {hasReachedLimit && (
        <Card className="border-primary/50 bg-primary/5 animate-fade-in-up">
          <CardContent className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">Message limit reached</p>
                <p className="text-sm text-muted-foreground">
                  You've used all 16 messages on the Basic plan. Subscribe to Premium for unlimited conversations.
                </p>
              </div>
            </div>
            <Button onClick={() => navigate("/subscription")} className="bg-gradient-to-r from-primary to-primary-glow">
              Upgrade
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chat Area */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <CardContent className="p-0">
              {/* Messages Area */}
              <div className="h-[500px] p-6 overflow-y-auto space-y-4">
                {messages.length === 0 ? (
                  <div className="flex justify-center">
                    <div className="text-center space-y-4 py-12">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mx-auto">
                        <MessageSquare className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-foreground">Start a Conversation</h3>
                        <p className="text-muted-foreground max-w-md">
                          Ask me anything about fashion, styling tips, trends, or clothing care!
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          msg.isUser
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Input Area */}
              <div className="border-t border-border p-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder={hasReachedLimit ? "Message limit reached - Upgrade to continue" : "Ask about styling, trends, or fashion advice..."}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                    disabled={hasReachedLimit}
                  />
                  <Button 
                    className="bg-gradient-to-r from-primary to-primary-glow"
                    disabled={!message.trim() || hasReachedLimit}
                    onClick={handleSendMessage}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                {isBasicPlan && !hasReachedLimit && (
                  <p className="text-xs text-muted-foreground mt-2">
                    {BASIC_MESSAGE_LIMIT - userMessageCount} messages remaining
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span>Quick Questions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-3 px-4"
                  onClick={() => !hasReachedLimit && setMessage(question)}
                  disabled={hasReachedLimit}
                >
                  <span className="text-sm">{question}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <CardHeader>
              <CardTitle>What I Can Help With</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="space-y-1">
                <div className="font-medium text-foreground">Styling Tips</div>
                <p>Learn how to combine colors, patterns, and accessories</p>
              </div>
              <div className="space-y-1">
                <div className="font-medium text-foreground">Fashion Trends</div>
                <p>Stay updated with current and upcoming trends</p>
              </div>
              <div className="space-y-1">
                <div className="font-medium text-foreground">Clothing Care</div>
                <p>Get advice on maintaining and caring for your garments</p>
              </div>
              <div className="space-y-1">
                <div className="font-medium text-foreground">Occasion Styling</div>
                <p>Find the perfect outfit for any event</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
