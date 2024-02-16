import { useEffect, useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { getReciepes, toAbsoluteUrl } from '../api/index'
import { actions } from "../redux/reciepeRedux";
import { ReciepeCard } from "./components/ReciepeCard";
import { TopMenu } from "./components/TopMenu"

const ReciepeList = () => {
    const [loading, setLoading] = useState(true)
    const [offset] = useState(0) // starting index of reciepe
    const [filter, setFilter] = useState("")
    const [searchString, setSearchString] = useState("")
    const [limit] = useState(20) // no of reciepes to fetch
    const dispatch = useDispatch()

    const { reciepes } = useSelector(
        ({ reciepes }) => ({
            reciepes: reciepes
        }), shallowEqual
    )

    // fetching the reciepes on initial render and whenever the filter state changes
    useEffect(() => {
        if(!loading) setLoading(true)
        getReciepes(offset, limit, filter, searchString)
        .then((response) => {
            dispatch(actions.fetchReciepes(response.reciepes))
            setLoading(false)
        })
    }, [filter])

    return (
        <>
            <div className="container-inner flex-column">
                <TopMenu 
                    filter={filter} 
                    setFilter={setFilter}
                    searchString={searchString}
                    setSearchString={setSearchString}
                    offset={offset}
                    limit={limit}
                    setLoading={setLoading}
                />
                {!loading && 
                    <div className="d-flex flex-wrap justify-content-around mt-5">
                        {reciepes && reciepes.length > 0 &&
                            <>
                                {reciepes.map((recipe) => (
                                    <ReciepeCard 
                                        reciepeName={recipe.label}
                                        reciepeImage={recipe.image}
                                        mealType={recipe.mealType}
                                    />
                                ))}
                            </>
                        }
                        {reciepes && reciepes.length == 0 &&
                            <span style={{ fontSize: "20px" }}>
                                No results found
                            </span>
                        }
                    </div>
                }
                {loading &&
                    <div className='d-flex justify-content-center' style={{ marginTop: '50px', marginBottom: '50px' }}>
                        <div className='w-50px h-50px'>
                            <img className='w-50px h-50px' src={toAbsoluteUrl('/assets/loading.gif')} alt="Loading" />
                        </div>
                    </div>
                }
            </div>
        </>
    );
}

export {ReciepeList};
