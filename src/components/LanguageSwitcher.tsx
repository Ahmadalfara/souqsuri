
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/contexts/ThemeContext';

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const { language, setLanguage } = useLanguage();
  const { theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className={`relative ${className}`}
          aria-label="Select language"
        >
          <Globe className="h-5 w-5" />
          <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-syrian-green text-[8px] font-bold text-white flex items-center justify-center">
            {language.toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={theme === 'dark' ? 'dark' : ''}>
        <DropdownMenuItem onClick={() => setLanguage('ar')} className="flex justify-between">
          <span className={`flex items-center ${language === 'ar' ? 'text-syrian-green font-bold' : ''}`}>
            العربية
            {language === 'ar' && <span className="ml-2">✓</span>}
          </span>
          <span className="ml-2 inline-block w-6 h-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5MDAiIGhlaWdodD0iNjAwIj48cGF0aCBkPSJNMCAwaDkwMHY2MDBIMHoiIGZpbGw9IiNjZTExMjYiLz48cGF0aCBkPSJNMCAyMDBoOTAwdjIwMEgweiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0wIDQwMGg5MDB2MjAwSDB6IiBmaWxsPSIjMDAwIi8+PHBhdGggZD0iTTMwMCAzMDAgNDUwIDIwMCA2MDAgMzAwbC0xNTAgMTAweiIgZmlsbD0iIzAwNzEzOSIvPjxwYXRoIGQ9Im00NTAgMzUwIDMwIDI1IC0zMCAtNDAgLTMwIDQweiIgZmlsbD0iIzAwNzEzOSIvPjwvc3ZnPg==')]"></span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('en')} className="flex justify-between">
          <span className={`flex items-center ${language === 'en' ? 'text-syrian-green font-bold' : ''}`}>
            English
            {language === 'en' && <span className="ml-2">✓</span>}
          </span>
          <span className="ml-2 inline-block w-6 h-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjM1IDY1MCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KPGRlZnM+DQo8ZyBpZD0idW5pb24iPg0KPHVzZSB5PSItLjIxNiIgeGxpbms6aHJlZj0iI3g0Ii8+DQo8dXNlIHk9Ii0uMjE2IiB4bGluazpocmVmPSIjeDUiLz4NCjx1c2UgeT0iLS4yMTYiIHhsaW5rOmhyZWY9IiN4Ii8+DQo8L2c+DQo8ZyBpZD0ieDQiPg0KPHBvbHlnb24gaWQ9IngiIHBvaW50cz0iMCwwIDAsMC41IDAuMjI0NDksMC41IjAvPg0KPHVzZSB4PSItMC4yMjQ0OSIgeT0iMC4zMzE2NSIgeGxpbms6aHJlZj0iI3giLz4NCjwvZz4NCjxnIGlkPSJ4NSI+DQo8dXNlIHg9IjAuMTE4MDgiIHhsaW5rOmhyZWY9IiN4NCIvPg0KPHVzZSB4PSItMC4yMjQ0OSIgeT0iMC42NjMzNSIgeGxpbms6aHJlZj0iI3g0Ii8+DQo8L2c+DQo8ZyBpZD0ic3RhciI+DQo8dXNlIHhsaW5rOmhyZWY9IiN1bmlvbiIvPg0KPHVzZSB4PSItMC4yMzYwNiIgeT0iMC4wOTk0OSIgeGxpbms6aHJlZj0iI3VuaW9uIi8+DQo8L2c+DQo8ZyBpZD0ic3RhcjEiPg0KPHVzZSB0cmFuc2Zvcm09InJvdGF0ZSg3MikiIHhsaW5rOmhyZWY9IiNzdGFyIi8+DQo8L2c+DQo8ZyBpZD0ic3RhcjIiPg0KPHVzZSB0cmFuc2Zvcm09InJvdGF0ZSgxNDQpIiB4bGluazpocmVmPSIjc3RhciIvPg0KPC9nPg0KPGcgaWQ9InN0YXI0NXkiPg0KPHVzZSB4bGluazpocmVmPSIjc3RhciIvPg0KPHVzZSB0cmFuc2Zvcm09InJvdGF0ZSgxODApIiB4bGluazpocmVmPSIjc3RhciIvPg0KPC9nPg0KPGcgaWQ9InN0YXI0NXgiPg0KPHVzZSB4bGluazpocmVmPSIjc3RhcjEiLz4NCjx1c2UgdHJhbnNmb3JtPSJyb3RhdGUoMTgwKSIgeGxpbms6aHJlZj0iI3N0YXIxIi8+DQo8L2c+DQo8ZyBpZD0ic3RhcjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTAuMzAxMzkpIj4NCjx1c2UgeGxpbms6aHJlZj0iI3N0YXI0NXgiLz4NCjx1c2UgdHJhbnNmb3JtPSJyb3RhdGUoNzIpIiB4bGluazpocmVmPSIjc3RhcjQ1eCIvPg0KPC9nPg0KPC9kZWZzPg0KPHN5bWJvbCBpZD0iZmxhZyIgdmlld0JveD0iMCAwIDEyMzUgNjUwIj4NCjxyZWN0IHdpZHRoPSIxMjM1IiBoZWlnaHQ9IjUwIiBmaWxsPSIjYjIyMjM0Ii8+DQo8cmVjdCB5PSI1MCIgd2lkdGg9IjEyMzUiIGhlaWdodD0iNTAiIGZpbGw9IiNmZmYiLz4NCjxyZWN0IHk9IjEwMCIgd2lkdGg9IjEyMzUiIGhlaWdodD0iNTAiIGZpbGw9IiNiMjIyMzQiLz4NCjxyZWN0IHk9IjE1MCIgd2lkdGg9IjEyMzUiIGhlaWdodD0iNTAiIGZpbGw9IiNmZmYiLz4NCjxyZWN0IHk9IjIwMCIgd2lkdGg9IjEyMzUiIGhlaWdodD0iNTAiIGZpbGw9IiNiMjIyMzQiLz4NCjxyZWN0IHk9IjI1MCIgd2lkdGg9IjEyMzUiIGhlaWdodD0iNTAiIGZpbGw9IiNmZmYiLz4NCjxyZWN0IHk9IjMwMCIgd2lkdGg9IjEyMzUiIGhlaWdodD0iNTAiIGZpbGw9IiNiMjIyMzQiLz4NCjxyZWN0IHk9IjM1MCIgd2lkdGg9IjEyMzUiIGhlaWdodD0iNTAiIGZpbGw9IiNmZmYiLz4NCjxyZWN0IHk9IjQwMCIgd2lkdGg9IjEyMzUiIGhlaWdodD0iNTAiIGZpbGw9IiNiMjIyMzQiLz4NCjxyZWN0IHk9IjQ1MCIgd2lkdGg9IjEyMzUiIGhlaWdodD0iNTAiIGZpbGw9IiNmZmYiLz4NCjxyZWN0IHk9IjUwMCIgd2lkdGg9IjEyMzUiIGhlaWdodD0iNTAiIGZpbGw9IiNiMjIyMzQiLz4NCjxyZWN0IHk9IjU1MCIgd2lkdGg9IjEyMzUiIGhlaWdodD0iNTAiIGZpbGw9IiNmZmYiLz4NCjxyZWN0IHk9IjYwMCIgd2lkdGg9IjEyMzUiIGhlaWdodD0iNTAiIGZpbGw9IiNiMjIyMzQiLz4NCjxyZWN0IHdpZHRoPSI0OTQiIGhlaWdodD0iMzUwIiBmaWxsPSIjM2MyNDNiIi8+DQo8dXNlIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQxLjY2NjY3LDIzMy4zMzMzMykgc2NhbGUoMzUuNjI3MSkiIHhsaW5rOmhyZWY9IiNzdGFyNSIgZmlsbD0iI2ZmZiIvPg0KPC9zeW1ib2w+DQo8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ3aGl0ZSIvPg0KPHVzZSB4bGluazpocmVmPSIjZmxhZyIgd2lkdGg9IjEyMzUiIGhlaWdodD0iNjUwIi8+DQo8L3N2Zz4=')]"></span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
