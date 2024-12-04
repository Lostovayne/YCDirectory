# Startup Directory Platform

<img src="./public/resource.png"  />

#### A Next.js 15 platform where entrepreneurs can submit their startup ideas for virtual pitch competitions, browse other pitches, and gain exposure through a clean minimalistic design for a smooth user experience.

## 🚀 Features

- **GitHub Authentication**: Secure login system using NextAuth.js with GitHub provider
- **Pitch Submission**: Entrepreneurs can submit their startup ideas with rich markdown support
- **Browse Pitches**: Clean interface to explore and discover startup pitches
- **Search Functionality**: Find specific startups or filter by categories
- **User Profiles**: Dedicated space for entrepreneurs to showcase their ventures
- **Responsive Design**: Seamless experience across all devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router)
- **Authentication**: NextAuth.js v5 (Beta)
- **Styling**: Tailwind CSS with Typography plugin
- **CMS**: Sanity.io
- **UI Components**:
  - Radix UI for accessible components
  - Lucide React for icons
  - Class Variance Authority for component variants
- **Content**: Markdown support with markdown-it

## 🏗️ Project Structure

```
YCDirectory/
├── app/                  # Next.js app router pages
├── components/          # Reusable UI components
├── lib/                 # Utility functions and queries
├── public/             # Static assets
├── sanity/             # Sanity CMS configuration
└── studio-yc-directory/ # Sanity Studio
```

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone [repository-url]
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file based on `.example.env`:

   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=
   NEXT_PUBLIC_SANITY_DATASET=
   SANITY_WRITE_TOKEN=
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## 🔒 Authentication

The platform uses NextAuth.js for authentication with GitHub as the provider. Features include:

- Secure user sessions
- GitHub OAuth integration
- Custom user profiles stored in Sanity
- JWT token handling

## 📝 Content Management

Sanity.io is used as the headless CMS, providing:

- Structured content models for startups and authors
- Real-time content updates
- Rich text editing with markdown support
- Custom studio configuration

## 🎨 UI/UX Features

- Clean, minimalistic design
- Responsive layouts
- Accessible components using Radix UI
- Custom component variants with CVA
- Typography optimized for readability

## 🛠️ Development Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run typegen`: Generate Sanity schema types

## 📦 Dependencies

### Core

- Next.js 15
- React (Canary)
- NextAuth.js v5 Beta
- Sanity v3

### UI/Styling

- Tailwind CSS
- Radix UI components
- Lucide React icons
- Class Variance Authority

### Content

- Markdown-it
- Sanity Markdown Plugin

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
