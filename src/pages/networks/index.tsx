import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

import { db } from "../../services/firebaseConnection";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export function Networks() {
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  // const [portfolio, setPortfolio] = useState("")

  useEffect(() => {
    async function loadLinks() {
      try {
        const docRef = doc(db, "social", "link");
        const snapshot = await getDoc(docRef);

        if (snapshot.data()) {
          setGithub(snapshot.data()?.github);
          setLinkedin(snapshot.data()?.linkedin);
        }
      } catch (error) {
        console.log(error);
      }
    }

    loadLinks();
  }, []);

  async function handleRegister(e: FormEvent) {
    e.preventDefault();

    try {
      await setDoc(doc(db, "social", "link"), {
        github: github,
        linkedin: linkedin,
      });
      toast.success("Links alterados com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("Parece que algo deu errado. Tente novamente.");
    }
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <h1 className="text-white text-2xl font-medium mt-8 mb-4">
        Minhas Redes Sociais
      </h1>

      <form onSubmit={handleRegister} className="flex flex-col max-w-xl w-full">
        <label className="text-white font-medium mt-2 mb-2">
          Link do GitHub
        </label>
        <Input
          type="url"
          placeholder="Digite a URL do GitHub"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
        />
        <label className="text-white font-medium mt-2 mb-2">
          Link do LinkedIn
        </label>
        <Input
          type="url"
          placeholder="Digite a URL do LinkedIn"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />

        <button
          type="submit"
          className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 cursor-pointer font-medium"
        >
          Salvar Links
        </button>
      </form>
    </div>
  );
}
