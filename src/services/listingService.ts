
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

export interface Listing {
  id?: string;
  title: string;
  description: string;
  price: string;
  location: string;
  category: string;
  images: string[];
  userId: string;
  userName: string;
  userPhone?: string;
  createdAt?: any;
  active: boolean;
  views: number;
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
      views: 0
    };
    
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
  location?: string
}): Promise<Listing[]> => {
  try {
    const constraints: QueryConstraint[] = [
      where('active', '==', true)
    ];
    
    if (params.category) {
      constraints.push(where('category', '==', params.category));
    }
    
    if (params.location) {
      constraints.push(where('location', '==', params.location));
    }
    
    constraints.push(orderBy('createdAt', 'desc'));
    
    const q = query(collection(db, 'listings'), ...constraints);
    const querySnapshot = await getDocs(q);
    
    let results = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Listing));
    
    // Client-side filtering for text search since Firestore doesn't support full text search
    if (params.query) {
      const searchQuery = params.query.toLowerCase();
      results = results.filter(listing => 
        listing.title.toLowerCase().includes(searchQuery) ||
        listing.description.toLowerCase().includes(searchQuery)
      );
    }
    
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
