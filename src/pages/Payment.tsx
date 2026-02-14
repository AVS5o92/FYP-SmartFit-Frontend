import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, QrCode, ArrowLeft, Shield, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handleCardPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardNumber || !cardName || !expiry || !cvv) {
      toast({
        title: "Missing Information",
        description: "Please fill in all card details.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    localStorage.setItem("userPlan", "premium");
    
    toast({
      title: "Payment Successful!",
      description: "Welcome to Premium! Enjoy unlimited features.",
    });
    
    setIsProcessing(false);
    navigate("/dashboard");
  };

  const handleQRPayment = async () => {
    setIsProcessing(true);
    
    // Simulate QR payment confirmation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    localStorage.setItem("userPlan", "premium");
    
    toast({
      title: "Payment Confirmed!",
      description: "Welcome to Premium! Enjoy unlimited features.",
    });
    
    setIsProcessing(false);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6 animate-fade-in-up">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate("/subscription")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Plans
        </Button>

        {/* Order Summary */}
        <Card className="border-primary/20">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-foreground">Premium Plan</p>
                <p className="text-sm text-muted-foreground">Monthly subscription</p>
              </div>
              <p className="text-xl font-bold text-foreground">$4.99</p>
            </div>
            <div className="border-t border-border pt-4">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-foreground">Total</p>
                <p className="text-2xl font-bold text-primary">$4.99/mo</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Choose how you'd like to pay</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="card" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="card" className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4" />
                  <span>Credit Card</span>
                </TabsTrigger>
                <TabsTrigger value="qr" className="flex items-center space-x-2">
                  <QrCode className="w-4 h-4" />
                  <span>QR Code</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="card">
                <form onSubmit={handleCardPayment} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      maxLength={19}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      placeholder="John Doe"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="h-12"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                        maxLength={5}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        type="password"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                        maxLength={4}
                        className="h-12"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-primary to-primary-glow"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <>Pay $4.99</>
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="qr">
                <div className="text-center space-y-6">
                  <div className="bg-white p-6 rounded-xl inline-block mx-auto">
                    {/* Placeholder QR Code */}
                    <div className="w-48 h-48 bg-gradient-to-br from-foreground to-foreground/80 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-2 bg-white rounded grid grid-cols-7 gap-0.5 p-2">
                        {Array.from({ length: 49 }).map((_, i) => (
                          <div 
                            key={i} 
                            className={`aspect-square ${Math.random() > 0.5 ? 'bg-foreground' : 'bg-white'}`}
                          />
                        ))}
                      </div>
                      <QrCode className="w-12 h-12 text-primary absolute" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-foreground font-medium">Scan to Pay</p>
                    <p className="text-sm text-muted-foreground">
                      Scan this QR code with your banking app to complete the payment
                    </p>
                  </div>

                  <Button 
                    onClick={handleQRPayment}
                    className="w-full h-12 bg-gradient-to-r from-primary to-primary-glow"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Confirming Payment...
                      </span>
                    ) : (
                      <>I've Completed Payment</>
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Security Note */}
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <Shield className="w-4 h-4" />
          <span>Your payment information is secure and encrypted</span>
        </div>

        {/* Features Reminder */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <p className="text-sm font-medium text-foreground mb-3">Premium includes:</p>
            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              {["Unlimited uploads", "Unlimited recommendations", "Unlimited AI chat", "Priority support"].map((feature, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <Check className="w-3 h-3 text-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payment;
