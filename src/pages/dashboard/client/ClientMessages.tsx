import { useState, useEffect } from 'react';
import { User, Send } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderPhoto: string;
  recipientId: string;
  content: string;
  timestamp: string;
  read: boolean;
  senderRole: 'client' | 'vendor' | 'admin';
}

interface Conversation {
  userId: string;
  userName: string;
  userPhoto: string;
  userRole: 'vendor' | 'admin';
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
}

const ClientMessages = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Mock data fetch
  useEffect(() => {
    // Simulate API call
    const fetchData = () => {
      setLoading(true);
      setTimeout(() => {
        setConversations(mockConversations);
        setLoading(false);
        
        // Set first conversation as active by default
        if (mockConversations.length > 0 && !activeConversation) {
          setActiveConversation(mockConversations[0].userId);
        }
      }, 800);
    };

    fetchData();
  }, []);
  
  // Load messages when active conversation changes
  useEffect(() => {
    if (activeConversation) {
      // Simulate API call
      setLoading(true);
      setTimeout(() => {
        setMessages(mockMessages.filter(m => 
          m.senderId === activeConversation || m.recipientId === activeConversation
        ));
        setLoading(false);
        
        // Mark messages as read
        setConversations(prevConversations => 
          prevConversations.map(conv => 
            conv.userId === activeConversation 
              ? { ...conv, unread: 0 }
              : conv
          )
        );
      }, 400);
    }
  }, [activeConversation]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !activeConversation) return;
    
    // Create new message
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'client-123', // Current user
      senderName: 'You',
      senderPhoto: '',
      recipientId: activeConversation,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false,
      senderRole: 'client'
    };
    
    // Add to messages
    setMessages(prev => [...prev, newMsg]);
    
    // Update last message in conversation
    setConversations(prev => 
      prev.map(conv => 
        conv.userId === activeConversation 
          ? { 
              ...conv, 
              lastMessage: newMessage,
              lastMessageTime: new Date().toISOString()
            }
          : conv
      )
    );
    
    // Clear input
    setNewMessage('');
  };
  
  const selectConversation = (userId: string) => {
    setActiveConversation(userId);
  };

  // Format date
  const formatMessageDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    
    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  if (loading && conversations.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-heading mb-2">Messages</h1>
        <p className="text-gray-600">Communicate with your vendors and wedding planner</p>
      </div>
      
      <div className="card overflow-hidden h-[calc(100vh-240px)]">
        <div className="flex h-full">
          {/* Conversation List */}
          <div className="w-full sm:w-1/3 md:w-1/4 border-r border-gray-200 bg-white overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-medium">Conversations</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {conversations.map(conversation => (
                <div 
                  key={conversation.userId}
                  onClick={() => selectConversation(conversation.userId)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    activeConversation === conversation.userId ? 'bg-primary-50' : ''
                  }`}
                >
                  <div className="flex items-start">
                    {conversation.userPhoto ? (
                      <img 
                        src={conversation.userPhoto} 
                        alt={conversation.userName} 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-500" />
                      </div>
                    )}
                    
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium truncate">{conversation.userName}</p>
                        <span className="text-xs text-gray-500">
                          {formatMessageDate(conversation.lastMessageTime)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-sm text-gray-600 truncate">
                          {conversation.lastMessage}
                        </p>
                        {conversation.unread > 0 && (
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary-500 text-xs font-medium text-white">
                            {conversation.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {conversations.length === 0 && (
                <div className="p-6 text-center text-gray-500">
                  No conversations yet
                </div>
              )}
            </div>
          </div>
          
          {/* Message Area */}
          {activeConversation ? (
            <div className="hidden sm:flex sm:w-2/3 md:w-3/4 flex-col bg-gray-50">
              {/* Conversation Header */}
              {activeConversation && (
                <div className="p-4 border-b border-gray-200 bg-white flex items-center">
                  <div className="flex items-center">
                    {conversations.find(c => c.userId === activeConversation)?.userPhoto ? (
                      <img 
                        src={conversations.find(c => c.userId === activeConversation)?.userPhoto} 
                        alt={conversations.find(c => c.userId === activeConversation)?.userName} 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-500" />
                      </div>
                    )}
                    
                    <div className="ml-3">
                      <p className="font-medium">
                        {conversations.find(c => c.userId === activeConversation)?.userName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {conversations.find(c => c.userId === activeConversation)?.userRole.charAt(0).toUpperCase() + 
                          conversations.find(c => c.userId === activeConversation)?.userRole.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.senderId === 'client-123' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-xs md:max-w-sm lg:max-w-md rounded-lg px-4 py-2 ${
                        message.senderId === 'client-123'
                          ? 'bg-primary-500 text-gray-900 rounded-tr-none'
                          : 'bg-white text-gray-800 rounded-tl-none'
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className={`text-xs mt-1 text-right ${
                        message.senderId === 'client-123' ? 'text-gray-800' : 'text-gray-500'
                      }`}>
                        {formatMessageDate(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
                
                {messages.length === 0 && (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    <p>No messages yet</p>
                  </div>
                )}
              </div>
              
              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
                <div className="flex">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="input rounded-r-none"
                    placeholder="Type your message..."
                  />
                  <button
                    type="submit"
                    className="bg-primary-500 text-gray-900 px-4 rounded-r-md hover:bg-primary-600 transition-colors"
                    disabled={!newMessage.trim()}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="hidden sm:flex sm:w-2/3 md:w-3/4 items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="mt-4 text-lg font-medium">Select a conversation</h3>
                <p className="mt-1 text-gray-500">Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Mock data
const mockConversations: Conversation[] = [
  {
    userId: 'vendor-1',
    userName: 'Jessica (Wedding Planner)',
    userPhoto: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    userRole: 'vendor',
    lastMessage: "Hi there! I've added some new floral options to your decoration choices. Would you like to review them?",
    lastMessageTime: "2025-04-05T14:30:00Z",
    unread: 1
  },
  {
    userId: 'vendor-2',
    userName: 'Michael (Catering Manager)',
    userPhoto: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
    userRole: 'vendor',
    lastMessage: "Your menu tasting has been scheduled for next Friday at 2pm. Looking forward to seeing you!",
    lastMessageTime: "2025-04-03T09:15:00Z",
    unread: 1
  }
];

const mockMessages: Message[] = [
  {
    id: 'msg-1',
    senderId: 'vendor-1',
    senderName: 'Jessica',
    senderPhoto: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    recipientId: 'client-123',
    content: "Hello! I'm Jessica, your assigned wedding planner. I'm excited to help you create your perfect day!",
    timestamp: "2025-04-01T10:00:00Z",
    read: true,
    senderRole: 'vendor'
  },
  {
    id: 'msg-2',
    senderId: 'client-123',
    senderName: 'You',
    senderPhoto: '',
    recipientId: 'vendor-1',
    content: "Hi Jessica! Thanks for reaching out. We're so excited to start planning.",
    timestamp: "2025-04-01T10:15:00Z",
    read: true,
    senderRole: 'client'
  },
  {
    id: 'msg-3',
    senderId: 'vendor-1',
    senderName: 'Jessica',
    senderPhoto: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    recipientId: 'client-123',
    content: "Great! I've looked at your booking info. Let's discuss your vision for the day. What kind of wedding theme are you thinking about?",
    timestamp: "2025-04-01T10:30:00Z",
    read: true,
    senderRole: 'vendor'
  },
  {
    id: 'msg-4',
    senderId: 'client-123',
    senderName: 'You',
    senderPhoto: '',
    recipientId: 'vendor-1',
    content: "We're thinking of a romantic garden theme with lots of flowers and soft colors. Blush pink and white are our main colors.",
    timestamp: "2025-04-01T10:45:00Z",
    read: true,
    senderRole: 'client'
  },
  {
    id: 'msg-5',
    senderId: 'vendor-1',
    senderName: 'Jessica',
    senderPhoto: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    recipientId: 'client-123',
    content: "Hi there! I've added some new floral options to your decoration choices. Would you like to review them?",
    timestamp: "2025-04-05T14:30:00Z",
    read: false,
    senderRole: 'vendor'
  }
];

export default ClientMessages;