import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreateCampaignModal } from "./CreateCampaignModal";
import { 
  MessageSquare, 
  Users, 
  Calendar, 
  MoreVertical,
  PlayCircle,
  Archive,
  Edit,
  Eye,
  TrendingUp,
  Plus
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Campaign {
  id: string;
  name: string;
  status: "draft" | "active" | "completed" | "scheduled";
  totalRuns: number;
  totalSent: number;
  deliveryRate: number;
  readRate: number;
  lastRun: string;
  targetAudiences: string[];
}

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Mango Season Sale 2025",
    status: "active",
    totalRuns: 3,
    totalSent: 15600,
    deliveryRate: 98.5,
    readRate: 65.2,
    lastRun: "2 hours ago",
    targetAudiences: ["Farmers - Kharagpur", "Premium Customers"]
  },
  {
    id: "2", 
    name: "Fertilizer Reminder Campaign",
    status: "completed",
    totalRuns: 12,
    totalSent: 45600,
    deliveryRate: 97.8,
    readRate: 58.4,
    lastRun: "3 days ago",
    targetAudiences: ["All Active Farmers"]
  },
  {
    id: "3",
    name: "Weather Alert System",
    status: "scheduled",
    totalRuns: 0,
    totalSent: 0,
    deliveryRate: 0,
    readRate: 0,
    lastRun: "Never",
    targetAudiences: ["Weather Subscribers", "Emergency Contacts"]
  },
  {
    id: "4",
    name: "New Product Launch",
    status: "draft",
    totalRuns: 0,
    totalSent: 0,
    deliveryRate: 0,
    readRate: 0,
    lastRun: "Never",
    targetAudiences: ["VIP Customers"]
  }
];

export function CampaignList() {
  const getStatusColor = (status: Campaign["status"]) => {
    switch (status) {
      case "active": return "default";
      case "completed": return "secondary";
      case "scheduled": return "outline";
      case "draft": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Campaigns</h2>
        <CreateCampaignModal>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </CreateCampaignModal>
      </div>
      
      <div className="grid gap-6">
        {mockCampaigns.map((campaign) => (
          <Card key={campaign.id} className="shadow-[var(--shadow-card)] hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{campaign.name}</CardTitle>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge variant={getStatusColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Last run: {campaign.lastRun}
                      </span>
                    </div>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Campaign
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Run Campaign
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Archive className="w-4 h-4 mr-2" />
                      Archive
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center p-4 bg-accent/50 rounded-lg">
                  <p className="text-2xl font-bold text-foreground">{campaign.totalRuns}</p>
                  <p className="text-sm text-muted-foreground">Total Runs</p>
                </div>
                <div className="text-center p-4 bg-accent/50 rounded-lg">
                  <p className="text-2xl font-bold text-foreground">{campaign.totalSent.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Messages Sent</p>
                </div>
                <div className="text-center p-4 bg-accent/50 rounded-lg">
                  <p className="text-2xl font-bold text-success">{campaign.deliveryRate}%</p>
                  <p className="text-sm text-muted-foreground">Delivery Rate</p>
                </div>
                <div className="text-center p-4 bg-accent/50 rounded-lg">
                  <p className="text-2xl font-bold text-primary">{campaign.readRate}%</p>
                  <p className="text-sm text-muted-foreground">Read Rate</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Target Audiences: {campaign.targetAudiences.join(", ")}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Analytics
                  </Button>
                  {campaign.status !== "completed" && (
                    <Button size="sm">
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Run Campaign
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}