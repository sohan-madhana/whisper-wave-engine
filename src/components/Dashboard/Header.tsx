import { Button } from "@/components/ui/button";
import { Bell, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UserMenu } from "./UserMenu";

interface HeaderProps {
  activeSection: string;
  onNewCampaign: () => void;
}

export function Header({ activeSection, onNewCampaign }: HeaderProps) {
  const getSectionTitle = () => {
    switch (activeSection) {
      case "dashboard": return "Dashboard Overview";
      case "campaigns": return "Campaign Management";
      case "audiences": return "Target Audiences";
      case "contacts": return "Contact Management";
      case "analytics": return "Analytics & Reports";
      case "settings": return "Settings";
      default: return "Dashboard";
    }
  };

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{getSectionTitle()}</h2>
          <p className="text-muted-foreground">
            Manage your WhatsApp marketing campaigns effectively
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search campaigns, contacts..." 
              className="pl-10 w-64"
            />
          </div>
          
          {activeSection === "campaigns" && (
            <Button onClick={onNewCampaign} className="gap-2">
              <Plus className="w-4 h-4" />
              New Campaign
            </Button>
          )}

          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>

          <UserMenu />
        </div>
      </div>
    </header>
  );
}