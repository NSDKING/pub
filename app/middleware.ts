// src/middleware.ts

import { NextResponse } from 'next/server';
import { getCurrentUser } from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import awsconfig from '../src/aws-exports';
import { getAnnonceurs } from '../src/graphql/queries';

Amplify.configure(awsconfig);
const client = generateClient();

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Define protected routes
  const protectedRoutes = ['/', '/advertiser'];

  // Skip non-protected routes
  if (pathname.startsWith('/_next/') || pathname.startsWith('/public')) {
    return NextResponse.next();
  }

  // Check if the current route is protected
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    try {
      // Fetch current user
      const { userId } = await getCurrentUser();

      // Execute GraphQL query to get user data
      const response = await client.graphql({
        query: getAnnonceurs,
        variables: { id: userId }
      });

      let admin = false;
      if (response.data?.getAnnonceurs) {
        admin = response.data.getAnnonceurs.admin;
      }

      // Check if user has admin role
      if (!admin) {
        return NextResponse.redirect(new URL('/403', req.url)); // Redirect to a forbidden page if not authorized
      }

      return NextResponse.next();
    } catch (error) {
      console.error('Middleware error:', error);
      return NextResponse.redirect(new URL('/login', req.url)); // Redirect to login page if not authenticated
    }
  }

  return NextResponse.next();
}
