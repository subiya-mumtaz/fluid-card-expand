import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, X, FileText, CheckCircle, Download, Trash2 } from "lucide-react";

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
  const [emailSent, setEmailSent] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [summaryGenerated, setSummaryGenerated] = useState(false);

  const handleCardClick = () => {
    if (!isExpanded) {
      onExpand();
    }
  };

  const handleClose = () => {
    setEmailSent(false);
    setUploadedFile(null);
    setSummaryGenerated(false);
    onCollapse();
  };

  const handleSendEmail = () => {
    setEmailSent(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleDeleteFile = () => {
    setUploadedFile(null);
    setSummaryGenerated(false);
  };

  const handleGenerateSummary = () => {
    setSummaryGenerated(true);
  };

  const renderExpandedContent = () => {
    switch (type) {
      case "email":
        return (
          <div className="mt-6 space-y-4">
            {emailSent ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 p-3 border border-border rounded-lg bg-background">
                  <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm font-bold text-foreground">Email sent successfully</span>
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" onClick={handleClose}>
                    Close
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleClose}>
                  Close
                </Button>
                <Button onClick={handleSendEmail}>Send Email</Button>
              </div>
            )}
          </div>
        );

      case "transcript":
        return (
          <div className="mt-6 space-y-4">
            {summaryGenerated ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 p-3 border border-border rounded-lg bg-background">
                  <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm font-bold text-foreground">Summary generated successfully</span>
                  <Button variant="ghost" size="sm" className="ml-auto">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" onClick={handleClose}>
                    Close
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="text-sm font-medium text-foreground mb-3">Upload Files</div>
                {uploadedFile ? (
                  <div className="flex items-center gap-2 p-3 border border-border rounded-lg bg-accent">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-foreground flex-1 truncate">{uploadedFile.name}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleDeleteFile}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ) : (
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
                      const file = e.dataTransfer.files?.[0];
                      if (file) setUploadedFile(file);
                    }}
                  >
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <div className="space-y-1">
                      <label htmlFor="file-upload">
                        <Button variant="outline" size="sm" asChild>
                          <span>Select file</span>
                        </Button>
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileSelect}
                      />
                      <div className="text-xs text-muted-foreground">
                        Or drag and drop file to upload
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Max file size: 50 MB per transcript file
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={handleClose}>
                    Close
                  </Button>
                  <Button onClick={handleGenerateSummary} disabled={!uploadedFile}>
                    Generate Summary
                  </Button>
                </div>
              </>
            )}
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
        isExpanded 
          ? "shadow-xl border-primary/40 border-2 min-h-fit" 
          : "hover:border-border/60 h-auto"
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