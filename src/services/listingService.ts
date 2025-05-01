
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  QueryConstraint,
  deleteDoc
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { supabase } from '@/integrations/supabase/client';

export interface Listing {
  id?: string;
  title: string;
  description: string;
  price: string;
  currency?: string;
  location: string;
  category: string;
  images: string[];
  userId: string;
  userName: string;
  userPhone?: string;
  createdAt?: any;
  active: boolean;
  views: number;
  condition?: string; // new, used
  urgent?: boolean;
  language?: string; // Add language field to track listing language
}

export const addListing = async (listing: Omit<Listing, 'id' | 'createdAt' | 'active' | 'views'>, imageFiles: File[]): Promise<string> => {
  try {
    // Upload images first
    const imageUrls: string[] = [];
    
    for (const file of imageFiles) {
      const storageRef = ref(storage, `listings/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      imageUrls.push(downloadUrl);
    }
    
    // Create listing document
    const listingData = {
      ...listing,
      images: imageUrls,
      createdAt: serverTimestamp(),
      active: true,
      views: 0,
      currency: listing.currency || 'SYP',
      language: localStorage.getItem('language') || 'ar' // Store current language with listing
    };
    
    // Try to save user's phone number from profile if available
    try {
      if (listing.userId && listing.userId !== 'guest') {
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('phone')
          .eq('id', listing.userId)
          .single();
          
        if (error) {
          console.log('Error fetching user profile:', error);
        } else if (profileData?.phone) {
          listingData.userPhone = profileData.phone;
        }
      }
    } catch (profileError) {
      console.log('Could not fetch user phone from profile:', profileError);
      // Continue without the phone number
    }
    
    const docRef = await addDoc(collection(db, 'listings'), listingData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding listing:', error);
    throw error;
  }
};

export const getUserListings = async (userId: string): Promise<Listing[]> => {
  try {
    const q = query(
      collection(db, 'listings'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Listing));
  } catch (error) {
    console.error('Error getting user listings:', error);
    throw error;
  }
};

export const getFeaturedListings = async (count = 8): Promise<Listing[]> => {
  try {
    const q = query(
      collection(db, 'listings'),
      where('active', '==', true),
      orderBy('createdAt', 'desc'),
      limit(count)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Listing));
  } catch (error) {
    console.error('Error getting featured listings:', error);
    throw error;
  }
};

export const getListingsByCategory = async (category: string, count = 12): Promise<Listing[]> => {
  try {
    const q = query(
      collection(db, 'listings'),
      where('active', '==', true),
      where('category', '==', category),
      orderBy('createdAt', 'desc'),
      limit(count)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Listing));
  } catch (error) {
    console.error('Error getting listings by category:', error);
    throw error;
  }
};

export const getListing = async (id: string): Promise<Listing | null> => {
  try {
    const docRef = doc(db, 'listings', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      // Update view count
      await updateDoc(docRef, {
        views: (docSnap.data().views || 0) + 1
      });
      
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Listing;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting listing:', error);
    throw error;
  }
};

export const searchListings = async (params: {
  query?: string,
  category?: string,
  location?: string,
  priceMin?: number,
  priceMax?: number,
  condition?: string[],
  sortBy?: string,
  urgent?: boolean,
  currency?: string
}): Promise<Listing[]> => {
  try {
    const constraints: QueryConstraint[] = [
      where('active', '==', true)
    ];
    
    if (params.category && params.category !== 'all') {
      constraints.push(where('category', '==', params.category));
    }
    
    if (params.location && params.location !== 'all') {
      constraints.push(where('location', '==', params.location));
    }
    
    if (params.urgent === true) {
      constraints.push(where('urgent', '==', true));
    }
    
    if (params.condition && params.condition.length > 0) {
      constraints.push(where('condition', 'in', params.condition));
    }
    
    // Default sort order
    let sortField = 'createdAt';
    let sortDirection: 'asc' | 'desc' = 'desc';
    
    if (params.sortBy) {
      switch (params.sortBy) {
        case 'price_asc':
          sortField = 'price';
          sortDirection = 'asc';
          break;
        case 'price_desc':
          sortField = 'price';
          sortDirection = 'desc';
          break;
        case 'views':
          sortField = 'views';
          sortDirection = 'desc';
          break;
        default:
          // Keep default
          break;
      }
    }
    
    constraints.push(orderBy(sortField, sortDirection));
    
    const q = query(collection(db, 'listings'), ...constraints);
    const querySnapshot = await getDocs(q);
    
    let results = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Listing));
    
    // Client-side filtering for text search and price range
    if (params.query) {
      const searchQuery = params.query.toLowerCase();
      results = results.filter(listing => 
        listing.title.toLowerCase().includes(searchQuery) ||
        listing.description.toLowerCase().includes(searchQuery)
      );
    }
    
    if (params.priceMin !== undefined || params.priceMax !== undefined) {
      results = results.filter(listing => {
        const price = parseFloat(listing.price);
        
        if (params.priceMin !== undefined && params.priceMax !== undefined) {
          return price >= params.priceMin && price <= params.priceMax;
        } else if (params.priceMin !== undefined) {
          return price >= params.priceMin;
        } else if (params.priceMax !== undefined) {
          return price <= params.priceMax;
        }
        
        return true;
      });
    }
    
    // Filter by currency if specified
    if (params.currency) {
      results = results.filter(listing => listing.currency === params.currency);
    }
    
    // Get current language
    const currentLanguage = localStorage.getItem('language') || 'ar';
    
    // Sort results to show listings in current language first
    results.sort((a, b) => {
      // If both have same language or no language specified, maintain previous sort order
      if ((!a.language && !b.language) || (a.language === b.language)) {
        return 0;
      }
      
      // Push listings in current language to the top
      if (a.language === currentLanguage) return -1;
      if (b.language === currentLanguage) return 1;
      
      return 0;
    });
    
    return results;
  } catch (error) {
    console.error('Error searching listings:', error);
    throw error;
  }
};

export const updateListing = async (id: string, data: Partial<Listing>): Promise<void> => {
  try {
    const listingRef = doc(db, 'listings', id);
    await updateDoc(listingRef, data);
  } catch (error) {
    console.error('Error updating listing:', error);
    throw error;
  }
};

export const toggleListingStatus = async (id: string, active: boolean): Promise<void> => {
  try {
    const listingRef = doc(db, 'listings', id);
    await updateDoc(listingRef, { active });
  } catch (error) {
    console.error('Error toggling listing status:', error);
    throw error;
  }
};

export const deleteListing = async (id: string): Promise<void> => {
  try {
    const listingRef = doc(db, 'listings', id);
    await deleteDoc(listingRef);
  } catch (error) {
    console.error('Error deleting listing:', error);
    throw error;
  }
};
