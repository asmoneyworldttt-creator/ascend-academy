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

      {/* Clean Chat Window with Better Opacity */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] rounded-2xl transition-all duration-500",
          "shadow-2xl",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        )}
        style={{ height: 'min(600px, calc(100vh - 6rem))' }}
      >
        {/* Solid border */}
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-primary/40 via-primary/20 to-primary/40" />
        
        {/* Main container - SOLID BACKGROUND */}
        <div className="relative h-full rounded-2xl bg-slate-950 border border-primary/30 overflow-hidden flex flex-col">
          
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(139,92,246,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.2) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }} />
          </div>

          {/* Header */}
          <div className="relative p-4 border-b border-primary/20 bg-slate-900">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Cpu className="h-5 w-5 text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
                </div>
                
                <div>
                  <h3 className="font-bold text-white flex items-center gap-2">
                    ARIA
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary/20 text-primary font-medium">AI</span>
                  </h3>
                  <p className="text-[10px] text-primary/70 flex items-center gap-1">
                    <Zap className="h-2.5 w-2.5" />
                    Skill Learners Assistant
                  </p>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-9 w-9 rounded-lg bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 transition-all"
              >
                <X className="h-4 w-4 text-white/70" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 px-3 py-3" style={{ height: 'calc(100% - 140px)' }}>
            <div ref={scrollAreaRef} className="space-y-3">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex gap-2",
                    message.role === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === 'assistant' && (
                    <div className="shrink-0">
                      <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 border border-primary/30 flex items-center justify-center">
                        <Bot className="h-3.5 w-3.5 text-primary" />
                      </div>
                    </div>
                  )}
                  
                  <div
                    className={cn(
                      "max-w-[85%] rounded-xl px-3 py-2.5 text-sm",
                      message.role === 'user'
                        ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-br-sm"
                        : "bg-slate-800 border border-slate-700 text-white/90 rounded-bl-sm"
                    )}
                  >
                    {message.content}
                  </div>
                  
                  {message.role === 'user' && (
                    <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                      <User className="h-3.5 w-3.5 text-primary" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-2 justify-start">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 border border-primary/30 flex items-center justify-center">
                    <Bot className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="bg-slate-800 border border-slate-700 rounded-xl rounded-bl-sm px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-3.5 w-3.5 text-primary animate-spin" />
                      <span className="text-xs text-primary/70">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Questions */}
              {messages.length === 1 && !isLoading && (
                <div className="mt-4 space-y-2">
                  <p className="text-[10px] text-primary/60 flex items-center gap-1.5">
                    <Sparkles className="h-2.5 w-2.5" />
                    Quick questions:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {quickQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickQuestion(question)}
                        className="text-[11px] px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white/70 hover:border-primary/40 hover:bg-slate-700/50 transition-all duration-200"
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
          <form onSubmit={handleSubmit} className="relative p-3 border-t border-slate-800 bg-slate-900/80">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask ARIA anything..."
                  disabled={isLoading}
                  className="w-full rounded-lg bg-slate-800 border-slate-700 focus:border-primary/50 focus-visible:ring-1 focus-visible:ring-primary/30 text-white placeholder:text-white/40 pr-3 py-5 text-sm"
                />
              </div>
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-accent hover:from-primary/90 hover:to-accent/90 border-0 shadow-md disabled:opacity-50 transition-all"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            <p className="text-center text-[9px] text-white/30 mt-2">
              Powered by Skill Learners AI
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default AIChatbot;
