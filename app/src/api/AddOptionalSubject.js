import { db } from "../config/firebase";
import { doc,getDocs,addDoc, collection,updateDoc,deleteDoc,getDoc } from "firebase/firestore";
/**
 * Add a subject to the database.
 * @param {Object} subjectData - An object containing subject data.
 * @param {string} subjectData.className - The class name to which the subject belongs.
 * @param {string} subjectData.subjectName - The name of the subject.
 * @param {string} subjectData.subjectCode - The unique identifier for the subject.
 */
export const addOptionalSubjectToDatabase = async (subjectData) => {
    const subjectsRef = collection(db, "AddOptionalSubjects");
    try {
        await addDoc(subjectsRef, {
            subjectName: subjectData.subjectName,
            subjectTotalMarks	: subjectData.subjectTotalMarks,
            subjectCode: subjectData.subjectCode,
        });
        console.log("Document successfully written!");
        return { status: true, message: "Document successfully added" };

    } catch (error) {
        console.log(error);
    }
};

export const getSubjectOptionalDatabase = async () => {
    const subjectsRef = collection(db, "AddOptionalSubjects");
    try {
        const querySnapshot = await getDocs(subjectsRef);

        const subjectData = [];
        
        querySnapshot.forEach((doc) => {
            // subjectData.push({
            //     id: doc.id,
            //     ...doc.data()
            // });
            const data = doc.data();
            const modifiedData = {
                "id": doc.id,                
                "Subject Code": data.subjectCode,
                "Subject Name": data.subjectName,
                "Subject Total Marks Reduced": data.subjectTotalMarks,
            };
            subjectData.push(modifiedData);

        });     

        return subjectData; // Return the subjectdata
    } catch (error) {
        console.error(error);
    }
};

export const updateSubjectOptionalDatabase = async (documentId, updatedSubjectData) => {
    const subjectsRef = collection(db, "AddOptionalSubjects");
    const subjectDocRef = doc(subjectsRef, documentId); // Use Id to reference the specific document

    try {
        await updateDoc(subjectDocRef, updatedSubjectData);
        console.log("Document successfully updated!");
        return { status: true, message: "Document successfully updated" };
    } catch (error) {
        console.error("Error updating document:", error);
        return { status: false, message: "Error updating document" };
    }
};


export const deleteSubjectOptional = async (subjectId) => {
    const subjectsRef = collection(db, "AddOptionalSubjects");
    const subjectDocRef = doc(subjectsRef, subjectId);

    try {
        await deleteDoc(subjectDocRef);
        console.log("Document successfully deleted!");
        return { status: true, message: "Document successfully deleted" };
    } catch (error) {
        console.error("Error deleting document:", error);
        return { status: false, message: "Error deleting document" };
    }
};

export const getSubjectOptionalFromDatabase = async (subjectAutoGeneratedId) => {
    try {
      const subjectDocRef = doc(db, "AddOptionalSubjects", subjectAutoGeneratedId);
      const subjectDocSnapshot = await getDoc(subjectDocRef);
  
      if (subjectDocSnapshot.exists()) {
        return subjectDocSnapshot.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching subject data", error);
      throw error;
    }
  };

  