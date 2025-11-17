
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { name, email, subject, message } = body
    
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Here you would typically:
    // 1. Save to Supabase database
    // 2. Send notification email to admin
    // 3. Send confirmation email to user
    
    // Example Supabase integration (uncomment when ready):
    /*
    const { createServerSupabaseClient } = await import('@/lib/supabase/server')
    const supabase = await createServerSupabaseClient()
    
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([{
        name,
        email,
        phone: body.phone || null,
        subject,
        message,
        status: 'unread',
        created_at: new Date().toISOString()
      }])
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to submit message' },
        { status: 500 }
      )
    }
    */

    // For now, just return success
    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      data: {
        name,
        email,
        subject,
        submittedAt: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET method to retrieve messages (admin only)
export async function GET(request: NextRequest) {
  try {
    // Here you would typically:
    // 1. Check admin authentication
    // 2. Fetch from Supabase
    
    // Example response
    return NextResponse.json({
      success: true,
      messages: []
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
