import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';
import { summarizeReadme } from '@/app/lib/chain';

const createResponse = (message, status) => {
  return NextResponse.json({ error: message }, { status });
};

export async function POST(request) {
  // Get API key from header
  const apiKey = request.headers.get('x-api-key');
  if (!apiKey?.trim()) {
    return createResponse('API key is required', 400);
  }

  // Get GitHub URL from request body
  let githubUrl;
  try {
    ({ githubUrl } = await request.json());
  } catch {
    return createResponse('Invalid request format', 400);
  }

  if (!githubUrl?.trim()) {
    return createResponse('GitHub URL is required', 400);
  }

  // Validate GitHub URL format
  if (!githubUrl.match(/^https?:\/\/github\.com\/[\w-]+\/[\w-]+$/)) {
    return createResponse('Invalid GitHub URL format', 400);
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

    const readmeContent = await getReadmeContent(githubUrl);
    const summary = await summarizeReadme(readmeContent);
    
    return NextResponse.json({ 
      message: 'API key validated successfully',
      githubUrl,
      summary
    });
  } catch (error) {
    console.error('Database operation error:', error);
    return createResponse('Database error', 500);
  }
} 

async function getReadmeContent(githubUrl) {
  // Convert github.com URL to raw content URL
  const [owner, repo] = githubUrl.split('github.com/')[1].split('/');
  const readmeUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`;

  try {
    const response = await fetch(readmeUrl);
    
    if (!response.ok) {
      // Try master branch if main branch fails
      const masterReadmeUrl = `https://raw.githubusercontent.com/${owner}/${repo}/master/README.md`;
      const masterResponse = await fetch(masterReadmeUrl);
      
      if (!masterResponse.ok) {
        throw new Error('README not found in main or master branch');
      }
      
      return await masterResponse.text();
    }

    return await response.text();
  } catch (error) {
    console.error('Error fetching README:', error);
    throw new Error('Failed to fetch README content');
  }
}


