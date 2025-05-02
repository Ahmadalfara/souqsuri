
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/types/supabase';

export type Message = Database['public']['Tables']['messages']['Row'];

interface MessageWithProfile {
  message: Message;
  senderProfile: {
    name: string | null;
    profilePicture: string | null;
  };
  recipientProfile: {
    name: string | null;
    profilePicture: string | null;
  };
}

export const sendMessage = async (
  senderId: string, 
  recipientId: string, 
  content: string,
  listingId?: string
): Promise<Message | null> => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        sender_id: senderId,
        recipient_id: recipientId,
        content,
        listing_id: listingId || null
      })
      .select()
      .single();
      
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error sending message:', error);
    return null;
  }
};

export const getUserConversations = async (userId: string): Promise<any[]> => {
  try {
    // Get all messages where the user is either sender or recipient
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender:sender_id(id, username, full_name, profile_picture, avatar_url),
        recipient:recipient_id(id, username, full_name, profile_picture, avatar_url),
        listing:listing_id(id, title)
      `)
      .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
      .order('created_at', { ascending: false });
      
    if (error) {
      throw error;
    }
    
    // Group messages by conversation (unique user pair + listing)
    const conversations: Record<string, any> = {};
    
    data?.forEach(message => {
      const otherUserId = message.sender_id === userId ? message.recipient_id : message.sender_id;
      const listingId = message.listing_id || 'direct';
      const conversationId = `${otherUserId}_${listingId}`;
      
      if (!conversations[conversationId]) {
        const otherUser = message.sender_id === userId ? message.recipient : message.sender;
        
        conversations[conversationId] = {
          id: conversationId,
          otherUserId,
          otherUserName: otherUser.full_name || otherUser.username || 'User',
          otherUserPicture: otherUser.profile_picture || otherUser.avatar_url,
          listingId: message.listing_id,
          listing: message.listing,
          lastMessage: message.content,
          lastMessageDate: message.created_at,
          unreadCount: message.recipient_id === userId && !message.read ? 1 : 0
        };
      } else if (message.recipient_id === userId && !message.read) {
        conversations[conversationId].unreadCount += 1;
      }
    });
    
    return Object.values(conversations);
  } catch (error) {
    console.error('Error getting user conversations:', error);
    return [];
  }
};

export const getConversationMessages = async (
  userId: string,
  otherUserId: string,
  listingId?: string
): Promise<MessageWithProfile[]> => {
  try {
    let query = supabase
      .from('messages')
      .select(`
        *,
        sender:sender_id(id, username, full_name, profile_picture, avatar_url),
        recipient:recipient_id(id, username, full_name, profile_picture, avatar_url)
      `)
      .or(`and(sender_id.eq.${userId},recipient_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},recipient_id.eq.${userId})`)
      .order('created_at', { ascending: true });
    
    // Filter by listing if provided
    if (listingId) {
      query = query.eq('listing_id', listingId);
    } else {
      query = query.is('listing_id', null);
    }
    
    const { data, error } = await query;
    
    if (error) {
      throw error;
    }
    
    // Mark messages as read
    const unreadMessageIds = data
      ?.filter(msg => msg.recipient_id === userId && !msg.read)
      .map(msg => msg.id) || [];
      
    if (unreadMessageIds.length > 0) {
      await supabase
        .from('messages')
        .update({ read: true })
        .in('id', unreadMessageIds);
    }
    
    // Format messages
    return data?.map(msg => ({
      message: msg as Message,
      senderProfile: {
        name: msg.sender.full_name || msg.sender.username,
        profilePicture: msg.sender.profile_picture || msg.sender.avatar_url
      },
      recipientProfile: {
        name: msg.recipient.full_name || msg.recipient.username,
        profilePicture: msg.recipient.profile_picture || msg.recipient.avatar_url
      }
    })) || [];
  } catch (error) {
    console.error('Error getting conversation messages:', error);
    return [];
  }
};

export const getUnreadMessageCount = async (userId: string): Promise<number> => {
  try {
    const { count, error } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('recipient_id', userId)
      .eq('read', false);
      
    if (error) {
      throw error;
    }
    
    return count || 0;
  } catch (error) {
    console.error('Error getting unread message count:', error);
    return 0;
  }
};

export const subscribeToMessages = (userId: string, callback: (message: any) => void) => {
  return supabase
    .channel('public:messages')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `recipient_id=eq.${userId}`
      },
      payload => {
        callback(payload.new);
      }
    )
    .subscribe();
};
