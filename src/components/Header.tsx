function Header (props: { title: string }) {
  return (
    <header className="bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold">{props.title}</h1>
    </header>
  );
}

export default Header;
