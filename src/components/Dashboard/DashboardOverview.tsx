import { StatsCard } from "./StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Users, 
  Target, 
  TrendingUp, 
  Clock,
  PlayCircle,
  Eye,
  CheckCircle
} from "lucide-react";

export function DashboardOverview() {
  const recentCampaigns = [
    {
      id: 1,
      name: "Mango Season Sale",
      status: "active",
      sent: 5200,
      delivered: 5120,
      read: 3400,
      lastRun: "2 hours ago"
    },
    {
      id: 2,
      name: "Fertilizer Reminder",
      status: "completed",
      sent: 3800,
      delivered: 3760,
      read: 2890,
      lastRun: "1 day ago"
    },
    {
      id: 3,
      name: "Weather Alert System",
      status: "scheduled",
      sent: 0,
      delivered: 0,
      read: 0,
      lastRun: "Scheduled for tomorrow"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Campaigns"
          value={15}
          change="+3 this month"
          changeType="positive"
          icon={MessageSquare}
          gradient
        />
        <StatsCard
          title="Total Contacts"
          value="5.2K"
          change="+12% from last month"
          changeType="positive"
          icon={Users}
        />
        <StatsCard
          title="Active Audiences"
          value={5}
          change="2 new this week"
          changeType="positive"
          icon={Target}
        />
        <StatsCard
          title="Avg. Read Rate"
          value="65.2%"
          change="+5.3% improvement"
          changeType="positive"
          icon={TrendingUp}
        />
      </div>

      {/* Recent Campaigns */}
      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Campaigns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCampaigns.map((campaign) => (
              <div 
                key={campaign.id}
                className="flex items-center justify-between p-4 bg-accent/50 rounded-lg hover:bg-accent/70 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{campaign.name}</h4>
                    <p className="text-sm text-muted-foreground">{campaign.lastRun}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">{campaign.sent}</p>
                    <p className="text-xs text-muted-foreground">Sent</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">{campaign.delivered}</p>
                    <p className="text-xs text-muted-foreground">Delivered</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">{campaign.read}</p>
                    <p className="text-xs text-muted-foreground">Read</p>
                  </div>

                  <Badge variant={
                    campaign.status === "active" ? "default" :
                    campaign.status === "completed" ? "secondary" : "outline"
                  }>
                    {campaign.status}
                  </Badge>

                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-[var(--shadow-card)] hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="p-4 bg-primary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <PlayCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Start New Campaign</h3>
            <p className="text-sm text-muted-foreground">Create and launch your next WhatsApp marketing campaign</p>
          </CardContent>
        </Card>

        <Card className="shadow-[var(--shadow-card)] hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="p-4 bg-primary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Manage Contacts</h3>
            <p className="text-sm text-muted-foreground">Import, organize and segment your contact database</p>
          </CardContent>
        </Card>

        <Card className="shadow-[var(--shadow-card)] hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="p-4 bg-primary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">View Analytics</h3>
            <p className="text-sm text-muted-foreground">Track performance and optimize your campaigns</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}