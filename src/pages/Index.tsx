import { useState } from "react";
import { Sidebar } from "@/components/Dashboard/Sidebar";
import { Header } from "@/components/Dashboard/Header";
import { DashboardOverview } from "@/components/Dashboard/DashboardOverview";
import { CampaignList } from "@/components/Campaigns/CampaignList";
import { AnalyticsCharts } from "@/components/Analytics/AnalyticsCharts";
import { ContactManager } from "@/components/Contacts/ContactManager";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BSPSetupModal } from "@/components/Settings/BSPSetupModal";
import { Link2 } from "lucide-react";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview />;
      case "campaigns":
        return <CampaignList />;
      case "analytics":
        return <AnalyticsCharts />;
      case "contacts":
        return <ContactManager />;
      case "audiences":
        return <ContactManager />;
      case "settings":
        return (
          <Card className="shadow-[var(--shadow-card)]">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Backend Integration Required</h3>
              <p className="text-muted-foreground mb-6">
                To enable full functionality including authentication, database management, 
                and WhatsApp BSP integration, connect your project to Supabase.
              </p>
              <div className="flex gap-3">
                <BSPSetupModal>
                  <Button variant="outline" className="gap-2">
                    <Link2 className="w-4 h-4" />
                    Setup WhatsApp BSP
                  </Button>
                </BSPSetupModal>
                <Button className="gap-2">
                  <Link2 className="w-4 h-4" />
                  Connect to Supabase
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return <DashboardOverview />;
    }
  };

  const handleNewCampaign = () => {
    // This would open a campaign creation modal/form
    console.log("Opening new campaign modal...");
  };

  return (
    <div className="min-h-screen bg-[var(--gradient-bg)] flex">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      <div className="flex-1">
        <Header 
          activeSection={activeSection} 
          onNewCampaign={handleNewCampaign}
        />
        
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;