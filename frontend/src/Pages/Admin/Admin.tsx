export default function Admin() {
  return (
    <>
      <nav className="flex justify-between items-center p-4 bg-red-800 text-white ">
        <a href="#" className="hover:text-gray-300 align-left">
          Administration
        </a>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-300">
            Salles
          </a>
          <a href="#" className="hover:text-gray-300">
            Exercices
          </a>
          <a href="#" className="hover:text-gray-300">
            Badges
          </a>
          <a href="admin/Utilisateurs" className="hover:text-gray-300">
            Utilisateurs
          </a>
        </div>
      </nav>
      <section>
        <h2>Statistiques</h2>
        <table className="d-flex justify-content-center">
          <thead>
            <tr>
              <th>Salles</th>
              <th>Exercices</th>
              <th>Badges</th>
              <th>Utilisateurs</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10</td>
              <td>20</td>
              <td>30</td>
              <td>40</td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}
