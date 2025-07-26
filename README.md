Live URL: [safeguard-st.vercel.app](https://safeguard-st.vercel.app)

# Tech Decisions 
This project is built using the following technologies:
- **Next.js**: Used for server-side rendering and building the application.
- **Prisma**: Used as the ORM for database interactions.
- **PostgreSQL**: The database used for storing application data.
- **Tailwind CSS**: utility-first CSS framework for styling.
- **TypeScript**: Used for type safety and better developer experience.
- **Shadcn UI**: set of components for building UI.
- **Three.js**: Used for 3D graphics and animations.

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Shobhit141141/safeguard.git
```

2. Navigate to the project directory:

```bash
cd safeguard
```

3. Install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

4. Set up the environment variables by creating a `.env` file in the root directory and adding the necessary variables. You can refer to the `.env.example` file for the required variables.

5. Set up the database by running the Prisma migrations:

```bash
npm run db:setup
# or
yarn db:setup
# or
pnpm db:setup
# or
bun db:setup
```

6. Seed the database with initial data:

```bash
npm run seed
# or
yarn seed
# or
pnpm seed
# or
bun seed
```

7. run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser 

## If I had more time, I would have:
- Implemented more advanced features like user authentication and authorization.
- Added more comprehensive error handling and logging.
- Improved the UI/UX with more custom components and animations.
- Implemented unit tests for the application.
- Added more documentation and comments for better understanding of the codebase.
- Added more features like notifications, user profiles, and settings.
- Added more integrations with third-party services.
- Optimized the performance of the application.
- Implemented more advanced state management solutions.
- Improved the responsiveness of the application for different screen sizes.

