import { useState, useEffect } from 'react';
import { formatLargeNumber } from '@/lib/utils';

// Exchange rate cache
let cachedExchangeRate: number | null = null;
let cacheTimestamp: number = 0;

// Cache lifetime (24 hours in milliseconds)
const CACHE_LIFETIME = 24 * 60 * 60 * 1000;

// Fallback exchange rate in case API fails
const FALLBACK_EXCHANGE_RATE = 13000; // SYP to 1 USD

/**
 * Fetches the current SYP to USD exchange rate
 * Uses an external API if possible, otherwise falls back to a default rate
 */
export const fetchExchangeRate = async (): Promise<number> => {
  // If we have a cached rate and it's less than 24 hours old, use it
  const now = Date.now();
  if (cachedExchangeRate && (now - cacheTimestamp < CACHE_LIFETIME)) {
    return cachedExchangeRate;
  }
  
  try {
    // Attempt to fetch the current exchange rate 
    // Using a free currency API that doesn't require authentication
    const response = await fetch('https://open.er-api.com/v6/latest/USD');
    
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rate');
    }
    
    const data = await response.json();
    
    // Extract the SYP exchange rate (SYP per 1 USD)
    let rate = data.rates?.SYP;
    
    if (!rate) {
      throw new Error('SYP rate not found in API response');
    }
    
    // Update the cache
    cachedExchangeRate = rate;
    cacheTimestamp = now;
    
    return rate;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    
    // If we have a cached rate, use it even if it's old
    if (cachedExchangeRate) {
      return cachedExchangeRate;
    }
    
    // Otherwise use the fallback rate
    return FALLBACK_EXCHANGE_RATE;
  }
};

/**
 * Convert amount between SYP and USD
 * @param amount The amount to convert
 * @param fromCurrency The source currency ('SYP' or 'USD')
 * @param toCurrency The target currency ('SYP' or 'USD')
 * @returns The converted amount
 */
export const convertCurrency = async (
  amount: number, 
  fromCurrency: 'SYP' | 'USD', 
  toCurrency: 'SYP' | 'USD'
): Promise<number> => {
  // If currencies are the same, no conversion needed
  if (fromCurrency === toCurrency) {
    return amount;
  }
  
  const rate = await fetchExchangeRate();
  
  // Convert SYP to USD
  if (fromCurrency === 'SYP' && toCurrency === 'USD') {
    return amount / rate;
  }
  
  // Convert USD to SYP
  if (fromCurrency === 'USD' && toCurrency === 'SYP') {
    return amount * rate;
  }
  
  // This shouldn't happen given the type constraints
  return amount;
};

/**
 * React hook for currency conversion
 */
export const useCurrencyConverter = () => {
  const [exchangeRate, setExchangeRate] = useState<number>(FALLBACK_EXCHANGE_RATE);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const loadExchangeRate = async () => {
      setIsLoading(true);
      try {
        const rate = await fetchExchangeRate();
        setExchangeRate(rate);
      } catch (error) {
        console.error('Error in useCurrencyConverter:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadExchangeRate();
  }, []);
  
  const convert = (amount: number, fromCurrency: 'SYP' | 'USD', toCurrency: 'SYP' | 'USD'): number => {
    if (fromCurrency === toCurrency) return amount;
    
    if (fromCurrency === 'SYP' && toCurrency === 'USD') {
      return amount / exchangeRate;
    } else {
      return amount * exchangeRate;
    }
  };
  
  return {
    convert,
    exchangeRate,
    isLoading,
    formatCurrency: (amount: number, currency: 'SYP' | 'USD', language?: 'en' | 'ar'): string => {
      // Use the new formatLargeNumber utility
      return formatLargeNumber(amount, language, currency);
    }
  };
};
