import { useEffect, useState } from "react"
import { useSelector, shallowEqual } from "react-redux"
import { toAbsoluteUrl } from "../api"

const ReciepeDetail = () => {
    const params = new URLSearchParams(window.location.search);
    const reciepeName = params.get("name");
    const [reciepeData, setReciepeData] = useState({})
    const [loading, setLoading] = useState(true)
    const { reciepes } = useSelector(
        ({ reciepes }) => ({
            reciepes: reciepes
        }), shallowEqual
    )

    // finding the selected reciepe data within redux store on initial render
    useEffect(() => {
        setReciepeData((r) => {
            return reciepes.find((reciepe) => reciepe.label == reciepeName)
        })
        setLoading(false)
    }, [])

    return (
        <>
            {!loading && 
                <>
                    <div className="mt-5 container-reciepe-detail flex-column">
                        <hr className="w-100 p-0 m-0 fw-bold" />
                        <div className="d-flex md-flex-column W-100">
                            <div className="detail-content-section my-auto">
                                <div className="w-75 mx-auto">
                                    <span className="meal-type ms-2">{reciepeData.mealType[0].toString().toUpperCase()}</span> <br/>
                                    <span className="reciepe-name my-2">{reciepeData.label}</span> <br/>
                                    <span className="meal-type my-2">Cuisine: {reciepeData.cuisineType[0]}</span> <br/>
                                    <span className="meal-type my-2">Serving Time: {reciepeData.totalTime} Minutes</span> <br/>
                                    <span className="meal-type my-2">Calories: {parseFloat(reciepeData.calories).toFixed(2)}</span> <br/>
                                    <span className="meal-type my-2">Total Weight: {parseFloat(reciepeData.totalWeight).toFixed(2)} g</span> <br/>
                                </div>
                            </div>
                            <div className="detail-image-section position-relative">
                                <img 
                                    style={{ width: '100%', height: '100%' }}
                                    src={reciepeData.image} 
                                    alt="ReciepeImage"
                                />
                            </div>
                        </div>
                        <hr className="w-100 p-0 m-0" />
                        <div 
                            className="mx-auto d-flex flex-wrap justify-content-between"
                            style={{ marginTop: '50px', width: '70%' }}
                        >
                            <div className="ingredient-box mb-10">
                                <div 
                                    className="d-flex flex-column"
                                    style={{ padding: '40px 40px' }}
                                >
                                    <span className="flex-start meal-type">Ingredients</span>

                                    <hr className="w-25" />

                                    {reciepeData.ingredientLines.map((line) => (
                                        <p className="reciepe-ingredients mt-4 text-start">
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
            {loading &&
                <div className='d-flex justify-content-center' style={{ marginTop: '50px', marginBottom: '50px' }}>
                    <div className='w-50px h-50px'>
                        <img className='w-50px h-50px' src={toAbsoluteUrl('/assets/loading.gif')} alt="Loading" />
                    </div>
                </div>
            }
        </>
    )
}

export { ReciepeDetail }