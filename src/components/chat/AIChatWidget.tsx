
import React, { useState, useRef, useEffect } from 'react';
import { Send, ChevronDown, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/contexts/LanguageContext';
import ArabicText from '../ArabicText';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { language, t } = useLanguage();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Add initial bot message when widget is first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialMessage = {
        id: Date.now().toString(),
        role: 'assistant' as const,
        content: language === 'ar' 
          ? 'مرحباً! أنا المساعد الافتراضي لسوقنا. كيف يمكنني مساعدتك اليوم؟'
          : 'Hello! I\'m Souqna\'s AI assistant. How can I help you today?',
        timestamp: new Date()
      };
      
      setMessages([initialMessage]);
    }
  }, [isOpen, language, messages.length]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!message.trim()) return;
    
    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: message,
      timestamp: new Date()
    };
    
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setMessage('');
    setIsLoading(true);
    
    try {
      console.log("Calling chat-assistant edge function...");
      // Call edge function to get AI response
      const { data, error } = await supabase.functions.invoke('chat-assistant', {
        body: { 
          message: message,
          language: language,
          previousMessages: messages.slice(-5).map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }
      });
      
      if (error) {
        console.error("Supabase function error:", error);
        throw error;
      }
      
      console.log("Received response:", data);
      
      const botMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: data.reply || 
          (language === 'ar' 
            ? 'عذراً، حدث خطأ ما. يرجى المحاولة مرة أخرى.'
            : 'Sorry, something went wrong. Please try again.'),
        timestamp: new Date()
      };
      
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      toast({
        title: language === 'ar' ? "خطأ" : "Error",
        description: language === 'ar' 
          ? "حدث خطأ في الاتصال بالمساعد الذكي. حاول مرة أخرى." 
          : "Error connecting to the AI assistant. Please try again.",
        variant: "destructive"
      });
      
      // Add error message
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: language === 'ar' 
          ? 'عذراً، حدث خطأ ما. يرجى المحاولة مرة أخرى.'
          : 'Sorry, something went wrong. Please try again.',
        timestamp: new Date()
      };
      
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Window */}
      <div className={`bg-background border shadow-lg rounded-lg w-80 sm:w-96 transition-all duration-300 flex flex-col ${
        isOpen ? 'h-96 opacity-100' : 'h-0 opacity-0 invisible'
      }`}>
        {/* Chat Header */}
        <div className="p-3 border-b bg-syrian-green text-white rounded-t-lg flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <h3>
              {language === 'ar' 
                ? <ArabicText text="مساعد سوقنا" />
                : "Souqna Assistant"}
            </h3>
          </div>
          <Button variant="ghost" size="sm" onClick={toggleChat} className="text-white hover:bg-syrian-dark">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Messages Container */}
        <ScrollArea className="flex-1 p-3">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-2 max-w-[85%]`}>
                  <Avatar className={`h-8 w-8 ${msg.role === 'assistant' ? 'bg-syrian-green' : 'bg-muted'}`}>
                    {msg.role === 'assistant' ? <Bot className="h-5 w-5 text-white" /> : null}
                  </Avatar>
                  <div 
                    className={`rounded-lg px-3 py-2 text-sm ${
                      msg.role === 'user' 
                        ? 'bg-syrian-green text-white' 
                        : 'bg-muted border'
                    }`}
                    dir={language === 'ar' && msg.role === 'assistant' ? 'rtl' : undefined}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="border-t p-3">
          <div className="flex space-x-2">
            <Input
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={language === 'ar' ? "اكتب رسالتك هنا..." : "Type your message here..."}
              className="flex-1"
              disabled={isLoading}
              dir={language === 'ar' ? 'rtl' : undefined}
            />
            <Button 
              type="submit"
              size="icon"
              disabled={isLoading || !message.trim()}
              className="bg-syrian-green hover:bg-syrian-dark text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
      
      {/* Toggle Button */}
      <Button 
        onClick={toggleChat}
        className={`rounded-full w-12 h-12 bg-syrian-green hover:bg-syrian-dark text-white shadow-lg ${
          isOpen ? 'hidden' : 'flex'
        } items-center justify-center`}
        size="icon"
      >
        <Bot className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default AIChatWidget;
