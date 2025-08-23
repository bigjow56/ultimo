# Overview

This is a full-stack TypeScript application built with React and Express that creates a gym member satisfaction survey system. The application allows gym members to submit feedback about their experience, with responses stored in both PostgreSQL (via Neon Database) and Google Sheets for backup. It features a modern, responsive UI using shadcn/ui components with a custom design system, form validation with Zod schemas, and serverless deployment capabilities via Netlify Functions.

## Recent Changes (August 21, 2025)
- ✅ **PROJECT STRUCTURE REORGANIZED** (4:00 PM): Clear separation between frontend and backend
- ✅ **DIGITAL OCEAN APP.YAML ADDED**: Complete configuration with service account credentials
- ✅ **FRONTEND**: `client/` folder clearly identified with React + Tailwind CSS
- ✅ **BACKEND**: `server/` folder clearly identified with Express + API routes
- ✅ **SHARED**: `shared/` folder with common types and validation schemas
- ✅ **MIGRATION TO DIGITAL OCEAN** (11:55 AM): Successfully migrated from Netlify to standard Express backend
- ✅ **GOOGLE SHEETS FULLY WORKING** (12:02 PM): Fixed all authentication issues using user's JSON credentials
- ✅ **DUAL STORAGE SYSTEM ACTIVE**: Google Sheets (primary) + PostgreSQL (backup) both working 100%
- ✅ Form validation, data submission, and error handling working perfectly
- ✅ Node.js 20.x compatibility confirmed for Digital Ocean App Platform
- ✅ Complete deployment documentation created (README_DEPLOY.md, ESTRUTURA_PROJETO.md)

# User Preferences

Preferred communication style: Simple, everyday language.
✅ **DIGITAL OCEAN DEPLOYMENT**: Migrated from Netlify to Digital Ocean hosting
✅ **GOOGLE SHEETS AS PRIMARY**: User confirmed "sheets é o principal" - dual storage system implemented
✅ Sistema 100% funcional: formulário enviando dados para Google Sheets + PostgreSQL
✅ Node.js 20.x configured for Digital Ocean App Platform compatibility
✅ Standard Express server architecture ready for production deployment
✅ **Google Sheets integration WORKING**: Using user's JSON credentials, saving data successfully

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool for fast development and optimized production builds
- **UI Components**: shadcn/ui component library built on Radix UI primitives, providing accessible and customizable components
- **Styling**: Tailwind CSS with a custom design system featuring CSS variables for theming and consistent spacing/colors
- **Form Management**: React Hook Form with Zod resolver for type-safe form validation and error handling
- **State Management**: TanStack Query (React Query) for server state management, caching, and API interactions
- **Routing**: Wouter for lightweight client-side routing with minimal bundle impact
- **Directory Structure**: Organized with `client/src` containing all frontend code, with clear separation of components, pages, hooks, and utilities

## Backend Architecture
- **Runtime**: Node.js with Express.js framework for HTTP server functionality
- **Language**: TypeScript with ES modules for modern JavaScript features and type safety
- **API Design**: RESTful API endpoints with centralized route registration and error handling middleware
- **Development Setup**: Vite integration for hot module replacement during development, with separate production build process
- **Deployment**: Supports both traditional server deployment and serverless functions via Netlify

## Data Storage Solutions
- **Primary Database**: PostgreSQL hosted on Neon Database serverless platform for scalable, managed database operations
- **ORM**: Drizzle ORM with TypeScript integration for type-safe database queries and schema management
- **Schema Management**: Drizzle Kit for database migrations and schema evolution with version control
- **Backup Storage**: Google Sheets integration as secondary storage layer for survey responses
- **Fallback**: In-memory storage implementation for development and testing environments

## Authentication & Data Validation
- **Schema Validation**: Zod schemas for runtime type checking and form validation across client and server
- **Shared Types**: Common TypeScript types and schemas in `shared/` directory for consistency between frontend and backend
- **Data Integrity**: Form validation on both client and server sides with comprehensive error handling

# External Dependencies

## Database & Storage Services
- **Neon Database**: Serverless PostgreSQL provider for primary data storage with automatic scaling
- **Google Sheets API**: Secondary storage system for survey responses with service account authentication
- **Drizzle ORM**: Type-safe database toolkit for PostgreSQL with migration support

## UI & Component Libraries
- **Radix UI**: Headless, accessible component primitives for building the design system
- **Tailwind CSS**: Utility-first CSS framework with custom configuration for consistent styling
- **shadcn/ui**: Pre-built component library combining Radix UI with Tailwind CSS styling
- **Lucide React**: Icon library providing consistent iconography throughout the application

## Development & Build Tools
- **Vite**: Fast build tool and development server with React plugin support
- **TypeScript**: Static type checking across the entire application stack
- **React Hook Form**: Form library for managing form state and validation
- **TanStack Query**: Data fetching and caching library for API interactions

## Deployment & Hosting
- **Digital Ocean**: Standard Express server deployment for App Platform or Droplets
- **Node.js 20.x**: LTS version for optimal performance and compatibility
- **Replit Integration**: Development environment plugins for enhanced coding experience
- **ESBuild**: Fast JavaScript bundler for production builds

## Validation & Utilities
- **Zod**: TypeScript schema validation library for runtime type checking
- **Class Variance Authority**: Utility for creating type-safe CSS class variants
- **clsx & tailwind-merge**: Utilities for conditional CSS class composition