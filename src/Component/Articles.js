

import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebaseConfig';
import DeleteArticle from './DeleteArticle';

function Articles() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const articlesRef = collection(db, "Articles");
        const q = query(articlesRef, orderBy("createdAt", "desc"));

        onSnapshot(q, (snapshot) => {
            const articlesData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setArticles(articlesData);
            console.log(articlesData);
            console.log("hello");
        })
    }, []);

    return (
        <div>
            {articles.length === 0 ? (
                <p>No data available</p>
            ) : (
                articles.map((article) => (
                    <div key={article.id}  className='border mt-3 p-3 bg-warning'>
                        <div className='row mt-5 d-flex' style={{border:"1px solid black",marginBottom:"5rem"}}>
                            <div className='col-5 mb-4 mt-5'>
                                <img src={article.
                                    imageUrl} style={{ height: "15rem", width: "25rem" }} alt="Article" />
                            </div>
                            <div className='d-flex'>
                                <h1>{article.title}</h1>
                                <p>{article.
                                    description}</p>
                                <h1>{article.createdAt.toDate().toDateString()
                                }</h1>
                                <DeleteArticle article = {article}/>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Articles;
