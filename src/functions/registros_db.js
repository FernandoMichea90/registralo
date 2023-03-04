
import { DB } from '../auth/FirebaseContext'
import { collection, addDoc, doc, getDoc, query, where, getDocs } from "firebase/firestore";


// obtener tipo de habitaciones 

export const obtenerTipoHabitaciones = async () => {
  try {
    const q = query(collection(DB, "Tipo_habitacion"));
    const querySnapshot = await getDocs(q);
    const response = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      response.push({ id: doc.id, ...doc.data() })
    });

    return response;
  } catch (error) {
    console.log(error)
  }

}

// obtener habitaciones
export const obtenerHabitaciones = async () => {
  try {
    const q = query(collection(DB, "Habitacion"));
    const querySnapshot = await getDocs(q);
    const response = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      response.push({ id: doc.id, ...doc.data() })
    });
    return response;
  } catch (error) {
    console.log(error)
  }
}
// obtener procedencia 
export const obtenerProcedencia = async () => {
  try {
    const q = query(collection(DB, "Procedencia"));
    const querySnapshot = await getDocs(q);
    const response = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      response.push({ id: doc.id, ...doc.data() })
    });
    return response;
  } catch (error) {
    console.log(error)
  }
}

export const CrearRegistros = async (evento) => {
  try {
    const docRef = await addDoc(collection(DB, "Registros"), evento);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const ObtenerRegistroName = async () => {
  try {

    const docRef = doc(DB, "Registros");
    const docSnap = await getDoc(docRef);
    const response = [];
    if (docSnap.exists()) {
      console.log('Document data: ', docSnap.data());
    } else {
      console.log('No such document!')
    }


  } catch (error) {
    console.log(error);
  }
}

export const ObtenerRegistros = async () => {
  try {
    const q = query(collection(DB, "Registros"));
    const querySnapshot = await getDocs(q);
    const response = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      response.push({ id: doc.id, ...doc.data() })
    });

    return response;
  } catch (error) {
    console.log(error);
    return []
  }
}
// agregar Pasajeros a firestore y retornar el id del pasajero
export const CrearPasajero = async (pasajero) => {
  try {
    const docRef = await addDoc(collection(DB, "Pasajeros"), pasajero);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
// agregar reservacion a firestore y retornar el id de la reservacion
export const CrearReservaFs = async (reservacion) => {
  try {
    const docRef = await addDoc(collection(DB, "Reserva"), reservacion);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}