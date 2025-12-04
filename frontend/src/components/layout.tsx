export const layoutJs = `import React from 'react';
import { Link } from 'react-router-dom';


export default function Layout({ children }) {
return (
<div className="min-h-screen bg-gray-50">
<header className="bg-white shadow">
<div className="container mx-auto px-4 py-4 flex justify-between items-center">
<h1 className="text-xl font-semibold">Sistema de Recrutamento</h1>
<nav className="space-x-4">
<Link to="/" className="text-sm">Dashboard</Link>
<Link to="/candidatos" className="text-sm">Candidatos</Link>
<Link to="/entrevistadores" className="text-sm">Entrevistadores</Link>
<Link to="/entrevistas" className="text-sm">Entrevistas</Link>
</nav>
</div>
</header>


<main className="container mx-auto px-4 py-8">{children}</main>
</div>
);
}`;