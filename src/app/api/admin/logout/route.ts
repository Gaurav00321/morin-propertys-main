import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ success: true })
  
  // Clear the auth cookie by setting it to expire in the past
  response.cookies.set('admin_auth', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  })
  
  return response
}
