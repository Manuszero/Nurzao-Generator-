import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, Loader2, Sparkles, Trash2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Generator() {
  const { user } = useAuth();
  const [contentType, setContentType] = useState<"article" | "social_post" | "product_description">("article");
  const [topic, setTopic] = useState("");
  const [contentLength, setContentLength] = useState<"short" | "medium" | "long">("medium");
  const [tone, setTone] = useState("professional");
  const [language, setLanguage] = useState("en");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateMutation = trpc.content.generate.useMutation();
  const historyQuery = trpc.content.history.useQuery({});
  const deleteMutation = trpc.content.delete.useMutation();

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic");
      return;
    }

    setIsLoading(true);
    try {
      const result = await generateMutation.mutateAsync({
        contentType,
        topic,
        contentLength,
        tone,
        language,
      });

      if (result.success) {
        setGeneratedContent(result.content);
        toast.success("Content generated successfully!");
        historyQuery.refetch();
      }
    } catch (error) {
      toast.error("Failed to generate content");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    toast.success("Copied to clipboard!");
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${contentType}-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Downloaded successfully!");
  };

  const handleDelete = async (contentId: number) => {
    try {
      await deleteMutation.mutateAsync({ contentId });
      toast.success("Content deleted");
      historyQuery.refetch();
    } catch (error) {
      toast.error("Failed to delete content");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 flex items-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 text-blue-600" />
            Content Generator
          </h1>
          <p className="text-slate-600">Welcome back, {user?.name}! Create amazing content in seconds.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Generator Panel */}
          <div className="lg:col-span-2">
            <Card className="p-8 shadow-lg">
              <div className="space-y-6">
                {/* Content Type */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Content Type</label>
                  <Select value={contentType} onValueChange={(value: any) => setContentType(value)}>
                    <SelectTrigger className="border-slate-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="article">Blog Article</SelectItem>
                      <SelectItem value="social_post">Social Media Post</SelectItem>
                      <SelectItem value="product_description">Product Description</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Topic */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Topic</label>
                  <Textarea
                    placeholder="Enter the topic or subject you want content about..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="border-slate-300 min-h-24 resize-none"
                  />
                </div>

                {/* Length & Tone */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Content Length</label>
                    <Select value={contentLength} onValueChange={(value: any) => setContentLength(value)}>
                      <SelectTrigger className="border-slate-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">Short (200-300 words)</SelectItem>
                        <SelectItem value="medium">Medium (500-700 words)</SelectItem>
                        <SelectItem value="long">Long (1000-1500 words)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Tone</label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger className="border-slate-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Language</label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="border-slate-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">Arabic</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={isLoading || !topic.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Content
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Preview & History */}
          <div className="space-y-6">
            {/* Generated Content Preview */}
            {generatedContent && (
              <Card className="p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Generated Content</h3>
                <p className="text-slate-700 text-sm mb-4 whitespace-pre-wrap max-h-64 overflow-y-auto">
                  {generatedContent}
                </p>
                <div className="flex gap-2">
                  <Button
                    onClick={handleCopy}
                    variant="outline"
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <Copy className="w-4 h-4" /> Copy
                  </Button>
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Download
                  </Button>
                </div>
              </Card>
            )}

            {/* History */}
            <Card className="p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Content</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {historyQuery.data && historyQuery.data.length > 0 ? (
                  historyQuery.data.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 transition">
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900 capitalize">{item.contentType.replace("_", " ")}</p>
                          <p className="text-xs text-slate-500 truncate">{item.topic}</p>
                        </div>
                        <Button
                          onClick={() => handleDelete(item.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-slate-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500 text-center py-8">No content generated yet</p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
