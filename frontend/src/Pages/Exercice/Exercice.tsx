import type { Exercise } from "../../interfaces/Exercice.interface";
import { useEffect, useState } from "react";
export default function Exercice() {
  const [exercices, setExercices] = useState<Exercise[]>([]);
  useEffect(() => {
    fetch("http://localhost:3000/exercises")
      .then((res) => res.json())
      .then((data) => setExercices(data))
      .catch((err) =>
        console.log("Error while try to get All exercices " + err)
      );
  }, []);
  return (
    <>
      <h2>Exercice</h2>
      <div>
        <span>Liste des exercices</span>
        <button>Ajouter Exercice</button>
      </div>

      <h2>Utilisateurs</h2>

      <table>
        <tbody>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Muscle</th>
            <th>Difficulté</th>
            <th>Calories</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
          {exercices.map((exercise) => (
            <tr>
              <td>{exercise.name}</td>
              <td>{exercise.description}</td>
              <td>{exercise.muscle}</td>
              <td>{exercise.difficulty}</td>
              <td>{exercise.calories}</td>
              <td>{exercise.duration}</td>
              <td>
                <button>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
