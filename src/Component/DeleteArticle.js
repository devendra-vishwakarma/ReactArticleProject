import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react'
import { db, storage } from '../firebaseConfig';
import { toast } from 'react-toastify';
import { deleteObject, ref } from 'firebase/storage';

function DeleteArticle({ article }) {
    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, "Articles", article.id));
            toast("article delete");

            const storageRef = ref(storage, article.imageUrl)
            await deleteObject(storageRef);
        } catch (error) {
              console.log(error,'error');
        }
    }
    return <>

        <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
    </>
}

export default DeleteArticle;