import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, X, FileText } from "lucide-react";

interface ActionCardProps {
  title: string;
  description: string;
  type: "email" | "transcript" | "youtube";
  isExpanded: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

export const ActionCard = ({ title, description, type, isExpanded, onExpand, onCollapse }: ActionCardProps) => {
  const [dragOver, setDragOver] = useState(false);

  const handleCardClick = () => {
    if (!isExpanded) {
      onExpand();
    }
  };

  const handleClose = () => {
    onCollapse();
  };

  const renderExpandedContent = () => {
    switch (type) {
      case "email":
        return (
          <div className="mt-6 space-y-4">
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleClose}>
                Close
              </Button>
              <Button>Send Email</Button>
            </div>
          </div>
        );

      case "transcript":
        return (
          <div className="mt-6 space-y-4">
            <div className="text-sm font-medium text-foreground mb-3">Upload Files</div>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragOver 
                  ? "border-primary bg-primary/5" 
                  : "border-border bg-accent"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
              }}
            >
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <div className="space-y-1">
                <Button variant="outline" size="sm">
                  Select file
                </Button>
                <div className="text-xs text-muted-foreground">
                  Or drag and drop file to upload
                </div>
                <div className="text-xs text-muted-foreground">
                  Max file size: 50 MB per transcript file
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleClose}>
                Close
              </Button>
              <Button>Continue Summary</Button>
            </div>
          </div>
        );

      case "youtube":
        return (
          <div className="mt-6 space-y-4">
            <Tabs defaultValue="transcribe" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="transcribe">Transcribe</TabsTrigger>
                <TabsTrigger value="keyword">Keyword Search</TabsTrigger>
              </TabsList>
              <TabsContent value="transcribe" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Paste Youtube URL</label>
                  <Input placeholder="Enter URL here..." />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={handleClose}>
                    Close
                  </Button>
                  <Button>Get Transcripts</Button>
                </div>
              </TabsContent>
              <TabsContent value="keyword" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Paste Youtube URL</label>
                  <Input placeholder="Enter URL here..." />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={handleClose}>
                    Close
                  </Button>
                  <Button>Get Keywords</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card
      className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
        isExpanded ? "shadow-xl border-primary/40 border-2" : "hover:border-border/60"
      }`}
      onClick={handleCardClick}
    >
      <div className="space-y-2">
        <h3 className="font-semibold text-lg text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      
      {isExpanded && (
        <div onClick={(e) => e.stopPropagation()}>
          {renderExpandedContent()}
        </div>
      )}
    </Card>
  );
};