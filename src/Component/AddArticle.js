import { Timestamp, collection, addDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { db, storage } from '../firebaseConfig';
import { toast } from 'react-toastify';

function AddArticle() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        createdAt: new Date()
    });
    const [progress, setProgress] = useState(0);

    const handlePublish = async () => {
        if (!formData.title || !formData.description || !formData.image) {
            alert("Please fill all the fields");
            return;
        }

        const storageRef = ref(storage, `/image/${Date.now()}${formData.image.name}`);
        const uploadImage = uploadBytesResumable(storageRef, formData.image);

        uploadImage.on("state_changed", (snapshot) => {
            const progressPercent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(progressPercent);
        }, (err) => {
            console.log(err);
        }, async () => {
            setFormData({
                title: "",
                description: "",
                image: ""
            });

            try {
                const downloadURL = await getDownloadURL(uploadImage.snapshot.ref);
                const articleRef = collection(db, "Articles");
                await addDoc(articleRef, {
                    title: formData.title,
                    description: formData.description,
                    imageUrl: downloadURL,
                    createdAt: Timestamp.now().toDate()
                });
                toast.success("Article added successfully");
            } catch (error) {
                toast.error("Error adding article: " + error.message);
            } finally {
                setProgress(0);
            }
        });
    };

    return (
        <div className='border p-3 mt-3 bg-light' style={{ position: "fixed" }}>
            <h2>Create article</h2>
            <label htmlFor=''>Title</label>
            <input type='text' name='title' className='form-control' value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />

            <label htmlFor=''>Description</label>
            <input type='text' name='description' className='form-control' value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />

            <label htmlFor=''>Image</label>
            <input type='file' name='image' className='form-control' accept='image/*' onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} />

            {progress === 0 ? null : (
                <div className='progress'>
                    <div className='progress-bar progress-bar-striped mt-2' style={{ width: `${progress}%` }}>{`Uploading image ${progress}%`}</div>
                </div>
            )}
            <button className='form-control button-primary mt-5' onClick={handlePublish}>Publish</button>
        </div>
    );
}

export default AddArticle;
