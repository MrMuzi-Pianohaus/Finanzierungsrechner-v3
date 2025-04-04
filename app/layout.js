export const metadata = {
  title: "Pianohaus Trübger – Finanzierungsrechner",
  description: "Flexible Finanzierung mit Nachlasskontrolle",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body style={{ margin: 0, fontFamily: 'sans-serif', padding: '2rem' }}>
        <header style={{ marginBottom: '2rem' }}>
          <img src="/logo.png" alt="Logo" style={{ height: '40px' }} />
        </header>
        {children}
      </body>
    </html>
  );
}
