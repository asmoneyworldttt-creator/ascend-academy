import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles, Zap, Brain, Cpu } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const quickQuestions = [
  "Which course is best for beginners?",
  "How does the affiliate program work?",
  "What's included in the Elite package?",
  "Help me choose a course"
];

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm ARIA, your Advanced Recommendation & Intelligence Assistant. I'm here to help you find the perfect learning path, answer questions about our platform, or guide you through our affiliate program. How can I assist you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: content.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-chatbot', {
        body: { 
          messages: [...messages.filter(m => m.role !== 'assistant' || messages.indexOf(m) > 0), userMessage].map(m => ({
            role: m.role,
            content: m.content
          })),
          type: content.toLowerCase().includes('recommend') ? 'recommend' : 'chat'
        }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message || "I'm processing your request. Please try again in a moment."
      };
      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm experiencing a temporary connection issue. Please try again in a moment."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  return (
    <>
      {/* Futuristic Chat Button */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 transition-all duration-500",
          isOpen && "scale-0 opacity-0 pointer-events-none"
        )}
      >
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-primary to-violet-500 blur-lg opacity-50 animate-pulse" />
        
        {/* Rotating border */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 via-primary to-violet-500 opacity-75 animate-[spin_3s_linear_infinite]" />
        
        <Button
          onClick={() => setIsOpen(true)}
          className={cn(
            "relative h-16 w-16 rounded-full shadow-2xl",
            "bg-gradient-to-br from-slate-900 to-slate-800",
            "border border-cyan-500/30",
            "hover:scale-110 transition-transform duration-300",
            "group"
          )}
        >
          {/* Inner glow */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20 group-hover:from-cyan-500/30 group-hover:to-violet-500/30 transition-all" />
          
          {/* Icon */}
          <div className="relative flex items-center justify-center">
            <Brain className="h-7 w-7 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
          </div>
          
          {/* Status indicator */}
          <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse" />
        </Button>
      </div>

      {/* Futuristic Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-2rem)] rounded-3xl transition-all duration-500",
          "shadow-[0_0_50px_rgba(6,182,212,0.15)]",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        )}
        style={{ height: 'min(650px, calc(100vh - 6rem))' }}
      >
        {/* Glowing border */}
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-b from-cyan-500/50 via-primary/30 to-violet-500/50 opacity-50" />
        
        {/* Main container */}
        <div className="relative h-full rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-cyan-500/20 overflow-hidden flex flex-col">
          
          {/* Animated background grid */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)`,
              backgroundSize: '30px 30px',
            }} />
          </div>

          {/* Header */}
          <div className="relative p-5 border-b border-cyan-500/20 bg-gradient-to-r from-slate-900/50 via-cyan-950/30 to-slate-900/50">
            {/* Decorative top line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Avatar with holographic effect */}
                <div className="relative">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 blur-md opacity-50" />
                  <div className="relative h-12 w-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/30 flex items-center justify-center">
                    <Cpu className="h-6 w-6 text-cyan-400" />
                    {/* Scanning line effect */}
                    <div className="absolute inset-0 rounded-xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-[scan_2s_linear_infinite]" style={{ height: '50%' }} />
                    </div>
                  </div>
                  <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-400 border-2 border-slate-900">
                    <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                  </span>
                </div>
                
                <div>
                  <h3 className="font-bold text-white flex items-center gap-2">
                    ARIA
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-medium">AI</span>
                  </h3>
                  <p className="text-xs text-cyan-400/70 flex items-center gap-1.5">
                    <Zap className="h-3 w-3" />
                    Advanced Intelligence Assistant
                  </p>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-10 w-10 rounded-xl bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 transition-all"
              >
                <X className="h-5 w-5 text-white/70" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 px-4 py-4" style={{ height: 'calc(100% - 160px)' }}>
            <div ref={scrollAreaRef} className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex gap-3",
                    message.role === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === 'assistant' && (
                    <div className="relative shrink-0">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-cyan-400" />
                      </div>
                    </div>
                  )}
                  
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
                      message.role === 'user'
                        ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-br-md shadow-lg shadow-primary/20"
                        : "bg-gradient-to-br from-slate-800/80 to-slate-800/40 border border-cyan-500/20 text-white/90 rounded-bl-md"
                    )}
                  >
                    {message.content}
                  </div>
                  
                  {message.role === 'user' && (
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 border border-cyan-500/20 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 text-cyan-400 animate-spin" />
                      <span className="text-sm text-cyan-400/70">Processing...</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Questions */}
              {messages.length === 1 && !isLoading && (
                <div className="mt-6 space-y-3">
                  <p className="text-xs text-cyan-400/60 flex items-center gap-2">
                    <Sparkles className="h-3 w-3" />
                    Quick actions:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickQuestion(question)}
                        className="text-xs px-3 py-2 rounded-xl bg-gradient-to-r from-slate-800 to-slate-800/50 border border-cyan-500/20 text-cyan-300 hover:border-cyan-500/40 hover:bg-slate-700/50 transition-all duration-300"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <form onSubmit={handleSubmit} className="relative p-4 border-t border-cyan-500/20 bg-slate-900/50">
            {/* Decorative line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
            
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask ARIA anything..."
                  disabled={isLoading}
                  className="w-full rounded-xl bg-slate-800/50 border-cyan-500/20 focus:border-cyan-500/50 focus-visible:ring-1 focus-visible:ring-cyan-500/30 text-white placeholder:text-cyan-400/40 pr-4 py-6"
                />
              </div>
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500 to-primary hover:from-cyan-400 hover:to-primary/90 border border-cyan-400/30 shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:shadow-none transition-all"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Powered by text */}
            <p className="text-center text-[10px] text-cyan-400/40 mt-3">
              Powered by SkillHonors AI • Advanced Neural Networks
            </p>
          </form>
        </div>
      </div>

      {/* Custom CSS for scanning animation */}
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      `}</style>
    </>
  );
};

export default AIChatbot;
