import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  gradient?: boolean;
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  icon: Icon, 
  gradient = false 
}: StatsCardProps) {
  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-lg border-0",
      gradient 
        ? "bg-gradient-to-br from-primary to-primary-glow text-primary-foreground" 
        : "bg-card shadow-[var(--shadow-card)]"
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className={cn(
              "text-sm font-medium",
              gradient ? "text-primary-foreground/80" : "text-muted-foreground"
            )}>
              {title}
            </p>
            <p className={cn(
              "text-3xl font-bold mt-2",
              gradient ? "text-primary-foreground" : "text-foreground"
            )}>
              {value}
            </p>
            {change && (
              <p className={cn(
                "text-sm mt-2 font-medium",
                gradient ? "text-primary-foreground/90" : 
                changeType === "positive" ? "text-success" :
                changeType === "negative" ? "text-destructive" : "text-muted-foreground"
              )}>
                {change}
              </p>
            )}
          </div>
          <div className={cn(
            "p-3 rounded-xl",
            gradient 
              ? "bg-primary-foreground/20" 
              : "bg-primary/10"
          )}>
            <Icon className={cn(
              "w-6 h-6",
              gradient ? "text-primary-foreground" : "text-primary"
            )} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}