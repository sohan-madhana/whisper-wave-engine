import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { UserPlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AddContactModalProps {
  children: React.ReactNode;
}

export function AddContactModal({ children }: AddContactModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    location: "",
    audiences: [] as string[],
    optedIn: true
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
      audiences: checked 
        ? [...prev.audiences, audience]
        : prev.audiences.filter(a => a !== audience)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in the first name and phone number.",
        variant: "destructive"
      });
      return;
    }

    // Basic phone validation
    const phoneRegex = /^\+\d{10,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number in international format (e.g., +919876543210).",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call
    toast({
      title: "Contact Added",
      description: `${formData.firstName} ${formData.lastName} has been added successfully.`
    });
    
    setOpen(false);
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      location: "",
      audiences: [],
      optedIn: true
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Contact</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                placeholder="Ramesh"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Kumar"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              placeholder="+919876543210"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Kharagpur"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label>Add to Audiences</Label>
            <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
              {audiences.map((audience) => (
                <div key={audience} className="flex items-center space-x-2">
                  <Checkbox
                    id={audience}
                    checked={formData.audiences.includes(audience)}
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

          <div className="flex items-center space-x-2">
            <Checkbox
              id="optedIn"
              checked={formData.optedIn}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, optedIn: checked as boolean }))
              }
            />
            <Label htmlFor="optedIn" className="text-sm">
              Opted in to receive messages
            </Label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Contact
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}