import React, { useState, useEffect, useContext } from "react";
import Character from "./Character";
import { CharactersContext } from "../context/charactersContext";
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  onSnapshot,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { AuthContext } from "../context/authContext";
//consume context
const Characters = () => {
  const { characters, loading, error, fetchMyDataAsync } =
    useContext(CharactersContext);
  const db = getFirestore();
  const { user, setUser } = useContext(AuthContext);
  useEffect(() => {
    fetchMyDataAsync();
  }, []);

  const saveFav = async (character) => {
    try {
      const favoriteRef = doc(db, "favorites", user.uid);
      const favoriteSnap = await getDoc(favoriteRef);

      if (favoriteSnap.exists()) {
        console.log("Update document");
        console.log(favoriteSnap.data());
        favoriteSnap.data().myFav.forEach(async (oneFav) => {
          if (oneFav.id === character.id) {
            alert("You already like it!");
          } else {
            await updateDoc(favoriteRef, {
              myFav: arrayUnion(character),
            });
          }
        });
      } else {
        // doc.data() will be undefined in this case
        console.log("Create new document");
        let newDocument = {
          myFav: [character],
        };
        await setDoc(doc(db, "favorites", user.uid), newDocument);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const removeFav = async (character) => {
    const favoriteRef = doc(db, "favorites", user.uid);
    const favoriteSnap = await getDoc(favoriteRef);

    if (favoriteSnap.exists()) {
      favoriteSnap.data().myFav.forEach(async (oneFav) => {
        if (oneFav.id === character.id) {
          console.log("remove character from array of favorites");
          await updateDoc(favoriteRef, {
            myFav: arrayRemove(character),
          });
        } else {
          console.log("you never liked this character");
        }
      });
    } else {
      console.log("Document does not exists");
    }
  };

  // const removeFromFav = async (character) => {
  //   const docRef = doc(db, "favorites", user.uid);
  //   const docSnap = await getDoc(docRef);
  //   console.log('docSnap', docSnap.exists());
  //   if (docSnap.exists()) {
  //     docSnap.data().myFav.forEach(async(fav) => {
  //       if (fav.id === character.id) {
  //         await updateDoc(docRef, {
  //           myFav: arrayRemove(fav),
  //         });

  //       }
  //     });
  //    } else {
  //     console.log("no user found");
  //   }
  // }
  return (
    <div>
      {!loading || !error ? (
        characters.map((character, index) => {
          return (
            <div key={character.id}>
              <Character character={character} />
              <button onClick={() => saveFav(character)}>Like</button>
              <button onClick={() => removeFav(character)}>Unlike</button>
            </div>
          );
        })
      ) : (
        <p>loading...</p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Characters;
