
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, language, previousMessages } = await req.json();
    
    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const systemContent = language === 'ar' 
      ? `أنت مساعد ذكي لمنصة "سوقنا" وهي منصة إعلانات مبوبة سورية. ساعد المستخدمين بالإجابة على استفساراتهم المتعلقة بكيفية استخدام المنصة، وكيفية نشر إعلانات، والبحث عن المنتجات، والتسجيل في الموقع، وغيرها من الاستفسارات. 
      كن ودودًا ومفيدًا وقدم معلومات دقيقة. تحدث باللغة العربية العادية.
      إذا سأل المستخدم عن أسعار أو تفاصيل منتجات محددة، أخبره بأن يستخدم خاصية البحث في الموقع للحصول على أحدث العروض.
      إذا سأل المستخدم عن أشياء خارج نطاق المنصة، أخبره بلطف أنك هنا للمساعدة فقط في أمور تتعلق بمنصة سوقنا.`
      : `You are an intelligent assistant for "Souqna", a Syrian classified ads platform. Help users by answering their questions about how to use the platform, how to post listings, search for products, register on the site, and other inquiries.
      Be friendly and helpful, and provide accurate information. Communicate in normal English.
      If a user asks about specific product prices or details, tell them to use the search feature on the site to find the latest offers.
      If a user asks about things outside the scope of the platform, politely tell them that you're here to help only with matters related to Souqna platform.`;

    // Convert previous messages to OpenAI format
    const formattedMessages = [
      { role: 'system', content: systemContent },
      ...previousMessages.map((msg: {role: string, content: string}) => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 500,
        stream: false
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to get response from AI');
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ reply }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in chat-assistant function:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
