import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

const createResponse = (message, status) => {
  return NextResponse.json({ error: message }, { status });
};

export async function POST(request) {
  let apiKey;
  
  try {
    ({ apiKey } = await request.json());
  } catch {
    return createResponse('Invalid request format', 400);
  }

  if (!apiKey?.trim()) {
    return createResponse('API key is required', 400);
  }

  try {
    const { data, error } = await supabase
      .from('api_keys')
      .select('id') // Only select what we need
      .eq('value', apiKey)
      .single();

    // Handle known error cases
    if (error?.code === 'PGRST116' || !data) {
      return createResponse('Invalid API key', 401);
    }

    if (error) {
      console.error('Supabase error:', error);
      return createResponse('Error validating API key', 500);
    }

    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error('Database operation error:', error);
    return createResponse('Database error', 500);
  }
} 