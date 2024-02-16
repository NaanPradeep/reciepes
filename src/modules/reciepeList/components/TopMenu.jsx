import { useState } from "react"
import { getReciepes } from "../../api"
import { actions } from "../../redux/reciepeRedux"
import { useDispatch } from "react-redux"

const TopMenu = (props) => {
    const dispatch = useDispatch()
    const [mealType] = useState(
        [
            {
                id: 1,
                name: "Breakfast"
            },
            {
                id: 2,
                name: "Dinner"
            },
            {
                id: 3,
                name: "Lunch"
            },
            {
                id: 4,
                name: "Snack"
            },
            {
                id: 5,
                name: "Teatime"
            },
        ]
    )

    const handleSearchBarChange = (e) => {
        e.preventDefault()
        props.setSearchString(e.target.value)
    }

    const handleSearch = (e) => {
        // handling search when enter key is pressed and shift key is not pressed along withit.
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault()
            props.setLoading(true)
            getReciepes(
                props.offset,
                props.limit,
                props.filter,
                props.searchString
            )
            .then((response) => {
                dispatch(actions.fetchReciepes(response.reciepes))
                props.setLoading(false)
            })
            .catch((err) => {
                props.setLoading(false)
                console.log(err)
            })
        }
    }

    const handleFilterChange = (e) => {
        e.preventDefault()
        props.setFilter(e.target.value)
    } 
    
    return (
        <div className="card-title d-flex justify-content-between">
            <div className="d-flex my-1">
                <input 
                    onKeyDown={(e) => handleSearch(e)}
                    onChange={(e) => handleSearchBarChange(e)}
                    value={props.searchString}
                    type="text" 
                    className="form-control form-control-solid w-400px ps-14" 
                    placeholder="Press enter for search"
                />
            </div>
            <div className="form-group row ms-5">
                <select
                    className="form-control form-control-lg form-control-solid bg-white w-200px"
                    name="categories"
                    value={props.filter}
                    onChange={(event) => handleFilterChange(event)}
                    style={{ border: "1px solid rgb(184, 169, 169)" }}
                >
                    <option value={""}>Select Category</option>
                    {mealType.map((type) => (
                        <option key={type.id} value={type.name}>{type.name}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export { TopMenu }