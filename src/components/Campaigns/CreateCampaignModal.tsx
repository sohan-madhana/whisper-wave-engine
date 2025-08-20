import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { PlayCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface CreateCampaignModalProps {
  children: React.ReactNode;
}

export function CreateCampaignModal({ children }: CreateCampaignModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    templateName: "",
    templateBody: "",
    targetAudiences: [] as string[],
    scheduledAt: ""
  });
  const { toast } = useToast();

  const audiences = [
    "Farmers - Kharagpur",
    "Premium Customers", 
    "Weather Subscribers",
    "VIP Members",
    "New Customers",
    "Seasonal Buyers"
  ];

  const handleAudienceChange = (audience: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      targetAudiences: checked 
        ? [...prev.targetAudiences, audience]
        : prev.targetAudiences.filter(a => a !== audience)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.templateBody || formData.targetAudiences.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and select at least one audience.",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call
    toast({
      title: "Campaign Created",
      description: `Campaign "${formData.name}" has been created successfully.`
    });
    
    setOpen(false);
    setFormData({
      name: "",
      templateName: "",
      templateBody: "",
      targetAudiences: [],
      scheduledAt: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Campaign</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Campaign Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Mango Season Sale 2025"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="templateName">Template Name</Label>
            <Input
              id="templateName"
              placeholder="e.g., seasonal_sale_template"
              value={formData.templateName}
              onChange={(e) => setFormData(prev => ({ ...prev, templateName: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="templateBody">Message Template *</Label>
            <Textarea
              id="templateBody"
              placeholder="Hello {{1}}, exciting news about our mango season sale! Get {{2}}% off on all products. Visit us today!"
              value={formData.templateBody}
              onChange={(e) => setFormData(prev => ({ ...prev, templateBody: e.target.value }))}
              rows={4}
            />
            <p className="text-sm text-muted-foreground">
              Use {"{1}"}, {"{2}"}, etc. for personalization placeholders
            </p>
          </div>

          <div className="space-y-2">
            <Label>Target Audiences * (Select at least one)</Label>
            <div className="grid grid-cols-2 gap-3">
              {audiences.map((audience) => (
                <div key={audience} className="flex items-center space-x-2">
                  <Checkbox
                    id={audience}
                    checked={formData.targetAudiences.includes(audience)}
                    onCheckedChange={(checked) => 
                      handleAudienceChange(audience, checked as boolean)
                    }
                  />
                  <Label htmlFor={audience} className="text-sm">
                    {audience}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="scheduledAt">Schedule for Later (Optional)</Label>
            <Input
              id="scheduledAt"
              type="datetime-local"
              value={formData.scheduledAt}
              onChange={(e) => setFormData(prev => ({ ...prev, scheduledAt: e.target.value }))}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              <PlayCircle className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}