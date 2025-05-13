
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number with readable suffixes based on language
 * @param value The number to format
 * @param language The language to use for formatting ('en' or 'ar')
 * @param currency The currency to display ('USD' or 'SYP')
 * @returns Formatted price string
 */
export function formatLargeNumber(
  value: number,
  language: 'en' | 'ar' = 'en',
  currency: 'USD' | 'SYP' = 'SYP'
): string {
  // Return empty string for invalid values
  if (value === null || value === undefined || isNaN(value)) {
    return '';
  }

  // Create localized number formatter based on language
  const formatter = new Intl.NumberFormat(language === 'ar' ? 'ar-SY' : 'en-US', {
    maximumFractionDigits: 1,
    minimumFractionDigits: 0,
  });

  // Define terms for millions and billions in both languages
  const millionTerm = language === 'ar' ? 'مليون' : 'Million';
  const billionTerm = language === 'ar' ? 'مليار' : 'Billion';
  
  // Format based on magnitude
  let formattedValue: string;
  if (value >= 1_000_000_000) {
    // Format as billions (9+ digits)
    formattedValue = formatter.format(value / 1_000_000_000) + ' ' + billionTerm;
  } else if (value >= 1_000_000) {
    // Format as millions (6-8 digits)
    formattedValue = formatter.format(value / 1_000_000) + ' ' + millionTerm;
  } else {
    // Regular number formatting with thousand separators
    formattedValue = formatter.format(value);
  }

  // Add currency symbol based on currency type and language
  if (currency === 'USD') {
    return language === 'ar' ? formattedValue + ' $' : '$' + formattedValue;
  } else { // SYP
    return language === 'ar' ? formattedValue + ' ل.س' : formattedValue + ' SYP';
  }
}
