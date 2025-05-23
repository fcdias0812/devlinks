import { useState, useEffect } from "react";
import { Social } from "../../components/Social";
import { FaLinkedin, FaGithub, FaBriefcase } from "react-icons/fa";
import { db } from "../../services/firebaseConnection";
import {
  getDocs,
  collection,
  orderBy,
  query,
  doc,
  getDoc,
} from "firebase/firestore";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface SocialLinksProps {
  github: string;
  linkedin: string;
  portfolio: string;
}

export function Home() {
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinksProps>();

  useEffect(() => {
    async function loadLinks() {
      try {
        const linksRef = collection(db, "links");
        const queryRef = query(linksRef, orderBy("created", "asc"));

        const snapshot = await getDocs(queryRef);
        let lista = [] as LinkProps[];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
            bg: doc.data().bg,
            color: doc.data().color,
          });
        });

        setLinks(lista);
      } catch (error) {
        console.log(error);
      }
    }

    loadLinks();
  }, []);

  useEffect(() => {
    async function loadSocialLinks() {
      try {
        const docRef = doc(db, "social", "link");
        const snapshot = await getDoc(docRef);

        if (snapshot.data()) {
          setSocialLinks({
            github: snapshot.data()?.github,
            linkedin: snapshot.data()?.linkedin,
            portfolio: snapshot.data()?.portfolio,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    loadSocialLinks();
  }, []);

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">
        Fabrício Dias
      </h1>
      <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {links.map((link) => (
          <section
            key={link.id}
            className=" mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer"
            style={{ backgroundColor: link.bg, color: link.color }}
          >
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              <p className="text-base font-medium md:text-lg">{link.name}</p>
            </a>
          </section>
        ))}

        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <footer className="flex justify-center gap-3 my-4">
            <Social url={socialLinks?.github}>
              <FaGithub size={35} color="#fff" />
            </Social>
            <Social url={socialLinks?.linkedin}>
              <FaLinkedin size={35} color="#fff" />
            </Social>
            <Social url={socialLinks?.portfolio}>
              <FaBriefcase size={35} color="#fff" />
            </Social>
          </footer>
        )}
      </main>
    </div>
  );
}
