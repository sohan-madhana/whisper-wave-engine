import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface CreateAudienceModalProps {
  children: React.ReactNode;
}

export function CreateAudienceModal({ children }: CreateAudienceModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    filterType: "",
    filterValue: ""
  });
  const { toast } = useToast();

  const filterOptions = [
    { value: "location", label: "Location" },
    { value: "lastMessage", label: "Last Message Date" },
    { value: "optedIn", label: "Opt-in Status" },
    { value: "customField", label: "Custom Field" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      toast({
        title: "Missing Information",
        description: "Please provide an audience name.",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call
    toast({
      title: "Audience Created",
      description: `Audience "${formData.name}" has been created successfully.`
    });
    
    setOpen(false);
    setFormData({
      name: "",
      description: "",
      filterType: "",
      filterValue: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create Target Audience</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Audience Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Organic Farmers - West Bengal"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe this audience segment..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Filter Criteria (Optional)</Label>
            <Select
              value={formData.filterType}
              onValueChange={(value) => setFormData(prev => ({ ...prev, filterType: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select filter type" />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.filterType && (
            <div className="space-y-2">
              <Label htmlFor="filterValue">Filter Value</Label>
              <Input
                id="filterValue"
                placeholder={
                  formData.filterType === "location" ? "e.g., Kharagpur" :
                  formData.filterType === "lastMessage" ? "e.g., 30 days" :
                  formData.filterType === "optedIn" ? "true/false" :
                  "Enter custom value"
                }
                value={formData.filterValue}
                onChange={(e) => setFormData(prev => ({ ...prev, filterValue: e.target.value }))}
              />
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              <Users className="w-4 h-4 mr-2" />
              Create Audience
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}