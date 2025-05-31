import React from 'react'

function Cards({ Movie_card: { poster_path, title, release_date } }) {
    return (
        <>
            <div className="card g-4 px-2 py-2 " style={{ width: "18rem" }}>
                {poster_path ? (

                    <img src={`https://image.tmdb.org/t/p/w300${poster_path}`} className="card-img-top mt-3" alt={title} />

                ) : (
                    <div className="placeholder-img text-center text-muted ">
                        <div>
                            <i className="bi bi-image" style={{ fontSize: '2rem' }}></i>
                            <p className="mt-2 mb-0">Image Not Available</p>
                        </div>
                    </div>
                )}
                <div className="card-body">
                 <h5 className='fw-bolder'>
                    {title}
                 </h5>
                    <p className="card-text">
                        Releas Date: {release_date || "N/A"}
                    </p>
                </div>

            </div>
        </>
    )
}

export default Cards
