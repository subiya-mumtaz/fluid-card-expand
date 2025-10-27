import { useState } from "react";
import { ActionCard } from "./ActionCard";

export const Dashboard = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleExpand = (cardType) => {
    setExpandedCard(cardType);
  };

  const handleCollapse = () => {
    setExpandedCard(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pb-0">
        <span className="font-medium text-foreground">Investor Relations</span>
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
          <span className="text-xs text-muted-foreground font-medium">IR</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-foreground mb-2">
            Welcome <span className="text-brand-blue">Kishorev</span>
          </h1>
          <p className="text-muted-foreground text-lg">Select an action below:</p>
        </div>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full items-start">
          <ActionCard
            title="Send AR Analyst Email"
            description="Run today's incremental email process"
            type="email"
            isExpanded={expandedCard === "email"}
            onExpand={() => handleExpand("email")}
            onCollapse={handleCollapse}
          />
          <ActionCard
            title="Summarize Transcripts"
            description="Upload a file to generate a summary"
            type="transcript"
            isExpanded={expandedCard === "transcript"}
            onExpand={() => handleExpand("transcript")}
            onCollapse={handleCollapse}
          />
          <ActionCard
            title="Analyze Youtube Transcript"
            description="Paste a URL for a transcript + keywords"
            type="youtube"
            isExpanded={expandedCard === "youtube"}
            onExpand={() => handleExpand("youtube")}
            onCollapse={handleCollapse}
          />
        </div>
      </div>
    </div>
  );
};