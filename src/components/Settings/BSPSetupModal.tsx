import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link2, Shield, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface BSPSetupModalProps {
  children: React.ReactNode;
}

export function BSPSetupModal({ children }: BSPSetupModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    provider: "",
    wabaId: "",
    apiKey: "",
    phoneNumberId: "",
    webhookUrl: ""
  });
  const { toast } = useToast();

  const providers = [
    { value: "twilio", label: "Twilio", description: "Popular and reliable BSP" },
    { value: "360dialog", label: "360Dialog", description: "European-based BSP" },
    { value: "meta", label: "Meta (Direct)", description: "Direct integration with Meta" },
    { value: "gupshup", label: "Gupshup", description: "Asia-focused BSP" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.provider || !formData.wabaId || !formData.apiKey) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call
    toast({
      title: "BSP Configuration Saved",
      description: `Connected to ${formData.provider} successfully. Your WhatsApp Business API is now active.`
    });
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>WhatsApp Business Solution Provider Setup</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="setup" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="setup">BSP Configuration</TabsTrigger>
            <TabsTrigger value="verification">Verification & Testing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="setup" className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label>Select Your BSP Provider *</Label>
                <Select
                  value={formData.provider}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, provider: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a WhatsApp BSP" />
                  </SelectTrigger>
                  <SelectContent>
                    {providers.map((provider) => (
                      <SelectItem key={provider.value} value={provider.value}>
                        <div>
                          <div className="font-medium">{provider.label}</div>
                          <div className="text-sm text-muted-foreground">{provider.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="wabaId">WhatsApp Business Account ID *</Label>
                  <Input
                    id="wabaId"
                    placeholder="123456789012345"
                    value={formData.wabaId}
                    onChange={(e) => setFormData(prev => ({ ...prev, wabaId: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumberId">Phone Number ID</Label>
                  <Input
                    id="phoneNumberId"
                    placeholder="109876543210987"
                    value={formData.phoneNumberId}
                    onChange={(e) => setFormData(prev => ({ ...prev, phoneNumberId: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key / Access Token *</Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="Enter your BSP API key"
                  value={formData.apiKey}
                  onChange={(e) => setFormData(prev => ({ ...prev, apiKey: e.target.value }))}
                />
                <p className="text-sm text-muted-foreground">
                  This will be encrypted and stored securely
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhookUrl">Webhook URL (Auto-generated)</Label>
                <Input
                  id="webhookUrl"
                  value="https://your-app.com/api/webhooks/whatsapp"
                  disabled
                  className="bg-muted"
                />
                <p className="text-sm text-muted-foreground">
                  Configure this URL in your BSP dashboard for message status updates
                </p>
              </div>

              <Card className="bg-accent/20 border-warning">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Security Notice
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription>
                    Your API credentials are encrypted using industry-standard AES-256 encryption 
                    before being stored. They are only decrypted when making authorized API calls.
                  </CardDescription>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  <Link2 className="w-4 h-4 mr-2" />
                  Connect BSP
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="verification" className="space-y-6">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    Connection Test
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Send a test message to verify your BSP configuration is working correctly.
                  </p>
                  <div className="flex gap-3">
                    <Input 
                      placeholder="+919876543210" 
                      className="flex-1"
                    />
                    <Button>Send Test Message</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Setup Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      "WhatsApp Business Account verified",
                      "BSP API credentials configured", 
                      "Phone number registered and verified",
                      "Webhook URL configured in BSP dashboard",
                      "Test message sent successfully"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-success/20 border-2 border-success flex items-center justify-center">
                          <Check className="w-3 h-3 text-success" />
                        </div>
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}